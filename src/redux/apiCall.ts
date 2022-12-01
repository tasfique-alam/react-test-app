import axios from 'axios';

export const baseURL = process.env.REACT_APP_BASE_URL;
const defaultInstance = axios.create({ baseURL });
export interface ApiDataType {
    instance?: 'default';
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    url: string;
    data?: any;
    token?: boolean;
    context?: any;
    config?: any;
    headers?: any;
}

export const defaultHeaders = () => ({
    'Content-Type': 'application/json',
    'device-type': 'WEB',
})


defaultInstance.interceptors.request.use(
    async (config) => {
        config.headers = {
            ...config.headers,
        };
        return config;
    },
    (error) => {
        console.error('response in interceptor line number 27', JSON.stringify(error));
        return Promise.reject(error);
    }
);


const httpRequest = async (apiData: ApiDataType) => {
    const {
        instance: instanceName = 'default',
        method,
        url,
        data,
        token = false,
        config,
        headers,
    } = apiData;

    const instance = defaultInstance;

    const defaultConfig = {
        headers: {
            'Content-Type': 'application/json',
            'device-type': 'WEB',
            ...headers,
        },
    };


    switch (method) {
        case 'get':
            return instance.get(url, { ...defaultConfig, ...config });

        case 'post':
            return instance.post(url, data, { ...defaultConfig, ...config });

        case 'put':
            return instance.put(url, data, { ...defaultConfig, ...config });

        case 'patch':
            return instance.patch(url, data, { ...defaultConfig, ...config });

        case 'delete':
            return instance.delete(url, { ...defaultConfig, ...config });

        default:
            break;
    }
};


export const apiService = async (apiData: ApiDataType) => {
    try {
        const { data }: any = await httpRequest(apiData);
        // console.log(`___________DATA 👀 👀 FROM API_SERVICE__________`, data)
        return { success: true, ...data };
    } catch (error: any) {
        // console.log(`___________ERROR 👀 👀 FROM API_SERVICE__________`, error.response)
        return { success: false, ...error.response.data }
    }
};
