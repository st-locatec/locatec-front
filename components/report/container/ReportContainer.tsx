import React, { useState, useRef, useCallback, useEffect } from "react";
import MapView, { Region } from "react-native-maps";
import PagerView, {
   PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";
import { INSIDE_SHCOOL } from "../../../constants/Size";
import { centerSchool, deltas } from "../../../constants/Variables";
import { LocationType, SMOKE } from "../../../types";
import getMyLocation from "../../../utils/getMyLocation";
import Report from "../view/Report";

type Props = {};

function ReportContainer({}: Props) {
   const [region, setRegion] = useState<Region>(centerSchool);
   const [position, setPosition] = useState<number>(0);
   const [locationType, setLocationType] = useState<LocationType>(SMOKE);
   const mapViewRef = useRef<MapView>() as React.RefObject<MapView>;
   const pagerRef = useRef<PagerView>() as React.RefObject<PagerView>;

   useEffect(() => {
      const mainInit = async () => {
         let initialCoords: Region = centerSchool;

         try {
            const parsed = await getMyLocation();
            if (
               parsed.latitude <= region.latitude + INSIDE_SHCOOL &&
               parsed.longitude <= region.longitude + INSIDE_SHCOOL &&
               parsed.latitude >= region.latitude - INSIDE_SHCOOL &&
               parsed.longitude >= region.longitude - INSIDE_SHCOOL
            ) {
               initialCoords = {
                  latitude: parsed.latitude,
                  longitude: parsed.longitude,
                  ...deltas,
               };
            }
         } catch (e) {
            initialCoords = centerSchool;
         } finally {
            setRegion(initialCoords);
         }
      };
      mainInit();
   }, []);
   const goNext = useCallback((): void => {
      pagerRef.current?.setPage(position + 1);
   }, [pagerRef, position]);
   const goPrev = useCallback((): void => {
      pagerRef.current?.setPage(position - 1);
   }, [pagerRef, position]);

   const onPageScroll = useCallback((e: PagerViewOnPageSelectedEvent): void => {
      setPosition(e.nativeEvent.position);
   }, []);

   const onAnimateRegion = (reg: Region) => {
      setRegion(reg);
   };

   const settingLocationType = (v: LocationType) => {
      setLocationType(v);
   };

   return (
      <Report
         region={region}
         mapViewRef={mapViewRef}
         pagerRef={pagerRef}
         goNext={goNext}
         goPrev={goPrev}
         position={position}
         onPageScroll={onPageScroll}
         onAnimateRegion={onAnimateRegion}
         locationType={locationType}
         settingLocationType={settingLocationType}
      />
   );
}

export default ReportContainer;
