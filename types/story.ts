export interface Story {
  _id: string;
  title: string;
  category: {
    _id: string;
    name: string;
  };
  article: string;
  img: string;
  ownerId: string;
  date: string;
  favoriteCount?: number;
  createdAt?: string;
  updatedAt?: string;
}