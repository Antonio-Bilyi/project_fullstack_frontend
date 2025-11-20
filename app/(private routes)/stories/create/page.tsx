import { Metadata } from "next";
import CreateStoryClient from "./CreateStory.client";

export const metadata: Metadata = {
  title: "Create Story",
  description: "Create a new travel story",
};

export default function CreateStoryPage() {
  return <CreateStoryClient />;
}