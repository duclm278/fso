import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
// const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const getIconUrl = (icon) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

const getByCityName = (cityName) => {
  const request = axios.get(
    `${baseUrl}?q=${cityName}&appid=${API_KEY}&units=metric`
  );
  return request.then((response) => response.data);
};

export default {
  getIconUrl,
  getByCityName,
};
