import React, { useState, useRef, useCallback } from "react";
import MapView, { Region } from "react-native-maps";
import PagerView, {
   PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";
import Report from "../view/Report";

type Props = {};

function ReportContainer({}: Props) {
   const [region, setRegion] = useState<Region>({
      latitude: 37.63232307069136,
      longitude: 127.07801836259382,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
   });
   const [position, setPosition] = useState<number>(0);
   const mapViewRef = useRef<MapView>() as React.RefObject<MapView>;
   const pagerRef = useRef<PagerView>() as React.RefObject<PagerView>;

   const goNext = useCallback((): void => {
      pagerRef.current?.setPage(position + 1);
   }, [pagerRef, position]);
   const goPrev = useCallback((): void => {
      pagerRef.current?.setPage(position - 1);
   }, [pagerRef, position]);

   const onPageScroll = useCallback((e: PagerViewOnPageSelectedEvent): void => {
      setPosition(e.nativeEvent.position);
   }, []);

   return (
      <Report
         region={region}
         mapViewRef={mapViewRef}
         pagerRef={pagerRef}
         goNext={goNext}
         goPrev={goPrev}
         position={position}
         onPageScroll={onPageScroll}
      />
   );
}

export default ReportContainer;
