const LOADING = "loading/LOADING" as const;
const UNLOADING = "loading/UNLOADING" as const;

export const loading = () => ({ type: LOADING });
export const unloading = () => ({ type: UNLOADING });

type LoadingAction = ReturnType<typeof loading> | ReturnType<typeof unloading>;

export type LoadingState = boolean;

const initialState: LoadingState = false;

function loadingReducer(
   state: LoadingState = initialState,
   action: LoadingAction
): LoadingState {
   switch (action.type) {
      case LOADING:
         return true;
      case UNLOADING:
         return false;
      default:
         return state;
   }
}

export default loadingReducer;
