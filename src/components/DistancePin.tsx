import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Svg, Path, Circle, Line } from "react-native-svg";
import { Location } from "types/Type";

interface Props {
    location: Location | undefined
}

const DistancePin = ({ location }: Props) => {
    return (
        <View style={ sheet.viewStyle }>
            <Svg width="50" height="50" viewBox="0 0 50 50">
                <Path d="M2,15L8,27L13,15ZM2,14A1,1,0,0,0,13,14ZA2,2,0,0,1,13,14" fill="#000000" />
                <Circle cx="7.5" cy="14" r="3" fill="white" />
                <Path d="M35,30L39,40L43,30ZM35,29A1,1,0,0,0,43,29ZA2,2,0,0,1,43,29" fill="black" />
                <Circle cx="39" cy="29" r="2" fill="white" />
                <Line x1="8" y1="27" x2="39" y2="40" stroke="black" strokeLinecap="round" strokeDashoffset="6" strokeDasharray="2" />
            </Svg>
            <Text style={ sheet.textStyle }>
                {
                    location ? location.distance.toLocaleString("en-US", { minimumFractionDigits: 3 }) : 0
                }
                <Text style={ sheet.kmStyle }>km</Text>
            </Text>
        </View>
    );
};

const sheet = StyleSheet.create({
    viewStyle: {
        flex: 1,
        alignItems: "center",
    },
    textStyle: {
        textAlign: "center",
        fontWeight: "normal",
    },
    kmStyle: {
        fontSize: 12,
    },
});

export default DistancePin;
