import React from 'react';
import {
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { useSelector } from "react-redux";
import { selectThemeType } from "../store/theme";
import GeoLocation from "./GeoLocation";
import Main from "./Main";
import useTheme from "../hooks/useTheme";

const Screens = () => {
    const theme = useTheme();
    const type = useSelector(selectThemeType);
    const isDarkMode = type === 'dark';

    const backgroundStyle = {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <GeoLocation />
            <Main />
        </SafeAreaView>
    );
};


export default Screens;
