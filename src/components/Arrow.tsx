import React from "react";
import { GestureResponderEvent, Pressable } from "react-native";
import { Svg, Path } from "react-native-svg";

interface Props {
    direction: "left" | "right"
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined
    width?: number
    height?: number
}

const Arrow = ({ direction, onPress, width = 40, height = 40 }: Props) => {
    return (
        <Pressable onPress={onPress}>
            <Svg width={width} height={height}>
                <Path
                    d={direction === "right" ? "M36,75Q32,77,30,75L30,25Q32,23,36,25L75,47Q80,50,75,53" : "M69,75Q73,77,75,75L75,25Q73,23,69,25L30,47Q25,50,30,53" } fill="#5B5B5B" />
            </Svg>
        </Pressable>
    );
};

export default Arrow;
