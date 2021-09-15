import { Region } from "react-native-maps";

export const deltas: { latitudeDelta: number; longitudeDelta: number } = {
   latitudeDelta: 0.003,
   longitudeDelta: 0.003,
};

export const centerSchool: Region = {
   latitude: 37.63232307069136,
   longitude: 127.07801836259382,
   ...deltas,
};
