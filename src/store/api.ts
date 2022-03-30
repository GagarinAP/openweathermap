import API from "../../constants";
import axios, { AxiosError, AxiosResponse } from "axios";
import type { Store } from "redux";
import { RootState } from "./";

export const api = axios.create({ baseURL: API.API_URL, timeout: API.API_TIMEOUT });

export const initAPI = (store: Store<RootState>) => {
    api.interceptors.request.use(async (config) => {
        return config;
    });

    api.interceptors.response.use(
        (response: AxiosResponse) => {
            if ("data" in response) {
                return response;
            }
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        },
    );
};
