import DataStore, { ColorType } from "module/DataStore";
import React from "react";
import { Dimensions, processColor, ScrollView, StyleSheet } from "react-native";
import { BarChart, Color } from "react-native-charts-wrapper";
import { Text } from "react-native-svg";
import { SelectResults } from "types/Schema";

interface Props {
    selectData: SelectResults
}

const WalkChart = ({ selectData }: Props) => {

    const stepData = selectData.data.map<number>(value => value.steps);
    const xLabels = ((): string[] => {
        if (selectData.type === "DATETIME") {
            return selectData.data.map<string>(value => value.datetime);
        } else if (selectData.type === "DATE") {
            return selectData.data.map<string>(value => `${value.date.replace("-", ".")}일`);
        } else {
            return selectData.data.map<string>(value => `${value.yearMonth}월`);
        }
    })();

    const maximumSteps = DataStore.getMaximumSteps();
    const stepMoreColor = DataStore.getColor(ColorType.MORE)!!;
    const stepCommonColor = DataStore.getColor(ColorType.COMMON)!!;
    const stepLessColor = DataStore.getColor(ColorType.LESS)!!;

    const highSteps = Math.max(...stepData);

    const barDataColors = stepData.map<Color>(value => {
        if (value < maximumSteps) {
            return processColor(stepLessColor);
        }

        if (value > maximumSteps && value === highSteps) {
            return processColor(stepMoreColor);
        }

        return processColor(stepCommonColor);
    });

    return (
        <ScrollView horizontal>
            {
                stepData.length > 0
            } ? <BarChart
                style={styled.chartStyle}
                dragEnabled={true}
                xAxis={
                    {
                        drawGridLines: false,
                        gridLineWidth: 0,
                        enabled: true,
                        valueFormatter: xLabels,
                        position: "BOTTOM",
                        textSize: 14,
                        labelCount: xLabels.length,
                        granularityEnabled: true,
                        granularity: 1,
                        drawLabels: true,
                        axisMinimum: -0.5,
                        axisMaximum: xLabels.length - 0.5,
                    }
                }
                yAxis={
                    {
                        left: {
                            drawGridLines: false,
                            enabled: false,
                            axisMaximum: highSteps + 100,
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
                            min: xLabels.length,
                            max: xLabels.length,
                        },
                    }
                }
                scaleEnabled={false}
                data={
                    {
                        dataSets: [
                            {
                                label: "walkCount",
                                values: stepData,
                                config: {
                                    colors: barDataColors,
                                    drawValues: true,
                                    visible: true,
                                    valueTextSize: 14,
                                    valueFormatter: "",
                                },
                            },
                        ],
                    }
                }/> : <Text>기록이 존재하지 않습니다.</Text>
        </ScrollView>
    );
};

const styled = StyleSheet.create({
    chartStyle: {
        width: Dimensions.get("screen").width * 2,
        height: Dimensions.get("screen").height / 2,
        borderTopColor: "white",
        borderTopWidth: 1,
        borderRightColor: "white",
        borderRightWidth: 1,
        borderBottomColor: "white",
        borderBottomWidth: 1,
        borderLeftColor: "white",
        borderLeftWidth: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
    },
    errorTextStyle: {
        fontSize: 24,
        color: "white",
    },
});

export default WalkChart;
