import React from "react";
import { View, Button } from "../../Themed";

type Props = {
   position: number;
   last: boolean;
   goNext: () => void;
   goPrev: () => void;
};

// 하단에 보여지는 이전/다음 버튼
// 첫 페이지에선 이전이 보이지 않도록하고, 두번째에선 다음이 보이지 않도록 함.
function NaviButtons({ goNext, goPrev, position, last }: Props) {
   return (
      <View
         style={{
            width: "100%",
            flexDirection: "row",
            height: 60,
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
