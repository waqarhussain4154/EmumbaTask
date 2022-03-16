import React, { Component, useEffect, useState, } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Card from '../../Components/Card';
import DropDownPicker from 'react-native-dropdown-picker';
import GetLocation from 'react-native-get-location'
navigator.geolocation = require("@react-native-community/geolocation");
import cityList from '../../cityList.json'
import { styles } from "./styles";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import WeatherGraph from '../../Components/WeatherGraph';

// let Data={};
const test = {
    values: [23, 24, 25, 20, 15],
    textBottom: ['23°', '24°', '25°', '20°', '15°'],
    iconBottom: ['DayCloudy', 'DaySunny', 'DaySunny', 'DayCloudy', 'DayRain'],
};
const Settings = {
    showTextTop: false,
    showTextBottom: true,
    showIconTop: false,
    showIconBottom: true,
};
const index = ({ props, navigation }) => {

    const [weatherData, setWeatherData] = useState([]);
    const [index, setIndex] = useState(0);
    const [labels, setLabels] = useState([]);
    const [Data, setData] = useState([]);
    const [city, setCity] = useState(null);
    const [showGraph, setShowGraph] = useState(false);
    const [cityData, setCityData] = useState([]);
    useEffect(() => {

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                console.log("position", position);
                let response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude
                    },${position.coords.longitude
                    }&sensor=true&key=AIzaSyCRBupGQd8GRvDR7NTcmwkJblkLBknwTuw`
                );
                console.log("reeee", response);
                let responseJson = await response.json();
                console.log("responseJson", responseJson);
                if (responseJson.results) {
                    let area = responseJson?.results[0]?.formatted_address.split(",")
                    console.log("area", area);
                    cityList.map((ele, index) => {
                        if (ele.name === area[2].trim()) {
                            setIndex(index)
                            //console.log("index",index);
                            GetWeather(ele)
                        }
                    })
                }
            },
            (error) => alert(error.message),
            {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 10000
            }
        );

    }, []);
    const GetWeather = async (item) => {
        let lab = [];
        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${item.lat}&lon=${item.lng}&appid=a464c99ea28e46111673797d8c7eab3f`
        );
        let responseJson = await response.json();
        console.log("responseJson", responseJson.list);
        responseJson?.list.forEach((element) => {
            lab.push(element?.dt_txt)
        });
        setLabels(lab)
        setWeatherData(responseJson)
        let temp = {};
        let values = [];
        let textBottom = [];
        let iconBottom = ['DayCloudy', 'DaySunny', 'DaySunny', 'DayCloudy', 'DayRain'];
        responseJson?.list.forEach((element, index) => {
            console.log("ele", element);
            if (index < 5) {
                textBottom.push((element.main.temp - 273.15).toLocaleString() + "°")
                values.push((element.main.temp - 273.15))
            }

        });
        temp = {
            "values": values,
            "textBottom": textBottom,
            "iconBottom": iconBottom
        }
        setData(temp)
        setShowGraph(true)
        console.log("vales", values);
        console.log("textBottom", textBottom);
        console.log("Data", Data)
        console.log("test", test);
        // const Data = {
        //     values: [23, 24, 25, 20, 15],
        //     textBottom: ['23°', '24°', '25°', '20°', '15°'],
        //     iconBottom: ['DayCloudy', 'DaySunny', 'DaySunny', 'DayCloudy', 'DayRain'],
        // };
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>Weather</Text>
            <View style={styles.container}>
                {/* <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            /> */}

                <SearchableDropdown
                    onTextChange={(text) => console.log(text)}
                    // Listner on the searchable input
                    onItemSelect={(item) => {
                        setCity(item.name)
                        GetWeather(item)
                        setCityData(item)
                        
                    }

                    }
                    // Called after the selection
                    containerStyle={{ padding: 5 }}
                    // Suggestion container style
                    textInputStyle={{
                        // Inserted text style
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        backgroundColor: '#FAF7F6',
                    }}
                    itemStyle={{
                        // Single dropdown item style
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#FAF9F8',
                        borderColor: '#bbb',
                        borderWidth: 1,
                    }}
                    itemTextStyle={{
                        // Text style of a single dropdown item
                        color: '#222',
                    }}
                    itemsContainerStyle={{
                        // Items container style you can pass maxHeight
                        // To restrict the items dropdown hieght
                        maxHeight: '60%',
                    }}
                    items={cityList}
                    // Mapping of item array
                    defaultIndex={index}
                    // Default selected item index
                    placeholder={city ? city : cityList[index].name}
                    // place holder for the search input
                    resPtValue={false}
                    // Reset textInput Value with true and false state
                    underlineColorAndroid="transparent"
                // To remove the underline from the android input
                />
            </View>
            <FlatList
                data={weatherData?.list}
                style={{}}

                horizontal={true}

                renderItem={({ item }) => (
                    <Card
                        temp={item?.main?.temp}
                        feels_like={item?.main?.feels_like}
                        description={item?.weather[0]?.description}
                        dt_txt={item?.dt_txt}
                        icon={item?.weather[0]?.icon}
                    />
                )}
                //keyExtractor={(e) => e.id.toString()}
                contentContainerStyle={{
                    marginTop: 10,
                }}
                ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                // refreshControl={
                //   <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                // }
                keyExtractor={item => item.id}
            />

            <WeatherGraph
                Data={Data}
                Settings={Settings}
                showGraph={showGraph} 
            />
            <View style={{ alignItems: 'flex-end', width: '100%' }}>
                <TouchableOpacity
                onPress={()=>navigation.navigate("Map",{data:cityData})}
                >
                    <View style={{
                        width: 200, height: 40, backgroundColor: 'rgba(95, 109, 242,0.8)', justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Text style={{ color: '#fff' }}>View City on Map</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


export default index;
