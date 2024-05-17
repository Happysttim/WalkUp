import { NativeEventEmitter, NativeModules } from "react-native";
const { CronJob } = NativeModules;

interface CronJobInterface {
    registerCronJob: (name: string, expression: string, eventName: string) => boolean
    startCronJob: (name: string) => boolean
    stopCronJob: (name: string) => boolean
    cron: (name: string) => Promise<boolean>
    isRunning: (name: string) => boolean
}


const eventEmitter = new NativeEventEmitter(NativeModules.CronJob);

export { eventEmitter, CronJob as CronJobInterface };
