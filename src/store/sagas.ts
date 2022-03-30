import { all, fork } from "redux-saga/effects";
import weatherSagas from "./weather/sagas";

const rootSagas = function* () {
    yield all([
        fork(weatherSagas),
    ]);
};

export default rootSagas;