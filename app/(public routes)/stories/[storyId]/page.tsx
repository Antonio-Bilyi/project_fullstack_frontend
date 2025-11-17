"use client";

import { useState, useEffect } from "react";
import StoryDetails from "@/components/StoryDetails/StoryDetails";


interface StoryPageProps {
  params: Promise<{ storyId: string }>;
}
const StoryPage = ({ params }: StoryPageProps) => {
  const [storyId, setStoryId] = useState<string>(""); 
  const [storyData, setStoryData] = useState<null | {
    title: string;
    article: string;
    img: string;
    date: string;
    ownerId: {
      name: string;
    };
    category: string;
  }>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    const fetchParams = async () => {
      const resolvedParams = await params; 
      setStoryId(resolvedParams.storyId || "");
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
 
    if (storyId) {
      fetch(`/api/stories/${storyId}`)
        .then((res) => res.json())
        .then((data) => {
          setStoryData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching story:", error);
          setLoading(false);
        });
    }
  }, [storyId]);

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (!storyData) {
    return <div>Історія не знайдена</div>;
  }

  return (
    <main>
      {storyId ? (
        <StoryDetails storyId={storyId} data={storyData} />
      ) : (
        <div>Невірний storyId</div>
      )}
    </main>
  );
};

export default StoryPage;

