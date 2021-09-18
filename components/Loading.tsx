import React from "react";
import { Platform } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector } from "react-redux";
import { RootState } from "../modules";

export default function Loading() {
   const loading = useSelector(({ loading }: RootState) => loading);

   return (
      <>
         {Platform.OS === "web" ? (
            <></>
         ) : (
            <Spinner
               visible={loading}
               cancelable={true}
               textContent={"Loading..."}
               textStyle={{
                  color: "#FFF",
               }}
            />
         )}
      </>
   );
}
