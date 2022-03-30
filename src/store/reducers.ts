import { combineReducers } from "redux";

import ThemeReducer from "./theme";
import WeatherReducer from "./weather";
import LocationReducer from "./location";

export const RootReducer = combineReducers({
    theme: ThemeReducer,
    location: LocationReducer,
    weather: WeatherReducer,
});
