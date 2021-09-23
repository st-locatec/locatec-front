import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import loading from "./loading";
import theme from "./theme";

// redux reducer 결합
const rootReducer = combineReducers({ loading, theme });

export function* rootSaga() {
   yield all([]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
