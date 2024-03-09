import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    console.log('storeData : ' + error)
  }
}

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return JSON.parse(value)
    } else {
      return null
    }
  } catch (error) {
    console.log('getData : ' + error)
  }
}

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    console.log('removeData : ' + error)
  }
}