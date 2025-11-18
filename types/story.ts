import { Category } from "./category";
import { Owner } from "./owner";

type OwnerType = string | Owner;
type CategoryType = string | Category;

export interface Story {
  _id: string;
  title: string;
  category: CategoryType;
  article: string;
  img: string;
  ownerId: OwnerType;
  date: string;
  favoriteCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface StoriesHttpResponse {
    data: Story[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
