import {dehydrate, QueryClient} from "@tanstack/react-query";
import StoriesClient from "@/app/(public routes)/stories/Stories.client";
import {getCategoriesServer} from "@/lib/api/serverApi/serverApi";
import {Metadata} from "next";
import {getAllStoriesServer} from "@/lib/api/serverApi/getAllStories";

interface PageProps {
    searchParams: Promise<{ category?: string; page?: string }>;
}
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    const params = await searchParams;
    const category = params.category || 'ALL';

    return {
        title: 'Історії мандрівників',
        description: `Дослідіть історії мандрівників${category !== 'ALL' ? ` в категорії ${category}` : ''}`,
        openGraph: {
            title: 'Історії мандрівників',
            description: `Дослідіть історії мандрівників${category !== 'ALL' ? ` в категорії ${category}` : ''}`,
            url: `https://your-domain.com/stories${category !== 'ALL' ? `?category=${category}` : ''}`,
        },
    };
}

const StoriesPage = async ({ searchParams }: PageProps) => {
    const params = await searchParams;
    const category = params.category || 'ALL';
    const queryClient = new QueryClient();

    const categories = await getCategoriesServer();

    await queryClient.prefetchQuery({
        queryKey: ['categories'],
        queryFn: () => categories,
    });

    await queryClient.prefetchInfiniteQuery({
        queryKey: ['stories', 9, category],
        queryFn: () => getAllStoriesServer(1, 9, category),
        initialPageParam: 1,
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <StoriesClient
            dehydratedState={dehydratedState}
            initialCategories={categories}
            filterCategory={category}
        />
    );
};

export default StoriesPage;
