import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Region } from "react-native-maps";
import { MARKER_SIZE } from "../../../constants/Size";
import { Text, View } from "../../Themed";
import { CoordType } from "../../../types";

type Props = {
   region: Region;
   mapViewRef: React.RefObject<MapView>;
   onPressMap: (v: CoordType) => void;
};

function Map({ region, mapViewRef, onPressMap }: Props) {
   return (
      <View style={styles.container}>
         <View style={styles.labelContainer}>
            <Text style={styles.label}>지도를 눌러 위치를 지정해주세요.</Text>
         </View>
         <MapView
            ref={mapViewRef}
            region={region}
            key="Gmap"
            style={styles.map}
            defaultZoom={18}
            options={{ disableDefaultUI: true, zoom: 18 }}
            onPress={(v) => {
               onPressMap({
                  latitude: v.latLng.lat(),
                  longitude: v.latLng.lng(),
               });
            }}>
            <MapView.Marker
               coordinate={region}
               icon={require("../../../assets/images/map_marker_web.png")}
            />
         </MapView>
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
      width: "100%",
      height: "100%",
   },
   map: {
      width: "100%",
      height: "70%",
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

export default React.memo(Map);
