import React from "react";
import { Svg, Circle, Text as SvgText, Defs } from "react-native-svg";
import { Dimensions, type ColorValue } from "react-native";
import type { Size } from "../types/Type";

interface Props {
    width: Size,
    height: Size,
    count: number,
    goal: number,
    strokeColor: ColorValue,
    animated: boolean,
}

const WalkProcess = ({ width, height, count, goal, strokeColor, animated = false }: Props) => {
    const dimensionWidth = 200; //Dimensions.get("window").width = 50;
    const svgWidth = width === "auto" ? dimensionWidth : width;
    const svgHeight = height === "auto" ? dimensionWidth : height;
    const radius = (Math.sqrt(svgWidth * svgHeight) / 2) - 20;
    const x = svgWidth / 2;
    const y = svgHeight / 2;

    return (
        <Svg width={svgWidth} height={svgHeight} fill="transparent">
            <Circle cx={x} cy={y} r={radius} fill="white" />
            <Circle cx={x} cy={y} r={radius} fill="transparent" stroke="#D9D9D9" strokeWidth="10" strokeDashoffset="580" strokeDasharray="970" strokeLinecap="round" transform="rotate(130 100.19 99.982)" />
            <Circle cx={x} cy={y} r={radius} fill="transparent" stroke={strokeColor} strokeWidth="10" strokeDashoffset="580" strokeDasharray={Math.min(580 + ((count / goal * 68) * 390 / 68), 970)} strokeLinecap="round" transform="rotate(130 100.19 99.982)" />
            <SvgText x="50%" y="50%" alignmentBaseline="middle" textAnchor="middle" letterSpacing="-2" fontSize="40" fill="black" fontWeight="bold">
                { count }
            </SvgText>
        </Svg>
    );
};

export default WalkProcess;
