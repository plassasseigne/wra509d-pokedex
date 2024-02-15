import axios from 'axios';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useEffect, useState } from "react";

export default function DetailScreen({route}) {
  const {id} = route.params
  const {colorTypes} = route.params

  const [data, setData] = useState([])
  const [species, setSpecies] = useState([])

  const [evolutionUrl, setEvolutionUrl] = useState('')
  const [evolutionData, setEvolutionData] = useState([])
  const [evolution, setEvolution] = useState([])

  const [description, setDescription] = useState('')

  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const getIdFromUrl = (url) => {
    return (
      url.split('/')[evolutionData?.species?.url.split('/').length - 2]
    )
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

        setData(response.data)
      } catch (error) {
        console.log('DetailScreen : ' + error)
      }
    }

    const getSpecies = async () => {
      try {
        const response  =await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)

        setSpecies(response.data)
        setEvolutionUrl(response.data.evolution_chain?.url)
      } catch (error) {
        console.log('DetailScreen : ' + error)
      }
    }

    getData()
    getSpecies()
  }, [])

  useEffect(() => {
    if (species?.flavor_text_entries) {
      setDescription(species?.flavor_text_entries[1].flavor_text?.replace(/[\n\f]/g, ' '))
    }
  }, [species]) 

  useEffect(() => {
    const getEvolution = async () => {
      try {
        const response = await axios.get(evolutionUrl)

        setEvolutionData(response.data.chain)
      } catch (error) {
        console.log('getEvolution : ' + error)
      }
    }

    if (evolutionUrl !== '') {
      getEvolution()
    }
  }, [evolutionUrl])

  useEffect(() => {
    const evolutionChain = []

    if (evolutionData?.species) {
      evolutionChain.push({
        'name': evolutionData?.species?.name,
        'min_level': '1',
        'image': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + getIdFromUrl(evolutionData?.species?.url) + '.png'
      })
      if (evolutionData?.evolves_to?.length > 0 ) {
        evolutionChain.push({
          'name': evolutionData?.evolves_to[0].species?.name,
          'min_level': evolutionData?.evolves_to[0].evolution_details ? evolutionData?.evolves_to[0].evolution_details[0]?.min_level : null,
          'image': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + getIdFromUrl(evolutionData?.evolves_to[0].species?.url) + '.png'
        })
        if (evolutionData?.evolves_to[0].evolves_to?.length > 0) {
          evolutionChain.push({
            'name': evolutionData?.evolves_to[0].evolves_to[0].species?.name,
            'min_level': evolutionData?.evolves_to[0].evolves_to[0].evolution_details ? evolutionData?.evolves_to[0].evolves_to[0].evolution_details[0]?.min_level : null,
            'image': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + getIdFromUrl(evolutionData?.evolves_to[0].evolves_to[0].species?.url) + '.png'
          })
        }
      }
    }

    setEvolution(evolutionChain)
  }, [evolutionData])

  const idFormatting = (id) => {
    if (id.length == 1) {
      return (`#00${id}`)
    } else if (id.length == 2) {
      return (`#0${id}`)
    } else if (id.length == 3) {
      return (`#${id}`)
    }
  }

  return (
    <ScrollView>
      <View style={styles.detailScreen}>
        <View style={{alignItems: 'center', position: 'relative'}}>
          <View style={{...styles.typeBg, backgroundColor: colorTypes ? colorTypes[0][0] : 'red' }}></View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.name}>{data?.name?.charAt(0).toUpperCase() + data?.name?.slice(1)}</Text>
          <Text style={styles.id}>{idFormatting(id)}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image style={styles.image} src={image} />
        </View>
        <View style={styles.types}>
          {data?.types?.map((item, index) => (
            <View key={index}>
              <Text style={{...styles.typeCard, backgroundColor: data?.types ? colorTypes[0][index] : 'red' }}>{item.type.name}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoEncart}>
            <Text style={styles.infoTitle}>Shape</Text>
            <Text style={{...styles.infoText, color: colorTypes[0][0]}}>{species?.shape?.name}</Text>
          </View>
          <View style={{backgroundColor: colorTypes[0][0], height: 50, width: 1}}></View>
          <View style={styles.infoEncart}>
            <Text style={styles.infoTitle}>Height</Text>
            <Text style={{...styles.infoText, color: colorTypes[0][0]}}>{data?.height}</Text>
          </View>
          <View style={{backgroundColor: colorTypes[0][0], height: 50, width: 1}}></View>
          <View style={styles.infoEncart}>
            <Text style={styles.infoTitle}>Weight</Text>
            <Text style={{...styles.infoText, color: colorTypes[0][0]}}>{data?.weight}</Text>
          </View>
        </View>
        <Text style={{...styles.title, color: colorTypes[0][0]}}>Base stats</Text>
        <View style={styles.infoContainer}>
          {data?.stats?.map((item, index) => (
            <View key={index} style={styles.infoEncart}>
              <Text style={styles.infoTitle}>{item.stat.name}</Text>
              <Text style={{...styles.infoText, color: colorTypes[0][0]}}>{item.base_stat}</Text>
            </View>
          ))}
        </View>
        <Text style={{...styles.title, color: colorTypes[0][0]}}>Evolution</Text>
        <View style={evolStyles.evolContainer}>
          {evolution.map((item, index) => (
            <View style={evolStyles.evolCard
            } key={index}>
              <Text style={{...evolStyles.evolLevel, color: colorTypes[0][0]}}>LVL {item.min_level}</Text>
              <Image style={evolStyles.evolImage} src={item.image} />
              <Text style={{...evolStyles.evolName, color: colorTypes[0][0]}}>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

const evolStyles = StyleSheet.create({
  evolContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  evolCard: {
    width: '33.33%',
    alignItems: 'center'
  },
  evolLevel: {
    textAlign: 'center'
  },
  evolImage: {
    width: 90,
    height: 90,
  },
  evolName: {
    textAlign: 'center',
    textTransform: 'capitalize'
  }
})

const styles = StyleSheet.create({
  detailScreen: {
    paddingHorizontal: 10,
    flex: 1
  },
  typeBg: {
    backgroundColor: 'red',
    position: 'absolute',
    top: -550,
    width: 700,
    height: 700,
    borderRadius: 700,
  },
  name: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10
  },
  id: {
    fontSize: 20,
    opacity: 0.25,
    marginTop: 10
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    marginVertical: 10,
    fontWeight: '300'
  },
  types: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  },
  typeCard: {
    color: 'white',
    paddingTop: 4,
    paddingBottom: 6,
    paddingHorizontal: 25,
    borderRadius: 10,
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 'bold'
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoEncart: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '33%'
  },
  infoTitle: {
    fontSize: 12,
    color: '#A7A7A7',
    textTransform: 'capitalize'
  },
  infoText: {
    fontSize: 18,
    textTransform: 'capitalize',
    marginTop: 8,
    marginBottom: 8
  }
})