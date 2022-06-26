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

let _debounceObj = null;

import Icon from 'react-native-vector-icons/Feather';


const ActionBar = ({ properties, filterData }) => {
  const [searchbar, setsearchbar] = useState(false);
  const [searchChar, setsearchChar] = useState("");
  const [loading, setLoading] = useState("");


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
                <Icon name="arrow-left" color={color.colorAccent} size={20} />
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
                <Icon name="x" color={color.colorAccent} size={20} />
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
                  <Icon name="search" color={color.colorAccent} size={20} />
                </TouchableHighlight>

                <TouchableHighlight
                  onPress={() => properties.navigation.navigate("FavouritesScreen")}>
                  <Icon name="heart" color={color.colorSecoundary} size={20} />
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
              <Icon name="x" color={color.colorAccent} size={20} />
            </TouchableHighlight>
          </View>
        </View>
      }
      {_.get(properties, "route.name", null) === "DetailScreen" &&
        <View style={styles.detailsContainer}>
          <TouchableHighlight
            style={styles.detailsView01}
            onPress={() => properties.navigation.navigate("MainScreen")}>
            <Icon name="arrow-left" color={color.colorAccent} size={20} />
          </TouchableHighlight>

          <View style={{ width: "80%" }} />

          <TouchableHighlight
            style={styles.detailsView01}
            onPress={() => { }}>
            <Icon name="heart" color={color.colorSecoundary} size={20} />
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
    color: color.colorAccent
  },


});

export default ActionBar;
