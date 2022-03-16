import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from '../Screens/Map';
import Weather from '../Screens/Weather';;

const Stack = createNativeStackNavigator();
function index() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            initialRouteName='Weather'
            >
                <Stack.Screen name="Map" component={Map} />
                <Stack.Screen name="Weather" component={Weather} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default index;