import React from "react";
import styled from "styled-components/native";

interface Props {
    name: string
    selected: boolean
}

const ChartType = ({ name, selected = false }: Props) => {
    return (
        selected ? <SelectedView>
            <NameText>{name}</NameText>
        </SelectedView> : <CommonView>
            <NameText>{name}</NameText>
        </CommonView>
    );
};

const SelectedView = styled.View`
    paddingTop: 4;
    paddingBottom: 4;
    paddingLeft: 4;
    paddingRight: 4;
    backgroundColor: lightgray;
`;

const CommonView = styled.View`
    paddingTop: 4;
    paddingBottom: 4;
    paddingLeft: 4;
    paddingRight: 4;
`;

const NameText = styled.Text`
    fontStyle: bold;
    fontSize: 14;
`;

export default ChartType;
