/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  StatusBar,
  Text,
  ActivityIndicator
} from 'react-native';
import { color, connection, strings } from '../values';
import { ListItem, ActionBar,Emptystate } from '../components';


const MainScreen = (props) => {

  const [Userslist, setUserslist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(connection.baseUrl + "/api/characters")
      .then((response) => response.json())
      .then((json) => setUserslist(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);



  return (
    <>
      {loading ?
        <View style={styles.loadingView}>
          <ActivityIndicator size={"large"} color={color.colorSecoundary} animating={loading} />
          <Text style={styles.loadingtext}>{strings.loadtext}</Text>
        </View>
        :
        <View style={styles.mainContainer}>
          <StatusBar
            backgroundColor={color.actionbar} />
          <ActionBar
            properties={props}
            filterData={(data) => setUserslist(data)}
          />
          <FlatList
            style={{ paddingTop: 60 }}
            data={Userslist}
            renderItem={({ item }) =>
              <ListItem
                props={props}
                item={item} />}
            numColumns={2}
            ListEmptyComponent={()=>
              <Emptystate/>
            }
          />
        </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.actionbar
  },
  loadingtext: {
    fontFamily: "Roboto-Light",
    fontSize: 20,
    marginTop: 10,
    color: color.colorAccent
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.actionbar
  },


});

export default MainScreen;
