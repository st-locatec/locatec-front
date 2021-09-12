import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import Layout from "../../../constants/Layout";
import { Text, View } from "../../Themed";

type Props = {
   region: Region;
   mapViewRef: React.RefObject<MapView>;
};

function Map({ region, mapViewRef }: Props) {
   return (
      <View style={styles.container}>
         <View style={styles.labelContainer}>
            <Text style={styles.label}>위치를 선택해주세요.</Text>
         </View>
         <View style={styles.mapContaienr}>
            <MapView
               ref={mapViewRef}
               provider={PROVIDER_GOOGLE}
               region={region}
               key="Gmap"
               style={styles.map}>
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

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   labelContainer: {
      height: 100,
      justifyContent: "center",
   },
   label: {
      fontSize: 20,
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
});

export default Map;
