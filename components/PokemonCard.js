import axios from 'axios';
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from 'react';

export default function PokemonCard({name, url, navigation}) {
  const [data, setData] = useState([])
  const [colorType, setColorType] = useState([[]])
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
    const colorTypes = (types) => {
      const nouvelEtat = [...colorType]
      let i = 0

      types.forEach(type => {
        type?.type.name == 'grass' ? nouvelEtat[0][i] = '#9BCC50' :
        type?.type.name == 'fire' ? nouvelEtat[0][i] = '#FD7D24' :
        type?.type.name == 'water' ? nouvelEtat[0][i] = '#2C94F3' :
        type?.type.name == 'normal' ? nouvelEtat[0][i] = '#A3ABAF' :
        type?.type.name == 'poison' ? nouvelEtat[0][i] = '#A16AB7' :
        type?.type.name == 'bug' ? nouvelEtat[0][i] = '#729F3F' :
        type?.type.name == 'flying' ? nouvelEtat[0][i] = '#6FD9F7' :
        nouvelEtat[0][i] = ['null']

        i++
      })

      setColorType(nouvelEtat)
    }

    if (data?.types) {
      colorTypes(data.types)
    }
  }, [data])

  useEffect(() => {
  }, [colorType])

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detail', {id: id})}>
      <View style={styles.container}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{...styles.typeBg, backgroundColor: data?.types ? colorType[0][0] : 'red' }}></View>
        </View>
        <View>
          <Text style={styles.id}>{'#00' + id}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image style={styles.image} source={{uri: image}} />
          <Text style={styles.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
        </View>
        <View style={styles.types}>
          {data?.types?.map((item, index) => (
            <View key={index}>
              <Text style={{...styles.typeCard, backgroundColor: data?.types ? colorType[0][index] : 'red' }}>{item.type.name}</Text>
            </View>
          ))}
        </View>
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
    overflow: 'hidden',
  },
  container: {
    margin: 15,
  },
  id: {
    fontSize: 16,
    opacity: 0.4
  },
  name: {
    fontSize: 16
  },
  typeBg: {
    backgroundColor: 'red',
    position: 'absolute',
    top: -70,
    width: 175,
    height: 175,
    borderRadius: 99
  },
  image: {
    width: 100,
    height: 100,
  },
  types: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  },
  typeCard: {
    backgroundColor: 'red',
    color: 'white',
    paddingTop: 2,
    paddingBottom: 4,
    paddingHorizontal: 11,
    borderRadius: 5,
    textTransform: 'uppercase',
    fontSize: 10
  }
})