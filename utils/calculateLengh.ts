type coord = { latitude: number; longitude: number };

export default function calculateLength(a: coord, b: coord) {
   return (
      Math.pow(Math.abs(a.latitude - b.latitude), 2) +
      Math.pow(Math.abs(a.longitude - b.longitude), 2)
   );
}
