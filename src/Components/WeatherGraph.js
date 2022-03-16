import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text
} from "react-native";
import WeatherChart from 'react-native-weather-chart';
const { width, height } = Dimensions.get("window");

const WeatherGraph = (props) => {
 console.log("ShowGraph",props.showGraph);
   

    useEffect(() => {

    }, []);
    return (
        <>
        {props.showGraph?(
            <View style={styles.viewChart}>

            <WeatherChart data={props.Data} settings={props.Settings} />
    
        </View>
        ):<View/>}
        </>
    );
};

const styles = StyleSheet.create({
    Container: {
        flexDirection: "row",
    },
    text: {
        color: '#fff'
    },
    textHeading: {
        color: '#fff',
        fontWeight: 'bold'
    },
    viewChart: {
        backgroundColor: '#212B34',
        margin: 10,
        height: 160,
      },

});


export default WeatherGraph;
