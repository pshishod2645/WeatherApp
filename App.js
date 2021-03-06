import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import CityScreen from './CityScreen';
import {askPermission, scheduleNotification} from './Notifications'; 

const Stack = createStackNavigator();

export default function(){
  useEffect( async () => {
    async function doIt(){
        await scheduleNotification(); 
    }
    doIt(); 
  }, ); 
  // scheduleNotification(); 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options = {{title: 'Weather App', 
          headerStyle: {backgroundColor: '#00804A'}, 
          headerTitleAlign: 'center'}}
        />
        <Stack.Screen name="City" component={CityScreen} 
          options = {({route}) => ({
            title : 'Weather App-' + route.params.city.name,
            headerStyle: {backgroundColor: '#00804A'}, 
            headerTitleAlign: 'center',
          })}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}