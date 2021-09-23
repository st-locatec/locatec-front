import React, { useState, useRef, useEffect } from "react";
import MapView, { Region } from "react-native-maps";
import Main from "../view/Main";
import {
   CoordType,
   LocationType,
   MarkerType,
   RootStackScreenProps,
   SMOKE,
   TRASHCAN,
} from "../../../types";
import calculateEuclidean from "../../../utils/calculateEuclidean";
import { INSIDE_SHCOOL } from "../../../constants/Size";
import { locate } from "../tempData";
import { centerSchool, deltas } from "../../../constants/Constants";
import getMyLocation from "../../../utils/getMyRegion";
import isTwoRegionSame from "../../../utils/isTwoRegionSame";

function MainContainer({ navigation }: RootStackScreenProps<"Main">) {
   const [myLocation, setMyLocation] = useState<Region>(centerSchool); // 유저 위치
   const [isInside, setIIsInside] = useState<boolean>(false); // 유저가 학교 안인지
   const [markers, setMarkers] = useState<MarkerType[]>(); // 마커들 저장
   const [region, setRegion] = useState<Region>(centerSchool); // 화면 중심 region
   const [locationType, setLocationType] = useState<LocationType>(SMOKE); // 보여줄 마커 타입. 흡연장소 또는 쓰레기통
   const [isOpen, setIsOpen] = useState<boolean>(false); // 오른쪽 하단 speedDial이 열려있는지 닫혀있는지
   const [markerImages, setMarkerImages] = useState<any>(); // 마커 이미지들
   const mapViewRef = useRef<MapView>() as React.RefObject<MapView>; // 지도 reference

   /**
    * 현재 유저의 좌표가 학교 중심좌표에서 0.007 이상 벗어난 위도 경도면 학교 중심을,
    * 아니면 본인위치를 보여주기
    */
   useEffect(() => {
      const mainInit = async () => {
         // 마커 이미지 로드.
         let obj: any = {};
         obj["user"] = require(`../../../assets/images/map_marker_user.png`);
         obj[
            `${SMOKE}`
         ] = require(`../../../assets/images/map_marker_smoking.png`);
         obj[
            `${TRASHCAN}`
         ] = require(`../../../assets/images/map_marker_trash.png`);

         setMarkerImages(obj);

         // 현재 유저 위치 받기
         const parsed = await getMyLocation();
         if (
            parsed.latitude <= centerSchool.latitude + INSIDE_SHCOOL &&
            parsed.longitude <= centerSchool.longitude + INSIDE_SHCOOL &&
            parsed.latitude >= centerSchool.latitude - INSIDE_SHCOOL &&
            parsed.longitude >= centerSchool.longitude - INSIDE_SHCOOL
         ) {
            const initialCoords = {
               latitude: parsed.latitude,
               longitude: parsed.longitude,
               ...deltas,
            };
            setIIsInside(true);
            setMyLocation(initialCoords);
         }
      };
      mainInit();
      setMarkers(locate);
   }, []);

   /**
    *  지도의 중심과 이 파일에서 관리하는 region의 상태를 일치시키기 위한 함수
    *
    *
    *  region(지도 중심) 이동이 완료되었을 때 호출되는 이벤트인
    *  onRegionChangeComplete의 콜백함수로 활용.
    *
    *  또는 웹에서는 이미지를 닫기 위해 사용되기도 함.
    */
   const onAnimateRegion = (reg: Region) => {
      if (!isTwoRegionSame(reg, region)) {
         setRegion(reg);
      }
   };

   // 우측하단 speedDial 버튼 열기 닫기 함수
   const toggleIsOpen = () => {
      setIsOpen((prev) => !prev);
   };

   // speedDial 을 열었을 때 나오는 버튼을 눌렀을 때 호출됨. 보여줄 marker를 바꿈
   const changeLocationType = (v: LocationType) => {
      setLocationType(v);
      setIsOpen(false);
   };

   // 좌측 아래 + 버튼 눌렀을때 호출. 추가요청 페이지로 가기
   const goToReport = () => {
      navigation.navigate("Report");
   };

   // 좌측 아래 버튼 중 위 버튼을 눌렀을때 호출.
   // 현재 유저 위치 또는 학교중심에서 가장 가까운 marker로 지도 이동
   const animateToClosest = () => {
      if (markers && myLocation) {
         const center = myLocation;
         const curType = markers.filter(
            (marker: MarkerType) => marker.type === locationType
         );
         let closestRegion = curType.length > 0 ? curType[0].coords : center;
         let minLength = calculateEuclidean(center, closestRegion);
         curType.forEach((item) => {
            const curLength = calculateEuclidean(item.coords, center);
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

   // 웹에서는 마커를 눌러도 그곳으로 이동하지 않으므로,
   // manually 하게 이동하기 위한 함수
   const onPressMarker_Web = (coord: CoordType) => {
      mapViewRef.current?.animateToRegion(
         {
            ...coord,
            ...deltas,
         },
         1000
      );
   };

   return (
      <Main
         myLocation={myLocation}
         isInside={isInside}
         markers={markers}
         markerImages={markerImages}
         region={region}
         mapViewRef={mapViewRef}
         onAnimateRegion={onAnimateRegion}
         isOpen={isOpen}
         toggleIsOpen={toggleIsOpen}
         goToReport={goToReport}
         locationType={locationType}
         changeLocationType={changeLocationType}
         animateToClosest={animateToClosest}
         onPressMarker_Web={onPressMarker_Web}
      />
   );
}

export default MainContainer;
