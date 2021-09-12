import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import PagerView, {
   PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";
import { Text, View } from "../../Themed";
import NaviButtons from "../elements/naviButtons";
import Info from "./Info";
import Map from "./Map";

type Props = {
   region: Region;
   mapViewRef: React.RefObject<MapView>;
   pagerRef: React.RefObject<PagerView>;
   goNext: () => void;
   goPrev: () => void;
   position: number;
   onPageScroll: (e: PagerViewOnPageSelectedEvent) => void;
};

function Report({
   region,
   mapViewRef,
   pagerRef,
   goNext,
   goPrev,
   position,
   onPageScroll,
}: Props) {
   return (
      <View style={styles.container}>
         <PagerView
            ref={pagerRef}
            style={{ flex: 1 }}
            initialPage={0}
            onPageSelected={onPageScroll}>
            <View key="1" style={{ flex: 1 }}>
               <Map region={region} mapViewRef={mapViewRef} />
            </View>

            <View key="2">
               <Info />
            </View>
         </PagerView>

         <View style={{ height: 50 }}>
            <NaviButtons
               position={position}
               goNext={goNext}
               goPrev={goPrev}
               last={position === 1}
            />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   inputContainer: {
      flex: 1,
   },
});

export default Report;
