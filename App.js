import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Recherche from './Components/Recherche';
import Consulter from './Components/Consulter';
import AddAthlete from './Components/AddAthlete';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Rechercher" component={Recherche} />
          <Stack.Screen name="Consulter" component={Consulter} />
          <Stack.Screen name="AddAthlete" component={AddAthlete} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;