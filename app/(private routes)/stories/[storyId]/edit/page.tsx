"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import * as StoryService from "@/lib/api/clientsApi/clientApi";
import StoryForm from "@/components/StoryForm/StoryForm";
import Modal from "@/components/Modal/Modal";

export default function EditStoryPage() {
  const params = useParams();
  const router = useRouter();
  const storyId = params.storyId as string;
  const [showCancelModal, setShowCancelModal] = useState(false);

  const { data: story } = useQuery({
    queryKey: ["story", storyId],
    queryFn: () => StoryService.getStory(storyId),
    enabled: !!storyId,
  });

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
