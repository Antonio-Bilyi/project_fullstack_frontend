export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    articlesAmount: number;
    description: string;
    favouriteArticles: [string];
    createdAt: string;
    updatedAt: string;    
}

export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface UserRegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface TravelersList {
  data: User[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface TravelersResponse {
  status: number;
  message: string;
  data: TravelersList;
}

export const emptyTravelersList: TravelersList = {
  data: [],
  page: 1,
  perPage: 10,
  totalItems: 0,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};