// Insert post, put, get, delete services here for movies
import {makeGetRequest} from "../services/service.js"

export const retrieveTotalMovies = async () => {
    const result = await makeGetRequest('/api/total_movies');
    console.log(result);
    return result;
};