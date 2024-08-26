import {currentUrl, forecastUrl, historyUrl, searchUrl} from "@/constants/ApiEndPoints";
import {LocationObject} from "expo-location";
import {apiCall} from "@/api/apiCall";
const weatherApiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

const getYesterdayDate = (): string => {
    const today = new Date();
    today.setDate(today.getDate() - 1);

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const searchEndPoint = (query: string) => `${searchUrl}?key=${weatherApiKey}&q=${query}`;

const currentWeatherEndPoint = (query: string) => `${forecastUrl}?key=${weatherApiKey}&q=${query}&days=2&aqi=no&alerts=no`;

const currentLocationEndPoint = (query: LocationObject) => `${forecastUrl}?key=${weatherApiKey}&q=${query.coords.latitude},${query.coords.longitude}&days=1&aqi=no&alerts=no`;

const historyEndPoint = (query: string) => `${historyUrl}?key=${weatherApiKey}&q=${query}&dt=${getYesterdayDate()}`;

const locationWeatherEndPoint = (query: string) => `${currentUrl}?key=${weatherApiKey}&q=${query}`;

export const fetchSearchData = (query: string) => {
    return apiCall(searchEndPoint(query));
}

export const fetchWeatherData = (query: string) => {
    return apiCall(currentWeatherEndPoint(query));
}

export const fetchCurrentLocationData = (location: LocationObject) => {
    return apiCall(currentLocationEndPoint(location));
}

export const fetchHistoryLocationData = (query: string) => {
    return apiCall(historyEndPoint(query));
}

export const fetchLocationWeatherData = (query: string) => {
    return apiCall(locationWeatherEndPoint(query));
}

