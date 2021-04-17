import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableHighlight, ScrollView, Dimensions} from 'react-native';


export default function App({navigation}) {
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

  for(let city of cities){
    citiesView.push(
      <TouchableHighlight  activeOpacity = {0.9} underlayColor ='#DDDDDD' key = {city.id} onPress = {() => navigation.navigate('City', {city: city})} > 
        <View style = {{flexDirection: 'row', borderWidth: 1, marginBottom: 2, paddingVertical: 10, paddingHorizontal: 10}}>
          <View style = {{ flex : 1}}> 
            <Text style = {{fontSize: 18}}>{city.name}</Text> 
            <Text>{city.weather[0].main}</Text> 
          </View> 
          <View style = {{flex : 1, justifyContent: 'center', alignItems: 'flex-end',}}> 
          <Text style = {{fontSize: 24}}>{ city.main.temp }</Text> 
          </View>
        </View> 
      </TouchableHighlight>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style = {{flex : 1}}> 
        {citiesView}
      </ScrollView>
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
