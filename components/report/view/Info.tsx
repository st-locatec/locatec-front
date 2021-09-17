import { ImagePickerResult } from "expo-image-picker";
import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Menu } from "react-native-material-menu";
import Colors from "../../../constants/Colors";
import Layout from "../../../constants/Layout";
import { locStrArray } from "../../../constants/Strings";
import { LocationType } from "../../../types";
import mapLocTypeToStr, {
   mapStrToLocType,
} from "../../../utils/mapLocTypeToStr";

import { Button, ListItem, Text, View, Icon, MenuItem } from "../../Themed";

const IMAGE_WIDTH: number = Layout.window.width * 0.8;
const IMAGE_HEIGHT: number = ((Layout.window.width * 0.8) / 4) * 3;

type Props = {
   locationType: LocationType;
   settingLocationType: (v: LocationType) => void;
   selectPhoto: (v: boolean) => Promise<void>;
   photo: ImagePickerResult | null;
   sendRequest: () => Promise<void>;
   addPhoto: boolean;
   settingAddPhoto: (v: boolean) => void;
};

function Info({
   locationType,
   settingLocationType,
   selectPhoto,
   photo,
   sendRequest,
   addPhoto,
   settingAddPhoto,
}: Props) {
   const [visible, setVisible] = useState(false);

   const onPressAddPhoto = () => {
      settingAddPhoto(true);
      selectPhoto(addPhoto);
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
         <ListItem containerStyle={styles.listItem}>
            <View style={styles.listItemHeader}>
               <Text>타입</Text>
            </View>
            <View>
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
            </View>
         </ListItem>
         <ListItem containerStyle={styles.listItem}>
            <View style={styles.listItemHeader}>
               <Text>사진</Text>
            </View>
            <View>
               <View style={styles.selectAddButtonContainer}>
                  <Button
                     title={photo && addPhoto ? "변경하기" : "등록하기"}
                     color={
                        addPhoto
                           ? Colors.colorSet.stBlue
                           : Colors.colorSet.stGray
                     }
                     onPress={onPressAddPhoto}
                  />
                  <Button
                     title="등록안함"
                     color={
                        !addPhoto
                           ? Colors.colorSet.stRed
                           : Colors.colorSet.stGray
                     }
                     containerStyle={{ marginLeft: 50 }}
                     onPress={() => settingAddPhoto(false)}
                  />
               </View>
            </View>
         </ListItem>
         <View style={styles.imageContainer}>
            {addPhoto && !photo?.cancelled && (
               <Image
                  source={{ uri: photo?.uri }}
                  style={{
                     width: IMAGE_WIDTH,
                     height: IMAGE_HEIGHT,
                     borderRadius: 40,
                  }}
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
      backgroundColor: "black",
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
      borderWidth: 1,
      borderColor: Colors.colorSet.stGray,
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
   },
   imageContainer: {
      width: "100%",
      height: IMAGE_HEIGHT,
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
