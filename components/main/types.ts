import MapView, { Region } from "react-native-maps";
import { MyLocationType } from "../../modules/myLocation";
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
   myLocation: MyLocationType;
   markers: MarkerType[] | undefined;
   markerImages: any | undefined;
   region: Region;
   mapViewRef: React.RefObject<MapView>;
   isOpen: boolean;
   locationType: LocationType;
   onAnimateRegion: AnimateRegionType;
   toggleIsOpen: () => void;
   goToReport: () => void;
   changeLocationType: (v: LocationType) => void;
   animateToClosest?: () => void;
   onPressMarker_Web?: (v: CoordType) => void;
};
