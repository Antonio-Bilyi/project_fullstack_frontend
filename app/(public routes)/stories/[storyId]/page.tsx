import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import StoryDetailsClient from "./StoryDetailsClient";
import { Metadata } from "next";
import { getServerStory } from "@/lib/api/serverApi/serverApi";
import Popular from "@/components/Popular/Popular";
import { getAllStoriesServer } from "@/lib/api/serverApi/getAllStories";
// import { getAllStoriesServer } from "@/lib/api/serverApi/getAllStories";

interface StoryDetailsProps {
  params: Promise<{ storyId: string }>;
}

export async function generateMetadata({
  params,
}: StoryDetailsProps): Promise<Metadata> {
  const { storyId } = await params;
  const story = await getServerStory(storyId);

  return {
    title: `Story: ${story.title}`,
    description: story.article.slice(0, 30),
    openGraph: {
      title: `Story: ${story.title}`,
      description: story.article.slice(0, 30),
      url: `http://localhost:3000/stories/${story._id}`,
      images: [
        {
          url: "/join/desk1x.webp",
          width: 1200,
          height: 630,
          alt: `Story: ${story.title}`,
        },
      ],
      type: "website",
    },
  };
}

const StoryByIdPage = async ({ params }: StoryDetailsProps) => {
  const { storyId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["story", storyId],
    queryFn: () => getServerStory(storyId),
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["stories", 2, "ALL", "desc", "favoriteCount"],
    queryFn: ({ pageParam = 1 }) =>
      getAllStoriesServer(pageParam, 2, "ALL", "favoriteCount", "desc"),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoryDetailsClient />
      <Popular page={1} mobPerPage={2} paginationShow={false} />
    </HydrationBoundary>
  );
};

export default StoryByIdPage;
