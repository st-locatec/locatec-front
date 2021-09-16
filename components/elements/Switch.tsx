import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Switch as DefaultSwitch } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { setTheme } from "../../modules/theme";
import { DARK, LIGHT, ThemeScheme } from "../../types";

export default function Switch() {
   const [value, setValue] = useState(true);
   const theme = useSelector(({ theme }: RootState) => theme);
   const dispatch = useDispatch();

   useEffect(() => {
      if (theme === DARK) {
         setValue(false);
      }
   }, []);

   const onPress = async (v: boolean) => {
      setValue(v);
      let theme: ThemeScheme = LIGHT;
      if (!v) {
         theme = DARK;
      }
      await AsyncStorage.setItem("theme", theme);
      dispatch(setTheme(theme));
   };

   return <DefaultSwitch value={value} onValueChange={onPress} />;
}
