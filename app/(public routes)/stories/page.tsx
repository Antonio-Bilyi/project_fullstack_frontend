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

    await queryClient.prefetchQuery({
        queryKey: ['categories'],
        queryFn: () => categories,
    });

    await queryClient.prefetchInfiniteQuery({
        queryKey: ['stories', 12, category === 'All' ? 'ALL' : category],
        queryFn: () => getAllStoriesServer(1, 12, category === 'All' ? 'ALL' : category),
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
