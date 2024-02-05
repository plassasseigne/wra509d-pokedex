import axios from 'axios';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useEffect, useState } from "react";

export default function DetailScreen({route}) {
  const {id} = route.params

  return (
    <View>
      <Text>Detail Screen {id}</Text>
    </View>
  )
}