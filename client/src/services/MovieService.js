// Insert post, put, get, delete services here for movies
import { SettingsApplications, SettingsSystemDaydreamTwoTone } from "@mui/icons-material";
import {makeGetRequest} from "../services/service.js"

export const retrieveTotalMovies = async () => {
    const result = await makeGetRequest('/api/total_movies');
    console.log(result);
    return result;
};
export const retrieveLongestMovies = async () => {
    const result = await makeGetRequest('/api/longest_movies');
    console.log(result);
    return result;
};
export const retrieveShortestMovies = async () => {
    const result = await makeGetRequest('/api/shortest_movies');
    console.log(result);
    return result;
};