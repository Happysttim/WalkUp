import React from "react";
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import IconSvg from "./svg/Icon";

const App = () => {
    return (
        <View style={styled.center}>
            <View style={styled.titleView}>
                <Text style={styled.titleWalk}>
                    Walk
                </Text>
                <View style={styled.underView}>
                    <IconSvg style={styled.icon} />
                    <Text style={styled.titleUp}>
                        Up
                    </Text>
                </View>
            </View>
            <ActivityIndicator size="small" color="#535353" />
            <Text style={styled.statusText}>초기 설정 중 입니다.</Text>
        </View>
    );
};

const styled = StyleSheet.create({
    center: {
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
    },
    titleView: {
        width: 170,
        marginBottom: 60,
        display: "flex",
        flexDirection: "column",
    },
    titleWalk: {
        width: "100%",
        fontSize: 60,
        fontWeight: "200",
        textAlign: "left",
    },
    titleUp: {
        fontSize: 60,
        fontWeight: "200",
        flex: 1,
    },
    underView: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
    },
    icon: {
        width: 80,
        height: 80,
    },
    statusText: {
        color: "darkgray",
        fontWeight: "bold",
        fontSize: 14,
    },
});

export default App;
