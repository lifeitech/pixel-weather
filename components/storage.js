import AsyncStorage from '@react-native-async-storage/async-storage';

export const store = async (key, value) => {
    try {
        const value_str = JSON.stringify(value);
        await AsyncStorage.setItem(key, value_str);
    } catch (e) {
      alert(e.message)
    }
  }

export const getStore = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? JSON.parse(value) : null;
    } catch(e) {
        alert(e.message);
        return {}
    }
  }

export const getAddedPlaces = async () => {
  let keys = await AsyncStorage.getAllKeys();
  keys = keys.filter(item => item != '@theme' && item != '@location');
  let list = await AsyncStorage.multiGet(keys);
  list = list.map(item => [item[0], JSON.parse(item[1])]);
  list.sort((a,b) => a[0] - b[0]);
  return list
}

export const deleteStore = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    alert(e.message);
  }
}






