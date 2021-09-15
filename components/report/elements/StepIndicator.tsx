import React from "react";
import { StyleSheet, View, Text } from "react-native";

import DefaultStepIndicator from "react-native-step-indicator";
import { report_stepIndicator } from "../../../constants/Strings";

type Props = {
   position: number;
};

const labels: string[] = report_stepIndicator;

const customStyles = {
   stepStrokeFinishedColor: "#2196f3",
   stepIndicatorLabelFinishedColor: "#ffffff",
   separatorFinishedColor: "#2196f3",
   stepIndicatorFinishedColor: "#2196f3",

   stepStrokeWidth: 3,
   stepStrokeCurrentColor: "#2196f3",
   stepIndicatorCurrentColor: "#ffffff",
   stepIndicatorLabelCurrentColor: "#2196f3",
   currentStepLabelColor: "#2196f3",

   stepStrokeUnFinishedColor: "#aaaaaa",
   separatorUnFinishedColor: "#aaaaaa",
   stepIndicatorUnFinishedColor: "#ffffff",
   stepIndicatorLabelUnFinishedColor: "#aaaaaa",
   labelColor: "#999999",
};

function StepIndicator({ position }: Props) {
   return (
      <View style={{ height: 100, margin: 10 }}>
         <DefaultStepIndicator
            customStyles={customStyles}
            currentPosition={position}
            labels={labels}
            stepCount={labels.length}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
});

export default StepIndicator;
