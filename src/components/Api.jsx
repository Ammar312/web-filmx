import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDAyMmIzNTczZDczMDk3NzY1Y2E5ZTJlZjMzY2QzMSIsInN1YiI6IjY1Nzc2MTA2ZTkzZTk1MjE5MDBjYjFmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AW3XGe7tyq10sVKWu0bNQMLIPkmJTNYkLdm7TxfMr-w";

const headers = {
  Authorization: "bearer " + TOKEN,
};
export const fetchApi = async (url, params) => {
  try {
    const response = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
