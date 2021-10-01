import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";
import DefaultMapView, { Marker, Region } from "react-native-maps";
import { MARKER_SIZE } from "../../../constants/Size";
import { CoordType } from "../../../types";

export type MapViewProps = {
   region: Region;
   mapViewRef: React.RefObject<DefaultMapView>;
   onPressMap: (coord: CoordType) => void;
};

function MapView({ region, mapViewRef, onPressMap }: MapViewProps) {
   return (
      <DefaultMapView
         key="Gmap"
         ref={mapViewRef}
         region={region}
         style={styles.map}
         onPress={(e) => onPressMap(e.nativeEvent.coordinate)}>
         <Marker key={`marker`} coordinate={region}>
            <View style={[styles.markerWrap]}>
               <Image
                  source={require("../../../assets/images/map_marker.png")}
                  style={[styles.marker]}
                  resizeMode="cover"
               />
            </View>
         </Marker>
      </DefaultMapView>
   );
}

const styles = StyleSheet.create({
   map: {
      width: "100%",
      height: "100%",
      zIndex: 1,
   },
   markerWrap: {
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

export default MapView;
