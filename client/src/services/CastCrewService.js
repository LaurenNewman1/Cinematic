// Insert post, put, get, delete services here for cast and crew
import { SettingsApplications, SettingsSystemDaydreamTwoTone } from "@mui/icons-material";
import {makeGetRequest} from "../services/service.js"

export const retrieveTotalActors = async () => {
    const result = await makeGetRequest('/api/total_actors');
    console.log(result);
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