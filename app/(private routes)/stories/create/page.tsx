"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import StoryForm from "@/components/StoryForm/StoryForm";
import Modal from "@/components/Modal/Modal";
import Header from "@/components/Header/Header";

export default function StoryCreatePage() {
  const router = useRouter();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    router.push("/stories");
  };

  return (
    <>
      <Header />
      <section
        style={{ paddingTop: "calc(48px + 62px)", paddingBottom: "72px" }}
      >
        <StoryForm mode="create" onCancel={handleCancelClick} />
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
