import { ImagePickerResult } from "expo-image-picker";
import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Region } from "react-native-maps";
import PagerView, {
   PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";
import { AnimateRegionType, LocationType, ThemeScheme } from "../../../types";

import { Text, View } from "../../Themed";
import NaviButtons from "../elements/naviButtons";
import StepIndicator from "../elements/StepIndicator";
import Complete from "./Complete";
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
   locationType: LocationType;
   settingLocationType: (v: LocationType) => void;
   selectPhoto: (v: boolean) => Promise<void>;
   photo: ImagePickerResult | null;
   sendRequest: () => Promise<void>;
   gotoHome: () => void;
   gotoReport: () => void;
   addPhoto: boolean;
   settingAddPhoto: (v: boolean) => void;
   theme: ThemeScheme;
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
   locationType,
   settingLocationType,
   selectPhoto,
   photo,
   sendRequest,
   gotoHome,
   gotoReport,
   addPhoto,
   settingAddPhoto,
   theme,
}: Props) {
   return (
      <View style={styles.container}>
         <StepIndicator position={position} />

         <View style={{ height: 50 }}>
            {position !== 2 && (
               <NaviButtons
                  position={position}
                  goNext={goNext}
                  goPrev={goPrev}
                  last={position === 1}
               />
            )}
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
