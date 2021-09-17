import { DARK, LIGHT, ThemeScheme } from "../types";

const SET_THEME = "theme/SET_THEME" as const;

export const setTheme = (theme: string) => ({
   type: SET_THEME,
   value: theme !== LIGHT ? (theme !== DARK ? LIGHT : DARK) : LIGHT,
});

const initialState: ThemeScheme = LIGHT;
export type themeState = ThemeScheme;

type ThemeAction = ReturnType<typeof setTheme>;

export default function themeReducer(
   state: ThemeScheme = initialState,
   action: ThemeAction
): themeState {
   switch (action.type) {
      case SET_THEME:
         return action.value;
      default:
         return state;
   }
}
