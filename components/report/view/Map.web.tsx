import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import useLayout, { LayoutType } from "../../../hooks/useLayout";
import { MARKER_SIZE, WEB_REPORT_CONTENT_WIDTH } from "../../../constants/Size";
import { Text, View } from "../../Themed";

type Props = {
   region: Region;
   mapViewRef: React.RefObject<MapView>;
};

function Map({ region, mapViewRef }: Props) {
   const layout = useLayout();
   return (
      <View style={styles.container}>
         <View style={styles.labelContainer}>
            <Text style={styles.label}>지도를 눌러 위치를 지정해주세요.</Text>
         </View>
         <MapView
            ref={mapViewRef}
            provider={PROVIDER_GOOGLE}
            region={region}
            key="Gmap"
            style={styles.map}
            defaultZoom={18}
            options={{ disableDefaultUI: true, zoom: 18 }}></MapView>
         <View style={[styles.markerWrap, stylesFunc(layout).markerWrapOffset]}>
            <Image
               source={require("../../../assets/images/map_marker_web.png")}
               style={[styles.marker]}
               resizeMode="cover"
            />
         </View>
      </View>
   );
}
const stylesFunc = (layout: LayoutType) =>
   StyleSheet.create({
      markerWrapOffset: {
         position: "absolute",
         left:
            (layout.isSmallDevice
               ? layout.window.width
               : WEB_REPORT_CONTENT_WIDTH) * 0.5,
         bottom: "50%",
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
      height: "100%",
   },
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

export default React.memo(Map);
