import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { FLOATING_BUTTON_WIDTH } from "../../../constants/Size";

export default function FloatingButton() {
   return (
      <Button
         title="추가"
         type="outline"
         containerStyle={styles.buttonContainer}
         buttonStyle={styles.buttonStyle}
      />
   );
}

const styles = StyleSheet.create({
   buttonContainer: {
      zIndex: 10,
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
});
