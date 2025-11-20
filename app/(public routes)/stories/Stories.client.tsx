'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {useQuery, useInfiniteQuery, DehydratedState, HydrationBoundary} from '@tanstack/react-query';
import { getCategories } from '@/lib/api/clientsApi/clientApi';
import { getAllStories } from '@/lib/api/clientsApi/getAllStories';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import Container from '@/components/Container/Container';
import { Category } from '@/types/category';
import { ApiResponse } from '@/types/api';
import { StoriesHttpResponse } from '@/types/story';
import css from './page.module.css';
import Pagination from "@/components/Pagination/Pagination";

interface StoriesClientProps {
  dehydratedState: DehydratedState;
  initialCategories: Category[];
  filterCategory?: string;
}

const StoriesClient = ({ dehydratedState, initialCategories, filterCategory = 'All' }: StoriesClientProps) => {
  const router = useRouter();
  const [currentCategory, setCurrentCategory] = useState(filterCategory);

  useEffect(() => {
    setCurrentCategory(filterCategory);
  }, [filterCategory]);

  const { data: categories = initialCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
    initialData: initialCategories,
  });

  const {
    data,
    isLoading,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['stories', 12, currentCategory === 'All' ? 'ALL' : currentCategory],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getAllStories(pageParam, 12, currentCategory === 'All' ? 'ALL' : currentCategory),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ApiResponse<StoriesHttpResponse>) => {
      if (lastPage.data?.hasNextPage) {
        return lastPage.data.page + 1;
      }
      return undefined;
    },
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000,
  });

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);

    const params = new URLSearchParams();
    params.set('category', category);
    router.replace(`/stories?${params.toString()}`, { scroll: false });
  };

  return (
    <HydrationBoundary state={dehydratedState}>
      <Container>
        <div className={css.page}>
          <div className={css.header}>
            <h1 className={css.title}>Історії мандрівників</h1>

            <div className={css.filterSection}>
              <button
                className={`${css.categoryButton} ${currentCategory === 'All' ? css.active : ''}`}
                onClick={() => handleCategoryChange('All')}
              >
                Всі категорії
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
            </div>
          </div>

          {isLoading || (isFetching && !isFetchingNextPage && !data?.pages) ? (
            <div className={css.loading}>Завантаження...</div>
          ) : error ? (
            <div className={css.error}>Помилка: {error instanceof Error ? error.message : 'Помилка завантаження'}</div>
          ) : !data?.pages || data.pages.length === 0 || !data.pages[0]?.data || data.pages[0].data.stories?.length === 0 ? (
            <div className={css.noStories}>
              <p className={css.noStoriesText}>В цій категорії поки немає історій</p>
            </div>
          ) : (
            <>
              <TravellersStories pages={data?.pages} />

              {isFetchingNextPage ? (
                <Pagination
                  name={"Вже скоро..."}
                  onClick={handleLoadMore}
                />
              ) : hasNextPage ? (
                <Pagination
                  name={"Показати ще"}
                  onClick={handleLoadMore}
                />
              ) : null}
            </>
          )}
        </div>
      </Container>
    </HydrationBoundary>
  );
};

export default StoriesClient;