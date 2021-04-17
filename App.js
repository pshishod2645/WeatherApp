import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableHighlight } from 'react-native';


export default function App() {
  const API_KEY = 'f322f69f8bbf7b5be2e84b31249eec1f'; 
  const [cities, setCities] = useState([]); 

  const getCitiesData = () => {
    fetch('http://api.openweathermap.org/data/2.5/find?lat=23.68&lon=90.35&cnt=50&appid=' + API_KEY)
    .then(response => response.json())
    .then(data => {
      if(data.message == 'accurate'){
        setCities(data.list); 
      }
    });
  }

  useEffect(() => {
    getCitiesData(); 
  }, []); 
  let citiesView = []; 

  console.log('cities, length: ', cities, cities.length);
  for(let city of cities){
    // console.log(cities[i]); 
    citiesView.push(
      <TouchableHighlight onPress = {() => alert(city.name + 'pressed')}> 
        <View style = {{flexDirection: 'row', borderWidth: 1, marginBottom: 2}} key = {city.id}>
          <View style = {{ flex : 1}}> 
            <Text>{city.name}</Text> 
            <Text>{city.weather[0].main}</Text> 
          </View> 
          <View style = {{flex : 1, justifyContent: 'flex-end', alignItems: 'center'}}> 
          <Text>{ city.main.temp }</Text> 
          </View>
        </View> 
      </TouchableHighlight>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style = {{flex : 1}}> 
        {citiesView}
      </View>
      {/* <Text>Hello World!</Text> */}
      {/* <StatusBar style="auto" /> */}
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
});
