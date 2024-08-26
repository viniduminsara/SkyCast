import axios from "axios";

export const apiCall = async (endpoint: string) => {
    const options = {
        method: 'GET',
        url: endpoint
    }

    try {
        const response = await axios.request(options);
        return response.data;
    }catch (err){
        console.log('error: ', err);
        return null;
    }
}
