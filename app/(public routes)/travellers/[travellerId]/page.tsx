import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getTravellerStories } from "@/lib/api/clientsApi/getTravellerStories";
import TravellerByIdClient from "@/components/TravellerById/TravellerById.client";
import Section from "@/components/Section/Section";
import Container from "@/components/Container/Container";
import { Traveler } from "@/types/traveller";

interface PageProps {
  params: Promise<{
    travellerId: string;
  }>;
}

async function getTravellerInfo(travellerId: string): Promise<Traveler | null> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  if (!apiBase) return null;

  try {
    const res = await fetch(`${apiBase}/api/users/${travellerId}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const response = await res.json();
    return response.data ?? null;
  } catch {
    return null;
  }
}

export default async function TravellerByIdPage({ params }: PageProps) {
  const { travellerId } = await params;

  const travellerInfo = await getTravellerInfo(travellerId);

  if (!travellerInfo) {
    return (
      <Section>
        <Container>
          <p>Мандрівник не знайдений</p>
        </Container>
      </Section>
    );
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["traveller-stories", travellerId, 6],
    queryFn: ({ pageParam }) =>
      getTravellerStories(travellerId, pageParam as number, 6),
    initialPageParam: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <TravellerByIdClient
        dehydratedState={dehydratedState}
        travellerId={travellerId}
        travellerInfo={travellerInfo}
      />
    </HydrationBoundary>
  );
}
