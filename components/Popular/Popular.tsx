import PopularClient from "../PopularClient/PopularClient";

import {
  QueryClient,
  // HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getAllStoriesServer } from "@/lib/api/serverApi/getAllStories";

const Popular = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["stories"],
    queryFn: () => getAllStoriesServer(1, 3, "ALL", "favoriteCount", "desc"),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <PopularClient dehydratedState={dehydratedState} />
    // </HydrationBoundary>
  );
};

export default Popular;
