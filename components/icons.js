import { Feather } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { colormap } from './colormap';

export function geticon(type, size) {
    switch (type) {
        case "Clear":
            return <Feather name="sun" size={size} color={colormap.condition['Clear']} />
        case "ClearNight":
            return <Octicons name="moon" size={size} color={colormap.condition['ClearNight']} />
        case "Clouds":
            return <Feather name="cloud" size={size} color={colormap.condition['Clouds']} />
        case "Rain":
            return <Feather name="cloud-rain" size={size} color={colormap.condition['Rain']} />
        case "Thunderstorm":
            return <MaterialCommunityIcons name="lightning-bolt-outline" size={size} color={colormap.condition['Thunderstorm']} />
        case "Drizzle":
            return <Feather name="cloud-drizzle" size={size} color={colormap.condition['Drizzle']} />
        case "Snow":
            return <Ionicons name="snow" size={size} color={colormap.condition['Snow']} />
        case "Fog":
            return <Fontisto name="fog" size={size} color={colormap.condition['Fog']} />
        case "Mist":
            return <Fontisto name="fog" size={size} color={colormap.condition['Mist']} />
        case "Smoke":
            return <Fontisto name="fog" size={size} color={colormap.condition['Smoke']} />
        case "Haze":
            return <Fontisto name="fog" size={size} color={colormap.condition['Haze']} />
        case "Dust":
            return <Feather name="wind" size={size} color={colormap.condition['Dust']} />
        case "Sand":
            return <Feather name="wind" size={size} color={colormap.condition['Sand']} />
        case "Ash":
            return <MaterialCommunityIcons name="grain" size={size} color={colormap.condition['Ash']} />
        case "Squall":
            return <Feather name="wind" size={size} color={colormap.condition['Squall']} />
        case "Tornado":
            return <MaterialCommunityIcons name="weather-tornado" size={size} color={colormap.condition['Tornado']} />
        default:
            break;
    }
}