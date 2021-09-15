import { smokingPlace, trashcan } from "../constants/Strings";
import { LocationType, SMOKE, TRASHCAN } from "../types";

export default function mapLocTypeToStr(type: LocationType) {
   switch (type) {
      case SMOKE:
         return smokingPlace;
      case TRASHCAN:
         return trashcan;
      default:
         return smokingPlace;
   }
}

export function mapStrToLocType(str: string) {
   switch (str) {
      case smokingPlace:
         return SMOKE;
      case trashcan:
         return TRASHCAN;
      default:
         return SMOKE;
   }
}
