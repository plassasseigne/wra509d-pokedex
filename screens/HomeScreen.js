import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard'

export default function HomeScreen({navigation}) {
  const [data, setData] = useState([])
  const [newPage, setNewPage] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/')

        setData(response.data.results)
        setNewPage(response.data.next)
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [])

  const getMoreData = async () => {
    try {
      const response = await axios.get(newPage)

      setData((data) => [...data, ...response.data.results])
      setNewPage(response.data.next)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
  }, [data])

  return (
    <View>
      <View>
        <StatusBar style="auto" />
      </View>
      <View>
        <FlatList
          numColumns={2}
          data={data}
          renderItem={({ item }) => <PokemonCard name={item.name} url={item.url} navigation={navigation} />}
          keyExtractor={item => item.name}
          onEndReached={getMoreData}
          style={{marginLeft: 5, marginRight: 5}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

})