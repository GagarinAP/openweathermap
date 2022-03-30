import React from 'react';
import { useSelector } from "react-redux";
import { selectThemeType } from "../store/theme"
import { PaletteType, light, dark } from '../styles/palette';

export const ThemeContext = React.createContext<{ colors: PaletteType }>({ colors: light });

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const themeType = useSelector(selectThemeType);
    const isDarkMode = themeType === 'dark';
    const theme = {
        colors: isDarkMode ? dark : light,
    };
    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;