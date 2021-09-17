import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";
import { Button, Text, View } from "../../Themed";
import Colors from "../../../constants/Colors";
import { LIGHT, ThemeScheme } from "../../../types";

const thanksAnimation_light = require("../../../assets/animations/thanksAnimtaion.json");
const thanksAnimation_dark = require("../../../assets/animations/lf30_editor_pfhhzoyg.json");

type Props = {
   gotoHome: () => void;
   gotoReport: () => void;
   theme: ThemeScheme;
};

function Complete({ gotoHome, gotoReport, theme }: Props) {
   return (
      <View style={styles.container}>
         <View style={styles.lottieContainer}>
            <LottieView
               source={thanksAnimation_light}
               autoPlay={true}
               loop={true}
               speed={1}
            />
         </View>
         <View style={styles.goBackContainer}>
            <Button
               title="홈으로"
               containerStyle={styles.buttonContainer}
               onPress={gotoHome}
               color={Colors.colorSet.stBlue}
            />
            <Button
               title="다시 요청"
               containerStyle={styles.buttonContainer}
               onPress={gotoReport}
               color={Colors.colorSet.stGray}
            />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   lottieContainer: {
      width: "100%",
      height: "70%",
      right: 10,
   },
   goBackContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "100%",
      alignItems: "center",
   },
   buttonContainer: {
      width: 100,
   },
});

export default Complete;
