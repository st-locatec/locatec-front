import { ImagePickerResult } from "expo-image-picker";
import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Icon, Image, ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Menu, MenuItem } from "react-native-material-menu";
import Colors from "../../../constants/Colors";
import { locStrArray } from "../../../constants/Strings";
import { LocationType } from "../../../types";
import mapLocTypeToStr, {
   mapStrToLocType,
} from "../../../utils/mapLocTypeToStr";

import { Button, Text, View } from "../../Themed";
type Props = {
   locationType: LocationType;
   settingLocationType: (v: LocationType) => void;
   selectPhoto: () => Promise<void>;
   photo: ImagePickerResult | null;
   sendRequest: () => Promise<void>;
};

function Info({
   locationType,
   settingLocationType,
   selectPhoto,
   photo,
   sendRequest,
}: Props) {
   const [visible, setVisible] = useState(false);
   const [addPhoto, setAddPhoto] = useState(false);

   const onPressAddPhoto = () => {
      setAddPhoto(true);
      selectPhoto();
   };

   const hideMenu = (type?: LocationType) => {
      setVisible(false);
      if (type) {
         settingLocationType(type);
      }
   };
   const showMenu = () => setVisible(true);

   return (
      <ScrollView style={styles.container}>
         <ListItem style={styles.listItem}>
            <View style={styles.listItemHeader}>
               <Text>타입</Text>
            </View>
            <ListItem.Content>
               <Menu
                  visible={visible}
                  anchor={
                     <View style={styles.anchorContainer}>
                        <Pressable
                           style={styles.anchorStyle}
                           onPress={showMenu}>
                           <Text>{mapLocTypeToStr(locationType)}</Text>
                           <Icon
                              name="sort-down"
                              type="font-awesome"
                              size={10}
                           />
                        </Pressable>
                     </View>
                  }
                  style={styles.menuStyle}
                  onRequestClose={hideMenu}>
                  {locStrArray.map((item, idx) => (
                     <MenuItem
                        key={idx}
                        onPress={() => hideMenu(mapStrToLocType(item))}>
                        {item}
                     </MenuItem>
                  ))}
               </Menu>
            </ListItem.Content>
         </ListItem>
         <ListItem style={styles.listItem}>
            <View style={styles.listItemHeader}>
               <Text>사진</Text>
            </View>
            <ListItem.Content>
               <View style={styles.selectAddButtonContainer}>
                  <Button
                     title="추가하기"
                     color={
                        addPhoto
                           ? Colors.colorSet.stBlue
                           : Colors.colorSet.stGray
                     }
                     onPress={onPressAddPhoto}
                  />
                  <Button
                     title="추가안함"
                     color={
                        !addPhoto
                           ? Colors.colorSet.stRed
                           : Colors.colorSet.stGray
                     }
                     onPress={() => setAddPhoto(false)}
                  />
               </View>
            </ListItem.Content>
         </ListItem>
         <View style={styles.imageContainer}>
            {addPhoto && !photo?.cancelled && (
               <Image
                  source={{ uri: photo?.uri }}
                  style={{ width: 200, height: 200, borderRadius: 40 }}
               />
            )}
         </View>
         <View style={styles.reportContainerView}>
            <Button
               title="요청 보내기"
               containerStyle={styles.reportContainer}
               color={Colors.colorSet.stGray}
               onPress={sendRequest}
            />
         </View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   container: {
      width: "100%",
      height: "100%",
   },
   listItem: {
      height: 70,
   },
   listItemHeader: {
      width: 80,
   },
   menuStyle: {
      width: 150,
   },
   anchorContainer: {
      width: 150,
      height: "100%",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 1,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 2,
   },
   anchorStyle: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      height: "100%",
   },
   selectAddButtonContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
   },
   imageContainer: {
      width: "100%",
      height: 200,
      marginTop: 10,
      justifyContent: "center",
      alignItems: "center",
   },
   reportContainerView: {
      width: "100%",
      alignItems: "center",
      marginTop: 20,
   },
   reportContainer: {
      width: 120,
   },
});

export default Info;
