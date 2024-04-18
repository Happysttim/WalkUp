import React from "react";
import { Svg, Path } from "react-native-svg";
import { StyleProp, ViewStyle } from "react-native";

interface Props {
    style: StyleProp<ViewStyle>
}

const IconSvg = ({style}: Props) => {
    return (
        <Svg style={style}>
            <Path d="M40,10A30,30,0,0,0,40,70A30,30,0,0,0,40,10 z" fill="white" stroke="lightgray" />
            <Path d="M29,36C30,30,23,25,20,30S29,36,29,36 z" fill="darkcyan" />
            <Path d="M29,40C23,41,20,46,23,51S30,46,29,40 z" fill="darkcyan" />
            <Path d="M33,30C31,36,31,42,32,46C34,48,37,49,40,48C45,47,51,48,54,47C57,45,56,40,45,38Q42,37,41,30 z" fill="transparent" stroke="black" stroke-width="1" />
            <Path d="M32,46Q32,49,34,50Q37,51,40,50C45,49,51,50,54,49Q56,48,55,45.5" fill="transparent" stroke="black" />
            <Path d="M33,42C33,51,40,45,41,46C39,45,35,47,34,44" fill="gray"/>
            <Path d="M46,38Q45,40,44,43M50,39.5Q49,41,48.5,43.5" fill="black" stroke="black" />
        </Svg>
    );
};

export default IconSvg;
