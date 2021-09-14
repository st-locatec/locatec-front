import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector } from "react-redux";
import { RootState } from "../modules";

export default function Loading() {
   const loading = useSelector(({ loading }: RootState) => loading);
   return (
      <Spinner
         visible={loading}
         cancelable={true}
         textContent={"Loading..."}
         textStyle={{
            color: "#FFF",
         }}
      />
   );
}
