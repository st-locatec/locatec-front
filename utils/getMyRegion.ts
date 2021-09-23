/**
 * 현재 유저의 위치를 얻고, 지도에 활용하기 위해 Region 타입으로 바꿔서 리턴해줌
 */

import * as Location from "expo-location";
import { parseToRegion } from "./parseLocation";

export default async function getMyRegion() {
   let { status } = await Location.requestForegroundPermissionsAsync();
   if (status !== "granted") {
      throw Error();
   }
   try {
      let location = await Location.getCurrentPositionAsync({});
      const parsed = parseToRegion(location);
      return parsed;
   } catch (e) {
      throw e;
   }
}
