import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { View } from "../../Themed";
import Colors from "../../../constants/Colors";
import { MarkerType } from "../../../types";
import { MainViewType } from "../types";
import { deltas } from "../../../constants/Constants";
import isTwoRegionSame from "../../../utils/isTwoRegionSame";
import makeGoogleIcon from "../../../utils/makeGoogleIcon";
import LeftBottomButton from "../elements/LeftBottomButtons";
import RightBottomSpeedDial from "../elements/RightBottomSpeedDial";

function Main({
   myLocation,
   markers,
   markerImages,
   region,
   mapViewRef,
   isOpen,
   locationType,
   toggleIsOpen,
   goToReport,
   changeLocationType,
   animateToClosest,
   onAnimateRegion,
   onPressMarker_Web,
}: MainViewType) {
   return (
      <View style={{ flex: 1 }}>
         <View style={styles.container}>
            <MapView
               key="Gmap"
               ref={mapViewRef}
               region={region}
               style={styles.map}
               defaultZoom={18}
               options={{ disableDefaultUI: true }}
               onRegionChangeComplete={(v) => {
                  onAnimateRegion({ ...v, ...deltas });
               }}
               onPress={() => {
                  /**
                   * 웹에서는 callout이 안되어 등록된 사진을 보여줄때
                   * 현재 region과 marker의 위치가 같으면 사진을 보여주는데
                   * 사진을 닫기 위해서는 지도를 이동시켜야함.
                   * 이는 불편하므로, 지도의 아무곳이나 클릭했을떄
                   * 티나지 않을만큼 아주 조금만 위도를 이동시켜 사진을 닫게한다.
                   */
                  onAnimateRegion({
                     ...region,
                     latitude: region.latitude - 0.0000000000001,
                  });
               }}>
               {
                  // 유저 위치에 마커 보여주기. 학교 밖이면 보여주지 않음.
                  // 웹에서는 누르면 그 곳으로 지도의 중심을 이동하도록 onPress 이벤트를 등록함
                  markerImages && myLocation.isInside && (
                     <Marker
                        key="marker_user"
                        coordinate={myLocation.region}
                        icon={makeGoogleIcon(markerImages["user"], [48, 48])}
                        onPress={(v) =>
                           onPressMarker_Web({
                              latitude: v?.latLng?.lat(),
                              longitude: v?.latLng?.lng(),
                           })
                        }
                     />
                  )
               }
               {
                  // marker.filter() 를 통해 현재 보여줄 타입의 마커만 보여줌.
                  markerImages &&
                     markers
                        ?.filter(
                           (marker: MarkerType) => marker.type === locationType
                        )
                        .map((item: MarkerType, idx: number) => (
                           <Marker
                              key={`marker_${idx}`}
                              coordinate={item.coords}
                              icon={
                                 // 현재 center와 marker가 같다면 등록된 이미지를 보여줌.
                                 // 등록된 이미지가 없으면 마커를 보여준다
                                 isTwoRegionSame(region, item.coords) &&
                                 item.image
                                    ? makeGoogleIcon(item.image, [400, 300])
                                    : makeGoogleIcon(
                                         markerImages[`${locationType}`],
                                         [48, 48]
                                      )
                              }
                              onPress={(v) =>
                                 onPressMarker_Web({
                                    latitude: v?.latLng?.lat(),
                                    longitude: v?.latLng?.lng(),
                                 })
                              }
                           />
                        ))
               }
            </MapView>
            <LeftBottomButton
               goToReport={goToReport}
               animateToClosest={animateToClosest}
            />
         </View>
         <RightBottomSpeedDial
            isOpen={isOpen}
            locationType={locationType}
            toggleIsOpen={toggleIsOpen}
            changeLocationType={changeLocationType}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
   },
   map: {
      width: "100%",
      height: "100%",
      zIndex: 1,
   },
   markerWrap: {
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
      backgroundColor: "transparent",
   },
   marker: {
      width: 40,
      height: 40,
   },
   calloutContainer: {
      overflow: "hidden",
      borderWidth: 1,
      borderColor: Colors.colorSet.stGray,
   },
   calloutSize: {
      width: 120,
      height: 90,
      borderRadius: 30,
   },
});

export default Main;
