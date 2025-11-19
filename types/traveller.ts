import { Story } from "./story";

export type Traveler = {
  _id: string;
  name: string;
  avatarUrl: string;
  description: string;
};

export type Traveller = Traveler;

export type TravelerStories = {
  user: Traveler;
  stories: Story[];
};

export interface TravelerStoriesHttpResponse {
  data: TravelerStories;
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
