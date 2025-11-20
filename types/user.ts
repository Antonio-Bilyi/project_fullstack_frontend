export interface User {
    _id: string;
    name: string;
    email?: string;
    avatarUrl: string;
    articlesAmount: number;
    description: string;
    favouriteArticles: [string];
    createdAt?: string;
    updatedAt?: string;    
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
