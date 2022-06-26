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
    Text
} from 'react-native';
import { color } from '../values';


const Empty = () => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.nochar}>No Character found</Text>
            <Text style={styles.tryagain}>Try again</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: color.actionbar,
        paddingHorizontal: 25
    },
    nochar: {
        color: color.colorSecoundary,
        fontFamily: "Roboto-Light",
        fontSize: 22
    },
    tryagain: {
        color: color.grey,
        fontFamily: "Roboto-Light",
        fontSize: 22,
        marginTop:10
    },
});

export default Empty;
