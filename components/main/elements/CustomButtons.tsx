import React from "react";
import { StyleSheet } from "react-native";
import { ButtonProps, SpeedDialProps } from "react-native-elements";
import { FLOATING_BUTTON_WIDTH } from "../../../constants/Size";
import {
   Button,
   SpeedDial,
   ThemedButtonProps,
   ThemedSpeedDialProps,
} from "../../Themed";

export function FloatingButton({ color, ...otherProps }: ThemedButtonProps) {
   return (
      <Button
         containerStyle={styles.buttonContainer}
         buttonStyle={[styles.buttonStyle]}
         color={color}
         raised
         {...otherProps}
      />
   );
}

export function CustomSpeedDial({
   color,
   actions,
   buttonStyle,
   containerStyle,
   ...otherProps
}: ThemedSpeedDialProps) {
   return (
      <SpeedDial
         buttonStyle={[styles.buttonStyle, buttonStyle]}
         containerStyle={[styles.buttonContainer, containerStyle]}
         color={color}
         actions={actions?.map((item) => ({
            ...item,
            containerStyle: [styles.actionButtonContainer, item.containerStyle],
            buttonStyle: [styles.actionButtonStyle, item.buttonStyle],
         }))}
         raised
         {...otherProps}
      />
   );
}

const styles = StyleSheet.create({
   buttonContainer: {
      width: FLOATING_BUTTON_WIDTH,
      height: FLOATING_BUTTON_WIDTH,
      borderRadius: 30,
      overflow: "hidden",
   },
   buttonStyle: {
      width: FLOATING_BUTTON_WIDTH,
      height: FLOATING_BUTTON_WIDTH,
      borderRadius: 30,
   },
   actionButtonContainer: {
      width: FLOATING_BUTTON_WIDTH - 5,
      height: FLOATING_BUTTON_WIDTH - 5,
      borderRadius: 30,
      overflow: "hidden",
   },
   actionButtonStyle: {
      width: FLOATING_BUTTON_WIDTH - 5,
      height: FLOATING_BUTTON_WIDTH - 5,
      borderRadius: 30,
   },
});
