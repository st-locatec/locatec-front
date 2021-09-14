/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from "react";
import { Text as DefaultText, View as DefaultView } from "react-native";
import {
   ButtonProps,
   Button as DefaultButton,
   SpeedDialProps,
   SpeedDial as DefaultSpeedDial,
} from "react-native-elements";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export function useThemeColor(
   props: { light?: string; dark?: string },
   colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
   const theme = useColorScheme();
   const colorFromProps = props[theme];

   if (colorFromProps) {
      return colorFromProps;
   } else {
      return Colors[theme][colorName];
   }
}

type ThemeProps = {
   lightColor?: string;
   darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type ThemedButtonProps = ThemeProps & ButtonProps & { color?: string };
export type ThemedSpeedDialProps = ThemeProps &
   SpeedDialProps & { color?: string; actions?: ButtonProps[] };

export function Text(props: TextProps) {
   const { style, lightColor, darkColor, ...otherProps } = props;
   const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

   return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
   const { style, lightColor, darkColor, ...otherProps } = props;
   const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "background"
   );

   return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Button(props: ThemedButtonProps) {
   const { lightColor, darkColor, color, buttonStyle, ...otherProps } = props;
   const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "buttonBackground"
   );

   return (
      <DefaultButton
         buttonStyle={[
            buttonStyle,
            { backgroundColor: color ? color : backgroundColor },
         ]}
         {...otherProps}
      />
   );
}

export function SpeedDial(props: ThemedSpeedDialProps) {
   const {
      style,
      lightColor,
      darkColor,
      color,
      buttonStyle,
      containerStyle,
      actions,
      ...otherProps
   } = props;

   const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "buttonBackground"
   );

   return (
      <DefaultSpeedDial
         buttonStyle={[
            buttonStyle,
            { backgroundColor: color ? color : backgroundColor },
         ]}
         containerStyle={containerStyle}
         style={style}
         {...otherProps}>
         {actions?.map((item, idx) => (
            <DefaultSpeedDial.Action
               {...item}
               key={idx}
               buttonStyle={[
                  item.buttonStyle,
                  {
                     backgroundColor: color ? color : backgroundColor,
                  },
               ]}
               containerStyle={item.containerStyle}
            />
         ))}
      </DefaultSpeedDial>
   );
}
