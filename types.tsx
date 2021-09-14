/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
   namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
   }
}

export type RootStackParamList = {
   Root: undefined;
   Report: undefined;
   NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
   NativeStackScreenProps<RootStackParamList, Screen>;

/* 
   위치 데이터 타입
*/
export const SMOKE = "smoking" as const;
export const TRASHCAN = "trash" as const;

export type LocationType = typeof SMOKE | typeof TRASHCAN;

export type MarkerType = {
   type: LocationType;
   coords: { latitude: number; longitude: number };
};
