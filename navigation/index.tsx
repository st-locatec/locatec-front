import {
   NavigationContainer,
   DefaultTheme,
   DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import ReportScreen from "../screens/ReportScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import MainScreen from "../screens/MainScreen";
import { DARK, RootStackParamList, ThemeScheme } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { appName } from "../constants/Strings";
import Switch from "../components/elements/Switch";

export default function Navigation({
   colorScheme,
}: {
   colorScheme: ThemeScheme;
}) {
   return (
      <NavigationContainer
         linking={LinkingConfiguration}
         theme={colorScheme === DARK ? DarkTheme : DefaultTheme}>
         <RootNavigator />
      </NavigationContainer>
   );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
   return (
      <Stack.Navigator>
         <Stack.Screen
            name="Main"
            component={MainScreen}
            options={() => ({
               title: appName,
               headerRight: () => <Switch />,
            })}
         />
         <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: "여긴 어디?" }}
         />
         <Stack.Screen
            name="Report"
            component={ReportScreen}
            options={{
               title: "추가 요청",
               headerTitleStyle: { fontFamily: "notosans" },
            }}
         />
      </Stack.Navigator>
   );
}
