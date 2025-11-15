import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';
import { Traveller } from '@/types/traveller';
import { Story } from '@/types/story';

interface PageProps {
  params: {
    travellerId: string;
  };
}

type StoriesApiResponse = ReadonlyArray<Story> | { items: ReadonlyArray<Story> };

function normalizeStories(data: StoriesApiResponse): Story[] {
  if (Array.isArray(data)) return data;
  if ('items' in data && Array.isArray(data.items)) return data.items;
  return [];
}

async function getTravellerStories(travellerId: string, limit = 6): Promise<Story[]> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  if (!apiBase) return [];

  try {
    const res = await fetch(
      `${apiBase}/api/travellers/${encodeURIComponent(travellerId)}/stories?limit=${limit}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data: StoriesApiResponse = await res.json();
    return normalizeStories(data);
  } catch {
    return [];
  }
}

async function getTravellerInfo(travellerId: string): Promise<Traveller | null> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  if (!apiBase) return null;
  
  try {
    const res = await fetch(
      `${apiBase}/api/travellers/${encodeURIComponent(travellerId)}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return null;
    const data: Traveller = await res.json();
    return data ?? null;
  } catch {
    return null;
  }
}

export default async function TravellerByIdPage({ params }: PageProps) {
  const { travellerId } = params;
  const [travellerInfo, stories] = await Promise.all([
    getTravellerInfo(travellerId),
    getTravellerStories(travellerId, 6),
  ]);

  if (!travellerInfo) {
    return (
      <Section>
        <Container>
          <p>Мандрівник не знайдений</p>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <TravellerInfo traveller={travellerInfo} />
        <h2>Історії Мандрівника</h2>
        {stories.length > 0 ? (
          <TravellersStories stories={stories} />
        ) : (
          <MessageNoStories />
        )}
      </Container>
    </Section>
  );
}
