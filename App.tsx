import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import rootReducer, { rootSaga } from "./modules";
import logger from "redux-logger";
import Loading from "./components/Loading";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);
sagaMiddleware.run(rootSaga);

export default function App() {
   const isLoadingComplete = useCachedResources();
   const colorScheme = useColorScheme();

   if (!isLoadingComplete) {
      return null;
   } else {
      return (
         <SafeAreaProvider>
            <Provider store={store}>
               <Navigation colorScheme={colorScheme} />
               <Loading />
            </Provider>
            <StatusBar />
         </SafeAreaProvider>
      );
   }
}
