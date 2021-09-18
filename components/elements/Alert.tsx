import { Alert as DefaultAlert } from "react-native";
import { NO, YES } from "../../constants/Strings";

export default function Alert(
   title: string,
   desc: string,
   onNegativePress = () => {},
   onPositivePress = () => {}
) {
   DefaultAlert.alert(
      title,
      desc,
      [
         { text: NO, onPress: () => onNegativePress() },
         { text: YES, onPress: () => onPositivePress() },
      ],
      { cancelable: false }
   );
}
