import { View, Text, StyleSheet } from "react-native";
import { getcolor } from "./colormap";
import { geticon } from './icons';
import { Entypo, Feather } from '@expo/vector-icons';
import {useTheme } from './theme';

export default function Bubble({type, value, night}) {
    const theme = useTheme();
    let deg = value?.wind_deg;
    let speed = value?.speed;
    const style = StyleSheet.create({
      view: {
        margin: 6,
        width: 190,
        height: 190,
        marginVertical: 10,
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
      },
      value: {
        color: type != 'clock' ? getcolor(type, speed ? speed : value) : theme.colors.textSecondary,
        fontSize: type != 'clock' ? 55 : 45,
      },
      extra: {
        color: theme.colors.text,
        fontSize: 14,
      },
      direction: {
        position:"absolute",
        bottom: 10,
        transform:[{rotateZ:`${deg ? deg+135 : 0}deg`}],
      },
    });

    let display;
    let extra;
    
    if (type == 'temp') {
      display = value;
      extra = '°C'
    } else if (type == 'condition') {
      extra = value;
      if (value == 'Clear' && night){display = geticon('ClearNight', 67)}
      else {display = geticon(value, 67);}

    } else if (type == 'wind') {
      display = speed;
      extra = 'km/h';

    } else if (type == 'humidity') {
      display = value;
      extra = '%';

    } else if (type == 'air') {
      display = value;
      extra = 'AQI';
    } else if (type == 'clock') {
      display = value.time;
      extra = <><Feather name="calendar" size={14} color={theme.colors.text} /> {value.date}</>;
    }
  
    return (
    <View style={style.view}>
        <Text style={style.value}>{display}</Text>
        <Text style={style.extra}>{extra}</Text>
        {deg ? <Text style={style.direction}><Entypo name="direction" size={20} color={theme.colors.text} /></Text> : null}
    </View>
    )
  }