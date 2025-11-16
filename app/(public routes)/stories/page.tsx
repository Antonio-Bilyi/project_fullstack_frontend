import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import StoriesClient from "@/app/(public routes)/stories/Stories.client";
import {getCategoriesServer, getStoriesServer} from "@/lib/api/serverApi/serverApi";
import {Metadata} from "next";

interface PageProps {
    searchParams: Promise<{ category?: string; page?: string }>;
}
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    const params = await searchParams;
    const category = params.category || 'All';

    return {
        title: 'Історії мандрівників',
        description: `Дослідіть історії мандрівників${category !== 'All' ? ` в категорії ${category}` : ''}`,
        openGraph: {
            title: 'Історії мандрівників',
            description: `Дослідіть історії мандрівників${category !== 'All' ? ` в категорії ${category}` : ''}`,
            url: `https://your-domain.com/stories${category !== 'All' ? `?category=${category}` : ''}`,
        },
    };
}

const StoriesPage = async ({ searchParams }: PageProps) => {
    const params = await searchParams;
    const category = params.category || 'All';
    const queryClient = new QueryClient();

    const categories = await getCategoriesServer();

    const initialStories = await getStoriesServer({
        page: 1,
        perPage: 12,
        category: category === 'All' ? undefined : category,
    });

    await queryClient.prefetchQuery({
        queryKey: ['categories'],
        queryFn: () => categories,
    });

    await queryClient.prefetchInfiniteQuery({
        queryKey: ['stories', category],
        queryFn: () => initialStories,
        initialPageParam: 1,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <StoriesClient
                initialStories={initialStories}
                initialCategories={categories}
                filterCategory={category}
            />
        </HydrationBoundary>
    );
};

export default StoriesPage;
