import { apiService } from "../../apiCall";

export const fetchLaunchers = () => {
    return apiService({
        token: false,
        url: '/users',
        method: 'get',
    });
};
