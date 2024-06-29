import React from "react";
import { Svg, Rect, Circle, Line, G } from "react-native-svg";
import { StringMap } from "../types/Type";
import { StyleSheet, Text, View } from "react-native";

interface Props {
    format: string | undefined
    stopwatch: number
}

const StopWatch = ({ format = "HH:mm:ss", stopwatch = 0 }: Props) => {

    const hours = Math.floor(stopwatch / 60 / 60);
    const minutes = Math.floor(stopwatch / 60) % 60;
    const seconds = stopwatch % 60;

    const timeFormat: StringMap = {
        HH: hours.toLocaleString("en-US", { minimumIntegerDigits: 2 }),
        H: hours.toString(),
        mm: minutes.toLocaleString("en-US", { minimumIntegerDigits: 2 }),
        m: minutes.toString(),
        ss: seconds.toLocaleString("en-US", { minimumIntegerDigits: 2 }),
        s: seconds.toString(),
    };

    return (
        <View style={ sheet.viewStyle }>
            <Svg width="50" height="50">
                <G stroke="#000000" strokeWidth="0.5" fill="#D9D9D9">
                    <Rect width="10" height="4" x="20" y="0" />
                    <Rect width="6" height="6" x="22" y="4" />
                    <Circle cx="25" cy="28" r="21" />
                    <Circle cx="25" cy="28" r="1" fill="#000000" />
                    <Line x1="25" y1="28" x2="25" y2="10" strokeWidth="1" strokeLinecap="round" />
                    <Line x1="25" y1="28" x2="35" y2="40" strokeWidth="1" strokeLinecap="round" />
                </G>
            </Svg>
            <Text style={sheet.textStyle}>
                { (format ?? "HH:mm:ss").replace(/(HH|mm|ss|H|m|s)/gi, (m: string) => {
                    return timeFormat[m];
                })
                }
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
});

export default StopWatch;
