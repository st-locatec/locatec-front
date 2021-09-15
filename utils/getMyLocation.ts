import * as Location from "expo-location";
import { parseToRegion } from "./parseLocation";

export default async function getMyLocation() {
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
