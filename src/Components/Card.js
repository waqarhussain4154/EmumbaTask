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
const { width, height } = Dimensions.get("window");

const Card = (props) => {
    var iconUrl = "http://openweathermap.org/img/w/" + props.icon + ".png";
    var kelvinValue = props.temp;
    var kToCel = (kelvinValue - 273.15);

    var fkelvinValue = props.feels_like;
    var fkToCel = (fkelvinValue - 273.15);

    useEffect(() => {

    }, []);
    return (
        <View style={{ borderRadius: 20, height: height * 0.29, width: width * 0.54, paddingHorizontal: 10, backgroundColor: 'rgba(95, 109, 242,0.8)', justifyContent: 'center' }}>
            {props ? (
                <>
                    <View style={{ paddingVertical: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={styles.textHeading}>Temprature</Text>
                            <Text style={styles.text}>{kToCel?.toLocaleString()} °C</Text>
                        </View>
                        <Image
                            style={{
                                width: 50,
                                height: 50,
                            }}
                            source={{
                                uri: iconUrl,
                            }}
                        />
                    </View>
                    <View style={{ paddingVertical: 2 }}>
                        <Text style={styles.textHeading}>Temprature Feel Like</Text>
                        <Text style={styles.text}>{fkToCel?.toLocaleString()} °C</Text>
                    </View>
                    <View style={{ paddingVertical: 2 }}>
                        <Text style={styles.textHeading}>Description</Text>
                        <Text style={styles.text}>{props?.description ? props?.description : '---'}</Text>
                    </View>
                    <View style={{ paddingVertical: 2 }}>
                        <Text style={styles.textHeading}>Date</Text>
                        <Text style={styles.text}>
                            {dayjs(props?.dt_txt).format(
                                'DD MMMM YYYY hh:mm a',
                            )}
                        </Text>
                    </View>

                </>
            ) : <Text>No Data</Text>}
        </View>
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
    }

});


export default Card;
