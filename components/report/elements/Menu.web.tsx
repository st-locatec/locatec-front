import React from "react";
import { StyleSheet } from "react-native";
import { Tooltip } from "react-native-elements";
import Colors from "../../../constants/Colors";
import { locStrArray } from "../../../constants/Strings";
import { LocationType } from "../../../types";
import mapLocTypeToStr, {
   mapStrToLocType,
} from "../../../utils/mapLocTypeToStr";
import { View, Text, ListItem, Icon } from "../../Themed";
import Modal from "modal-react-native-web";
import { MENU_ITEM_HEIGHT, MENU_ITEM_WIDTH } from "../../../constants/Size";

type Props = {
   locationType: LocationType;
   settingLocationType: (v: LocationType) => void;
};

function Menu({ locationType, settingLocationType }: Props) {
   // 아이템을 눌렀을 시 호출되는 콜백
   // locationType를 설정한다.
   const onPressItem = (type: LocationType) => {
      settingLocationType(type);
   };

   // native 환경에서 사용하는 react-native-material-menu 라이브러리가 웹에서는 동작하지 않아
   // react-native 기본 element인 Tooltip을 마치 메뉴인것처럼 사용
   return (
      <Tooltip
         popover={
            <View
               style={{
                  right: MENU_ITEM_WIDTH / 2,
                  borderWidth: 1,
                  borderColor: Colors.colorSet.stGray,
                  borderTopWidth: 0,
                  zIndex: 10,
               }}>
               {locStrArray.map((item, idx) => (
                  <ListItem
                     key={idx}
                     onPress={() => onPressItem(mapStrToLocType(item))}
                     style={{
                        height: MENU_ITEM_HEIGHT - 1,
                        width: MENU_ITEM_WIDTH - 2,
                     }}
                     bottomDivider>
                     <Text>{item}</Text>
                  </ListItem>
               ))}
            </View>
         }
         withOverlay={false}
         withPointer={false}
         containerStyle={[styles.menuStyle]}
         ModalComponent={Modal}>
         <View style={styles.anchorContainer}>
            <View style={styles.anchorStyle}>
               <Text>{mapLocTypeToStr(locationType)}</Text>
               <Icon name="sort-down" type="font-awesome" size={10} />
            </View>
         </View>
      </Tooltip>
   );
}

const styles = StyleSheet.create({
   anchorContainer: {
      width: MENU_ITEM_WIDTH,
      height: MENU_ITEM_HEIGHT,
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
      width: MENU_ITEM_WIDTH,
      height: MENU_ITEM_HEIGHT * locStrArray.length,
      padding: 0,
      backgroundColor: "transparent",
   },
});

export default Menu;
