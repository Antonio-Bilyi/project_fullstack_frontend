'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useInfiniteQuery, DehydratedState, HydrationBoundary } from '@tanstack/react-query';
import { getCategories } from '@/lib/api/clientsApi/clientApi';
import { getAllStories } from '@/lib/api/clientsApi/getAllStories';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import { Category } from '@/types/category';
import { ApiResponse } from '@/types/api';
import { StoriesHttpResponse } from '@/types/story';
import Pagination from "@/components/Pagination/Pagination";
import css from './page.module.css';

interface StoriesClientProps {
  dehydratedState: DehydratedState;
  initialCategories: Category[];
  filterCategory?: string;
}

const StoriesClient = ({ dehydratedState, initialCategories, filterCategory = 'ALL' }: StoriesClientProps) => {
  const router = useRouter();
  const [currentCategory, setCurrentCategory] = useState(filterCategory);
  const [perPage, setPerPage] = useState(9);
  const [isMobile, setIsMobile] = useState(false);

  // Визначаємо мобільну версію
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Адаптивний perPage
  useEffect(() => {
    const updatePerPage = () => setPerPage(window.innerWidth < 1440 ? 8 : 9);
    updatePerPage();
    window.addEventListener('resize', updatePerPage);
    return () => window.removeEventListener('resize', updatePerPage);
  }, []);

  // Підтягування категорій
  const { data: categories = initialCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
    initialData: initialCategories,
  });

  // Підтягування сторі з пагінацією
  const {
    data,
    isLoading,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['stories', currentCategory, perPage],
    queryFn: ({ pageParam = 1 }) => getAllStories(pageParam, perPage, currentCategory),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ApiResponse<StoriesHttpResponse>) =>
      lastPage.data?.hasNextPage ? lastPage.data.page + 1 : undefined,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000,
  });

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);

    const params = new URLSearchParams();
    params.set('category', category);
    router.replace(`/stories?${params.toString()}`, { scroll: false });

    // Скидаємо попередні сторінки та завантажуємо нові
    refetch();
  };

  return (
    <HydrationBoundary state={dehydratedState}>
      <Section>
        <Container>
          <div className={css.page}>
            <div className={css.header}>
              <h1 className={css.title}>Історії Мандрівників</h1>

              <div className={css.filterSection}>
                {isMobile ? (
                  <div className={css.mobileFilter}>
                    <label htmlFor="categorySelect" className={css.categoryLabel}>
                      Категорії
                    </label>
                    <select
                      id="categorySelect"
                      value={currentCategory}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className={css.categorySelect}
                    >
                      <option value="ALL">Всі історії</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <>
                    <button
                      className={`${css.categoryButton} ${currentCategory === 'ALL' ? css.active : ''}`}
                      onClick={() => handleCategoryChange('ALL')}
                    >
                      Всі історії
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category._id}
                        className={`${css.categoryButton} ${currentCategory === category.name ? css.active : ''}`}
                        onClick={() => handleCategoryChange(category.name)}
                      >
                        {category.name}
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>

            {isLoading || (isFetching && !isFetchingNextPage && !data?.pages) ? (
              <div className={css.loading}>Завантаження...</div>
            ) : error ? (
              <div className={css.error}>Помилка: {error instanceof Error ? error.message : 'Помилка завантаження'}</div>
            ) : !data?.pages || data.pages.length === 0 || !data.pages[0]?.data?.data || data.pages[0].data.data.length === 0 ? (
              <div className={css.noStories}>
                <p className={css.noStoriesText}>В цій категорії поки немає історій</p>
              </div>
            ) : (
              <>
                <TravellersStories pages={data.pages} />

                {isFetchingNextPage ? (
                  <Pagination name="Вже скоро..." onClick={handleLoadMore} />
                ) : hasNextPage ? (
                  <Pagination name="Показати ще" onClick={handleLoadMore} />
                ) : null}
              </>
            )}
          </div>
        </Container>
      </Section>
    </HydrationBoundary>
  );
};

export default StoriesClient;