import React, { useState, useRef, useEffect } from "react";
import MapView, { Region } from "react-native-maps";
import Main from "../view/Main";
import {
   LocationType,
   MarkerType,
   RootStackScreenProps,
   SMOKE,
} from "../../../types";
import calculateLength from "../../../utils/calculateLengh";
import { INSIDE_SHCOOL } from "../../../constants/Size";
import { locate } from "../tempData";
import { centerSchool, deltas } from "../../../constants/Variables";
import getMyLocation from "../../../utils/getMyLocation";

type Props = {};

function MainContainer({ navigation }: Props & RootStackScreenProps<"Main">) {
   const [myLocation, setMyLocation] = useState<Region>(centerSchool);
   const [isInsie, setIIsInside] = useState<boolean>(false);
   const [markers, setMarkers] = useState<MarkerType[]>();
   const [region, setRegion] = useState<Region>(centerSchool);
   const [locationType, setLocationType] = useState<LocationType>(SMOKE);
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const mapViewRef = useRef<MapView>() as React.RefObject<MapView>;

   //처음들어오고 학교에서 0.007 이상 벗어난 위도 경도면 학교 중심을, 아니면 본인위치를 보여주기
   useEffect(() => {
      const mainInit = async () => {
         try {
            const parsed = await getMyLocation();
            if (
               parsed.latitude <= region.latitude + INSIDE_SHCOOL &&
               parsed.longitude <= region.longitude + INSIDE_SHCOOL &&
               parsed.latitude >= region.latitude - INSIDE_SHCOOL &&
               parsed.longitude >= region.longitude - INSIDE_SHCOOL
            ) {
               const initialCoords = {
                  latitude: parsed.latitude,
                  longitude: parsed.longitude,
                  ...deltas,
               };
               setIIsInside(true);
               setMyLocation(initialCoords);
            }
         } catch (e) {
            // console.log(e);
         }
      };
      mainInit();
      setMarkers(locate);
   }, []);

   useEffect(() => {
      if (myLocation) {
         mapViewRef.current?.animateToRegion(myLocation, 1000);
      }
   }, [myLocation]);

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
   const toggleIsOpen = () => {
      setIsOpen((prev) => !prev);
   };

   const goToReport = () => {
      navigation.navigate("Report");
   };

   const changeLocationType = (v: LocationType) => {
      setLocationType(v);
      setIsOpen(false);
   };

   const animateToClosest = () => {
      if (markers !== undefined && myLocation) {
         const center = myLocation;
         const curType = markers.filter(
            (marker: MarkerType) => marker.type === locationType
         );
         let closestRegion = curType.length > 0 ? curType[0].coords : center;
         let minLength = calculateLength(center, closestRegion);
         curType.forEach((item) => {
            const curLength = calculateLength(item.coords, center);
            if (curLength < minLength) {
               minLength = curLength;
               closestRegion = item.coords;
            }
         });

         mapViewRef.current?.animateToRegion(
            {
               ...closestRegion,
               ...deltas,
            },
            1000
         );
      }
   };

   return (
      <Main
         myLocation={myLocation}
         isInsie={isInsie}
         markers={markers}
         region={region}
         mapViewRef={mapViewRef}
         onAnimateRegion={onAnimateRegion}
         isOpen={isOpen}
         toggleIsOpen={toggleIsOpen}
         goToReport={goToReport}
         locationType={locationType}
         changeLocationType={changeLocationType}
         animateToClosest={animateToClosest}
      />
   );
}

export default MainContainer;
