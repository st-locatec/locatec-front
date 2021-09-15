import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";
import { Button, Text, View } from "../../Themed";
import Colors from "../../../constants/Colors";

type Props = {
   gotoHome: () => void;
   gotoReport: () => void;
};

function Complete({ gotoHome, gotoReport }: Props) {
   return (
      <View style={styles.container}>
         <View style={styles.lottieContainer}>
            <LottieView
               source={require("../../../assets/animations/thanksAnimtaion.json")}
               autoPlay={true}
               loop={true}
               speed={1.5}
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
