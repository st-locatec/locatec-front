import MapView, { Region } from "react-native-maps";
import {
   AnimateRegionType,
   CoordType,
   LocationType,
   MarkerType,
} from "../../types";

export type stylesFuncType = {
   buttonSide?: string;
};

export type MainViewType = {
   isInsie: boolean;
   myLocation: Region;
   markers: MarkerType[] | undefined;
   region: Region;
   mapViewRef: React.RefObject<MapView>;
   onAnimateRegion: AnimateRegionType;
   isOpen: boolean;
   locationType: LocationType;
   toggleIsOpen: () => void;
   goToReport: () => void;
   changeLocationType: (v: LocationType) => void;
   animateToClosest?: () => void;
   onPressMarker_Web?: (v: CoordType) => void;
};
