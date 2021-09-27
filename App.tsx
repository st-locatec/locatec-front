import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppInit from "./AppInit";
import Navigation from "./navigation";

import Loading from "./components/elements/Loading";
import SnackBar from "rn-animated-snackbar";
import { DARK, LIGHT } from "./types";

// 리덕스 관련
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider, useDispatch, useSelector } from "react-redux";
import logger from "redux-logger";
import rootReducer, { RootState } from "./modules";
import { clearSnackbar } from "./modules/snackbar";

// 리덕스 사용
const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(logger))
);

// 루트 앱. 전체 영역을 감싸고, 리덕스 Provider 적용.
// 이 아래에선 리덕스 사용을 위해 RootApp과 App 분리
export default function RootApp() {
   return (
      <SafeAreaProvider style={{ flex: 1 }}>
         <Provider store={store}>
            <App />
         </Provider>
      </SafeAreaProvider>
   );
}

export function App() {
   // 리덕스 store에서 theme 가져와서 navigation, statusBar에 적용.
   const colorScheme = useSelector(({ theme }: RootState) => theme);
   // 리덕스 store에서 snackbar 상태 가져오기
   const snackbarState = useSelector(({ snackbar }: RootState) => snackbar);

   const dispatch = useDispatch();

   /* 
      AppInit으로 감싸서 초기화 작업 하기.
      초기화 작업으로는 폰트, 테마, 데이터를 로드함.
      
      Navigation 안에서 각 화면을 navigate 함.

      Loading 은 loading 상태를 전역으로 관리하기 위해 
      리덕스를 사용할 수 있는 가장 최상위단인 이곳에 삽입함.

      Snackbar은 각종 알림 메세지를 하단에 띄우는 것으로
      이것 또한 이곳에 삽입하여 어디서든 편하게 사용할 수 있도록함.
   */
   return (
      <AppInit>
         <Navigation colorScheme={colorScheme} />
         <Loading />
         <SnackBar
            visible={Boolean(snackbarState)}
            onDismiss={() => dispatch(clearSnackbar())}
            text={snackbarState}
            duration={3000}
            containerStyle={{
               position: "absolute",
               bottom: 50,
               left: 10,
               width: "60%",
               zIndex: 200,
               borderRadius: 20,
            }}
         />
         <StatusBar style={colorScheme === LIGHT ? DARK : LIGHT} />
      </AppInit>
   );
}
