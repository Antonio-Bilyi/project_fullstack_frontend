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

// export interface TravelersResponseAll {
//   status: number;
//   message: string;
//   data: TravelersResponse;
// }

// export const emptyTravelersList: TravelersResponse= {
//   data: [],
//   page: 1,
//   perPage: 10,
//   totalItems: 0,
//   totalPages: 1,
//   hasNextPage: false,
//   hasPreviousPage: false,
// };