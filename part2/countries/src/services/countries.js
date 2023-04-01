import axios from "axios";

const baseUrl = "https://restcountries.com";

const getAll = () => {
  const url = `${baseUrl}/v3.1/all`;
  const request = axios.get(url);
  return request.then((response) => response.data);
};

export default {
  getAll,
};
