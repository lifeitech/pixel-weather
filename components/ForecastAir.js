import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { getcolor } from "./colormap";
import { useTheme } from './theme';


export default function AirForecast({navigation}) {
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
      marginTop: 50,
      marginBottom: 50,
      textAlign: "center",
      color: theme.colors.text,
    },
    table: {
      flexDirection:"column",
    },
    entry: {
      flexDirection:"row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      borderStyle:"dashed",
      paddingTop: 10,
      paddingBottom: 10,
      width: "100%",
    },
    indicator: {
      width:10,
      height:10,
      borderRadius:20,
      marginLeft: 10,
      marginRight: 20,
    },
    level: {
      color: theme.colors.text,
      flex: 2,
    },
    description: {
      color: theme.colors.text,
      flex: 3,
    },
    source: {
        alignSelf:"flex-start",
        marginLeft:3,
        marginTop:3,
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


  const data = [
    {color:getcolor('air', 50), level:"Good", description:"Satisfactory."},
    {color:getcolor('air', 100), level:"Moderate", description:"Acceptable. May have risk for people who are unusually sensitive to air pollution."},
    {color:getcolor('air', 150), level:"Unhealthy for sensitive groups", description:"Members of sensitive groups may experience health effects. The general public is less likely to be affected."},
    {color:getcolor('air', 200), level:"Unhealthy", description:"Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects."},
    {color:getcolor('air', 300), level:"Very Unhealthy", description:"Health alert: The risk of health effects is increased for everyone."},
    {color:getcolor('air', 500), level:"Hazardous", description:"Health warning of emergency conditions: everyone is more likely to be affected."},
  ]

  return (
  <View style={style.content}>
  <MaterialCommunityIcons name="drag-horizontal" size={24} color={theme.colors.text} />
  <Text style={style.title}>US Air Quality Index</Text>
  <View style={style.table}>
    {data.map(item=>
        <View key={item.level} style={style.entry}>
        <View style={[{backgroundColor:item.color},style.indicator]}></View>
        <Text style={style.level}>{item.level}</Text>
        <Text style={style.description}>{item.description}</Text>
        </View>
    )}
  </View>

  <TouchableHighlight style={style.backButton} underlayColor={theme.colors.highlight} onPress={()=>navigation.navigate('home')}>
    <AntDesign name="downcircleo" size={30} color={theme.colors.textSecondary}/>
  </TouchableHighlight>
  </View>
  )
}



