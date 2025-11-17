"use client";

interface StoryDetailsProps {
  storyId: string; 
  data: { 
    title: string;
    article: string;
    img: string;
    date: string;
    ownerId: {
      name: string;
    };
    category: string;
  };
}

const StoryDetails = ({ data }: StoryDetailsProps) => {
  const { title, article, img, date, ownerId, category } = data;

  const formattedDate = new Date(date).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <section>
      <h1>{title}</h1>
      <div>
        <p>
          <span>Автор статті:</span> <strong>{ownerId.name}</strong>
        </p>
        <p>
          <span>Опубліковано:</span> <strong>{formattedDate}</strong>
        </p>
        <p>{category}</p>
      </div>

      <div>
        <img src={img} alt={title} />
        <p>{article}</p>
      </div>
    </section>
  );
};

export default StoryDetails;