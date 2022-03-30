import { call, put, takeLatest } from "redux-saga/effects";
import {
    getCurrentWeather,
    setCurrentWeather,
    getForecastWeather,
    setForecastWeather,
} from "./index";
import { api } from "../api";
import API from "../../../constants";
import { GetCurrentProps, GetForecastProps } from "./types";

function* currentWeatherSaga({ payload }: { payload: GetCurrentProps }) {
    try {
        yield put(setCurrentWeather.request(true));
        let params = {
            appid: API.API_KEY,
            units: "metric",
            q: payload?.q,
            lat: payload?.lat,
            lon: payload?.lon,
        }
        const { data } = yield call(() => api.get(`data/${API.API_VERSION}/weather`, { params }));
        yield put(setCurrentWeather.success({ name: data.name, temp: data.main.temp }));
        yield forecastWeatherSaga({ payload: { lat: data.coord.lat, lon: data.coord.lon } })
    } catch (error) {
        yield put(setCurrentWeather.failure(true));
    } finally {
        yield put(setCurrentWeather.request(false));
    }
}

function* forecastWeatherSaga({ payload }: { payload: GetForecastProps }) {
    try {
        yield put(setForecastWeather.request(true));
        let params = {
            appid: API.API_KEY,
            units: "metric",
            lat: payload.lat,
            lon: payload.lon,
        }
        const { data } = yield call(() => api.get(`data/${API.API_VERSION}/onecall`, { params }));
        yield put(setForecastWeather.success(data));
    } catch (error) {
        yield put(setForecastWeather.failure(true));
    } finally {
        yield put(setForecastWeather.request(false));
    }
}

export default function* root() {
    yield takeLatest(getCurrentWeather, currentWeatherSaga);
    yield takeLatest(getForecastWeather, forecastWeatherSaga);
}
