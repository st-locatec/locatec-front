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
import Complete from "./Complete";
import Info from "./Info";
import Map from "./Map";

type Props = {
   region: Region;
   mapViewRef: React.RefObject<MapView>;
   pagerRef: React.RefObject<FlatList>;
   goNext: () => void;
   goPrev: () => void;
   position: number;
   onAnimateRegion: AnimateRegionType;
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
   onPressMap: (coord: CoordType) => void;
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
   onAnimateRegion,
   settingAddPhoto,
   theme,
   onPressMap,
}: Props) {
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
      <Complete gotoHome={gotoHome} gotoReport={gotoReport} theme={theme} />,
   ];
   return (
      <View style={styles.container}>
         <StepIndicator position={position} />
         <FlatList
            ref={pagerRef}
            initialScrollIndex={0}
            horizontal={true}
            data={contentArray}
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
