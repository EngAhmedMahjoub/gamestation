import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClent from "../services/api-client";
import genres from "../data/genres";
import Genre from "../entities/Genre";

const apiClient = new APIClent<Genre>("/genres");

const useGenres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: () => apiClient.getAll({}),
    staleTime: ms("24h"), //24h
    initialData: genres,
  });
export default useGenres;
