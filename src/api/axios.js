import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "69922385267f3acc4e651e4457e0f91d",
    language: "ko-KR",
  },
});

export default instance;
