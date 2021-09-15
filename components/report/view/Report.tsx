import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Region } from "react-native-maps";
import PagerView, {
   PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";
import { AnimateRegionType } from "../../../types";

import { Text, View } from "../../Themed";
import NaviButtons from "../elements/naviButtons";
import StepIndicator from "../elements/StepIndicator";
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
   onAnimateRegion: AnimateRegionType;
};

function Report({
   region,
   mapViewRef,
   pagerRef,
   goNext,
   goPrev,
   position,
   onPageScroll,
   onAnimateRegion,
}: Props) {
   return (
      <View style={styles.container}>
         <StepIndicator position={position} />
         <PagerView
            ref={pagerRef}
            style={{ flex: 1 }}
            initialPage={0}
            onPageSelected={onPageScroll}>
            <View key="1" style={{ flex: 1 }}>
               <Map
                  region={region}
                  mapViewRef={mapViewRef}
                  onAnimateRegion={onAnimateRegion}
               />
            </View>

            <View key="2" style={{ flex: 1 }}>
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
