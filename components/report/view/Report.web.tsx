import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Region } from "react-native-maps";
import {
   AnimateRegionType,
   ImageLibraryReturn,
   LocationType,
   ThemeScheme,
} from "../../../types";

import { View } from "../../Themed";
import NaviButtons from "../elements/naviButtons";
import StepIndicator from "../elements/StepIndicator";
import Complete from "./Complete";
import Info from "./Info";
import Map from "./Map.web";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Layout from "../../../constants/Layout";
import {
   NAV_HEADER_HEIGHT,
   WEB_REPORT_CONTENT_WIDTH,
} from "../../../constants/Size";

type Props = {
   region: Region;
   mapViewRef: React.RefObject<MapView>;
   pagerRef: React.RefObject<SwiperFlatList>;
   goNext: () => void;
   goPrev: () => void;
   position: number;
   onAnimateRegion?: AnimateRegionType;
   locationType: LocationType;
   settingLocationType: (v: LocationType) => void;
   selectPhoto: (v: boolean) => Promise<void>;
   photo: ImageLibraryReturn;
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
         <View style={{ alignItems: "center" }}>
            <StepIndicator position={position} />
         </View>
         <SwiperFlatList ref={pagerRef} index={0} disableGesture={true}>
            <View key="1" style={[styles.pagerChildCaontainer]}>
               <View style={styles.pageChildInside}>
                  <Map region={region} mapViewRef={mapViewRef} />
               </View>
            </View>
            <View key="2" style={[styles.pagerChildCaontainer]}>
               <View style={styles.pageChildInside}>
                  <Info
                     locationType={locationType}
                     settingLocationType={settingLocationType}
                     selectPhoto={selectPhoto}
                     photo={photo}
                     sendRequest={sendRequest}
                     addPhoto={addPhoto}
                     settingAddPhoto={settingAddPhoto}
                  />
               </View>
            </View>
            <View key="3" style={[styles.pagerChildCaontainer]}>
               <View style={styles.pageChildInside}>
                  <Complete
                     gotoHome={gotoHome}
                     gotoReport={gotoReport}
                     theme={theme}
                  />
               </View>
            </View>
         </SwiperFlatList>

         <View style={{ alignItems: "center" }}>
            <View style={[styles.pageChildInside, { height: 50 }]}>
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
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   pagerChildCaontainer: {
      width: Layout.window.width,
      height: Layout.window.height - NAV_HEADER_HEIGHT,
      alignItems: "center",
      justifyContent: "center",
   },
   pageChildInside: {
      width: WEB_REPORT_CONTENT_WIDTH,
      height: "100%",
      overflow: "hidden",
   },
   inputContainer: {
      flex: 1,
   },
});

export default Report;
