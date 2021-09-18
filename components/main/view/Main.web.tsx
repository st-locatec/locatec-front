import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import MapView, {
   Callout,
   Marker,
   PROVIDER_GOOGLE,
   Region,
} from "react-native-maps";
import { Text, View } from "../../Themed";
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
import { smokingPlace, trashcan } from "../../../constants/Strings";

type Props = {
   isInsie: boolean;
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
   isInsie,
   markers,
   region,
   mapViewRef,
   isOpen,
   locationType,
   toggleIsOpen,
   goToReport,
   changeLocationType,
   animateToClosest,
}: Props) {
   const [markerImages, setMarkerImages] = useState();

   useEffect(() => {
      let obj: any = {};
      obj["user"] = require(`../../../assets/images/map_marker_user_web.png`);
      obj[
         `${SMOKE}`
      ] = require(`../../../assets/images/map_marker_smoking_web.png`);
      obj[
         `${TRASHCAN}`
      ] = require(`../../../assets/images/map_marker_trash_web.png`);

      setMarkerImages(obj);
   }, []);

   return (
      <View style={{ flex: 1 }}>
         <View style={styles.container}>
            <MapView
               ref={mapViewRef}
               provider={PROVIDER_GOOGLE}
               region={region}
               key="Gmap"
               style={styles.map}
               defaultZoom={18}
               options={{ disableDefaultUI: true, zoom: 18 }}>
               {markerImages && isInsie && (
                  <MapView.Marker
                     key={`marker`}
                     coordinate={myLocation}
                     icon={markerImages["user"]}
                  />
               )}
               {markerImages &&
                  markers
                     ?.filter(
                        (marker: MarkerType) => marker.type === locationType
                     )
                     .map((item: MarkerType, idx: number) => (
                        <Marker
                           key={`marker_${idx}`}
                           coordinate={item.coords}
                           icon={markerImages[`${locationType}`]}
                           style={{ width: 32 }}>
                           <Callout>
                              <View
                                 style={[
                                    styles.calloutSize,
                                    styles.calloutContainer,
                                    { position: "absolute" },
                                 ]}>
                                 <Image
                                    source={{ uri: item.image }}
                                    style={[styles.calloutSize]}
                                    resizeMode="cover"
                                 />
                              </View>
                           </Callout>
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
            icon={{
               name: locationType,
               color: "#fff",
               type: "font-awesome-5",
            }}
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
                  title: smokingPlace,
                  onPress: () => changeLocationType(SMOKE),
               },
               {
                  icon: {
                     name: "trash",
                     color: "#fff",
                     type: "font-awesome-5",
                  },
                  title: trashcan,
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
      width: "100%",
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
      width: 40,
      height: 40,
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
   calloutContainer: {
      overflow: "hidden",
      borderWidth: 1,
      borderColor: Colors.colorSet.stGray,
   },
   calloutSize: {
      width: 120,
      height: 90,
      borderRadius: 30,
   },
});

export default Main;
