import React from "react";
import { StyleSheet, View, Text } from "react-native";

import DefaultStepIndicator from "react-native-step-indicator";
import useLayout from "../../../hooks/useLayout";
import { WEB_REPORT_CONTENT_WIDTH } from "../../../constants/Size";
import { report_stepIndicator } from "../../../constants/Strings";
import { isWeb } from "../../../constants/Constants";

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
   const layout = useLayout();
   return (
      <View
         style={{
            width: isWeb
               ? layout.isSmallDevice
                  ? layout.window.width
                  : WEB_REPORT_CONTENT_WIDTH
               : "100%",
            height: 70,
            marginTop: 20,
            marginBottom: 0,
         }}>
         <DefaultStepIndicator
            customStyles={customStyles}
            currentPosition={position}
            labels={labels}
            stepCount={labels.length}
         />
      </View>
   );
}

export default StepIndicator;
