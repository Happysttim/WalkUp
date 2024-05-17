import React, { forwardRef, Ref, useEffect, useImperativeHandle, useState } from "react";
import {
    View,
    Text,
    type ViewStyle,
} from "react-native";
import { eventEmitter, CronJobInterface } from "../module/CronJob";
import { dateFormat } from "../utils/DateFormat";

export type DateViewRefProps = {
    getDateTime: () => Date
    startSchedule: () => void
    stopSchedule: () => void
};

interface Props {
    dateStyle: ViewStyle | undefined
    viewStyle: ViewStyle | undefined
    format:  string | undefined
    ref: Ref<DateViewRefProps> | undefined
    expression: string
    scheduled: boolean | undefined
    name: string
    eventName: string
    onTick: ((d: string) => void) | undefined
}

const DateView = forwardRef(({ dateStyle = undefined, viewStyle = undefined, format = undefined, expression, scheduled = false, name, eventName, onTick = undefined }: Props, ref: Ref<DateViewRefProps>) => {

    const [ dateTime, setDateTime ] = useState<Date>(new Date());
    const { registerCronJob, startCronJob, stopCronJob, cron, isRunning } = CronJobInterface;

    useEffect(() => {
        const listener = eventEmitter.addListener(eventName, (event: {
            datetime: string
        }) => {
            setDateTime(new Date(event.datetime));
            if (onTick) {
                onTick(event.datetime);
            }
        });

        return () => {
            listener.remove();
        };
    }, []);

    useImperativeHandle(ref, () => ({
        getDateTime(): Date {
            return dateTime;
        },
        setDateTime(d: Date) {
            setDateTime(d);
        },
        startSchedule() {
            if (!isRunning(name)) {
                cron(name);
            }
            startCronJob(name);
        },
        stopSchedule() {
            stopCronJob(name);
        },
    }));

    registerCronJob(name, expression, eventName);
    if (scheduled && !isRunning(name)) {
        startCronJob(name);
        cron(name);
    }

    return (
        <View style={ viewStyle }>
            <Text style={ dateStyle }>
                {
                    dateFormat(dateTime, format ?? "yyyy-MM-dd")
                }
            </Text>
        </View>
    );
});

export default DateView;
