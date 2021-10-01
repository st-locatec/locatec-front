import { combineReducers } from "redux";
import loading from "./loading";
import theme from "./theme";
import markers from "./markers";
import snackbar from "./snackbar";
import myLocation from "./myLocation";

// redux reducer 결합
const rootReducer = combineReducers({
   loading,
   theme,
   markers,
   snackbar,
   myLocation,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
