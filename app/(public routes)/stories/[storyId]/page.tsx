import StoryDetails from "@/components/StoryDetails/StoryDetails";

export default async function StoryPage({ params }) {
  const { id } = params;

  const res = await fetch(`${process.env.API_URL}/stories/${id}`, {
    cache: "no-store",
  });

  const story = await res.json();

  return <StoryDetails story={story} />;
}


// import StoryDetails from "@/components/StoryDetails/StoryDetails";
// import { storyMock } from "../[storyId]/storyMock.js";

// export default function StoryPage() {
//   return <StoryDetails story={storyMock} />;
// }