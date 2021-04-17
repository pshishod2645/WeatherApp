import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import * as Location from 'expo-location'; 

const API_KEY = 'f322f69f8bbf7b5be2e84b31249eec1f'; 

const askNotificationPermission = async() => {
    const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus; 

    if(existingStatus != 'granted'){
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS); 
        finalStatus = status; 
    }
    if(finalStatus != 'granted')return false; 
    return true; 
}

const askLocationPermission = async() => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted')return null; 

    let location = await Location.getCurrentPositionAsync({});
    return location; 
}

const scheduleNotification = async() => {
    let status = await askNotificationPermission(); 
    if(!status){
        console.log('Notification Permission Denied'); 
        return ; 
    }
    let location = await askLocationPermission(); 
    if(!location){
        console.log('Location Permission Denied');  
        return ; 
    }
    console.log('location: ', location);
    let temperature = await fetch('http://api.openweathermap.org/data/2.5/weather?lat=' 
    + location.coords.latitude.toString() + '&lon=' + location.coords.longitude.toString() + 
    '&appid=' + API_KEY)
    .then(resp => resp.json())
    .then(resp => resp.main.temp);

    console.log(temperature); 
    let notificationId = await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Weather App', 
            body : 'Current Temperature is ' + temperature,
        },
        // trigger : null,
        trigger: { 
            seconds: 2,
            repeats: true,
        },
    }); 
    console.log(notificationId); 
};

export{
    scheduleNotification,

}