import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import AuthProvider from './src/context/userContext';

import Inicial from './screens/Inicial';
import Votacao from './screens/Votacao';
import Rank from './screens/Rank';
import Cadastrar from './screens/Cadastrar';
import Opcao from './screens/Opcao';
import Heros from './screens/Heros/Heros/';

const Stack = createNativeStackNavigator();

export default function App() {

  // console.log(animes.map((item) => {
  //   item[0].nome
  // }))

  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#000', }, headerTintColor: '#fff' }}>
          <Stack.Screen name='Batalha' component={Inicial} options={{ headerShown: false }} />
          <Stack.Screen name='Votacao' component={Votacao} options={{ title: 'Qual desses e o melhor?' }} />
          <Stack.Screen name='Rank' component={Rank} options={{ title: 'Rank dos Melhores' }} />
          <Stack.Screen name='Cadastrar' component={Cadastrar} options={{ title: 'Cadastre seu anime' }} />
          <Stack.Screen name='Opcao' component={Opcao} options={{ title: 'Battle mode' }} />
          <Stack.Screen name='Heros' component={Heros} options={{ title: 'Clique para votar! ' }} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
  title: {
    color: '#fff',
    fontSize: 18
  },
  backgroundImagem: {
    flex: 1,
    marginBottom: 5,
  },

  btn: {
    marginTop: 10
  }
});

