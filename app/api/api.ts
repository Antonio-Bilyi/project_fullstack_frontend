import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
    baseURL: `${process.env.HANDLER_API_URL || 'http://localhost:8080'}/api`,
    withCredentials: true,
});