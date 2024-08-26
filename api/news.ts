import {apiCall} from "@/api/apiCall";
const NewsUrl = process.env.EXPO_PUBLIC_NEWS_API_URL;

export const fetchNewsData = () => {
    return apiCall(`${NewsUrl}`);
}
