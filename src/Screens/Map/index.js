import React, { Component, useEffect, useState, } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { styles } from "./styles";
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Circle, Overlay, Polyline } from 'react-native-maps';
const { width, height } = Dimensions.get('window');
const index = ({ route, navigation }) => {
  const { data } = route.params;
  const ASPECT_RATIO = width / height;
  let LATITUDE = 33.72148;
  let LONGITUDE = 73.04329;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const { coordinates, setCoordinates } = useState([
    {
      latitude: 33.738045,
      longitude: 73.0844882,
    },
    {
      latitude: 33.6961,
      longitude: 73.0491,
    },
  ],
  )
  useEffect(() => {
    console.log("data", data.lat);
    LATITUDE = data.lat;
    LONGITUDE = data.lng;

  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {data ? (
        <MapView
          initialRegion={{
            latitude:parseFloat(data.lat),
            longitude: parseFloat(data.lng),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={StyleSheet.absoluteFill}
        >


        </MapView>
      ) : (
        <MapView
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={StyleSheet.absoluteFill}
        >


        </MapView>
      )}

    </SafeAreaView>
  );
}


export default index;
