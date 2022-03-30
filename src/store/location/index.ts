import { createAction, createReducer } from "typesafe-actions";
import produce from "immer";
import { Payload, RootState } from "../";
import { Action } from "redux";

export type CoordsProps = {
    latitude: null | number;
    longitude: null | number;
}

const INITIAL_STATE: CoordsProps = {
    latitude: null,
    longitude: null,
};

export const selectGeoLocation = (state: RootState) => state.location;

export const setGeoLocation = createAction("LOCATION/SET_GEOLOCATION", (coords: CoordsProps) => coords)();

export default createReducer<CoordsProps, Action>(INITIAL_STATE)
    .handleAction(
        setGeoLocation,
        produce<CoordsProps, Payload<CoordsProps>>((state, { payload }) => {
            state.longitude = payload.longitude;
            state.latitude = payload.latitude;
        }),
    );
