import { NativeModules } from "react-native";

const { WalkService } = NativeModules;

interface IWalkService {
    startService: () => boolean
    stopService: () => void
}

export default WalkService as IWalkService;
