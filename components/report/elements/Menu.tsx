import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Menu as DefaultMenu } from "react-native-material-menu";
import Colors from "../../../constants/Colors";
import { locStrArray } from "../../../constants/Strings";
import { LocationType } from "../../../types";
import mapLocTypeToStr, {
   mapStrToLocType,
} from "../../../utils/mapLocTypeToStr";
import { Icon, View, Text, MenuItem } from "../../Themed";

type Props = {
   locationType: LocationType;
   settingLocationType: (v: LocationType) => void;
};

function Menu({ locationType, settingLocationType }: Props) {
   // 메뉴 보여줄지 말지를 저장하는 상태
   const [visible, setVisible] = useState(false);

   // 메뉴 닫는 콜백
   // type이 들어있으면 locationType를 설정하고 닫는다.
   const hideMenu = (type?: LocationType) => {
      setVisible(false);
      if (type) {
         settingLocationType(type);
      }
   };
   const showMenu = () => setVisible(true);

   return (
      <DefaultMenu
         visible={visible}
         anchor={
            <View style={styles.anchorContainer}>
               <Pressable style={styles.anchorStyle} onPress={showMenu}>
                  <Text>{mapLocTypeToStr(locationType)}</Text>
                  <Icon name="sort-down" type="font-awesome" size={10} />
               </Pressable>
            </View>
         }
         style={styles.menuStyle}
         onRequestClose={hideMenu}>
         <View
            style={{
               borderWidth: 1,
               borderColor: Colors.colorSet.stGray,
            }}>
            {locStrArray.map((item, idx) => (
               <MenuItem
                  key={idx}
                  onPress={() => hideMenu(mapStrToLocType(item))}>
                  {item}
               </MenuItem>
            ))}
         </View>
      </DefaultMenu>
   );
}

const styles = StyleSheet.create({
   anchorContainer: {
      width: 150,
      height: "100%",
      borderWidth: 1,
      borderColor: Colors.colorSet.stGray,
   },
   anchorStyle: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      height: "100%",
   },
   menuStyle: {
      width: 150,
   },
});

export default Menu;
