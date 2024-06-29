import React from "react";
import {
    View,
    Text,
    type ColorValue,
    StyleSheet,
} from "react-native";
import { Svg, Circle, Text as SvgText } from "react-native-svg";
import type { Size } from "../types/Type";

interface Props {
    width: Size,
    height: Size,
    kcal: number,
    baseColor: ColorValue | undefined,
    textColor: ColorValue | undefined,
    textSize: number | undefined,
}

const Kcal = ({ width = "auto", height = "auto", kcal = 0, baseColor = "#484848", textColor = "#ffffff", textSize = 18 }: Props) => {

    const svgWidth = width === "auto" ? 50 : width;
    const svgHeight = height === "auto" ? 50 : height;
    const radius = (Math.sqrt(svgWidth * svgHeight) / 2);
    const x = svgWidth / 2;
    const y = svgHeight / 2;

    return (
        <View style={ sheet.viewStyle }>
            <Svg width={svgWidth} height={svgHeight} fill="transparent">
                <Circle cx={x} cy={y} r={radius} fill={baseColor} />
                <SvgText x="48%" y="55%" alignmentBaseline="middle" textAnchor="middle" letterSpacing="-2" fontSize={textSize} fill={textColor} fontWeight="bold">
                    kcal
                </SvgText>
            </Svg>
            <Text style={sheet.textStyle}>{ kcal.toLocaleString("en-US", { maximumFractionDigits: 1 }) }</Text>
        </View>
    );
};

const sheet = StyleSheet.create({
    viewStyle: {
        flex: 1,
        alignItems: "center",
        height: 100,
    },
    textStyle: {
        textAlign: "center",
        fontWeight: "normal",
        justifyContent: "flex-end",
    },
});

export default Kcal;
