import { FlatList } from "react-native";
import MapView, { Region } from "react-native-maps";
import {
   AnimateRegionType,
   CoordType,
   ImageLibraryReturn,
   LocationType,
} from "../../types";

export type ReportViewProps = {
   region: Region;
   mapViewRef: React.RefObject<MapView>;
   pagerRef: React.RefObject<FlatList>;
   position: number;
   locationType: LocationType;
   photo: ImageLibraryReturn;
   addPhoto: boolean;
   goNext: () => void;
   goPrev: () => void;
   onAnimateRegion?: AnimateRegionType;
   settingLocationType: (v: LocationType) => void;
   selectPhoto: (v: boolean) => Promise<void>;
   sendRequest: () => Promise<void>;
   gotoHome: () => void;
   gotoReport: () => void;
   settingAddPhoto: (v: boolean) => void;
   onPressMap: (coord: CoordType) => void;
};
