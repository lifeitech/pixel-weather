import axios from 'axios';
import {WEATHER_KEY, AIR_KEY} from "@env"

function int(n) {
    return Math.round(n)    
}

// return: object{name, lat, lon, state, country}
export async function getcity(lat, lon) {
    if (lat == null || lat == null){
        return {name:'-', lat:null, lon:null, state:'-', country:'-'}
    }
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}`;
    try {
        const res = await axios.get(url);
        let out = res.data[0];
        delete out['local_names'];
        return out
    } catch (error) {
        console.log('getcity error: ' + error.message);
        return {};
    }
}

// return a list of object{name, lat, lon, state, country}
export async function getloc(query) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${WEATHER_KEY}`;
    const res = await axios.get(url);
    let list = res.data;
    return list 
}

export async function getweather(lat, lon){    
    if (lat == null || lat == null){
        return {}
    }
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${WEATHER_KEY}`;
    const res = await axios.get(url);
    const data = res.data;

    const url_air = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${AIR_KEY}`;
    const res_air = await axios.get(url_air);
    const aqi = res_air.data.data.aqi;

    hourly_data = data.hourly.map(item => { 
        return {
            dt: item.dt,
            timezone_offset: data.timezone_offset,
            sunrise: data.current.sunrise,
            sunset: data.current.sunset,
            temp: int(item.temp),
            condition: item.weather[0].main,
            wind: item.wind_speed,
            wind_deg: item.wind_deg,
            humidity: item.humidity,
            prob: item["pop"],
        }
    });

    daily_data = data.daily.map(item => { 
        return {
            dt: item.dt,
            timezone_offset: data.timezone_offset,
            temp_min: int(item.temp.min),
            temp_max: int(item.temp.max),
            condition: item.weather[0].main,
            wind: {speed: int(item.wind_speed * 3.6), wind_deg: item.wind_deg},
            humidity: item.humidity,
            prob: item["pop"],
        }
    });

    const out = {
        time: data.current.dt, // current time, Unix, UTC
        timezone:data.timezone,
        timezone_offset: data.timezone_offset, // shift in seconds from UTC
        sunrise: data.current.sunrise,
        sunset: data.current.sunset,
        temp: int(data.current.temp),
        condition: data.current.weather[0].main,  // weather is of shape [{...}]
        description: data.current.weather[0].description,
        wind: {speed: int(data.current.wind_speed * 3.6), wind_deg: data.current.wind_deg},
        humidity: data.current.humidity,
        air: aqi,
        hourly: hourly_data,  // [{...}, {...}, {...}, ...]
        daily: daily_data,  // [{...}, {...}, {...}, ...]

    }
    
    console.log("API is called...")
    return out

}