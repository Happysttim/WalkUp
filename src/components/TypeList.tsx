import React from "react";
import styled from "styled-components/native";

interface Props {
    children: React.ReactNode
}

const TypeList = ({ children }: Props) => {
    if (React.Children.count(children) > 0) {
        return (
            React.Children.map(children, (child, idx) => {
                return (
                    <>
                        { child }
                        {
                            (idx === React.Children.count(children) - 1) ?
                                <></> : <RightBorderView />
                        }
                    </>
                );
            })
        );
    }

    return (
        <></>
    );
};

const RightBorderView = styled.View`
    borderRightColor: #5B5B5B;
    borderRightWidth: 2;
`;

export default TypeList;
