import TravellersClient from "./Travellers.client";
import { getAllTravelers } from "@/lib/api/serverApi/getAllTravelers";
import { QueryClient, dehydrate } from "@tanstack/react-query";

export const metadata = {
  title: "Мандрівники",
  description: "Список мандрівників нашого сервісу",
};

export default async function TravellersPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["travelers"],
    queryFn: () => getAllTravelers(1, 8),
  });

  const dehydratedState = dehydrate(queryClient);

  return <TravellersClient dehydratedState={dehydratedState} />;
}
