import React from "react";
import { FlatList, StyleSheet } from "react-native";
import MapView, { Region } from "react-native-maps";
import {
   CoordType,
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
import { WEB_REPORT_CONTENT_WIDTH } from "../../../constants/Size";
import useLayout, { LayoutType } from "../../../hooks/useLayout";

type Props = {
   region: Region;
   mapViewRef: React.RefObject<MapView>;
   pagerRef: React.RefObject<FlatList>;
   goNext: () => void;
   goPrev: () => void;
   position: number;
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
   onPressMap: (v: CoordType) => void;
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
   onPressMap,
}: Props) {
   const layout = useLayout();

   const contentArray = [
      <Map region={region} mapViewRef={mapViewRef} onPressMap={onPressMap} />,
      <Info
         locationType={locationType}
         settingLocationType={settingLocationType}
         selectPhoto={selectPhoto}
         photo={photo}
         sendRequest={sendRequest}
         addPhoto={addPhoto}
         settingAddPhoto={settingAddPhoto}
      />,
      <Complete gotoHome={gotoHome} gotoReport={gotoReport} theme={theme} />,
   ];

   return (
      <View style={styles.container}>
         <View style={{ alignItems: "center" }}>
            <StepIndicator position={position} />
         </View>
         <FlatList
            ref={pagerRef}
            initialScrollIndex={0}
            horizontal={true}
            data={contentArray}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
               <View
                  key={`flaylist_content_${index}`}
                  style={[stylesFunc(layout).pagerChildCaontainer]}>
                  <View style={stylesFunc(layout).pageChildInside}>{item}</View>
               </View>
            )}></FlatList>
         <View style={{ alignItems: "center" }}>
            <View style={[stylesFunc(layout).pageChildInside, { height: 50 }]}>
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

const stylesFunc = ({ window: { width, height }, isSmallDevice }: LayoutType) =>
   StyleSheet.create({
      pagerChildCaontainer: {
         width: width,
         height: "100%",
         alignItems: "center",
         justifyContent: "center",
      },
      pageChildInside: {
         width: isSmallDevice ? width : WEB_REPORT_CONTENT_WIDTH,
         height: "100%",
         overflow: "hidden",
      },
   });

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   inputContainer: {
      flex: 1,
   },
});

export default Report;
