import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { View } from "../../Themed";
import Layout from "../../../constants/Layout";
import { Image } from "react-native-elements";

type Props = {
   region: Region;
   mapViewRef: React.RefObject<MapView>;
   onAnimateRegion: (
      reg: Region,
      details?:
         | {
              isGesture: boolean;
           }
         | undefined
   ) => void;
};
function Main({ region, mapViewRef, onAnimateRegion }: Props) {
   return (
      <View style={styles.container}>
         <MapView
            ref={mapViewRef}
            provider={PROVIDER_GOOGLE}
            region={region}
            key="Gmap"
            style={styles.map}
            onRegionChangeComplete={onAnimateRegion}>
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
   },
   marker: {
      width: 30,
      height: 30,
   },
});

export default Main;
