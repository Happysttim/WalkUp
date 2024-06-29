import { NativeEventEmitter, NativeModules } from "react-native";

const eventEmitter = new NativeEventEmitter(NativeModules.EventListener);

export const onError = (listener: (event: { errorMessage: string }) => void) => {
    eventEmitter.addListener("onError", listener);
};

export const onUpdateStopwatch = (listener: (event: { stopwatch: number }) => void) => {
    console.log("Listener: " + eventEmitter.listenerCount("onUpdateStopwatch"));
    eventEmitter.addListener("onUpdateStopwatch", listener);
};

export const onUpdateSteps = (listener: (event: { steps: number }) => void) => {
    eventEmitter.addListener("onUpdateSteps", listener);
};

export const onUpdateLocation = (listener: (event: { latitude: number, longitude: number, time: string }) => void) => {
    eventEmitter.addListener("onUpdateLocation", listener);
};
