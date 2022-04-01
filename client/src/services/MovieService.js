// Insert post, put, get, delete services here for movies
import {makeGetRequest} from "../services/service.js"

export const retrieveTotalMovies = async () => {
    const result = await makeGetRequest('/api/total_movies');
    return result;
};

export const retrieveLongestMovies = async () => {
    const result = await makeGetRequest('/api/longest_movies');
    return result;
};

export const retrieveShortestMovies = async () => {
    const result = await makeGetRequest('/api/shortest_movies');
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