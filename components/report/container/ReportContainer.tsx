import React, { useState, useRef, useCallback } from "react";
import { FlatList } from "react-native";
import MapView, { Region } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { deltas, isWeb } from "../../../constants/Constants";
import {
   CoordType,
   ImageLibraryReturn,
   LocationType,
   RootStackScreenProps,
   SMOKE,
} from "../../../types";
import * as ImagePicker from "expo-image-picker";
import Alert from "../../elements/Alert";
import {
   changePhotoContent,
   changePhotoTitle,
} from "../../../constants/Strings";
import { loading, unloading } from "../../../modules/loading";
import Report from "../view/Report";
import { setSnackbar } from "../../../modules/snackbar";
import { sendRequestApi } from "../../../api/requestList";
import { RootState } from "../../../modules";

function ReportContainer({ navigation }: RootStackScreenProps<"Report">) {
   const [position, setPosition] = useState<number>(0); // 현재 페이지
   const [locationType, setLocationType] = useState<LocationType>(SMOKE); // 유저가 고른 location type
   const [photo, setPhoto] = useState<ImageLibraryReturn>(null); // 유저가 고른 사진
   const [prevPhoto, setPrevPhoto] = useState<ImageLibraryReturn>(null); // 유저가 사진을 변경했을시, 변경 전 사진
   const [addPhoto, setAddPhoto] = useState(false); // 사진을 넣었는지 안넣었는지
   const mapViewRef = useRef<MapView>() as React.RefObject<MapView>; // 지도 reference
   const pagerRef = useRef<FlatList>() as React.RefObject<FlatList>; // 페이지 reference
   const myLocation = useSelector(({ myLocation }: RootState) => myLocation); // 현재 유저의 위치
   const [region, setRegion] = useState<Region>(myLocation.region); // 현재 지도의 중심
   const dispatch = useDispatch();

   /**
    * 페이지 스크롤 함수
    */
   const scrollToIndex = (to: number) => {
      pagerRef.current?.scrollToIndex({
         index: to,
         animated: true,
         viewPosition: 0,
      });
      setPosition(to);
   };

   /**
    * 다음 페이지, 이전 페이지 이동 함수
    */
   const goNext = useCallback((): void => {
      scrollToIndex(position + 1);
   }, [pagerRef, position]);
   const goPrev = useCallback((): void => {
      scrollToIndex(position - 1);
   }, [pagerRef, position]);

   // 두번째 페이지에서 사용되는 location type 설정 함수
   const settingLocationType = (v: LocationType) => {
      setLocationType(v);
   };

   // 사진 등록/미등록 여부 설정 함수
   const settingAddPhoto = (v: boolean) => {
      setAddPhoto(v);
   };

   // 사진 고르기
   const pickPhoto = async () => {
      // 권한 얻기
      let res = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (!res.granted) {
         res = await ImagePicker.requestMediaLibraryPermissionsAsync(false);
         if (!res.granted) {
            return;
         }
      }

      // 사진 얻기
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 0.3,
         base64: true,
      });

      // 취소 됐으면 이전 사진을, 아니면 결과를 넣는다.
      if (!result.cancelled) {
         // 프로필 사진 수정
         setPhoto(result);
      } else {
         setPhoto(prevPhoto);
      }
   };

   // 유저가 사진 등록버튼을 눌렀을때, 이전에 선택된 사진이 있으면 변경할 것인지 묻기
   const selectPhoto = async (v: boolean) => {
      if (!photo) {
         await pickPhoto();
      } else if (v) {
         Alert(
            isWeb ? "" : changePhotoTitle,
            changePhotoContent,
            () => {},
            () => {
               pickPhoto();
               setPrevPhoto(photo);
               setPhoto(null);
            }
         );
      }
   };

   // 추가 요청 서버로 보내기.
   const sendRequest = async () => {
      dispatch(loading());
      try {
         const obj = {
            type: locationType,
            latitude: region.latitude,
            longitude: region.longitude,
            image: addPhoto ? photo.base64 : null,
         };
         await sendRequestApi(obj);
         goNext();
      } catch (e) {
         // 요청 실패시 snackbar로 안내.
         dispatch(setSnackbar("요청에 실패했습니다. 다시 시도해주세요."));
      }
      dispatch(unloading());
   };

   // 메인 화면으로 이동
   const gotoHome = () => {
      scrollToIndex(0);
      navigation.navigate("Main");
   };

   // 초기 추가요청 화면으로 이동 및 초기화
   const gotoReport = () => {
      // 초기화
      setPhoto(null);
      setAddPhoto(false);
      setLocationType(SMOKE);
      // 이동
      scrollToIndex(0);
   };

   // 지도를 눌렀을때 그쪽으로 이동 및 region 세팅 함수.
   // 웹일 경우 animateToRegion이 작동하지 않아, 애니메이션없이 세팅만 해준다.
   const onPressMap = (coordinate: CoordType) => {
      const reg = { ...coordinate, ...deltas };
      if (isWeb) {
         setRegion(reg);
      } else {
         mapViewRef.current?.animateToRegion(reg, 1000);
         setTimeout(() => setRegion(reg), 1000);
      }
   };

   return (
      <Report
         region={region}
         mapViewRef={mapViewRef}
         pagerRef={pagerRef}
         position={position}
         locationType={locationType}
         photo={photo}
         addPhoto={addPhoto}
         goNext={goNext}
         goPrev={goPrev}
         selectPhoto={selectPhoto}
         settingLocationType={settingLocationType}
         settingAddPhoto={settingAddPhoto}
         sendRequest={sendRequest}
         gotoReport={gotoReport}
         gotoHome={gotoHome}
         onPressMap={onPressMap}
      />
   );
}

export default ReportContainer;
