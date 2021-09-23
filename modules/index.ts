import { combineReducers } from "redux";
import loading from "./loading";
import theme from "./theme";
import markers from "./markers";

// redux reducer 결합
const rootReducer = combineReducers({ loading, theme, markers });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
