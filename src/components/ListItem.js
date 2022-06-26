/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback
} from 'react-native';
import { color, measure } from '../values';
import _ from "lodash"
import Heart from "../assets/heart.png"

const ListItem = ({ item, props }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => props.navigation.navigate("DetailScreen", { details: item })}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Image
            style={styles.imageView}
            resizeMode={"center"}
            source={{ uri: _.get(item, "img", null) }}
          />
          <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: 10 }}>
            <View style={{ width: "80%", paddingLeft: 12 }}>
              <Text style={styles.userName} numberOfLines={1}>{_.get(item, "name", null)}</Text>
              <Text style={styles.userNick} numberOfLines={1}>{_.get(item, "nickname", null)}</Text>
            </View>
            <View style={{ width: "20%", paddingRight: 12 }}>
              {props.route.name !== "DetailScreen" &&
                <Image source={Heart} style={{ width: 20, height: 20 }} />
              }
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1 / 2,
    flexDirection: "column",
  },
  container: {
    flexDirection: "column",
    height: 260,
    marginHorizontal: 12,
    marginBottom: 45,

    alignItems: "center"
  },
  imageView: {
    width: 158,
    height: 210,
    borderRadius: 5
  },
  userName: {
    fontSize: 16,
    fontFamily: "Roboto-Bold",
    color: color.colorAccent
  },
  userNick: {
    fontSize: 14,
    fontFamily: "Roboto-Light",
    color: color.colorAccent
  },

});

export default ListItem;
