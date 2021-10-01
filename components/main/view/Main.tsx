import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { View } from "../../Themed";
import Colors from "../../../constants/Colors";
import { MarkerType } from "../../../types";
import { MainViewType } from "../types";
import LeftBottomButton from "../elements/LeftBottomButtons";
import RightBottomSpeedDial from "../elements/RightBottomSpeedDial";
import { Svg, Image as ImageSvg } from "react-native-svg";
import { Image } from "react-native-elements";

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
}: MainViewType) {
   return (
      <View style={{ flex: 1 }}>
         <View style={styles.container}>
            <MapView
               key="Gmap"
               ref={mapViewRef}
               region={region}
               showsUserLocation={myLocation.isInside ? false : true}
               style={[styles.map]}>
               {
                  // 유저 위치에 마커 보여주기. 학교 밖이면 보여주지 않음.
                  markerImages && myLocation.isInside && (
                     <Marker key="marker_user" coordinate={myLocation.region}>
                        <View style={[styles.markerWrap]}>
                           <Image
                              source={markerImages["user"]}
                              containerStyle={[styles.marker]}
                              resizeMode="cover"
                           />
                        </View>
                     </Marker>
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
                              coordinate={item.coords}>
                              <View style={[styles.markerWrap]}>
                                 <Image
                                    source={markerImages[`${locationType}`]}
                                    containerStyle={[styles.marker]}
                                    resizeMode="cover"
                                 />
                              </View>
                              <Callout tooltip={true}>
                                 <View
                                    style={[
                                       styles.calloutSize,
                                       styles.calloutContainer,
                                    ]}>
                                    <Svg style={[styles.calloutSize]}>
                                       <ImageSvg
                                          width="100%"
                                          height="100%"
                                          preserveAspectRatio="xMidYMid slice"
                                          href={{ uri: item.image }}
                                       />
                                    </Svg>
                                 </View>
                              </Callout>
                           </Marker>
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
      width: 240,
      height: 180,
      borderRadius: 30,
   },
});

export default Main;
