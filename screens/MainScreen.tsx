import * as React from "react";
import MainContainer from "../components/main/container/MainContainer";
import { RootStackScreenProps } from "../types";

export default function MainScreen(props: RootStackScreenProps<"Root">) {
   return <MainContainer {...props} />;
}
