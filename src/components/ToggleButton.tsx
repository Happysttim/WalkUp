import React, { forwardRef, Ref, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { Svg, Circle, Rect, G, Path } from "react-native-svg";

export type ToggleButtonRef = {
    status: () => boolean
    start: () => void
    stop: () => void
}

interface Props {
    start: boolean | undefined
    onChange: ((toggle: boolean) => void) | undefined
}

const ToggleButton = forwardRef(({ start = false, onChange = undefined }: Props, ref: Ref<ToggleButtonRef>) => {

    const [ toggle, setToggle ] = useState<boolean>(start);
    const pressableRef = useRef<View>(null);

    const toggleButton = useMemo(() => {
        return (
            <Svg width="100" height="100">
                <G>
                    <Circle cx="50" cy="50" r="50" fill={ toggle ? "#9AD278" : "#FF8787" } />
                    {
                        toggle ?
                            <>
                                <Rect x="32" y="23" width="13" height="54" fill="#FFFFFF" />
                                <Rect x="56" y="23" width="13" height="54" fill="#FFFFFF" />
                            </>
                            :
                            <Path d="M30,80L30,20L80,50Z" fill="#FFFFFF" />
                    }
                </G>
            </Svg>
        );
    }, [ toggle ]);

    useImperativeHandle(ref, () => ({
        start: (): void => setToggle(true),
        stop: (): void => setToggle(false),
        status: (): boolean => toggle,
    }));

    const toggleHandler = () => {
        setToggle(_ => !toggle);
        if (onChange) {
            onChange(!toggle);
        }
    };

    return (
        <Pressable ref={pressableRef} onPress={
            () => { toggleHandler(); }
        }>
            { toggleButton }
        </Pressable>
    );
});

export default ToggleButton;
