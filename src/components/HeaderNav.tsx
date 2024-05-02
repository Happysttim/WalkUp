import React from "react";
import {
    View,
    Pressable,
    Text,
    StyleSheet
} from "react-native";
import type { RootStackParamList } from "../types/RootStackParamList";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const HeaderNav = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={sheet.Header}>
            <Pressable onPress={() => navigation.navigate("Main") }>
                <Text>메인</Text>
            </Pressable>
        </View>
    );

};

const sheet = StyleSheet.create({
    Header: {
        width: "100%",
        height: 110,
    },
});

export default HeaderNav;
