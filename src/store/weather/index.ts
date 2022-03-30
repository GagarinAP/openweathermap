import { createAsyncAction, createAction, createReducer } from "typesafe-actions";
import produce from "immer";
import { Payload, RootState } from "../";
import { Action } from "redux";
import { CurrentProps, ForecastProps, GetCurrentProps, GetForecastProps, initialCurrent, initialForecast } from "./types";

type STATE = {
    current: CurrentProps;
    currentLoading: boolean;
    currentError: boolean;
    forecast: ForecastProps;
    forecastLoading: boolean;
    forecastError: boolean;
};

const INITIAL_STATE: STATE = {
    current: initialCurrent,
    currentLoading: false,
    currentError: false,
    forecast: initialForecast,
    forecastLoading: false,
    forecastError: false,
};

export const selectCurrentWeather = (state: RootState) => state.weather.current;
export const selectForecastWeather = (state: RootState) => state.weather.forecast;
export const selectCurrentWeatherLoading = (state: RootState) => state.weather.currentLoading;
export const selectForecastWeatherLoading = (state: RootState) => state.weather.forecastLoading;

export const getCurrentWeather = createAction("WEATHER/GET_CURRENT", (e: GetCurrentProps) => e)();

export const setCurrentWeather = createAsyncAction(
    "WEATHER/SET_CURRENT_REQUEST",
    "WEATHER/SET_CURRENT_SUCCESS",
    "WEATHER/SET_CURRENT_FAILURE",
)<boolean, CurrentProps, boolean>();

export const getForecastWeather = createAction("WEATHER/GET_FORECAST", (e: GetForecastProps) => e)();

export const setForecastWeather = createAsyncAction(
    "WEATHER/SET_FORECAST_REQUEST",
    "WEATHER/SET_FORECAST_SUCCESS",
    "WEATHER/SET_FORECAST_FAILURE",
)<boolean, ForecastProps, boolean>();

export default createReducer<STATE, Action>(INITIAL_STATE)
    .handleAction(
        setCurrentWeather.request,
        produce<STATE, Payload<boolean>>((state, { payload }) => {
            state.currentLoading = payload;
        }),
    )
    .handleAction(
        setCurrentWeather.success,
        produce<STATE, Payload<CurrentProps>>((state, { payload }) => {
            state.current = payload;
        }),
    )
    .handleAction(
        setCurrentWeather.failure,
        produce<STATE, Payload<boolean>>((state, { payload }) => {
            state.currentError = payload;
        }),
    )
    .handleAction(
        setForecastWeather.request,
        produce<STATE, Payload<boolean>>((state, { payload }) => {
            state.forecastLoading = payload;
        }),
    )
    .handleAction(
        setForecastWeather.success,
        produce<STATE, Payload<ForecastProps>>((state, { payload }) => {
            state.forecast = payload;
        }),
    )
    .handleAction(
        setForecastWeather.failure,
        produce<STATE, Payload<boolean>>((state, { payload }) => {
            state.forecastError = payload;
        }),
    );
