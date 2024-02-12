import axios from 'axios';
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from 'react';

export default function PokemonCard({name, url, navigation}) {
  const [data, setData] = useState([])
  const [colorType, setColorType] = useState([[]])
  const id = url.split('/')[url.split('/').length - 2];

  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  const [imageState, setImageState] = useState({loaded: false})

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
      const newColor = [...colorType]
      let i = 0

      types.forEach(type => {
        type?.type.name == 'grass' ? newColor[0][i] = '#9BCC50' :
        type?.type.name == 'fire' ? newColor[0][i] = '#FD7D24' :
        type?.type.name == 'water' ? newColor[0][i] = '#2C94F3' :
        type?.type.name == 'normal' ? newColor[0][i] = '#A3ABAF' :
        type?.type.name == 'poison' ? newColor[0][i] = '#A16AB7' :
        type?.type.name == 'bug' ? newColor[0][i] = '#729F3F' :
        type?.type.name == 'flying' ? newColor[0][i] = '#6FD9F7' :
        type?.type.name == 'electric' ? newColor[0][i] = '#F4D06B' :
        type?.type.name == 'ground' ? newColor[0][i] = '#AB9842' :
        type?.type.name == 'fairy' ? newColor[0][i] = '#FDB9E9' :
        type?.type.name == 'fighting' ? newColor[0][i] = '#D34723' :
        type?.type.name == 'psychic' ? newColor[0][i] = '#F366B9' :
        type?.type.name == 'rock' ? newColor[0][i] = '#A06921' :
        type?.type.name == 'steel' ? newColor[0][i] = '#9EB7B8' :
        type?.type.name == 'ghost' ? newColor[0][i] = '#7B62A3' :
        type?.type.name == 'ice' ? newColor[0][i] = '#51C4E7' :
        type?.type.name == 'dragon' ? newColor[0][i] = '#1669BF' :
        type?.type.name == 'dark' ? newColor[0][i] = '#707070' :
        newColor[0][i] = 'red'

        i++
      })

      setColorType(newColor)
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
          {imageState.loaded ? null :
            <Image style={styles.imageLoading} source={require('../assets/pokeball.png')}/>
          }
          <Image style={imageState.loaded ? styles.image : {display: 'none'}} src={image} onLoad={() => setImageState({loaded: true})}></Image>
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
  imageLoading: {
    width: 100,
    height: 100
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