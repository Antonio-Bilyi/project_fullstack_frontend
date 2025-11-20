import StoryDetails from "@/components/StoryDetails/StoryDetails";

import { Story } from "@/types/story";

interface Props {
  params: { storyId: string };
}

export default async function StoryPage({ params }: Props) {
  let story: Story | null = null;

  try {
    story = await getStoryServer(params.storyId);
  } catch (error) {
    console.error("Ошибка при получении истории:", error);
  }

  if (!story) return <p>История не найдена</p>;

  return <StoryDetails story={story} />;
}
