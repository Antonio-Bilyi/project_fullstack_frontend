import { Story } from "@/types/story";

interface StoryDetailsProps {
  story: Story;
}

export default function StoryDetails({ story }: StoryDetailsProps) {
  return (
    <div>
      <h1>{story.title}</h1>

      <p>
        Автор:{" "}
        {typeof story.ownerId === "string"
          ? story.ownerId
          : story.ownerId?.name}
      </p>

      <p>
        Категорія:{" "}
        {typeof story.category === "string"
          ? story.category
          : story.category?.name}
      </p>

      <img src={story.img} alt={story.title} />

      <p>{story.article}</p>

      {story.date && <p>Дата: {new Date(story.date).toLocaleDateString()}</p>}
    </div>
  );
}
