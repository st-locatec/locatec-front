import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setTheme } from "../modules/theme";
import { LIGHT } from "../types";

export default function useCachedResources() {
   const [isLoadingComplete, setLoadingComplete] = React.useState(false);
   const dispatch = useDispatch();

   // Load any resources or data that we need prior to rendering the app
   React.useEffect(() => {
      async function loadResourcesAndDataAsync() {
         try {
            SplashScreen.preventAutoHideAsync();

            // Load fonts
            await Font.loadAsync({
               ...FontAwesome.font,
               "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
            });

            // 테마
            let theme = await AsyncStorage.getItem("theme");
            if (!theme) {
               await AsyncStorage.setItem("theme", LIGHT);
               theme = LIGHT;
            }
            dispatch(setTheme(theme));
         } catch (e) {
            // We might want to provide this error information to an error reporting service
            console.warn(e);
         } finally {
            setLoadingComplete(true);
            SplashScreen.hideAsync();
         }
      }

      loadResourcesAndDataAsync();
   }, []);

   return isLoadingComplete;
}
