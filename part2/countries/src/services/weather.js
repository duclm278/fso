import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
// const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const getIconUrl = (icon) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

const getByCityName = (cityName, stateCode, countryCode) => {
  let query = cityName;
  if (stateCode) query += `,${stateCode}`;
  if (countryCode) query += `,${countryCode}`;
  const url = `${baseUrl}?q=${query}&units=metric&appid=${API_KEY}`;
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const getByLatLng = (lat, lng) => {
  const url = `${baseUrl}?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`;
  const request = axios.get(url);
  return request.then((response) => response.data);
};

export default {
  getIconUrl,
  getByCityName,
  getByLatLng,
};
