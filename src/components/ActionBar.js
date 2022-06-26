/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TextInput
} from 'react-native';
import { color, strings, connection } from '../values';
import _ from 'lodash'
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite, removeFavourite } from '../action/saveFavouritDetailAction';
let _debounceObj = null;
import Like from "../assets/like.png"
import Unlike from "../assets/unlike.png"
import Search from "../assets/search.png"
import Close from "../assets/close.png"
import Back from "../assets/back.png"


const ActionBar = ({ properties, filterData }) => {
  const dispatch = useDispatch();
  const [searchbar, setsearchbar] = useState(false);
  const [searchChar, setsearchChar] = useState("");
  const [loading, setLoading] = useState("");
  const [favlist] = useSelector((state) => [
    state.favouritList.favouritList,
  ]);
  const detailsObj = _.get(properties, "route.params.details", null)

  const containsObject = (obj, list) => {
    if (list) {
      var i;
      for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
          return true;
        }
      }
    }
    return false;
  }

  const _searchFilterFunction = (searchChar) => {
    setsearchChar(searchChar)
    if (_debounceObj) {
      _debounceObj.cancel()
    }
    _debounceObj = _.debounce(() => {
      fetch(connection.baseUrl + "/api/characters?name=" + searchChar)
        .then((response) => response.json())
        .then((json) => filterData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, 500)
    _debounceObj();
  }

  return (
    <View style={{ width: "100%" }}>
      {_.get(properties, "route.name", null) === "MainScreen" &&
        <View style={{ width: "100%" }}>
          {searchbar ?
            <View style={styles.searchConatiner}>
              <TouchableHighlight
                style={{ width: "10%", alignItems: "center" }}
                onPress={() => setsearchbar(false)}>
                {/* <Icon name="arrow-left" color={color.colorAccent} size={20} /> */}
                <Image source={Back} style={styles.likebtn} />

              </TouchableHighlight>
              <TextInput
                style={styles.searchbarView}
                placeholder={strings.search}
                placeholderTextColor={color.colorAccent}
                value={searchChar}
                onChangeText={text => {
                  _searchFilterFunction(text)
                }}
              />

              <TouchableHighlight
                style={{ width: "10%", alignItems: "center" }}
                onPress={() => setsearchbar(false)}>
                {/* <Icon name="x" color={color.colorAccent} size={20} /> */}
                <Image source={Close} style={styles.likebtn} />

              </TouchableHighlight>
            </View>
            :
            <View style={styles.mainContainer}>
              <View style={styles.firstView}>
                <Text style={styles.appname}>{strings.appName}</Text>
              </View>
              <View style={styles.secoundView}>
                <TouchableHighlight
                  onPress={() => setsearchbar(true)}>
                  {/* <Icon name="search" color={color.colorAccent} size={20} /> */}
                  <Image source={Search} style={styles.likebtn} />

                </TouchableHighlight>

                <TouchableHighlight
                  onPress={() => properties.navigation.navigate("FavouritesScreen")}>
                  {/* <Icon name="heart" color={color.colorSecoundary} size={20} /> */}
                  <Image source={Like} style={styles.likebtn} />
                </TouchableHighlight>
              </View>
            </View>

          }
        </View>
      }
      {_.get(properties, "route.name", null) === "FavouritesScreen" &&
        <View style={styles.mainContainer}>
          <View style={styles.firstView}>
            <Text style={styles.favourite}>{strings.favourite}</Text>
          </View>
          <View style={styles.favSecoundView}>
            <TouchableHighlight
              onPress={() => properties.navigation.navigate("MainScreen")}>
              {/* <Icon name="x" color={color.colorAccent} size={20} /> */}
              <Image source={Close} style={styles.likebtn} />

            </TouchableHighlight>
          </View>
        </View>
      }
      {_.get(properties, "route.name", null) === "DetailScreen" &&
        <View style={styles.detailsContainer}>
          <TouchableHighlight
            style={styles.detailsView01}
            onPress={() => properties.navigation.navigate("MainScreen")}>
            {/* <Icon name="arrow-left" color={color.colorAccent} size={20} /> */}
            <Image source={Back} style={styles.likebtn} />

          </TouchableHighlight>

          <View style={{ width: "80%" }} />

          <TouchableHighlight
            style={styles.detailsView01}
            onPress={() => { containsObject(detailsObj, favlist) ? dispatch(removeFavourite(detailsObj)) : dispatch(addFavourite(detailsObj)) }}>
            {/* <Icon name="heart" color={color.colorSecoundary} size={20} /> */}
            {containsObject(detailsObj, favlist) ? <Image source={Like} style={styles.likebtn} /> : <Image source={Unlike} style={styles.likebtn} />}
          </TouchableHighlight>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: 74,
    flexDirection: "row",
    backgroundColor: color.actionbar,
    paddingHorizontal: 20
  },
  detailsContainer: {
    width: "100%",
    height: 74,
    flexDirection: "row",
    paddingHorizontal: 20
  },
  detailsView01: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center"
  },
  detailsView02: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center"
  },
  appname: {
    color: color.colorAccent,
    fontFamily: "Roboto-Bold",
    fontSize: 23
  },
  favourite: {
    color: color.colorSecoundary,
    fontFamily: "Roboto-Bold",
    fontSize: 23
  },
  firstView: {
    width: "80%",
    height: "100%",
    justifyContent: "center",
  },
  secoundView: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between'
  },
  favSecoundView: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'flex-end'
  },
  searchConatiner: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    backgroundColor: color.colorPrimary,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchbarView: {
    width: "80%",
    fontFamily: '"Roboto-Thin',
    fontSize: 30,
    color: color.colorAccent,
  },
  likebtn: {
    width: 20,
    height: 20
  },


});

export default ActionBar;
