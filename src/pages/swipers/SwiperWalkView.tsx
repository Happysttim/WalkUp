import React, { useEffect, useState } from "react";
import WalkProcess from "../../components/WalkProcess";
import { Dimensions, PermissionsAndroid, StyleSheet, ToastAndroid } from "react-native";
import styled from "styled-components/native";
import DateView from "../../components/DateView";
import Kcal from "../../components/Kcal";
import StopWatch from "../../components/StopWatch";
import DistancePin from "../../components/DistancePin";
import ToggleButton from "../../components/ToggleButton";
import Toast, { ToastDuration } from "../../module/Toast";
import * as Event from "module/EventListener";
import WalkService from "module/WalkService";
import { Location } from "types/Type";
import useDatabase, { TableName, WalkOfDate, WalkOfMonth } from "hooks/useDatabase";
import convertQuote from "utils/convertQuote";
import { dateFormat } from "utils/DateFormat";

const SwiperWalkView = () => {

    const sqlite = useDatabase()();
    const [ steps, setSteps ] = useState<number>(0);
    const [ location, setLocation ] = useState<Location>();
    const [ stopwatch, setStopwatch ] = useState<number>(0);
    const [ kcal, setKcal ] = useState<number>(0);
    const [ startTime, setStartTime ] = useState<string>();
    const [ available, setAvailable ] = useState<boolean>(false);

    const permissions = [
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ];

    const haversineDistance = (lat1: number, lat2: number, long1: number, long2: number): number => {
        const R = 6371;

        const diffLat = (lat2 - lat1) * (Math.PI / 180.0);
        const diffLong = (long2 - long1) * (Math.PI / 180.0);
        const a = Math.sin(diffLat / 2) * Math.sin(diffLat / 2) + Math.cos(lat1 * (Math.PI / 180.0)) * Math.cos(lat2 * (Math.PI / 180.0)) * Math.sin(diffLong / 2) * Math.sin(diffLong / 2);
        return Math.atan2(
            Math.sqrt(a), Math.sqrt(1 - a)
        ) * 2 * R;
    };

    useEffect(() => {
        PermissionsAndroid.requestMultiple(permissions);

        Event.onError(event => {
            Toast.makeText(event.errorMessage, ToastDuration.LENGTH_SHORT);
        });

        Event.onUpdateLocation(event => {
            console.log(event.latitude, event.longitude);
            setLocation(prev => {
                return prev ? {
                    time: event.time,
                    latitude: event.latitude,
                    longitude: event.longitude,
                    distance: prev.distance + haversineDistance(prev.latitude, event.latitude, prev.longitude, event.longitude),
                } : {
                    time: event.time,
                    latitude: event.latitude,
                    longitude: event.longitude,
                    distance: 0,
                };
            });
        });

        Event.onUpdateSteps(event => {
            setSteps(event.steps);
            setKcal(event.steps * 0.04);
        });

        Event.onUpdateStopwatch(event => {
            setStopwatch(event.stopwatch);
        });
    }, []);

    useEffect(() => {
        if (!sqlite.error) {
            ToastAndroid.show("준비가 완료되었습니다.", ToastAndroid.SHORT);
            ( async() => {
                await sqlite.init();
                setAvailable(true);
            })();
        }
    }, [ sqlite ]);

    return (
        <>
            <DateView
                name="MainDate"
                format="MM.dd(kE)"
                dateStyle={sheet.dateStyle}
                viewStyle={sheet.viewStyle}
                scheduled
                expression="0 0 * * *"
                eventName="CronJobSchedule"
                onTick={undefined} />
            <WalkProcessBox>
                <WalkProcess
                    animated={false}
                    count={steps}
                    goal={2000}
                    height="auto"
                    width="auto"
                    strokeColor={"#FF9393"} />
            </WalkProcessBox>
            <InformationView>
                <Kcal
                    width="auto"
                    height="auto"
                    kcal={kcal}
                    baseColor={undefined}
                    textColor={undefined}
                    textSize={undefined} />
                <StopWatch
                    format={undefined}
                    stopwatch={stopwatch} />
                <DistancePin
                    location={location} />
            </InformationView>
            <ButtonView>
                <ToggleButton
                    start={false}
                    onChange={
                        toggle => {
                            if (toggle) {
                                setSteps(0);
                                setLocation(undefined);
                                setKcal(0);
                                setStopwatch(0);
                                setStartTime(dateFormat(new Date(), "HH:mm:ss"));
                                WalkService.startService();
                            } else {
                                WalkService.stopService();
                                if (steps > 0) {
                                    (
                                        async () => {
                                            const now = new Date();
                                            const yearMonth = convertQuote(dateFormat(now, "yyyy-MM"));
                                            const date = convertQuote(dateFormat(now, "MM-dd"));

                                            if (!sqlite.error && available) {
                                                if (await sqlite.hasRecord(TableName.DATE, `date = ${date} AND yearMonth = ${yearMonth}`) === 0) {
                                                    if (await sqlite.hasRecord(TableName.MONTH, `yearMonth = ${yearMonth}`) === 0) {
                                                        await sqlite.addRecord(
                                                            TableName.MONTH,
                                                            {
                                                                yearMonth: dateFormat(now, "yyyy-MM"),
                                                                walktime: stopwatch,
                                                                steps: steps,
                                                                kcal: kcal,
                                                                distance: (location?.distance) ?? 0,
                                                            }
                                                        );
                                                    } else {
                                                        const latestMonth = await sqlite.selectRecord<WalkOfMonth>(TableName.MONTH, undefined, `yearMonth = ${yearMonth}`);
                                                        await sqlite.updateRecord(
                                                            TableName.MONTH,
                                                            {
                                                                yearMonth: latestMonth[0].yearMonth,
                                                                walktime: latestMonth[0].walktime + stopwatch,
                                                                steps: latestMonth[0].steps + steps,
                                                                kcal: latestMonth[0].kcal + kcal,
                                                                distance: latestMonth[0].distance + (location?.distance ?? 0),
                                                            },
                                                            `yearMonth = ${yearMonth}`
                                                        );
                                                    }
                                                    await sqlite.addRecord(
                                                        TableName.DATE,
                                                        {
                                                            yearMonth: dateFormat(now, "yyyy-MM"),
                                                            date: dateFormat(now, "MM-dd"),
                                                            walktime: stopwatch,
                                                            steps: steps,
                                                            kcal: kcal,
                                                            distance: (location?.distance) ?? 0,
                                                        }
                                                    );
                                                } else {
                                                    const latestDate = await sqlite.selectRecord<WalkOfDate>(TableName.DATE, undefined, `yearMonth = ${yearMonth} AND date = ${date}`);
                                                    await sqlite.updateRecord(
                                                        TableName.DATE,
                                                        {
                                                            yearMonth: latestDate[0].yearMonth,
                                                            date: latestDate[0].date,
                                                            walktime: latestDate[0].walktime + stopwatch,
                                                            steps: latestDate[0].steps + steps,
                                                            kcal: latestDate[0].kcal + kcal,
                                                            distance: latestDate[0].distance + (location?.distance ?? 0),
                                                        },
                                                        `yearMonth = ${yearMonth} AND date = ${date}`
                                                    );
                                                }
                                                await sqlite.addRecord(
                                                    TableName.DATETIME,
                                                    {
                                                        date: dateFormat(now, "MM-dd"),
                                                        datetime: startTime ?? dateFormat(now, "HH:mm:ss"),
                                                        walktime: stopwatch,
                                                        steps: steps,
                                                        kcal: kcal,
                                                        distance: (location?.distance) ?? 0,
                                                    }
                                                );

                                                ToastAndroid.show("기록을 저장하였습니다.", ToastAndroid.SHORT);
                                            } else {
                                                ToastAndroid.show("오류로 인해 기록을 저장하지 못했습니다. 앱을 재시작 해주세요.", ToastAndroid.SHORT);
                                            }
                                        }
                                    )();
                                } else {
                                    ToastAndroid.show("걸은 기록이 있어야 저장을 할 수 있습니다!", ToastAndroid.SHORT);
                                }
                            }
                        }
                    }
                />
            </ButtonView>
        </>
    );
};

const WalkProcessBox = styled.View`
    width: 100%;
    flex: 1;
    height: auto;
    alignItems: center;
    top: -100;
`;

const InformationView = styled.View`
    marginLeft: 50;
    marginRight: 50;
    display: flex;
    flexDirection: row;
`;

const ButtonView = styled.View`
    width: 100%;
    flex: 1;
    alignItems: center;
    justifyContents: center;
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

export default SwiperWalkView;
