/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
   NavigationContainer,
   DefaultTheme,
   DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import { Switch } from "react-native-elements";

import useColorScheme from "../hooks/useColorScheme";
import ReportScreen from "../screens/ReportScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import MainScreen from "../screens/MainScreen";
import { RootStackParamList, RootStackScreenProps } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
   colorScheme,
}: {
   colorScheme: ColorSchemeName;
}) {
   return (
      <NavigationContainer
         linking={LinkingConfiguration}
         theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
         <RootNavigator />
      </NavigationContainer>
   );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
   const colorScheme = useColorScheme();
   return (
      <Stack.Navigator>
         <Stack.Screen
            name="Root"
            component={MainScreen}
            options={() => ({
               title: "앱 이름",
               headerRight: () => <Switch value={true} />,
            })}
         />
         <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: "Oops!" }}
         />
         <Stack.Screen
            name="Report"
            component={ReportScreen}
            options={{
               title: "추가 요청",
            }}
         />
      </Stack.Navigator>
   );
}
