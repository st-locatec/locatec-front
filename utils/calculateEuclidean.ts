import { CoordType } from "../types";

// 두 좌표 사이의 유클리디안 거리를 계산
export default function calculateEuclidean(a: CoordType, b: CoordType) {
   return (
      Math.pow(Math.abs(a.latitude - b.latitude), 2) +
      Math.pow(Math.abs(a.longitude - b.longitude), 2)
   );
}
