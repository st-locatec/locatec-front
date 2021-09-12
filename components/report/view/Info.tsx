import React from "react";
import { StyleSheet } from "react-native";
import { Input, ListItem } from "react-native-elements";

import { Text, View } from "../../Themed";
type Props = {};

function Info({}: Props) {
   return (
      <View style={styles.container}>
         <ListItem>
            <Text>타입</Text>
         </ListItem>
         <ListItem>
            <Text>사진추가</Text>
         </ListItem>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

export default Info;
