import axios from "axios";

const apiKey = import.meta.env.VITE_RAWG_API_KEY;

if (!apiKey) {
  console.warn(
    "RAWG API key is missing. Set VITE_RAWG_API_KEY in your env file."
  );
}

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: apiKey,
  },
});
