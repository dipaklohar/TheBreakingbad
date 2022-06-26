import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  StatusBar
} from 'react-native';
import { color } from '../values';
import { ListItem, ActionBar, Emptystate } from '../components';
import { useSelector } from 'react-redux';

const FavouritesScreen = (props) => {
  const [favlist] = useSelector((state) => [
    state.favouritList.favouritList,
  ]);

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        backgroundColor={color.actionbar} />
      <ActionBar
        properties={props} />
      <FlatList
        style={{ paddingTop: 60 }}
        data={favlist}
        renderItem={({ item }) =>
          <ListItem
            props={props}
            item={item} />}
        numColumns={2}
        ListEmptyComponent={() =>
          <Emptystate />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.actionbar
  },

});

export default FavouritesScreen;
