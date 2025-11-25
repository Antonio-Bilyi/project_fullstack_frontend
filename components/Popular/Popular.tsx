import PopularClient from "../PopularClient/PopularClient";

interface PopularProps {
  paginationShow: boolean;
  mobPerPage: number;
  page?: number;
}

import {
  QueryClient,
  // HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getAllStoriesServer } from "@/lib/api/serverApi/getAllStories";

const Popular = async ({ paginationShow, mobPerPage, page }: PopularProps) => {
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ["stories", mobPerPage, "ALL", "desc", "favoriteCount"],
  //   queryFn: () =>
  //     getAllStoriesServer(1, mobPerPage, "ALL", "favoriteCount", "desc"),
  // });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["stories", mobPerPage, "ALL", "desc", "favoriteCount"],
    queryFn: ({ pageParam = 1 }) =>
      getAllStoriesServer(
        pageParam,
        mobPerPage,
        "ALL",
        "favoriteCount",
        "desc"
      ),
    initialPageParam: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <PopularClient
      dehydratedState={dehydratedState}
      mobPerPage={mobPerPage}
      paginationShow={paginationShow}
      // page={page}
    />
    // </HydrationBoundary>
  );
};

export default Popular;
