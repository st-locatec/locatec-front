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
   ListItemProps,
   ListItem as DefaultListItem,
   IconProps,
   Icon as DefaultIcon,
} from "react-native-elements";
import {
   MenuItemProps,
   MenuItem as DefaultMenuItem,
} from "react-native-material-menu";
import { useSelector } from "react-redux";

import Colors from "../constants/Colors";
import { RootState } from "../modules";

export function useThemeColor(
   props: { light?: string; dark?: string },
   colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
   const theme = useSelector(({ theme }: RootState) => theme);
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
export type ThemedListItem = ThemeProps & ListItemProps;
export type ThemedIcon = ThemeProps & IconProps;
export type ThemedMenuItem = ThemeProps & MenuItemProps;

export function Text(props: TextProps) {
   const { style, lightColor, darkColor, ...otherProps } = props;
   const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

   return (
      <DefaultText
         style={[{ color }, style, { fontFamily: "notosans" }]}
         {...otherProps}
      />
   );
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
   const {
      lightColor,
      darkColor,
      color,
      buttonStyle,
      type,
      titleStyle,
      ...otherProps
   } = props;
   const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "buttonBackground"
   );
   const titleColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "buttonTitle"
   );

   const font = {
      fontFamily: "notosans",
   };

   return (
      <DefaultButton
         type={type}
         titleStyle={[font, titleStyle]}
         {...(() => {
            if (type === "clear") {
               return {
                  titleStyle: [{ color: titleColor, ...font }, titleStyle],
               };
            } else {
               return {
                  buttonStyle: [
                     buttonStyle,
                     {
                        backgroundColor: color ? color : backgroundColor,
                        height: 50,
                     },
                  ],
               };
            }
         })()}
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

export function ListItem(props: ThemedListItem) {
   const { lightColor, darkColor, containerStyle, children, ...otherProps } =
      props;

   const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "background"
   );

   return (
      <DefaultListItem
         containerStyle={[containerStyle, { backgroundColor: backgroundColor }]}
         {...otherProps}>
         {children}
      </DefaultListItem>
   );
}

export function Icon(props: ThemedIcon) {
   const { lightColor, darkColor, ...otherProps } = props;

   const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
   return <DefaultIcon color={color} {...otherProps} />;
}

export function MenuItem(props: ThemedMenuItem) {
   const { lightColor, darkColor, children, ...otherProps } = props;

   const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "background"
   );
   const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

   return (
      <DefaultMenuItem
         style={{
            backgroundColor: backgroundColor,
         }}
         textStyle={{ color: color }}
         {...otherProps}>
         {children}
      </DefaultMenuItem>
   );
}
