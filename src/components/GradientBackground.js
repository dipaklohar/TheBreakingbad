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
 } from 'react-native';
 import { color, measure } from '../values';

 
 const GradientBg = () => {
   return (
       <View style={styles.mainContainer}>
        
       </View>
   );
 };
 
 const styles = StyleSheet.create({
   mainContainer: {
     flex: 1,
     backgroundColor:color.transafercl,
     height:measure.height,
     width:measure.width,
     justifyContent:"flex-end",
     position:'absolute'
   },
   mainContainer01: {
    height:measure.height/2,
    width:measure.width,
  },
 });
 
 export default GradientBg;
 