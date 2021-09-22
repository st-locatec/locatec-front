import { Region } from "react-native-maps";
import { CoordType } from "../types";

export default function isTwoRegionSame(
   one: Region | CoordType,
   two: Region | CoordType
) {
   if (one.latitude === two.latitude && one.longitude === two.longitude) {
      return true;
   }
   return false;
}
