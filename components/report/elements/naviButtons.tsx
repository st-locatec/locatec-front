import React from "react";
import { isWeb } from "../../../constants/Constants";
import { View, Button } from "../../Themed";

type Props = {
   position: number;
   last: boolean;
   goNext: () => void;
   goPrev: () => void;
};

function NaviButtons({ goNext, goPrev, position, last }: Props) {
   return (
      <View
         style={{
            width: "100%",
            flexDirection: "row",
            padding: isWeb ? 0 : 20,
         }}>
         {position !== 0 && (
            <Button
               title="이전"
               onPress={goPrev}
               type="clear"
               containerStyle={{ position: "absolute", left: 20 }}
            />
         )}
         {!last && (
            <Button
               title="다음"
               onPress={goNext}
               type="clear"
               containerStyle={{ position: "absolute", right: 20 }}
            />
         )}
      </View>
   );
}

export default React.memo(NaviButtons);
