// Insert post, put, get, delete services here for cast and crew
import { SettingsApplications, SettingsSystemDaydreamTwoTone } from "@mui/icons-material";
import {makeGetRequest} from "../services/service.js"

export const retrieveTotalActors = async () => {
    const result = await makeGetRequest('/api/total_actors');
    return result;
};

export const retrieveHighestActor = async (dateRange) => {
    const result = await makeGetRequest(`/api/highest_actor/${dateRange[0].getYear() + 1900}/${dateRange[1].getYear() + 1900}`);
    return result;
};

export const retrieveHighestDirector = async (dateRange) => {
    const result = await makeGetRequest(`/api/highest_director/${dateRange[0].getYear() + 1900}/${dateRange[1].getYear() + 1900}`);
    return result;
};

export const retrieveHighestWriter = async (dateRange) => {
    const result = await makeGetRequest(`/api/highest_writer/${dateRange[0].getYear() + 1900}/${dateRange[1].getYear() + 1900}`);
    return result;
};

export const retrieveAvgRating = async (dateRange, name) => {
    const result = await makeGetRequest(`/api/avg_rating_actors/${dateRange[0].getYear() + 1900}/${dateRange[1].getYear() + 1900}/${name}`);
    return result;
};

export const retrieveRoleGenreActor = async (dateRange, name, genre) => {
    const result = await makeGetRequest(`/api/roles_by_genre_actors/${dateRange[0].getYear() + 1900}/${dateRange[1].getYear() + 1900}/${name}/${genre}`);
    return result;
};

export const retrieveRoleGenreDirector = async (dateRange, name, genre) => {
    const result = await makeGetRequest(`/api/roles_by_genre_directors/${dateRange[0].getYear() + 1900}/${dateRange[1].getYear() + 1900}/${name}/${genre}`);
    return result;
};

export const retrieveStars = async (dateRange) => {
    const result = await makeGetRequest(`/api/stars/${dateRange[0].getYear() + 1900}/${dateRange[1].getYear() + 1900}`);
    return result;
};