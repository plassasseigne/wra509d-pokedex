import { StyleSheet, Image, View, Text, Pressable, FlatList } from 'react-native';
import { useEffect, useState } from "react";
import { getData, removeData } from '../utils/StorageService';
import PokemonCard from '../components/PokemonCard'

export default function TeamScreen({navigation}) {
  const [team, setTeam] = useState([])

  const getTeam = async () => {
    const dataTeam = await getData('team')

    if (dataTeam) {
      setTeam(dataTeam)
    } else {
      setTeam([])
    }
  }

  const clearTeam = async () => {
    removeData('team')
    setTeam([])
  }

  useEffect(() => {
    getTeam()
  }, [team])

  return (
    <View style={styles.teamScreen}>

      <View style={{alignItems: 'center'}}>
        <Pressable style={styles.button}>
          <Text style={styles.textButton} onPress={clearTeam}>Clear</Text>
        </Pressable>
      </View>

      <View>
        {team.length > 0 ? (
          <FlatList
            numColumns={2}
            data={team}
            renderItem={({ item }) => <PokemonCard name={item.name} url={`https://pokeapi.co/api/v2/pokemon/${item.id}/`} navigation={navigation} />}
            keyExtractor={(item, index) => String(index)}
            style={{marginLeft: 5, marginRight: 5}}
          />
        ) : (
          <View style={{alignItems: 'center', marginTop: 40}}>
            <Text>No team</Text>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  teamScreen: {
    paddingHorizontal: 10,
    flex: 1
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#FF4F4F',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    marginTop: 15,
    marginBottom: 10,
    width: 200
  },
  textButton: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
})