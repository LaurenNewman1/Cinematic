// Insert post, put, get, delete services here for movies
import {makeGetRequest} from "../services/service.js"

export const retrieveTotalMovies = async () => {
    const result = await makeGetRequest('/api/total_movies');
    return result;
};

export const retrieveLongestMovies = async (dateRange) => {
    const result = await makeGetRequest(`/api/longest_movies/${dateRange[0].getYear() + 1900}/${dateRange[1].getYear() + 1900}`);
    return result;
};

export const retrieveShortestMovies = async (dateRange) => {
    const result = await makeGetRequest(`/api/shortest_movies/${dateRange[0].getYear() + 1900}/${dateRange[1].getYear() + 1900}`);
    return result;
};

export const retrieveHighestRatedMovies = async (dateRange) => {
    const result = await makeGetRequest(`/api/highest_rated_movies/${dateRange[0].getYear() + 1900}/${dateRange[1].getYear() + 1900}`);
    return result;
};

export const retrieveLowestRatedMovies = async (dateRange) => {
    const result = await makeGetRequest(`/api/lowest_rated_movies/${dateRange[0].getYear() + 1900}/${dateRange[1].getYear() + 1900}`);
    return result;
};

export const retrieveAvgRuntime = async (dateRange) => {
    const result = await makeGetRequest(`/api/avg_runtime/${dateRange[0].getYear() + 1900}/${dateRange[1].getYear() + 1900}`);
    return result;
};

export const retrieveAvgRating = async (dateRange) => {
    const result = await makeGetRequest(`/api/avg_rating/${dateRange[0].getYear() + 1900}/${dateRange[1].getYear() + 1900}`);
    return result;
};

export const retrieveAltLang = async (dateRange) => {
    const result = await makeGetRequest(`/api/alt_language/${dateRange[0].getYear() + 1900}/${dateRange[1].getYear() + 1900}`);
    return result;
};