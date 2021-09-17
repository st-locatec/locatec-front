import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppInit from "./AppInit";
import Navigation from "./navigation";

import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { Provider, useSelector } from "react-redux";
import rootReducer, { rootSaga, RootState } from "./modules";
import logger from "redux-logger";
import Loading from "./components/Loading";
import { DARK, LIGHT } from "./types";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);
sagaMiddleware.run(rootSaga);

export default function RootApp() {
   return (
      <SafeAreaProvider>
         <Provider store={store}>
            <App />
         </Provider>
      </SafeAreaProvider>
   );
}

export function App() {
   const colorScheme = useSelector(({ theme }: RootState) => theme);

   return (
      <AppInit>
         <Navigation colorScheme={colorScheme} />
         <Loading />
         <StatusBar style={colorScheme === LIGHT ? DARK : LIGHT} />
      </AppInit>
   );
}
