import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, FlatList, TouchableHighlight } from 'react-native';
import { Animated, Easing } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import {store, getStore, deleteStore, getAddedPlaces } from './storage';
import { getloc } from './data';
import { showMessage } from "react-native-flash-message";
import {useTheme } from './theme';

const SearchResultItem = ({item, locations, setLocations, setResult, setInput}) => {
  const theme = useTheme();
  const style = StyleSheet.create({
    view: {
      width: 296,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    text: {
        flexDirection: "row",
        fontSize: 20,
        padding: 20,  
        color: theme.colors.text, 
    }
  });

  const handlePress = async () => {
    const key = Date.now().toString();
    await store(key, item);
    setLocations([...locations, [key, item]]);
    setInput('');
    setResult(null);
    showMessage({
      message: `Added ${item.name}`,
      type: "success",
      statusBarHeight:50,
      titleStyle:{fontSize:18},
    })
  };
    return (
      <View style={style.view}>
        <Pressable onPress={handlePress} style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={style.text}>{`${item.name}, ${item.state != undefined ? item.state + "," : ""} ${item.country}`}</Text>
            <Text style={{position:"absolute",right:1}}>
                <Entypo name="plus" size={20} color="green"/>
              </Text>
        </Pressable>
      </View>
    )

}

const AnimatedTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight);

// item is ['key', value(object)] pair
const LocationItem = ({item, setLocation, locations, setLocations, navigation, setLoading}) => {
  const theme = useTheme();

  const offsetX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const key = item[0];
  const place = item[1];

  const style = StyleSheet.create({
    touch: {
      marginVertical: 10,
      paddingVertical: 10,
      paddingLeft:10,
      borderRadius: 20,
      backgroundColor: theme.colors.backgroundSecondary,
      height:100,
      transform:[{translateX:offsetX}],
      opacity:opacity,
    },
    entry: {
      paddingVertical: 20,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 20,
    },
    text: {
      color: theme.colors.text,
    },
    city: {
        fontSize: 18,
        marginLeft: 3,
        marginRight: 5,
        color: theme.colors.text,
    },
    country: {
      fontSize: 14,
      color: "#B5B5B5",
    },
    delete:{
      position:"absolute",
      right:10,
    }
});

  const switchLocation = () => {
    setLocation(place);
    setLoading(true);
    navigation.navigate('home');
  }

  
  const deleteLocation = async () => {
    
    const callback = ({finished}) => {
      if (finished){
      setLocations(locations.filter(item => item[0] != key));
      offsetX.setValue(0);
      opacity.setValue(1);
      showMessage({
        message: `Deleted ${place.name}`,
        type: "success",
        statusBarHeight:50,
        titleStyle:{fontSize:18},
      })
      }
    }

    Animated.parallel([
      Animated.timing(offsetX, {
      toValue: -500,
      easing: Easing.quad,
      duration: 320,
      useNativeDriver: false,
    }),
    Animated.timing(opacity, {
    toValue: 0,
    easing: Easing.quad,
    duration: 320,
    useNativeDriver: false,
  })
  ]).start(callback);
  
  await deleteStore(key);
  }

  return (
    <AnimatedTouchableHighlight style={style.touch} activeOpacity={1} underlayColor={theme.colors.highlight} onPress={switchLocation}>
      <View style={style.entry}>

      {key == '@location' ? <MaterialCommunityIcons name="map-marker" size={30} color={theme.colors.text} /> : <MaterialCommunityIcons name="city" size={30} color={theme.colors.text} />}
      
      <View style={style.text}>
        <Text style={style.city}>{`${place.name}`}</Text>
        <Text style={style.country}>{`${place.state != undefined ? place.state + "," : ""} ${place.country}`}</Text>
      </View>
      
      {key == '@location' ? null :

        <Pressable android_ripple={{color:theme.colors.ripple, foreground:true, borderless:true, radius:50}}
            style={style.delete} 
            onPress={deleteLocation}
            hitSlop={69}
            >
        <MaterialCommunityIcons name="trash-can-outline" size={25} color={"#ED0000"} />
        </Pressable> 
      }
      
      </View>
    </AnimatedTouchableHighlight>
  )

}


export default function LocationPanel({route, navigation}) {
  const setLocation = route.params.setLocation;
  const setLoading = route.params.setLoading;

  const theme = useTheme();
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    (async () => {
        const current_location = await getStore('@location');
        const added_places = await getAddedPlaces();
        const all_locations = [['@location', current_location]].concat(added_places);
        setLocations(all_locations);
    })();
    }, [])
  

  const handleInput = (input) => {
    setInput(input);
    if (input == ''){setResult(null)};
  }

  const getResult = async () => {
    try {
      const list  = await getloc(input);
      if (list.length == 0){
        showMessage({
          message: "No city was found",
          type: "warning",
          statusBarHeight:50,
          duration:3000,
          titleStyle:{fontSize:18},
        })
      } else {setResult(list)}
    } catch (error) {
      showMessage({
        message: "Unable to get search result",
        type: "danger",
        statusBarHeight:50,
        duration:5000,
        titleStyle:{fontSize:18},
      })
    }
    
  }

  const style = StyleSheet.create({
    content: {
      flex: 1,
      alignItems: "center",
      paddingTop: 100,
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
    button: {
      borderRadius: 25,
      padding: 15,
      backgroundColor: theme.colors.btnBackground,
    },
    buttontext: {
      fontWeight: "bold",
      textAlign: "center"
    },
    inputarea: {
      height: 65,
      width: 320,
      margin: 10,
      borderWidth: 1,
      borderRadius:20,
      borderColor: theme.colors.border,
      padding: 10,
      fontSize:18,
      color: theme.colors.text,
    },
    resultList: {
      zIndex: 50,
      marginLeft: 10,
      padding: 2,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomLeftRadius:10,
      borderBottomRightRadius:10,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
      opacity: 1,
      position: "absolute",
      top: 76,
    },
    locationList: {
      height:"77%",
      width: "100%",
      marginTop: 30,
    },
  });
  

  const renderLocation = ({item}) => {
    return (
      <LocationItem key={item.id} 
            item={item} 
            setLocation={setLocation}
            locations={locations}
            setLocations={setLocations}
            navigation={navigation}
            setLoading={setLoading}
          />
    )
  }


  return ( 
      <View style={style.content}> 
        <Text style={style.title}>Find City</Text>
        <View style={{flexDirection:"column",alignItems:"flex-start"}}>

        <View style={{flexDirection:"row", alignItems:"center"}}>

        <TextInput style={style.inputarea} placeholder={theme.name == 'light' ? 'input city name here...' : ''} value={input} onChangeText={input =>handleInput(input)} />
        <Pressable android_ripple={{color:theme.colors.ripple, borderless:true}} style={style.button} onPress={getResult}>
          <Text style={style.buttontext}><Entypo name="magnifying-glass" size={24} color={theme.colors.btnText} /></Text>
        </Pressable>
        
        </View>

        {result == null ? null : 
        
        <View style={style.resultList}>
          {result.map(item => <SearchResultItem key={JSON.stringify(item)}
            item={item} 
            locations={locations} 
            setLocations={setLocations} 
            setResult={setResult}
            setInput={setInput}
          />
          )}
        </View>
        }
        </View>

        <View style={style.locationList}>  
        <FlatList renderItem={renderLocation} data={locations}/>    
        </View>

      </View>    
  )
}