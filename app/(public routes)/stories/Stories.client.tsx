'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getStories, getCategories } from '@/lib/api/clientsApi/clientApi';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import Container from '@/components/Container/Container';
import { PaginatedStoriesResponse } from '@/types/story';
import { Category } from '@/types/category';
import css from './page.module.css';

interface StoriesClientProps {
  initialStories: PaginatedStoriesResponse;
  initialCategories: Category[];
  filterCategory?: string;
}

const StoriesClient = ({ initialStories, initialCategories, filterCategory = 'All' }: StoriesClientProps) => {
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
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['stories', currentCategory],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getStories({
        page: pageParam,
        perPage: 12,
        category: currentCategory === 'All' ? undefined : currentCategory,
      });
      return data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,

    ...(currentCategory === filterCategory && {
      initialData: {
        pages: [initialStories],
        pageParams: [1],
      },
    }),
  });

  const stories = data?.pages.map((page) => page.data) ?? [];
    console.log(stories)
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

        {isLoading ? (
          <div className={css.loading}>Завантаження...</div>
        ) : error ? (
          <div className={css.error}>Помилка: {error instanceof Error ? error.message : 'Помилка завантаження'}</div>
        ) : stories.length === 0 ? (
          <div className={css.noStories}>
            <p className={css.noStoriesText}>В цій категорії поки немає історій</p>
          </div>
        ) : (
          <>
            <TravellersStories stories={stories} />

            {hasNextPage && (
              <div className={css.loadMoreWrapper}>
                <button
                  className={css.loadMoreButton}
                  onClick={handleLoadMore}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? 'Завантаження...' : 'Показати ще'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default StoriesClient;