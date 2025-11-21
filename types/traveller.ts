import { Story } from "./story";

export type Traveler = {
  _id: string;
  name: string;
  avatarUrl: string;
  description: string;
  favouriteArticles?: [string];
  articlesAmount?: number;
};


export interface TravelersResponse {
  data: Traveler[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

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
