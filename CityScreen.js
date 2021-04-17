import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableHighlight, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps'; 
import { Ionicons } from '@expo/vector-icons';

export default function App({navigation, route}) {
    let city = route.params.city; 
        useEffect(() => {
    }, []); 

    // <MapView region = {{'latitude' : city.coord.lat, 'longitude' : city.coord.lon}} /> 
  return (
    <SafeAreaView style={styles.container}>
    <MapView region = {{latitude : city.coord.lat, longitude : city.coord.lon, latitudeDelta:1, longitudeDelta: 1} } style= {{flex : 2}} >
        <Marker coordinate = {{latitude : city.coord.lat, longitude : city.coord.lon}} title = {city.name}/>
    </MapView>
      <View style = {{flex : 1, flexDirection: 'row'}}> 
        <View style = {{flex : 1}}> 
            <Text style = {styles.titleText}>{ city.name } </Text> 
            <Text>{ city.weather[0].main }</Text> 
            <Text>Humidity: { city.main.humidity }</Text> 
            <Text>Wind Speed: {city.wind.speed}</Text>  
            <Text>Max Temp: {city.main.temp_max}</Text>
            <Text>Min Temp: {city.main.temp_min}</Text> 
        </View>

        <View style = {{flex : 2, alignItems: 'center'}}>
            <Text style = {{fontSize: 20, fontWeight: 'bold', marginBottom:-15, marginTop: 20, marginRight:0 }}>{ city.main.temp }</Text>  
            <Ionicons name = "cloud" size = {100} color = 'grey'></Ionicons>
        </View> 
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  titleText: {
      fontSize: 20, 
      fontWeight: 'bold', 
      marginTop: 5, 
      marginBottom: 5,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
