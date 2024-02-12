import axios from 'axios';
import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import PokemonCard from '../components/PokemonCard'

export default function SearchScreen({navigation}) {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [loadingSearch, setLoadingSearch] = useState(false)

  const getData = async () => {
    setLoadingSearch(true)
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + search.toLowerCase())

      setData(response.data)
      setLoadingSearch(false)
    } catch (error) {
      console.log('SearchScreen : ' + error)
      setData([])
      setLoadingSearch(false)
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder='Find a Pokemon'
          onChangeText={setSearch}
          value={search}
        />
        <Pressable style={styles.button} onPress={getData}>
          <Text style={styles.textButton}>Search</Text>
        </Pressable>
      </View>
      <Text style={{marginLeft: 10, marginTop: 10}}>Result :</Text>
      <View>
        { loadingSearch == false ? (
          data.id !== undefined ?
            (
              <View style={{alignItems: 'center', marginTop: 15}}>
                <PokemonCard name={data.name} url={`https://pokeapi.co/api/v2/pokemon/${data.id}/`} navigation={navigation} />
              </View>
            ) : (
              <View style={{alignItems: 'center', marginTop: 40}}>
                <Text>Please enter a valid name</Text>
              </View>
            )
        ) : (
          <View style={{alignItems: 'center', marginTop: 40}}>
            <Text >Loading...</Text>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    marginTop: 20
  },
  searchBar: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    marginRight: 10,
    flex: 1,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#FF4F4F',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  textButton: {
    color: 'white',
    textTransform: 'uppercase'
  }
})