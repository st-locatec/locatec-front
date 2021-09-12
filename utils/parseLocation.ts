import * as Location from "expo-location";
import { Camera, Region } from "react-native-maps";

export const parseToRegion = (
   location: Location.LocationObject | null | undefined
): Region => {
   return {
      latitude: location?.coords.latitude || 0,
      longitude: location?.coords.longitude || 0,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
   };
};
