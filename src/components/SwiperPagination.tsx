import React from "react";
import {
    StyleSheet,
} from "react-native";
import isDarkness from "../utils/isDarkness";
import styled from "styled-components/native";
import { Page } from "../types/Type";

interface Props {
    pageIndex: number
    onChange: (pageIndex: number) => void
}

const pages: Page[] = [
    {
        pageIndex: 0,
        label: "만보기",
    },
    {
        pageIndex: 1,
        label: "차트",
    },
    {
        pageIndex: 2,
        label: "옵션",
    },
];

const SwiperPagination = ({ pageIndex, onChange }: Props) => {
    return (
        <Header>
            <Container>
                {
                    pages.map(page => {
                        return (
                            <Tab style={ pageIndex === page.pageIndex ? sheet.Selected : {}} onPress={ () => onChange(page.pageIndex) } key={page.pageIndex}>
                                <SwiperText style={ pageIndex === page.pageIndex ? sheet.SelectedText : {}}>{page.label}</SwiperText>
                            </Tab>
                        );
                    })
                }
            </Container>
        </Header>
    );
};

const Tab = styled.Pressable`
    flex: 1;
    marginRight: 10;
    paddingTop: 2;
    paddingBottom: 2;
    paddingLeft: 5;
    paddingRight: 5;
    borderTopLeftRadius: 20;
    borderTopRightRadius: 20;
    borderBottomLeftRadius: 20;
    borderBottomRightRadius: 20;
    backgroundColor: transparent;
`;

const SwiperText = styled.Text`
    textAlign: center;
    color: #A7A7A7;
`;

const Container = styled.View`
    width: 250;
    flexDirection: row;
    display: flex;
    marginLeft: auto;
    marginRight: auto;
    marginTop: auto;
    marginBottom: auto;
`;

const Header = styled.View`
    width: 100%;
    height: 120;
    backgroundColor: ${isDarkness() ? "#303030" : "#A0D2FF"};
    flexDirection: row;
`;

const sheet = StyleSheet.create({
    Selected: {
        backgroundColor: isDarkness() ? "#D1D1D1" : "#67ADFF",
    },
    SelectedText: {
        color: "#000000",
    },
});

export default SwiperPagination;
