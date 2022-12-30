import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Pressable, TouchableHighlight} from 'react-native';
import { Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { getcity, getweather } from './components/data';
import { displayLocalTime } from './components/datetime';
import Bubble from './components/bubble';
import * as Location from 'expo-location';
import { store } from './components/storage';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import LocationPanel from './components/LocationPanel';
import WeatherForecast from './components/ForecastWeather';
import WeatherForecastHourly from './components/ForecastWeatherHourly';
import WindForecast from './components/ForecastWind';
import HumidityForecast from './components/ForecastHumidity';
import AirForecast from './components/ForecastAir';
import { useTheme, useToggleTheme, ThemeProvider } from './components/theme';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
import * as NavigationBar from 'expo-navigation-bar';
import LoadingAnimation from './components/Loading';
// import * as Sentry from 'sentry-expo';
// Sentry.init({
//   dsn: 'https://c874f7e0f952484d92b66d311674b5b8@o4504065763835904.ingest.sentry.io/4504304879468544',
//   enableInExpoDevelopment: true,
//   debug: true,
// });

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Home({ navigation }) {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();
  const [loading, setLoading] = useState(true);
  const [clock, setClock] = useState({date:'', time:'0:00'});
  const [night, setNight] = useState(false);
  const [location, setLocation] = useState({name:'-', lat:null, lon:null});
  const [weather, setWeather] = useState({});

  const homestyle = StyleSheet.create({
    page: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.colors.text,
      backgroundColor: theme.colors.background,
    },
    touchlocation:{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 30,
    },
    location: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: theme.colors.border,
    },
    locationicon: {
      borderRightWidth:1,
      borderRightColor:theme.colors.border,
      paddingRight:8,
    },
    locationText: {
      color: theme.colors.text,
      fontSize: 23,
      marginLeft:10,
    },

    time: {
      color: theme.colors.text,
      fontSize: 20,      
    },

    bubblearea: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: 20,
    },
    touch: {
      margin: 6,
      width: 190,
      height: 190,
      marginVertical: 10,
      borderRadius: 60,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.backgroundSecondary,
    },
  });

  useEffect(()=>{
    (async () => {
      await NavigationBar.setBackgroundColorAsync(theme.colors.background);
      theme.name == 'light'? await NavigationBar.setButtonStyleAsync('dark') : await NavigationBar.setButtonStyleAsync('light');  
      })();
  }, [theme])
  
  // get location store from storage. If it is empty, then ask for location permission and set current location. Otherwise, display los angeles weather.
  useEffect(() => {
    (async() => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          showMessage({
            message: "Permission to access location was denied",
            type: "warning",
            statusBarHeight:50,
            duration:5000,
            titleStyle:{fontSize:18},
          })
          const fallback_loc = {name:"Los Angeles", lat:34.0522, lon:-118.2437};
          setLocation(fallback_loc);
          store('@location', fallback_loc);
          return;
        }
        const user_geoinfo = await Location.getCurrentPositionAsync({});
        let user_loc = await getcity(user_geoinfo.coords.latitude, user_geoinfo.coords.longitude);
        setLocation(user_loc);
        await store('@location', user_loc);
    })();
  }, [])

  // when the location state changes, update weather data
  const update = async () => {
    try {
      const data = await getweather(lat=location.lat, lon=location.lon);
      setWeather(data);
      if (data.time < data.sunrise || data.time > data.sunset){setNight(true)}
      else {setNight(false)}

      const dt = Math.floor(Date.now() / 1000);
      const local_time = displayLocalTime(dt, data.timezone_offset);
      setClock(local_time);

    } catch (error) {
      showMessage({
        message: "Unable to fetch weather data. Check your network connection.",
        type: "danger",
        statusBarHeight:50,
        duration:5000,
        titleStyle:{fontSize:18},
      })
    }
  }

  const displaytime = () => {
    const dt = Math.floor(Date.now() / 1000);
    const local_time = displayLocalTime(dt, weather.timezone_offset);
    setClock(local_time);
  }

  useEffect(() => {
    update();
  },[location]);

  useEffect(() => {
    if (!isEmpty(weather)) {
      setLoading(false);  
    }
  }, [weather]);

  useInterval(update, 60000); // fetch weather data every 60 * 1s (1000 ms) = 1 min
  useInterval(displaytime, 1000);  // update clock every 1s

  return (
    <View style={homestyle.page}>
      <StatusBar translucent style={theme.name == 'light' ? 'dark' : 'light'} />

      <Pressable android_ripple={{color:theme.colors.ripple, borderless:true}} style={{position:"absolute", bottom:20}} onPress={()=>toggleTheme(theme)} hitSlop={50}>
        {theme.name == "light"? 
        <MaterialCommunityIcons name="weather-sunny" size={33} color={theme.colors.text} /> :
        <Feather name="moon" size={30} color={theme.colors.text} />
        }
      </Pressable>

      <View style={{flexDirection:"row"}}>
      <TouchableHighlight style={homestyle.touchlocation} activeOpacity={1} underlayColor={theme.colors.highlight} onPress={()=>navigation.navigate('location', {setLocation:setLocation, setLoading:setLoading})}>
        <View style={homestyle.location}>
        <Text style={homestyle.locationicon}><MaterialCommunityIcons name="map-marker" size={24} color={theme.colors.text} /></Text>
        <Text style={homestyle.locationText}>{location.name}</Text>
        <Entypo name="chevron-small-right" size={24} color={theme.colors.textSecondary} />
        </View>
      </TouchableHighlight>
      </View>

      <View style={homestyle.bubblearea}>

      <TouchableHighlight disabled={loading} style={homestyle.touch} activeOpacity={0.6} underlayColor={theme.colors.highlight} onPress={()=>navigation.navigate('hourly-forecast', {loc:location.name, data:weather.hourly})}>
      {loading? <LoadingAnimation/> : <Bubble type={'temp'} value={weather.temp} />}
      </TouchableHighlight>

      <TouchableHighlight disabled={loading} style={homestyle.touch} activeOpacity={0.6} underlayColor={theme.colors.highlight} onPress={()=>navigation.navigate('forecast', {loc:location.name, data:weather.daily})}>
      {loading? <LoadingAnimation/> : <Bubble type={'condition'} value={weather.condition} night={night} />}
      </TouchableHighlight>

      <TouchableHighlight disabled={loading} style={homestyle.touch} activeOpacity={0.6} underlayColor={theme.colors.highlight} onPress={()=>navigation.navigate('wind', {loc:location.name, data:weather.daily})}>
      {loading? <LoadingAnimation/> : <Bubble type={'wind'} value={weather.wind} />}
      </TouchableHighlight>

      <TouchableHighlight disabled={loading} style={homestyle.touch} activeOpacity={0.6} underlayColor={theme.colors.highlight} onPress={()=>navigation.navigate('humidity', {loc:location.name, data:weather.daily})}>
        {loading? <LoadingAnimation/> : <Bubble type={'humidity'} value={weather.humidity} />}
      </TouchableHighlight>

      <TouchableHighlight disabled={loading} style={homestyle.touch} activeOpacity={0.6} underlayColor={theme.colors.highlight} onPress={()=>navigation.navigate('air', {loc:location.name})}>
      {loading? <LoadingAnimation/> : <Bubble type={'air'} value={weather.air} />}
      </TouchableHighlight>

      <TouchableHighlight disabled={loading} style={homestyle.touch} activeOpacity={0.6} underlayColor={theme.colors.highlight} onPress={()=>{}}>
      {loading? <LoadingAnimation/> : <Bubble type={'clock'} value={clock} />}
      </TouchableHighlight>

      </View>
    </View>
  )
}

const Stack = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown:false, 
        gestureEnabled:true,
        gestureDirection:"vertical",
        ...TransitionPresets.ModalPresentationIOS,
        }}>
        <Stack.Screen name="home" component={Home}/>
        <Stack.Screen name="location" options={{gestureDirection:"horizontal", ...TransitionPresets.SlideFromRightIOS}} component={LocationPanel} />
        <Stack.Screen name="forecast" component={WeatherForecast} />
        <Stack.Screen name="hourly-forecast" component={WeatherForecastHourly}/>
        <Stack.Screen name="humidity" component={HumidityForecast}/>
        <Stack.Screen name="wind" component={WindForecast}/>
        <Stack.Screen name="air" component={AirForecast}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App(){
  return (
    <ThemeProvider>
      <AppStack/>
      <FlashMessage position="top" />
    </ThemeProvider>
  )
}