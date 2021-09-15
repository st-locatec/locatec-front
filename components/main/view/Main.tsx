import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { View } from "../../Themed";
import Layout from "../../../constants/Layout";
import { Image } from "react-native-elements";
import { FLOATING_BUTTON_WIDTH } from "../../../constants/Size";
import { CustomSpeedDial, FloatingButton } from "../elements/CustomButtons";
import Colors from "../../../constants/Colors";
import {
   AnimateRegionType,
   LocationType,
   MarkerType,
   SMOKE,
   TRASHCAN,
} from "../../../types";

type Props = {
   myLocation: Region;
   markers: MarkerType[] | undefined;
   region: Region;
   mapViewRef: React.RefObject<MapView>;
   onAnimateRegion: AnimateRegionType;
   isOpen: boolean;
   locationType: LocationType;
   toggleIsOpen: () => void;
   goToReport: () => void;
   changeLocationType: (v: LocationType) => void;
   animateToClosest: () => void;
};

function Main({
   myLocation,
   markers,
   region,
   mapViewRef,
   onAnimateRegion,
   isOpen,
   locationType,
   toggleIsOpen,
   goToReport,
   changeLocationType,
   animateToClosest,
}: Props) {
   return (
      <View style={{ flex: 1 }}>
         <View style={styles.container}>
            <MapView
               ref={mapViewRef}
               provider={PROVIDER_GOOGLE}
               region={region}
               key="Gmap"
               style={styles.map}
               onRegionChangeComplete={onAnimateRegion}>
               <Marker key={`marker`} coordinate={myLocation}>
                  <View style={[styles.markerWrap]}>
                     <Image
                        source={require("../../../assets/images/map_marker.png")}
                        style={[styles.marker]}
                        resizeMode="cover"
                     />
                  </View>
               </Marker>
               {markers
                  ?.filter((marker: MarkerType) => marker.type === locationType)
                  .map((item: MarkerType, idx: number) => (
                     <Marker key={`marker_${idx}`} coordinate={item.coords}>
                        <View style={[styles.markerWrap]}>
                           <Image
                              source={require("../../../assets/images/map_marker.png")}
                              style={[styles.marker]}
                              resizeMode="cover"
                           />
                        </View>
                     </Marker>
                  ))}
            </MapView>
            <View style={[styles.buttonCol, { left: 0 }]}>
               <FloatingButton
                  color={Colors.colorSet.stRed}
                  icon={{
                     name: "location-arrow",
                     type: "font-awesome",
                     color: "white",
                  }}
                  onPress={animateToClosest}
               />
               <FloatingButton
                  color={Colors.colorSet.stBlue}
                  icon={{
                     name: "plus",
                     type: "font-awesome",
                     color: "white",
                  }}
                  onPress={goToReport}
               />
            </View>
         </View>
         <CustomSpeedDial
            isOpen={isOpen}
            icon={{ name: locationType, color: "#fff", type: "font-awesome-5" }}
            openIcon={{ name: "close", color: "#fff" }}
            onOpen={toggleIsOpen}
            onClose={toggleIsOpen}
            color={Colors.colorSet.stGray}
            actions={[
               {
                  icon: {
                     name: "smoking",
                     color: "#fff",
                     type: "font-awesome-5",
                  },
                  title: "흡연부스",
                  onPress: () => changeLocationType(SMOKE),
               },
               {
                  icon: {
                     name: "trash",
                     color: "#fff",
                     type: "font-awesome-5",
                  },
                  title: "쓰레기통",
                  onPress: () => changeLocationType(TRASHCAN),
               },
            ]}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
   },
   map: {
      width: Layout.window.width,
      height: "100%",
      zIndex: 1,
   },
   markerWrap: {
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
      backgroundColor: "transparent",
   },
   marker: {
      width: 30,
      height: 30,
   },
   buttonCol: {
      position: "absolute",
      bottom: 10,
      height: FLOATING_BUTTON_WIDTH * 2 + 20,
      backgroundColor: "transparent",
      justifyContent: "space-around",
      paddingLeft: 20,
      paddingRight: 20,
      zIndex: 1,
   },
});

export default Main;
