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

  const [favouritlist, setFavouritlist] = useState([]);
  const [favouritList] = useSelector((state) =>[
		state.favouritList,
	]);


  
  useEffect(() => {
    console.log(favouritlist);
  }, []);



  return (
    <View style={styles.mainContainer}>
      <StatusBar
        backgroundColor={color.actionbar} />
      <ActionBar
        properties={props} />
      <FlatList
        style={{ paddingTop: 60 }}
        data={favouritlist}
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
