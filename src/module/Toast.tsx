import { NativeModules } from "react-native";
const { Toast } = NativeModules;

export const ToastDuration = {
    LENGTH_SHORT: 0 as const,
    LENGTH_LONG: 1 as const,
};

export const GravityValue = {
    NO_GRAVITY: 0x0000 as const,
    AXIS_SPECIFIED: 0x0001 as const,
    AXIS_PULL_BEFORE: 0x0002 as const,
    AXIS_PULL_AFTER: 0x0004 as const,
    AXIS_CLIP: 0x0008 as const,
    AXIS_X_SHIFT: 0 as const,
    AXIS_Y_SHIFT: 4 as const,
    DISPLAY_CLIP_VERTICAL: 0x10000000 as const,
    DISPLAY_CLIP_HORIZONTAL: 0x01000000 as const,
    top: (): number => (GravityValue.AXIS_PULL_BEFORE | GravityValue.AXIS_SPECIFIED) << 4,
    bottom: (): number => (GravityValue.AXIS_PULL_AFTER | GravityValue.AXIS_SPECIFIED) << GravityValue.AXIS_Y_SHIFT,
    left: (): number => (GravityValue.AXIS_PULL_BEFORE | GravityValue.AXIS_SPECIFIED) << GravityValue.AXIS_X_SHIFT,
    right: (): number => (GravityValue.AXIS_PULL_AFTER | GravityValue.AXIS_SPECIFIED) << GravityValue.AXIS_X_SHIFT,
    centerVertical: (): number => GravityValue.AXIS_SPECIFIED << GravityValue.AXIS_Y_SHIFT,
    fillVertical: (): number => GravityValue.top() | GravityValue.bottom(),
    centerHorizontal: (): number => GravityValue.AXIS_SPECIFIED << GravityValue.AXIS_X_SHIFT,
    fillHorizontal: (): number => GravityValue.left() | GravityValue.right(),
    center: (): number => GravityValue.centerVertical() | GravityValue.centerHorizontal(),
    fill: (): number => GravityValue.fillHorizontal() | GravityValue.fillVertical(),
    clipVertical: (): number => GravityValue.AXIS_CLIP << GravityValue.AXIS_Y_SHIFT,
    clipHorizontal: (): number => GravityValue.AXIS_CLIP << GravityValue.AXIS_X_SHIFT,
};

interface ToastInterface {
    makeText: (message: string, duration: number) => void
    makeTextColor: (message: string, duration: number, rgb: string) => void
    makeTextDetail: (message: string, duration: number, rgb: string) => void
}

export default Toast as ToastInterface;
