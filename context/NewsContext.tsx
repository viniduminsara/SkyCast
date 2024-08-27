import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {fetchNewsData} from "@/api/news";
import {useLocation} from "@/context/LocationContext";

interface NewsContextType {
    weatherNews: NewsArticle[];
}

interface NewsProviderProps {
    children: ReactNode;
}

const defaultContext: NewsContextType = {
    weatherNews: [],
}

const NewsContext = createContext<NewsContextType>(defaultContext);

export const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
    const [weatherNews, setWeatherNews] = useState<NewsArticle[]>([]);

    useEffect(() => {
        fetchNewsData()
            .then((data) => {
                if (data.results) {
                    setWeatherNews(data.results)
                }
            })
    }, []);

    return (
        <NewsContext.Provider value={{ weatherNews }}>
            {children}
        </NewsContext.Provider>
    )

};

export const useNews = () => {
    return useContext(NewsContext);
};
