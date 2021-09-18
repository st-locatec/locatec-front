import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setTheme } from "./modules/theme";
import { LIGHT } from "./types";
import { View, ViewProps } from "./components/Themed";

function AppInit({ children }: ViewProps) {
   const [isLoadingComplete, setLoadingComplete] = useState(false);
   const dispatch = useDispatch();

   const loadResourcesAndDataAsync = async () => {
      try {
         // Load fonts
         await Font.loadAsync({
            notosans: require("./assets/fonts/NotoSansKR-Regular.otf"),
         });

         // 테마
         let theme = await AsyncStorage.getItem("theme");
         if (!theme) {
            await AsyncStorage.setItem("theme", LIGHT);
            theme = LIGHT;
         }
         dispatch(setTheme(theme));
      } catch (e) {
         throw e;
      }
   };

   const onFinish = () => setLoadingComplete(true);

   if (!isLoadingComplete) {
      return (
         <AppLoading
            startAsync={loadResourcesAndDataAsync}
            onFinish={onFinish}
            onError={console.warn}
         />
      );
   }
   return <View style={{ height: "100%", width: "100%" }}>{children}</View>;
}

export default AppInit;
