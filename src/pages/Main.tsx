import React, { useRef, useState } from "react";
import SwiperPagination from "../components/SwiperPagination";
import LinearGradient from "react-native-linear-gradient";
import { Dimensions, StyleSheet, Text } from "react-native";
import isDarkness from "../utils/isDarkness";
import SwiperFlatList from "react-native-swiper-flatlist";
import styled from "styled-components/native";
import SwiperWalkView from "./swipers/SwiperWalkView";
import SwiperChartView from "./swipers/SwiperChartView";

const Main = () => {
    const swiperRef = useRef<SwiperFlatList>(null);
    const [ page, setPage ] = useState<number>(0);

    return (
        <>
            <SwiperPagination
                pageIndex={page}
                onChange={ (pageIndex: number) => {
                    setPage(pageIndex);
                    swiperRef.current?.scrollToIndex({ index: pageIndex, animated: true });
                }}/>
            <LinearGradient
                style={sheet.StatusBox}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                colors={isDarkness() ? ["#303030", "#303030", "#F2F2F2"] : ["#A0D2FF", "#A0D2FF", "#F2F2F2"]}>
                <SwiperFlatList
                    ref={swiperRef}
                    autoplay={false}
                    autoplayDelay={2}
                    autoplayLoop={false}
                    index={0}
                    onChangeIndex={
                        (item: { index: number, prevIndex: number }): void => {
                            setPage(item.index);
                        }
                    }
                >
                    <SwiperView>
                        <SwiperWalkView />
                    </SwiperView>
                    <SwiperView>
                        <SwiperChartView />
                    </SwiperView>
                    <SwiperView>
                        <Text>Hello World</Text>
                    </SwiperView>
                </SwiperFlatList>
            </LinearGradient>
        </>
    );
};

const SwiperView = styled.View`
    width: ${Dimensions.get("window").width};
    height: ${Dimensions.get("window").height - 120};
    alignItems: center;
    flex: 1;
`;

const sheet = StyleSheet.create({
    StatusBox: {
        width: "100%",
        height: "100%",
        alignItems: "center",
    },
    dateStyle: {
        color: "#9F9F9F",
        fontSize: 18,
    },
    viewStyle: {
        flex: 1,
        width: Dimensions.get("window").width,
        marginLeft: 50,
        marginTop: 30,
    },
});

export default Main;
