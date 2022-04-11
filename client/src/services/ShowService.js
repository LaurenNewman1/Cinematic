// Insert post, put, get, delete services here for shows
import {makeGetRequest} from "../services/service.js"

export const retrieveTotalShows = async () => {
    const result = await makeGetRequest('/api/total_shows');
    console.log(result);
    return result;
};
export const retrieveLongestShows = async (dateRange) => {
    const result = await makeGetRequest(`/api/longest_shows/${dateRange[0].getYear() + 1900}/${dateRange[1].getYear() + 1900}`);
    console.log(result);
    return result;
};
export const retrieveShortestShows = async (dateRange) => {
    const result = await makeGetRequest(`/api/shortest_shows/${dateRange[0].getYear() + 1900}/${dateRange[1].getYear() + 1900}`);
    console.log(result);
    return result;
};

export const retrieveHighestRatedShows = async (dateRange) => {
    const result = await makeGetRequest(`/api/highest_rated_shows/${dateRange[0].getYear() + 1900}/${dateRange[1].getYear() + 1900}`);
    console.log(result)
    return result;
};

export const retrieveLowestRatedShows = async (dateRange) => {
    const result = await makeGetRequest(`/api/lowest_rated_shows/${dateRange[0].getYear() + 1900}/${dateRange[1].getYear() + 1900}`);
    return result;
};

export const retrieveAvgRuntime = async (dateRange) => {
    const result = await makeGetRequest(`/api/avg_runtime_shows/${dateRange[0].getYear() + 1900}/${dateRange[1].getYear() + 1900}`);
    return result;
};

export const retrieveAvgRating = async (dateRange) => {
    const result = await makeGetRequest(`/api/avg_rating_shows/${dateRange[0].getYear() + 1900}/${dateRange[1].getYear() + 1900}`);
    return result;
};