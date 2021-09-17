import React, { useState, useRef, useCallback, useEffect } from "react";
import MapView, { Region } from "react-native-maps";
import PagerView, {
   PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";
import { useDispatch, useSelector } from "react-redux";
import { INSIDE_SHCOOL } from "../../../constants/Size";
import { centerSchool, deltas } from "../../../constants/Variables";
import { loading, unloading } from "../../../modules/loading";
import { LocationType, RootStackScreenProps, SMOKE } from "../../../types";
import getMyLocation from "../../../utils/getMyLocation";
import Report from "../view/Report";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import {
   changePhotoContent,
   changePhotoTitle,
   NO,
   YES,
} from "../../../constants/Strings";
import { RootState } from "../../../modules";

type Props = {};

function ReportContainer({
   navigation,
}: Props & RootStackScreenProps<"Report">) {
   const [region, setRegion] = useState<Region>(centerSchool);
   const [refresh, setRefresh] = useState<number>(0);
   const [position, setPosition] = useState<number>(0);
   const [locationType, setLocationType] = useState<LocationType>(SMOKE);
   const mapViewRef = useRef<MapView>() as React.RefObject<MapView>;
   const pagerRef = useRef<PagerView>() as React.RefObject<PagerView>;
   const [prevPhoto, setPrevPhoto] =
      useState<ImagePicker.ImagePickerResult | null>(null);
   const [photo, setPhoto] = useState<ImagePicker.ImagePickerResult | null>(
      null
   );
   const [addPhoto, setAddPhoto] = useState(false);
   const theme = useSelector(({ theme }: RootState) => theme);
   const dispatch = useDispatch();

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
   }, [refresh]);
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

   const settingAddPhoto = (v: boolean) => {
      setAddPhoto(v);
   };

   const pickPhoto = async () => {
      let res = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (!res.granted) {
         res = await ImagePicker.requestMediaLibraryPermissionsAsync(false);
         if (!res.granted) {
            return;
         }
      }

      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      });
      if (!result.cancelled) {
         // 프로필 사진 수정
         setPhoto(result);
      } else {
         setPhoto(prevPhoto);
      }
   };

   const selectPhoto = async (v: boolean) => {
      if (!photo) {
         await pickPhoto();
      } else if (v) {
         Alert.alert(changePhotoTitle, changePhotoContent, [
            {
               text: NO,
               onPress: () => {},
            },
            {
               text: YES,
               onPress: () => {
                  setPrevPhoto(photo);
                  setPhoto(null);
                  pickPhoto();
               },
            },
         ]);
      }
   };

   const sendRequest = async () => {
      dispatch(loading());
      const obj = {
         type: locationType,
         region: region,
         photo: addPhoto ? photo : null,
      };
      goNext();
      dispatch(unloading());
   };
   const gotoHome = () => {
      navigation.navigate("Root");
   };
   const gotoReport = () => {
      setRefresh((prev) => prev + 1);
      pagerRef.current?.setPage(0);
      setPosition(0);
      setLocationType(SMOKE);
      setPhoto(null);
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
         selectPhoto={selectPhoto}
         photo={photo}
         sendRequest={sendRequest}
         gotoHome={gotoHome}
         gotoReport={gotoReport}
         addPhoto={addPhoto}
         settingAddPhoto={settingAddPhoto}
         theme={theme}
      />
   );
}

export default ReportContainer;
