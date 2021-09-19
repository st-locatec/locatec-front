import React, { useState, useRef, useCallback, useEffect } from "react";
import MapView, { Region } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { INSIDE_SHCOOL } from "../../../constants/Size";
import { centerSchool, deltas } from "../../../constants/Variables";
import { loading, unloading } from "../../../modules/loading";
import {
   CoordType,
   ImageLibraryReturn,
   LocationType,
   RootStackScreenProps,
   SMOKE,
} from "../../../types";
import getMyLocation from "../../../utils/getMyLocation";
import Report from "../view/Report.web";
import * as ImagePicker from "expo-image-picker";
import {
   changePhotoContent,
   changePhotoTitle,
} from "../../../constants/Strings";
import { RootState } from "../../../modules";
import useLayout from "../../../hooks/useLayout";
import Alert from "../../elements/Alert.web";
import { FlatList } from "react-native";

type Props = {};

function ReportContainer({
   navigation,
}: Props & RootStackScreenProps<"Report">) {
   const [region, setRegion] = useState<Region>(centerSchool);
   const [refresh, setRefresh] = useState<number>(0);
   const [position, setPosition] = useState<number>(0);
   const [locationType, setLocationType] = useState<LocationType>(SMOKE);
   const mapViewRef = useRef<MapView>() as React.RefObject<MapView>;
   const pagerRef = useRef<FlatList>() as React.RefObject<FlatList>;
   const [prevPhoto, setPrevPhoto] = useState<ImageLibraryReturn>(null);
   const [photo, setPhoto] = useState<ImageLibraryReturn>(null);
   const [addPhoto, setAddPhoto] = useState(false);
   const [firstWidth, setFirstWidth] = useState(0);

   const theme = useSelector(({ theme }: RootState) => theme);
   const dispatch = useDispatch();
   const layout = useLayout();

   useEffect(() => {
      if (firstWidth) {
         if (
            layout.window.width >= firstWidth * 2 ||
            (firstWidth / 3) * 2 >= layout.window.width
         ) {
         }
      } else {
         setFirstWidth(layout.window.width);
      }
   }, [layout, firstWidth]);

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
   }, [pagerRef, position, layout]);
   const goPrev = useCallback((): void => {
      scrollToIndex(position - 1);
   }, [pagerRef, position, layout]);

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
            changePhotoTitle,
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
   const onPressMap = (coordinate: CoordType) => {
      setRegion({ ...coordinate, ...deltas });
   };

   return (
      <Report
         region={region}
         mapViewRef={mapViewRef}
         pagerRef={pagerRef}
         goNext={goNext}
         goPrev={goPrev}
         position={position}
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
         onPressMap={onPressMap}
      />
   );
}

export default ReportContainer;
