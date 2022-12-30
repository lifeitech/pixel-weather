import { View, Text, TouchableHighlight, StyleSheet, ScrollView } from "react-native";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { getcolor } from "./colormap";
import { parsedate } from "./datetime";
import { geticon } from './icons';
import { useTheme } from './theme';


const offset = (min) => {
  return 100 / (Math.exp(-min / 100) + 1);
}

const TotalSpace = (diff) => {
  return Math.min(10 * diff + 100, 310);
}

function Vertical({item, min, max}){
  const theme = useTheme();
  const [date, week, weekend] = parsedate(item.dt, item.timezone_offset);
  
  const space_per_temp = TotalSpace(max-min) / (max-min);

  const margin_temp_min = offset(min) + (item.temp_min - min) * space_per_temp;
  const margin_temp_max = (item.temp_max - item.temp_min) * space_per_temp - 50;  // -50 for bubble size correction

  const style = StyleSheet.create({
    view: {
      flexDirection: "column",
      marginHorizontal: 5,
    },
    axis: {
      flex: 1,
      justifyContent: "flex-end",
    },  
    maxbubble: {
      width: 50,
      height: 50,
      marginBottom: margin_temp_max,
      borderWidth: 2,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      borderColor: getcolor('temp', item.temp_max),
    },
    minbubble: {
      width: 50,
      height: 50,
      marginBottom: margin_temp_min,
      borderWidth: 2,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      borderColor: getcolor('temp', item.temp_min),
    },
    value: {
      fontSize: 18,
      color: theme.colors.text,
    },
    line: {
      position:"absolute",
      top:52,
      borderStyle: "dashed", 
      height: margin_temp_max, 
      borderLeftWidth: 2,
      borderLeftColor: "#B8B8B8",
      
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
    week: {
      fontSize: 14,
      color: weekend? "#FF4343" : theme.colors.text,
    },
    date: {
      fontSize: 14,
      color: weekend? "#FF4343" : theme.colors.text,
    },
  })

  return (
      <View style={style.view}>
      <View style={style.axis}>

        {item.temp_min != item.temp_max ? 
        <View style={{"flexDirection":"column", justifyContent:"flex-start", alignItems:"center"}}>
        <View style={style.maxbubble}><Text style={style.value}>{item.temp_max}</Text></View>
        <View style={style.line}></View>
        </View> : null }

        <View style={style.minbubble}><Text style={style.value}>{item.temp_min}</Text></View>

      </View>


      <View style={{alignItems:"center"}}>
      <View><Text style={style.cond}>{geticon(item.condition, 24)}</Text></View>
      <View><Text style={style.prob}>{item.prob ? `${Math.round(item.prob * 100)}%` : ''}</Text></View>
      </View>

      <View style={style.label}>
      <Text style={style.week}>{week}</Text>
      <Text style={style.date}>{date}</Text>
      </View>
    </View>
  )
}

// forecast data shape: [{...}, {...}, {...}, ...]
export default function WeatherForecast({route, navigation}) {
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
      marginTop: 10,
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
      height:510,
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

  const min_arr = forecast?.map(item => item.temp_min) || [];
  const max_arr = forecast?.map(item => item.temp_max) || [];

  const min = Math.min(...min_arr);
  const max = Math.max(...max_arr);

  return (

  <View style={style.content}>
  <MaterialCommunityIcons name="drag-horizontal" size={24} color={theme.colors.text} />

  <Text style={style.title}>Daily Weather Forecast</Text>

  <Text style={style.location}><MaterialCommunityIcons name="map-marker" size={20} color={theme.colors.text}/> {location}</Text>

   <View style={{height:520}}>
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