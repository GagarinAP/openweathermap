import React, { useEffect } from 'react';
import {
    Platform,
    ToastAndroid,
    PermissionsAndroid,
    Linking,
    Alert,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useDispatch} from "react-redux";
import {setGeoLocation} from "../store/location";
import {getCurrentWeather} from "../store/weather";

const GeoLocation = () => {
    const dispatch = useDispatch();

    const hasPermissionIOS = async () => {
        const openSetting = () => {
            Linking.openSettings().catch(() => {
                Alert.alert('Unable to open settings');
            });
        };
        const status = await Geolocation.requestAuthorization('whenInUse');

        if (status === 'granted') {
            return true;
        }

        if (status === 'denied') {
            Alert.alert('Location permission denied');
        }

        if (status === 'disabled') {
            Alert.alert(
                `Turn on Location Services to allow to determine your location.`,
                '',
                [
                    { text: 'Go to Settings', onPress: openSetting },
                    { text: "Don't Use Location", onPress: () => {} },
                ],
            );
        }

        return false;
    };

    const hasLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            const hasPermission = await hasPermissionIOS();
            return hasPermission;
        }

        if (Platform.OS === 'android' && Platform.Version < 23) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show(
                'Location permission denied by user.',
                ToastAndroid.LONG,
            );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show(
                'Location permission revoked by user.',
                ToastAndroid.LONG,
            );
        }

        return false;
    };

    const getLocation = async () => {
        const hasPermission = await hasLocationPermission();

        if (!hasPermission) {
            return;
        }

        Geolocation.getCurrentPosition(
            (position) => {
                dispatch(setGeoLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }));
                dispatch(getCurrentWeather({ lat: position.coords.latitude, lon: position.coords.longitude }));
            },
            (error) => {
                Alert.alert(`Code ${error.code}`, error.message);
                dispatch(setGeoLocation({ longitude: null, latitude: null }));
            },
            {
                accuracy: {
                    android: 'high',
                    ios: 'best',
                },
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
                distanceFilter: 0,
                forceRequestLocation: true,
                forceLocationManager: false,
                showLocationDialog: true,
            },
        );
    };

    useEffect(() => {
        getLocation();
    }, []);

    return null;
};

export default GeoLocation;
