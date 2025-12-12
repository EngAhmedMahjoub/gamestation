import axios, { AxiosRequestConfig } from "axios";

const apiKey = import.meta.env.VITE_RAWG_API_KEY;

if (!apiKey) {
  console.warn(
    "RAWG API key is missing. Set VITE_RAWG_API_KEY in your env file."
  );
}

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: apiKey,
  },
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
}

export default APIClient;
