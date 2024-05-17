import React, { useRef, useState } from "react";
import SwiperPagination from "../components/SwiperPagination";
import WalkProcess from "../components/WalkProcess";
import LinearGradient from "react-native-linear-gradient";
import { Dimensions, StyleSheet, Text } from "react-native";
import isDarkness from "../utils/isDarkness";
import SwiperFlatList from "react-native-swiper-flatlist";
import styled from "styled-components/native";
import DateView from "../components/DateView";

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
                        <WalkProcess
                            animated={false}
                            count={10}
                            goal={1000}
                            height="auto"
                            width="auto"
                            strokeColor={"#FF9393"} />
                    </SwiperView>
                    <SwiperView>
                        <DateView
                            name="MainDate"
                            format="MM.dd(kE)"
                            scheduled
                            dateStyle={undefined}
                            viewStyle={undefined}
                            expression="* * * 1 * 0o"
                            eventName="CronJobSchedule"
                            onTick={undefined} />
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
    justifyContent: center;
    alignItems: center;
    flex: 1;
`;

const sheet = StyleSheet.create({
    StatusBox: {
        width: "100%",
        height: 390,
        alignItems: "center",
    },
});

export default Main;
