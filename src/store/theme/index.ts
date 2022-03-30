import { createAction, createReducer } from "typesafe-actions";
import produce from "immer";
import { Payload, RootState } from "../";
import { Action } from "redux";

type STATE = {
    type: string;
};

const INITIAL_STATE: STATE = {
    type: "light",
};

export const selectThemeType = (state: RootState) => state.theme.type;

export const setThemeType = createAction("THEME/SET_TYPE", (type: string) => type)();

export default createReducer<STATE, Action>(INITIAL_STATE)
    .handleAction(
        setThemeType,
        produce<STATE, Payload<string>>((state, { payload }) => {
            state.type = payload;
        }),
    );
