import React, {useEffect, useState} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    TextInput,
    ActivityIndicator
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {
    getCurrentWeather,
    selectCurrentWeather,
    selectCurrentWeatherLoading,
    selectForecastWeather, selectForecastWeatherLoading
} from "../store/weather";
import {selectThemeType, setThemeType} from "../store/theme";
import useThemedStyles from "../hooks/useThemeStyles";
import {PaletteType} from "../styles/palette";
import useTheme from "../hooks/useTheme";

const Section: React.FC<{ title: string; }> = ({children, title}) => {
    const currentLoading = useSelector(selectCurrentWeatherLoading);
    const forecastLoading = useSelector(selectForecastWeatherLoading);
    const isLoad = currentLoading || forecastLoading;
    const style = useThemedStyles(styles);
    const isArray = Array.isArray(children);
    const Children = isArray ? <View>{children}</View> : <Text style={style.sectionDescription}>{children}</Text>;
    return (
        <View style={style.sectionContainer}>
            <Text style={style.sectionTitle}>
                {title}
            </Text>
            {isLoad ? <ActivityIndicator /> : Children}
        </View>
    );
};

const Main = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const isDarkModePhone = useColorScheme() === 'dark';
    const forecast = useSelector(selectForecastWeather);
    const themeType = useSelector(selectThemeType);
    const current = useSelector(selectCurrentWeather);
    const isDarkMode = themeType === 'dark';
    const style = useThemedStyles(styles);
    const theme = useTheme();
    const handleSetPhoneTheme = () => dispatch(setThemeType(isDarkModePhone ? "light" : "dark"));
    const handleSetTheme = () => dispatch(setThemeType(isDarkMode ? "light" : "dark"));
    useEffect(() => {
        dispatch(setThemeType(current.temp <= 0 ? "Dark" : "Light"));
    }, [current]);
    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={style.buttonsView}>
                <TouchableOpacity style={style.btn} onPress={handleSetPhoneTheme}>
                    <Text style={style.text}>Phone Theme</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.btn} onPress={handleSetTheme}>
                    <Text style={style.text}>Set {isDarkMode ? "Light" : "Dark"}</Text>
                </TouchableOpacity>
            </View>
            <View style={style.inputView}>
                <TextInput
                    placeholder="City"
                    placeholderTextColor={theme.colors.background.system}
                    style={style.input}
                    value={value}
                    onChangeText={e => setValue(e)}
                    onSubmitEditing={() => dispatch(getCurrentWeather({ q: value }))}
                />
                {Boolean(value) && (
                    <TouchableOpacity style={style.btnX} onPress={() => setValue("")}>
                        <Text style={style.text}>x</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={style.locationView}>
                <Section title="Current location: ">
                    <Text>{current.name}</Text>
                </Section>
                <Section title="Current temp: ">
                    <Text>{current?.temp?.toFixed()}°C</Text>
                </Section>
            </View>
            <View style={style.locationView}>
                <Section title="Forecast daily: ">
                    {forecast?.daily?.map((e) => (
                        <View key={e.dt} style={style.row}>
                            <Text style={style.textFlex}>{moment.unix(e.dt).format("MMMM DD, YYYY")}</Text>
                            <Text style={style.textFlex}>Temp: {e.temp.day.toFixed()}°C</Text>
                        </View>
                    ))}
                </Section>
            </View>
            <View style={style.locationView}>
                <Section title="Forecast hourly: ">
                {forecast?.hourly?.map((e) => (
                    <View key={e.dt} style={style.row}>
                        <Text style={style.textFlex}>{moment.unix(e.dt).format("MMMM DD, YYYY HH:mm")}</Text>
                        <Text style={style.textFlex}>Temp: {e.temp.toFixed()}°C</Text>
                    </View>
                ))}
                </Section>
            </View>
        </ScrollView>
    );
};

const styles = (theme: { colors: PaletteType }) => StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputView: {
        margin: 10,
    },
    input: {
        height: 45,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: theme.colors.text.primary,
        fontSize: 16,
        fontWeight: '400',
        color: theme.colors.text.primary,
    },
    textFlex: {
        flex: 1,
        color: theme.colors.text.primary,
    },
    btnX: {
        position: "absolute",
        top: 2,
        right: 2,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background.primary,
    },
    btn: {
        borderRadius: 3,
        marginHorizontal: 10,
        flex: 1,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background.primary,
        borderWidth: 1,
        borderColor: theme.colors.background.secondary,
    },
    text: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.text.primary,
    },
    locationView: {
        backgroundColor: theme.colors.background.primary,
    },
    buttonsView: {
        flex: 1, flexDirection: "row", justifyContent: "space-between"
    },
    background: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
    },
    sectionContainer: {
        padding: 10,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },
    sectionDescription: {
        fontSize: 18,
        fontWeight: '400',
        color: theme.colors.text.primary,
    },
    highlight: {
        fontWeight: '700',
    },
});

export default Main;
