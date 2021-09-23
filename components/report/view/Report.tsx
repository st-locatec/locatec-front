import React from "react";
import { FlatList, StyleSheet } from "react-native";
import MapView, { Region } from "react-native-maps";
import useLayout from "../../../hooks/useLayout";
import {
   AnimateRegionType,
   CoordType,
   ImageLibraryReturn,
   LocationType,
   ThemeScheme,
} from "../../../types";

import { View } from "../../Themed";
import NaviButtons from "../elements/naviButtons";
import StepIndicator from "../elements/StepIndicator";
import { ReportViewProps } from "../types";
import Complete from "./Complete";
import Info from "./Info";
import Map from "./Map";

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
   onAnimateRegion,
   settingAddPhoto,
   onPressMap,
}: ReportViewProps) {
   const layout = useLayout();
   const contentArray = [
      <Map
         region={region}
         mapViewRef={mapViewRef}
         onAnimateRegion={onAnimateRegion}
         onPressMap={onPressMap}
      />,
      <Info
         locationType={locationType}
         settingLocationType={settingLocationType}
         selectPhoto={selectPhoto}
         photo={photo}
         sendRequest={sendRequest}
         addPhoto={addPhoto}
         settingAddPhoto={settingAddPhoto}
      />,
      <Complete gotoHome={gotoHome} gotoReport={gotoReport} />,
   ];
   return (
      <View style={styles.container}>
         <StepIndicator position={position} />
         <FlatList
            ref={pagerRef}
            initialScrollIndex={0}
            horizontal={true}
            data={contentArray}
            scrollEnabled={false}
            keyExtractor={(item, index) => `flaylist_content_${index}`}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
               <View
                  key={`flaylist_content_${index}`}
                  style={[
                     {
                        width: layout.window.width,
                        height: "100%",
                     },
                  ]}>
                  {item}
               </View>
            )}></FlatList>
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
