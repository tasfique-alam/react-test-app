import { apiService } from "../../apiCall";

export const fetchLaunchers = () => {
    return apiService({
        token: true,
        url: '/launches',
        method: 'get',
    });
};
