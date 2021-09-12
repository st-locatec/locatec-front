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
import { Icon } from "react-native-elements";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
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
            component={TabOneScreen}
            options={({ navigation }: RootStackScreenProps<"Root">) => ({
               title: "앱 이름",
               headerRight: () => (
                  <Icon
                     name="plus"
                     size={25}
                     type="font-awesome"
                     color={Colors[colorScheme].text}
                     style={{ marginRight: 15 }}
                     onPress={() => navigation.navigate("Report")}
                  />
               ),
            })}
         />
         <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: "Oops!" }}
         />
         <Stack.Screen
            name="Report"
            component={ModalScreen}
            options={{
               title: "추가 요청",
            }}
         />
      </Stack.Navigator>
   );
}
