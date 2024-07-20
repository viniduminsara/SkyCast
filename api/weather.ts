import {searchUrl} from "@/constants/ApiEndPoints";
import axios from "axios";
const weatherApiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

const searchEndPoint = (query: string) => `${searchUrl}?key=${weatherApiKey}&q=${query}`;

const apiCall = async (endpoint: string) => {
    const options = {
        method: 'GET',
        url: endpoint
    }

    try {
        const response = await axios.request(options);
        return response.data;
    }catch (err){
        console.log('error: ', err);
        return null;
    }
}

export const fetchSearchData = (query: string) => {
    return apiCall(searchEndPoint(query));
}
