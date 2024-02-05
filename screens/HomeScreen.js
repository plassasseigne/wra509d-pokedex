import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/')
        const data = response.data

        setData(data)
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <View>
      <View>
        <StatusBar style="auto" />
      </View>
      <View>
        <FlatList
          numColumns={3}
          data={data.results}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={item => item.name}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

})