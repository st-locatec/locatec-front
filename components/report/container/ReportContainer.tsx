import React, { useState, useRef, useEffect, useCallback } from "react";
import { FlatList } from "react-native";
import MapView, { Region } from "react-native-maps";
import { useDispatch } from "react-redux";
import { centerSchool, deltas, isWeb } from "../../../constants/Constants";
import { INSIDE_SHCOOL } from "../../../constants/Size";
import {
   CoordType,
   ImageLibraryReturn,
   LocationType,
   RootStackScreenProps,
   SMOKE,
} from "../../../types";
import getMyRegion from "../../../utils/getMyRegion";
import * as ImagePicker from "expo-image-picker";
import Alert from "../../elements/Alert";
import {
   changePhotoContent,
   changePhotoTitle,
} from "../../../constants/Strings";
import { loading, unloading } from "../../../modules/loading";
import Report from "../view/Report";

function ReportContainer({ navigation }: RootStackScreenProps<"Report">) {
   const [region, setRegion] = useState<Region>(centerSchool);
   const [refresh, setRefresh] = useState<number>(0);
   const [position, setPosition] = useState<number>(0);
   const [locationType, setLocationType] = useState<LocationType>(SMOKE);
   const mapViewRef = useRef<MapView>() as React.RefObject<MapView>;
   const pagerRef = useRef<FlatList>() as React.RefObject<FlatList>;
   const [prevPhoto, setPrevPhoto] = useState<ImageLibraryReturn>(null);
   const [photo, setPhoto] = useState<ImageLibraryReturn>(null);
   const [addPhoto, setAddPhoto] = useState(false);
   const dispatch = useDispatch();

   useEffect(() => {
      const mainInit = async () => {
         let initialCoords: Region = centerSchool;

         try {
            const parsed = await getMyRegion();
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

   const scrollToIndex = (to: number) => {
      pagerRef.current?.scrollToIndex({
         index: to,
         animated: true,
         viewPosition: 0,
      });
      setPosition(to);
   };

   const goNext = useCallback((): void => {
      scrollToIndex(position + 1);
   }, [pagerRef, position]);
   const goPrev = useCallback((): void => {
      scrollToIndex(position - 1);
   }, [pagerRef, position]);

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
      scrollToIndex(0);
      navigation.navigate("Main");
   };

   const gotoReport = () => {
      setRefresh((prev) => prev + 1);
      scrollToIndex(0);
      setLocationType(SMOKE);
      setPhoto(null);
   };

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

   const onPressMap = (coordinate: CoordType) => {
      if (isWeb) {
         setRegion({ ...coordinate, ...deltas });
      } else {
         mapViewRef.current?.animateToRegion({ ...coordinate, ...deltas }, 500);
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
         onAnimateRegion={onAnimateRegion}
         onPressMap={onPressMap}
      />
   );
}

export default ReportContainer;
