import React, { useState, useRef, useEffect } from "react";
import MapView, { Region } from "react-native-maps";
import { parseToRegion } from "../../../utils/parseLocation";
import Main from "../view/Main";
import * as Location from "expo-location";

type Props = {};

function MainContainer({}: Props) {
   const [location, setLocation] = useState<Location.LocationObject | null>();
   const [region, setRegion] = useState<Region>({
      latitude: 37.63232307069136,
      longitude: 127.07801836259382,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
   });
   const mapViewRef = useRef<MapView>() as React.RefObject<MapView>;

   //처음들어오고 학교에서 크게 벗어난 위도 경도면 학교 중심을, 아니면 본인위치를 보여주기
   useEffect(() => {
      if (location) {
         const parsed = parseToRegion(location);
         mapViewRef.current?.animateToRegion(parsed, 1000);
      }
   }, [location, mapViewRef]);

   const onAnimateRegion = (
      reg: Region,
      details?:
         | {
              isGesture: boolean;
           }
         | undefined
   ) => {
      if (!details?.isGesture) {
         setRegion(reg);
      }
   };

   return (
      <Main
         region={region}
         mapViewRef={mapViewRef}
         onAnimateRegion={onAnimateRegion}
      />
   );
}

export default MainContainer;
