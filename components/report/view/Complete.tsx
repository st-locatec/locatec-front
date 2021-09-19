import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";
import { Button, Text, View } from "../../Themed";
import Colors from "../../../constants/Colors";
import { LIGHT, ThemeScheme } from "../../../types";

const completion_animation = require("../../../assets/animations/completion.json");
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
               source={completion_animation}
               autoPlay={true}
               loop={true}
               style={{ width: 300, height: 225 }}
            />
            <View style={styles.textContainer}>
               <Text style={{ fontSize: 20, marginBottom: 20 }}>
                  이용해주셔서 감사합니다.
               </Text>
               <Text style={{ fontSize: 20 }}>
                  해당 요청은 관리자 검토 후 반영됩니다.
               </Text>
            </View>
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
      height: "80%",
      justifyContent: "center",
      alignItems: "center",
      right: 10,
   },
   textContainer: {
      width: "100%",
      alignItems: "center",
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
