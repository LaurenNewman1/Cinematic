// Insert post, put, get, delete services here for shows
import { SettingsApplications, SettingsSystemDaydreamTwoTone } from "@mui/icons-material";
import {makeGetRequest} from "../services/service.js"

export const retrieveTotalShows = async () => {
    const result = await makeGetRequest('/api/total_shows');
    console.log(result);
    return result;
};
export const retrieveLongestShows = async () => {
    const result = await makeGetRequest('/api/longest_show');
    console.log(result);
    return result;
};
export const retrieveShortestShows = async () => {
    const result = await makeGetRequest('/api/shortest_show');
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