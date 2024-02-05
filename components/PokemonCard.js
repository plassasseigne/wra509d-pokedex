import axios from 'axios';
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from 'react';

export default function PokemonCard({name, url, navigation}) {
  const [data, setData] = useState(null)
  const id = url.split('/')[url.split('/').length - 2];
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = response.data

        setData(data)
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [])

  useEffect(() => {
    // console.log(data)
  }, [data])

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detail', {id: id})}>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: image}} />
        <Text>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    margin: 5,
    flex: 1,
    borderRadius: 15,
    backgroundColor: 'white',
    overflow: 'hidden'
  },
  container: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
  }
})