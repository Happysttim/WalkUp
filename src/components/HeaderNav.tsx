import React from "react";
import {
    View,
    Pressable,
    StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HeaderNav = () => {
    
    const navigation = useNavigation();

    return (
        <View>

        </View>
    );

};

const sheet = StyleSheet.create({
    Header: {
        width: "100%",
        height: 110,
    }
});

export default HeaderNav;
