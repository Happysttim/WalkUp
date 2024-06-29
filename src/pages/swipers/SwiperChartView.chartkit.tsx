import React, { useRef, useState } from "react";
import { Animated, Dimensions, GestureResponderEvent, ScrollView, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { ChartConfig, ChartData } from "react-native-chart-kit/dist/HelperTypes";
import { openDatabase } from "react-native-sqlite-storage";

type GestureHandler = {
    event: GestureResponderEvent
    type: "START",
} | {
    event: GestureResponderEvent
    type: "END",
} | {
    event: GestureResponderEvent
    type: "MOVE",
}

const SwiperChartView = () => {

    const [ offsetX, setOffsetX ] = useState<number>(0);
    const [ isMove, setIsMove ] = useState<boolean>(false);

    const chartAnimated = useRef(new Animated.Value(0)).current;

    const dataset: ChartData = {
        labels: ["월", "화", "수", "목", "금", "토", "일", "A", "B", "C", "D", "E", "F"],
        datasets: [
            {
                data: [10, 20, 30, 40, 50, 60, 70],
                colors: [
                    (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                    (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
                    (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                ],
            },
        ],
    };

    const chartConfig: AbstractChartConfig = {
        backgroundColor: "transparent",
        backgroundGradientFrom: "white",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "white",
        backgroundGradientToOpacity: 0,
        decimalPlaces: 1,
        barPercentage: 0.2,
        barRadius: 5,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        useShadowColorFromDataset: false,
        formatYLabel: (yLabel: string) => parseInt(yLabel, 10).toString(),
    };

    // const touchHandler = (handler: GestureHandler) => {
    //     if (handler.type === "START") {
    //         setIsMove(true);
    //         handler.event.
    //     }
    // };

    return (
        <>
            <Animated.ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                contentOffset={{x: chartAnimated, y: 0}}>
                <BarChart
                    data={dataset}
                    height={500}
                    width={1000}
                    yAxisLabel=""
                    yAxisSuffix=""
                    fromZero={true}
                    chartConfig={chartConfig}
                    flatColor={true}
                    withCustomBarColorFromData={true}
                    showBarTops={true}
                    showValuesOnTopOfBars={true}
                />
            </Animated.ScrollView>
        </>
    );
};

// export default SwiperChartView;
