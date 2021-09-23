/**
 * 웹에서는 지도에 marker 또는 이미지를 렌더하기 위해 다른 방식을 취해야하는데 그것을 위한 함수
 * image와 size 배열을 받아서 렌더한다.
 *
 * 타입관리가 곤란해서 js 파일로 구현하였다.
 */

export default function makeGoogleIcon(image, size) {
   return new window.google.maps.MarkerImage(
      image,
      null,
      null,
      null,
      new window.google.maps.Size(...size)
   );
}
