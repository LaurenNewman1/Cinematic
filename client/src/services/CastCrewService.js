// Insert post, put, get, delete services here for cast and crew
import { SettingsApplications, SettingsSystemDaydreamTwoTone } from "@mui/icons-material";
import {makeGetRequest} from "../services/service.js"

export const retrieveTotalActors = async () => {
    const result = await makeGetRequest('/api/total_actors');
    console.log(result);
    return result;
};