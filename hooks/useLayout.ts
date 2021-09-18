import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";

export type LayoutType = {
   window: {
      width: number;
      height: number;
   };
   isSmallDevice: boolean;
};

export default function useLayout(): LayoutType {
   const [dimensions, setDimensions] = useState<LayoutType>({
      window: Dimensions.get("window"),
      isSmallDevice: Dimensions.get("window").width < 800,
   });

   useEffect(() => {
      const callback = ({ window }) => {
         setDimensions({ window: window, isSmallDevice: window.width < 800 });
      };
      Dimensions.addEventListener("change", callback);

      return () => Dimensions?.removeEventListener("change", callback);
   }, []);

   return dimensions;
}
