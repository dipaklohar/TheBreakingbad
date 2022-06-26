import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  FlatList,
  View,
  StatusBar,
  ImageBackground,
  ScrollView
} from 'react-native';
import { GradientBackground } from '../components';
import { color, measure, connection, strings } from '../values';
import { ListItem } from '../components';
import _ from "lodash"


const DetailsScreen = (props) => {
  const [Userslist, setUserslist] = useState([]);

  const detailsObj = _.get(props, "route.params.details", null)

  console.log(props);

  useEffect(() => {
    fetch(connection.baseUrl + "/api/characters")
      .then((response) => response.json())
      .then((json) => setUserslist(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);


  return (
    <View style={styles.mainContainer}>
      <StatusBar
        translucent />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            style={styles.imageBackground}
            resizeMode={"center"}
            source={{ uri: _.get(detailsObj, "img", null) }}>
            <GradientBackground />

            <Image
              style={styles.imageView}
              resizeMode={"center"}
              source={{ uri: _.get(detailsObj, "img", null) }}
            />

            <Text style={styles.boldTextname}>{_.get(detailsObj, "name", null)}</Text>
            <Text style={styles.lightTextname}>{_.get(detailsObj, "nickname", null)}</Text>
            <Text style={styles.thinTextname}>{_.get(detailsObj, "status", null)}</Text>
          </ImageBackground>

          <View style={styles.potrayedView}>
            <View style={{ width: "50%" }}>
              <Text style={styles.headerTextname}>{strings.potrayed}</Text>
              <Text style={styles.lightTextname}>{_.get(detailsObj, "portrayed", null)}</Text>
            </View>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Text style={styles.lightTextname}></Text>
              <Text style={styles.lightTextname}>{_.get(detailsObj, "birthday", null)}</Text>
            </View>
          </View>

          <View style={styles.appearedView}>
            <Text style={styles.headerTextname}>{strings.occupation}</Text>
            {_.map(_.get(detailsObj, "occupation", null), (str) =>
              (<Text style={styles.lightTextname}>{str}</Text>)
            )}
          </View>


          <View style={styles.appearedView}>
            <Text style={styles.headerTextname}>{strings.appeared}</Text>
            <ScrollView style={{ flexDirection: "row" }}
              horizontal={true}>
              {_.map(_.get(detailsObj, "appearance", null), (str) =>
              (<View style={styles.seasonView}>
                <Text style={styles.lightTextname}>{`Season ${str}`}</Text>
              </View>)
              )}
            </ScrollView>
          </View>

          <View style={styles.characterView}>
            <Text style={styles.otherCharText}>{strings.otherChar}</Text>

            <FlatList
              style={{ paddingTop: 50 }}
              data={Userslist}
              horizontal={true}
              renderItem={({ item }) =>
                <ListItem
                  props={props}
                  item={item} />}
            />


          </View>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.actionbar
  },
  imageView: {
    width: 158,
    height: 210,
    borderRadius: 5,
    marginTop: measure.width / 3
  },
  imageBackground: {
    width: measure.width,
    height: measure.height / 1.3,
    justifyContent: "center",
    alignItems: "center"
  },
  boldTextname: {
    color: color.colorAccent,
    fontFamily: "Roboto-Bold",
    fontSize: 31,
    marginTop: 30
  },
  lightTextname: {
    color: color.colorAccent,
    fontFamily: "Roboto-Light",
    fontSize: 14,
    marginVertical: 2
  },

  thinTextname: {
    color: color.maroon,
    fontFamily: "Roboto-Thin",
    fontSize: 14
  },
  headerTextname: {
    color: color.colorSecoundary,
    fontFamily: "Roboto-Light",
    fontSize: 14,
    marginVertical: 2
  },
  otherCharText: {
    color: color.colorAccent,
    fontFamily: "Roboto-Bold",
    fontSize: 31,
    marginTop: 30
  },
  seasonView: {
    minWidth: 88,
    minHeight: 25,
    borderRadius: 5,
    backgroundColor: color.colorPrimary,
    marginTop: 20,
    padding:5,
    marginLeft: 7,
    justifyContent: "center",
    alignItems: "center"
  },
  potrayedView: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 25
  },
  appearedView: {
    width: "100%",
    flexDirection: "column",
    paddingLeft: 25,
    marginTop: 50
  },
  characterView: {
    width: "100%",
    flexDirection: "column",
    paddingLeft: 25,
    marginTop: 70
  },
});

export default DetailsScreen;
