import axios from "axios";

export const handleApiError = (error: unknown, action: string): never => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.status_message || error.message;
    throw new Error(
      `Failed to ${action}: ${status ? `(${status})` : ""} ${message}`
    );
  }

  throw new Error(`An unknown error occurred while trying to ${action}.`);
};
