import { View, Text, TouchableHighlight, StyleSheet, ScrollView} from "react-native";
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { getcolor } from "./colormap";
import { parsedate } from "./datetime";
import { useTheme } from './theme';


function Vertical({dt, offset, wind}){
  const theme = useTheme();
  const [date, week, weekend] = parsedate(dt, offset);
  
  const speed = wind?.speed;
  const deg = wind?.wind_deg;

  const style = StyleSheet.create({
    view: {
      flexDirection: "column",
      paddingHorizontal:5,
    },
    axis: {
      flex: 1,
      justifyContent: "flex-end",
    },
    bubble: {
      width: 50,
      height: 50,
      borderWidth: 2,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      borderColor: getcolor('wind', speed),
      marginBottom: speed * 4,
    },  
    direction: {
      transform:[{rotateZ:`${deg ? deg+135 : 0}deg`}],
    },
    datalabel:{
      fontSize:14,
      color: getcolor('wind', speed),
    },
    label: {
      flexDirection: "column",
      alignItems: "center",
    },
    date: {
      fontSize: 14,
      color: `${weekend? "#FF4343" : theme.colors.text}`,
    },
    week: {
      fontSize: 14,
      color: `${weekend? "#FF4343" : theme.colors.text}`,
    },
  })

  return (
    <View style={style.view}>

      <View style={style.axis}>

        <View style={{"alignItems":"center"}}>
        <Text style={style.datalabel}>{speed} km/h</Text>
        <View style={style.bubble}>
        <Text style={style.direction}><Entypo name="direction" size={24} color={theme.colors.text}/></Text>
        </View>

        </View>
      </View>

      <View style={style.label}>
      <Text style={style.week}>{week}</Text>
      <Text style={style.date}>{date}</Text>
      </View>
      
    </View>
  )
}


export default function WindForecast({route, navigation}) {
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
      fontWeight:"bold",
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


  return (
  <View style={style.content}>
  <MaterialCommunityIcons name="drag-horizontal" size={24} color={theme.colors.text} />
  <Text style={style.title}>Wind Forecast</Text>
  <Text style={style.location}><MaterialCommunityIcons name="map-marker" size={20} color={theme.colors.text}/> {location}</Text>

  <View style={{height:510}}>
  <ScrollView horizontal={true}>
    <View onStartShouldSetResponder={() => true} style={style.canvas}>
      {(forecast != undefined) && forecast.map(item => <Vertical 
                            key={item.dt}
                            dt={item.dt}
                            offset={item.timezone_offset}
                            wind={item.wind}
                            />
        )}
    </View>
  </ScrollView> 
  </View>

  <TouchableHighlight style={style.backButton} underlayColor={theme.colors.highlight} onPress={()=>navigation.navigate('home')}>
    <AntDesign name="downcircleo" size={30} color={theme.colors.textSecondary}/>
  </TouchableHighlight>
  </View>
  )
}