import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import Layout from "../../../constants/Layout";
import { MARKER_SIZE } from "../../../constants/Size";
import { AnimateRegionType } from "../../../types";
import { Text, View } from "../../Themed";

type Props = {
   region: Region;
   mapViewRef: React.RefObject<MapView>;
   onAnimateRegion: AnimateRegionType;
};

function Map({ region, mapViewRef, onAnimateRegion }: Props) {
   return (
      <View style={styles.container}>
         <View style={styles.labelContainer}>
            <Text style={styles.label}>
               지도를 움직여서 위치를 선택해주세요.
            </Text>
         </View>
         <View style={styles.mapContaienr}>
            <MapView
               ref={mapViewRef}
               provider={PROVIDER_GOOGLE}
               region={region}
               key="Gmap"
               style={styles.map}
               onRegionChangeComplete={onAnimateRegion}></MapView>
            <View style={[styles.markerWrap]}>
               <Image
                  source={require("../../../assets/images/map_marker.png")}
                  style={[styles.marker]}
                  resizeMode="cover"
               />
            </View>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   labelContainer: {
      height: 70,
      justifyContent: "center",
   },
   label: {
      fontSize: 16,
      margin: 10,
   },
   mapContaienr: {
      height: "70%",
   },
   map: {
      width: Layout.window.width,
      height: "100%",
      zIndex: 1,
   },
   markerWrap: {
      position: "absolute",
      left: "50%",
      paddingRight: MARKER_SIZE / 2,
      bottom: "50%",
      paddingTop: MARKER_SIZE / 2,

      alignItems: "center",
      justifyContent: "center",
      width: MARKER_SIZE,
      height: MARKER_SIZE,
      zIndex: 10,
      backgroundColor: "transparent",
   },
   marker: {
      width: MARKER_SIZE,
      height: MARKER_SIZE,
   },
});

export default Map;
