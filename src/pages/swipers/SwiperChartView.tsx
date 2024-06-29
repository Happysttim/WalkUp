import React from "react";
import { Dimensions, processColor, ScrollView, View } from "react-native";
import { BarChart } from "react-native-charts-wrapper";

const SwiperChartView = () => {

    const chartData = {

    };

    return (
        // eslint-disable-next-line react-native/no-inline-styles
        <ScrollView horizontal style={{
            borderTopColor: "white",
            borderTopWidth: 2,
            borderLeftColor: "white",
            borderLeftWidth: 2,
            borderRightColor: "white",
            borderRightWidth: 2,
            borderBottomColor: "white",
            borderBottomWidth: 2,
        }}>
            <BarChart
                style={{
                    width: Dimensions.get("window").width - 50,
                    height: Dimensions.get("window").height - 200,
                }}
                legend={{
                    enabled: false,
                }}
                dragEnabled={true}
                xAxis={
                    {
                        drawGridLines: false,
                        gridLineWidth: 0,
                        enabled: true,
                        gridColor: processColor("gray"),
                        valueFormatter: ["월", "화", "수", "목", "금", "토", "일", "월월", "화화", "수수", "목목","금금", "토토", "일일"],
                        position: "BOTTOM",
                        textSize: 14,
                        labelCount: 14,
                        granularityEnabled: true,
                        granularity: 1,
                        drawLabels: true,
                        axisMinimum: -0.5,
                        axisMaximum: 13.5,
                    }
                }
                scaleEnabled={false}
                yAxis={
                    {
                        left: {
                            drawGridLines: false,
                            enabled: false,
                            axisMaximum: 10,
                        },
                        right: {
                            drawGridLines: false,
                            enabled: false,
                        },
                    }
                }
                chartDescription={
                    {
                        text: "",
                    }
                }
                visibleRange={
                    {
                        x: {
                            min: 7,
                            max: 7,
                        },
                    }
                }
                data={{dataSets:[
                    {
                        label: "demo",
                        values: [{y: 1}, {y: 2}, {y: 1}],
                        config: {
                            drawValues: true,
                            visible: true,
                            valueTextSize: 14,
                            valueFormatter: "",
                        },
                    },
                ]}}/>
        </ScrollView>
    );
};

export default SwiperChartView;
