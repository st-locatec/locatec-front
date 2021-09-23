import { Alert as DefaultAlert } from "react-native";
import { NO, YES } from "../../constants/Strings";

// native 환경에서 사용되는 Alert
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
