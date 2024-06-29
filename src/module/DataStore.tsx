import { NativeModules } from "react-native";

const { DataStore } = NativeModules;

export const ColorType = {
    COMMON: 0,
    MORE: 1,
    LESS: 2,
} as const;

interface IDataStore {
    putMaximumSteps: (steps: number) => boolean
    getMaximumSteps: () => number
    putColor: (type: number, color: string) => boolean
    getColor: (type: number) => string | undefined
}

export default DataStore as IDataStore;
