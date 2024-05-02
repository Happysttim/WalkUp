import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RNBootSplash from "react-native-bootsplash";
import type { RootStackParamList } from "./types/RootStackParamList";
import Main from "./page/Main";

const App = () => {
    useEffect(() => {
        setTimeout(() => {
            RNBootSplash.hide({ fade: true }).then(() => {
                console.log("Splash Image Successful");
            });
        }, 1000);
    }, []);

    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Main" component={Main}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
