// export interface Story {
//   _id: string;
//   title: string;
//   category: {
//     _id: string;
//     name: string;
//   };
//   article: string;
//   img: string;
//   ownerId: string;
//   date: string;
//   favoriteCount?: number;
//   createdAt?: string;
//   updatedAt?: string;
// }

// розширені дані історії даними категорії та власника
export interface StoryExp {
  _id: string;
  title: string;
  category: {
    _id: string;
    name: string;
  };
  article: string;
  img: string;
  ownerId: {
    _id: string;
    name: string;
    avatarUrl: string;
  };
  date: string;
  favoriteCount: number;
  createdAt?: string;
  updatedAt?: string;
}