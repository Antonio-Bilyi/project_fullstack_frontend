import { Story } from "./story";

export type Traveler = {
  _id: string;
  name: string;
  avatarUrl: string;
  description: string;
};

export type Traveller = Traveler;

export interface TravelerStoriesHttpResponse {
  user: Traveler;
  stories: Story[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
