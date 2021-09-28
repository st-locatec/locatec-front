import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setTheme } from "./modules/theme";
import { LIGHT } from "./types";
import { View, ViewProps } from "./components/Themed";
import { setMarkers } from "./modules/markers";
import { getWholeListApi } from "./api/wholeList";
import { NO_DATA } from "./api/serverError";

function AppInit({ children }: ViewProps) {
   const [isLoadingComplete, setLoadingComplete] = useState(false); // 로딩 상태
   const dispatch = useDispatch(); // 리덕스 action 디스패치 함수

   const loadResourcesAndDataAsync = async () => {
      try {
         // 폰트 로드
         await Font.loadAsync({
            notosans: require("./assets/fonts/NotoSansKR-Regular.otf"),
         });

         // 테마 읽기.
         let theme = await AsyncStorage.getItem("theme");
         if (!theme) {
            await AsyncStorage.setItem("theme", LIGHT);
            theme = LIGHT;
         }
         dispatch(setTheme(theme));

         // 위치 데이터 불러들이기.
         const res = await getWholeListApi();
         if (res.response !== NO_DATA) {
            const processed = res.response.map((item) => ({
               type: item.type,
               coords: {
                  latitude: parseFloat(item.latitude),
                  longitude: parseFloat(item.longitude),
               },
               image: item.imageUrl,
            }));
            dispatch(setMarkers(processed));
         }
      } catch (e) {
         console.log(e);
      }
   };

   const onFinish = () => setLoadingComplete(true);

   // 로딩 중일땐 AppLoading을 렌더.
   // AppLoading은 startAsync 함수가 완료될때까지 splash 화면을 렌더한다.
   // 완료시에는 onFinish를 호출하여 isLoadingComplete 상태를 true로 바꾼다.
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
