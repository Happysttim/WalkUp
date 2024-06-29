import { EmitterSubscription, NativeEventEmitter, NativeModules } from "react-native";
const { CronJob } = NativeModules;
const eventEmitter = new NativeEventEmitter(NativeModules.CronJob);

interface CronJobInterface {
    registerCronJob: (name: string, expression: string, eventName: string) => boolean
    startCronJob: (name: string) => boolean
    stopCronJob: (name: string) => boolean
    cron: (name: string) => Promise<boolean>
    isRunning: (name: string) => boolean
}

const CronJobEventEmitter = {
    addListener: (eventName: string, listener: (event: { datetime: string}) => void, context?: object): EmitterSubscription => eventEmitter.addListener(eventName, listener, context),
    removeAllListeners: (eventName: string): void => eventEmitter.removeAllListeners(eventName),
    listenerCount: (eventName: string): number => eventEmitter.listenerCount(eventName),
};


export { CronJobEventEmitter, CronJob as CronJobInterface };
