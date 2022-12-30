import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from "react-native";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { getcolor } from "./colormap";
import { parsehour } from "./datetime";
import { geticon } from './icons';
import { useTheme } from './theme';

const offset = (min) => {
  return 100 / (Math.exp(-min / 100) + 1);
}

const TotalSpace = (diff) => {
  return Math.min(10 * diff + 100, 300);
}

function Vertical({item, min, max}){
  const theme = useTheme();
  const hour = parsehour(item.dt, item.timezone_offset);
  const sunrise_hour = parsehour(item.sunrise, item.timezone_offset);
  const sunset_hour = parsehour(item.sunset, item.timezone_offset);
  const night = hour < sunrise_hour || hour > sunset_hour;
  
  const space_per_temp = TotalSpace(max-min) / (max-min);

  const margin_temp = offset(min) + (item.temp - min) * space_per_temp;

  const style = StyleSheet.create({
    view: {
      flexDirection: "column",
      marginHorizontal: 5,
    },
    axis: {
      flex: 1,
      justifyContent: "flex-end",
    },  
    bubble: {
      width: 50,
      height: 50,
      marginBottom: margin_temp,
      borderWidth: 2,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      borderColor: getcolor('temp', item.temp),
    },
    value: {
      fontSize: 18,
      color: theme.colors.text,
    },
    cond: {
      alignItems: "flex-end",
    },
    prob: {
      fontSize: 14,
      alignItems: "flex-end",
      color: "#03d3fc",
    },
    label: {
      flexDirection: "column",
      alignItems: "center",
    },
    hour: {
      fontSize: 14,
      color: hour == 0 ? "#00E22B" : theme.colors.text,
      fontWeight: hour == 0 ? "bold" : "",
    },
  })

  return (
      <View style={style.view}>
      <View style={style.axis}>
        <View style={style.bubble}><Text style={style.value}>{item.temp}</Text></View>
      </View>

      <View style={{alignItems:"center"}}>
      <View><Text style={style.cond}>{night && item.condition=='Clear' ? geticon('ClearNight', 24) : geticon(item.condition, 24)}</Text></View>
      <View><Text style={style.prob}>{item.prob ? `${Math.round(item.prob * 100)}%` : ''}</Text></View>
      </View>

      <View style={style.label}>
      <Text style={style.hour}>{hour}:00</Text>
      </View>
    </View>
  )
}

// forecast data shape: [{...}, {...}, {...}, ...]
export default function WeatherForecastHourly({route, navigation}) {
  const forecast = route.params.data;
  const location = route.params.loc;
  const theme = useTheme();
  const style = StyleSheet.create({
    content: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.background,
      elevation: 5
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 10,
      textAlign: "center",
      color: theme.colors.text,
    },
    location:{
      fontSize: 20,
      color: theme.colors.text,
      marginBottom: 40,
    },
    canvas: {
      height:500,
      paddingBottom: 3,
      flexDirection:"row",
      borderTopWidth:2,
      borderBottomWidth:2,
      borderColor: theme.colors.border,
    },
    backButton: {
      marginTop:30,
      width:"89%",
      height:60,
      borderRadius:10,
      backgroundColor: theme.colors.backgroundSecondary,
      alignItems:"center",
      justifyContent:"center"
    }
  });

  const arr = forecast?.map(item => item.temp) || [];
  const min = Math.min(...arr);
  const max = Math.max(...arr);

  return (
  <View style={style.content}>
  <MaterialCommunityIcons name="drag-horizontal" size={24} color={theme.colors.text} />

  <Text style={style.title}>Hourly Weather Forecast</Text>

  <Text style={style.location}><MaterialCommunityIcons name="map-marker" size={20} color={theme.colors.text}/> {location}</Text>

  <View style={{height:510}}>
   <ScrollView horizontal={true}>
    <View onStartShouldSetResponder={() => true} style={style.canvas}>
      {forecast && forecast.map(item =><Vertical key={item.dt} item={item} min={min} max={max}/>)}
    </View>
  </ScrollView> 
  </View>

  <TouchableHighlight style={style.backButton} underlayColor={theme.colors.highlight} onPress={()=>navigation.navigate('home')}>
    <AntDesign name="downcircleo" size={30} color={theme.colors.textSecondary}/>
  </TouchableHighlight>

  </View>
  )
}