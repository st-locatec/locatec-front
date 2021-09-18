import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { MARKER_SIZE, WEB_REPORT_CONTENT_WIDTH } from "../../../constants/Size";
import { Text, View } from "../../Themed";

type Props = {
   region: Region;
   mapViewRef: React.RefObject<MapView>;
};

function Map({ region, mapViewRef }: Props) {
   return (
      <View style={styles.container}>
         <View style={styles.labelContainer}>
            <Text style={styles.label}>지도를 눌러 위치를 지정해주세요.</Text>
         </View>
         <View style={styles.mapContaienr}>
            <MapView
               ref={mapViewRef}
               provider={PROVIDER_GOOGLE}
               region={region}
               key="Gmap"
               style={styles.map}
               defaultZoom={18}
               options={{ disableDefaultUI: true, zoom: 18 }}
               onClick={(v) => console.log(v)}></MapView>
         </View>
         <View style={[styles.markerWrap]}>
            <Image
               source={require("../../../assets/images/map_marker_web.png")}
               style={[styles.marker]}
               resizeMode="cover"
            />
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
      width: "100%",
      height: "100%",
   },
   map: {
      width: "100%",
      height: "100%",
      zIndex: 1,
   },
   markerWrap: {
      position: "absolute",
      left: WEB_REPORT_CONTENT_WIDTH * 0.5,
      bottom: "50%",

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
