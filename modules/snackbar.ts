const SNACKBAR = "snackbar/SNACKBAR" as const;
const CLEAR = "snackbar/CLEAR" as const;

export type SnackbarState = {
   visible: boolean;
   snackbar: string;
};

export const setSnackbar = (payload: SnackbarState) => ({
   type: SNACKBAR,
   payload: payload,
});
export const clearSnackbar = () => ({ type: CLEAR });

type SnackbarAction =
   | ReturnType<typeof setSnackbar>
   | ReturnType<typeof clearSnackbar>;

const initialState: SnackbarState = {
   visible: false,
   snackbar: "",
};

function snackbarReducer(
   state: SnackbarState = initialState,
   action: SnackbarAction
): SnackbarState {
   switch (action.type) {
      case SNACKBAR:
         return action.payload;
      case CLEAR:
         return initialState;
      default:
         return state;
   }
}

export default snackbarReducer;
