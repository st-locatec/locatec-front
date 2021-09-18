/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImagePickerResult } from "expo-image-picker";
import { Region } from "react-native-maps";

declare global {
   namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
   }
}

export type RootStackParamList = {
   Main: undefined;
   Report: undefined;
   NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
   NativeStackScreenProps<RootStackParamList, Screen>;

// launchImageLibraryAsync 결과 타입
export type ImageLibraryReturn = (ImagePickerResult & { uri?: string }) | null;

//좌표 타입
export type CoordType = {
   latitude: number;
   longitude: number;
};

/* 
   위치 데이터 타입
*/
export const SMOKE = "smoking" as const;
export const TRASHCAN = "trash" as const;

export type LocationType = typeof SMOKE | typeof TRASHCAN;

export type MarkerType = {
   type: LocationType;
   coords: { latitude: number; longitude: number };
   image: string;
};

/* 지도 이동 타입 */
export type AnimateRegionType = (
   reg: Region,
   details?:
      | {
           isGesture: boolean;
        }
      | undefined
) => void;

// 테마
export const LIGHT = "light" as const;
export const DARK = "dark" as const;

export type ThemeScheme = typeof LIGHT | typeof DARK;
