import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import useLayout, { LayoutType } from "../../../hooks/useLayout";
import { MARKER_SIZE } from "../../../constants/Size";
import { AnimateRegionType, CoordType } from "../../../types";
import { Text, View } from "../../Themed";

type Props = {
   region: Region;
   mapViewRef: React.RefObject<MapView>;
   onPressMap: (coord: CoordType) => void;
   onAnimateRegion: AnimateRegionType;
};

function Map({ region, mapViewRef, onPressMap, onAnimateRegion }: Props) {
   const layout = useLayout();
   return (
      <View style={styles.container}>
         <View style={styles.labelContainer}>
            <Text style={styles.label}>
               지도를 클릭해서 위치를 선택해주세요.
            </Text>
         </View>
         <View style={styles.mapContaienr}>
            <MapView
               ref={mapViewRef}
               provider={PROVIDER_GOOGLE}
               region={region}
               key="Gmap"
               style={stylesFunc(layout).map}
               onRegionChangeComplete={onAnimateRegion}
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
            </MapView>
         </View>
      </View>
   );
}

const stylesFunc = (layout: LayoutType) =>
   StyleSheet.create({
      map: {
         width: layout.window.width,
         height: "100%",
         zIndex: 1,
      },
   });

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
      height: "70%",
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
