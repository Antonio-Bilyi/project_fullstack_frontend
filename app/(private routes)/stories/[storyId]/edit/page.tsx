import { getServerStory } from "@/lib/api/serverApi/serverApi";
import EditStoryClient from "./EditStoryClient";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

interface EditStoryPageProps {
  params: Promise<{
    storyId: string;
  }>;
}

export default async function EditStoryPage({ params }: EditStoryPageProps) {
  const { storyId } = await params;

  const story = await getServerStory(storyId);

  const queryClient = new QueryClient();

  queryClient.setQueryData(["story", storyId], story);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditStoryClient />
    </HydrationBoundary>
  );
}