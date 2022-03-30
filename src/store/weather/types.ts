import {getCurrentWeather} from "./index";

export type WeatherItem = {
    description: string;
    icon: string;
    id: number;
    main: string;
};

export type TempItem = {
    day: number;
    eve: number;
    max?: number;
    min?: number;
    morn: number;
    night: number;
};

export type CurrentProps = {
    name: string;
    temp: number;
};

export type ForecastProps = {
    current: {
        clouds: number;
        dew_point: number;
        dt: number;
        feels_like: number;
        humidity: number;
        pressure: number;
        sunrise: number;
        sunset: number;
        temp: number;
        uvi: number;
        visibility: number;
        weather: Array<WeatherItem>;
        wind_deg: number;
        wind_gust: number;
        wind_speed: number;
    };
    daily: Array<{
        clouds: number;
        dew_point: number;
        dt: number;
        feels_like: TempItem;
        humidity: number;
        moon_phase: number;
        moonrise: number;
        moonset: number;
        pop: number;
        pressure: number;
        sunrise: number;
        sunset: number;
        temp: TempItem;
        uvi: number;
        weather: Array<WeatherItem>;
        wind_deg: number;
        wind_gust: number;
        wind_speed: number;
    }>;
    hourly: Array<{
        clouds: number;
        dew_point: number;
        dt: number;
        feels_like: number;
        humidity: number;
        pop: number;
        pressure: number;
        temp: number;
        uvi: number;
        visibility: number;
        weather: Array<WeatherItem>;
        wind_deg: number;
        wind_gust: number;
        wind_speed: number;
    }>;
    lat: number;
    lon: number;
    minutely: Array<{
        dt: number;
        precipitation: number;
    }>;
    timezone: string;
    timezone_offset: number;
};

export type GetCurrentProps = { q?: string; lat?: number; lon?: number };

export type GetForecastProps = { lat: number; lon: number };

export const initialCurrent = {
    name: "",
    temp: 0,
};

export const initialForecast = {
    current: {
        clouds: 0,
        dew_point: 0,
        dt: 0,
        feels_like: 0,
        humidity: 0,
        pressure: 0,
        sunrise: 0,
        sunset: 0,
        temp: 0,
        uvi: 0,
        visibility: 0,
        weather: [{
            description: "",
            icon: "",
            id: 0,
            main: "",
        }],
        wind_deg: 0,
        wind_gust: 0,
        wind_speed: 0,
    },
    daily: [{
        clouds: 0,
        dew_point: 0,
        dt: 0,
        feels_like: {
            day: 0,
            eve: 0,
            morn: 0,
            night: 0,
        },
        humidity: 0,
        moon_phase: 0,
        moonrise: 0,
        moonset: 0,
        pop: 0,
        pressure: 0,
        sunrise: 0,
        sunset: 0,
        temp: {
            day: 0,
            eve: 0,
            max: 0,
            min: 0,
            morn: 0,
            night: 0,
        },
        uvi: 0,
        weather: [{
            description: "",
            icon: "",
            id: 0,
            main: "",
        }],
        wind_deg: 0,
        wind_gust: 0,
        wind_speed: 0,
    }],
    hourly: [{
        clouds: 0,
        dew_point: 0,
        dt: 0,
        feels_like: 0,
        humidity: 0,
        pop: 0,
        pressure: 0,
        temp: 0,
        uvi: 0,
        visibility: 0,
        weather: [{
            description: "",
            icon: "",
            id: 0,
            main: "",
        }],
        wind_deg: 0,
        wind_gust: 0,
        wind_speed: 0,
    }],
    lat: 0,
    lon: 0,
    minutely: [{
        dt: 0,
        precipitation: 0,
    }],
    timezone: "",
    timezone_offset: 0,
};
