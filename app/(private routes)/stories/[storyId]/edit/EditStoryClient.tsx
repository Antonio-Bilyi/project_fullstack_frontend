"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import StoryForm from "@/components/StoryForm/StoryForm";
import Modal from "@/components/Modal/Modal";
import * as StoryService from "@/lib/api/clientsApi/clientApi";

export default function EditStoryClient() {
  const params = useParams();
  const router = useRouter();
  const storyId = params.storyId as string;
  const [showCancelModal, setShowCancelModal] = useState(false);

  const { data: story, isError, isLoading } = useQuery({
    queryKey: ["story", storyId],
    queryFn: () => StoryService.getStory(storyId),
  });

  if (isLoading) {
    return (
      <section style={{ paddingTop: '48px', paddingBottom: '72px', textAlign: 'center' }}>
        <p>Завантаження...</p>
      </section>
    );
  }

  if (isError || !story) {
    return null;
  }

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    router.push("/stories");
  };

  return (
    <>
      <section style={{ paddingTop: '48px', paddingBottom: '72px' }}>
        <StoryForm story={story} mode="edit" onCancel={handleCancelClick} />
      </section>
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Ви точно хочете вийти?"
        message="Ми будемо скучати за вами!"
        buttons={[
          {
            label: "Відхилити",
            onClick: () => setShowCancelModal(false),
            variant: "secondary",
          },
          {
            label: "Вийти",
            onClick: handleConfirmCancel,
            variant: "primary",
          },
        ]}
      />
    </>
  );
}