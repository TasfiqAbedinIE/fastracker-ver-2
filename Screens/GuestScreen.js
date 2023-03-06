import { useState, useCallback } from 'react';
import { ColorLibrary } from '../Style/color';
// import {useFonts} from 'expo-font'      //Importing Font module
// import * as SplashScreen from 'expo-splash-screen';

import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

// SplashScreen.preventAutoHideAsync();


function GuestScreen({navigation}){

    function pressHandler_DASHBOARD(){
        navigation.navigate("DASHBOARD")
    }
    function pressHandler_SquareNews(){
      navigation.navigate("SQUARE NEWS")
    }
    function pressHandler_Capacityviewer(){
      navigation.navigate("CAPACITYVIEWER")
    }
    function pressHandler_LogInScreen(){
      navigation.navigate("LOGINSCREEN")
    }

  //----------------- THIS SECTION TO LOAD CUSTOM FONT IN THE APP -----------------//
    // Always use this after all other function defined in a section //
    // const [fontsLoaded] = useFonts({
    //   'phudu-Black': require('../assets/Phudu-Black.ttf'),
    //   'phudu-Light': require('../assets/Phudu-Light.ttf'),
    //   'phudu-Regular': require('../assets/Phudu-Regular.ttf'),
    //   'Dosis-Regular': require('../assets/Dosis-Regular.ttf'),
    //   'Roboto-Regular': require('../assets/RobotoCondensed-Regular.ttf'),
    //   'Roboto-Bold': require('../assets/RobotoCondensed-Bold.ttf'),

    //   'NoiseMachine': require('../assets/NoiseMachine.ttf'),
    // });

    // const onLayoutRootView = useCallback(async () => {
    //     if (fontsLoaded) {
    //       await SplashScreen.hideAsync();
    //     }
    //   }, [fontsLoaded]);
    
    // if (!fontsLoaded) {
    //     return null;
    // }

  //--------------------------------------------//

    return(
        <View styles={styles.backgroundimage}>
          <View style={styles.logoBar}>
                <Text style={styles.logo}>FasTracker</Text>
          </View>
          <View style={styles.buttonGroupContainer}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttontext} onPress={pressHandler_DASHBOARD}>DASHBOARD</Text>
              <Ionicons name="arrow-forward-outline" color={"#008921"} size={28} onPress={pressHandler_DASHBOARD}/>
            </View>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttontext} onPress={pressHandler_Capacityviewer}>SKILL MATRIX</Text>
              <Ionicons name="arrow-forward-outline" color={"#008921"} size={28} onPress={pressHandler_Capacityviewer}/>
            </View>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttontext} onPress={pressHandler_SquareNews}>SQUARE NEWS</Text>
              <Ionicons name="arrow-forward-outline" color={"#008921"} size={28} onPress={pressHandler_SquareNews}/>
            </View>
            <View style={styles.buttonContainer}>
              <Ionicons name="exit" color={"#008921"} size={28} onPress={pressHandler_LogInScreen}/>
            </View>
          </View>
    
          <View style={styles.powerbyContainer}>
            <Text style={styles.powerbytext}>Powered By SQUARE</Text>
            <Text style={styles.powerbytext}>Developed By - Industrial Engineering Department</Text>
            <Text style={styles.powerbytext}>Version - 4.0.0</Text>
          </View>
    
        </View>
      )
    
}

export default GuestScreen

screen_width = Dimensions.get("window").width
screen_height = Dimensions.get("window").height

// console.log(screen_width, screen_height)

const styles = StyleSheet.create({
    backgroundimage:{
      width:screen_width,
      height: screen_height*1.1,
      backgroundColor: ColorLibrary.body_background,
    },
    logoBar:{
      marginTop: screen_height*0.13,
      alignItems: 'center',
    },
    logo:{
        fontFamily: 'NoiseMachine',
        fontSize: 50,
        color: ColorLibrary.logo,
    },
    versionText: {
      textAlign: 'center'
    },  
    buttonGroupContainer:{
      marginTop: screen_height*0.22,
      margin: 10
    },
    buttonContainer:{
      flexDirection:'row',
      marginTop: screen_height*0.02,
      marginLeft: screen_width*0.05,
    },
    buttontext:{
      fontSize: screen_width < 200 ? 20:28,
      color: ColorLibrary.primary_text_border_button,
      fontFamily: 'Roboto-Bold'
    },
    buttonimage:{
      width: screen_width < 200 ? 25:30,
      height: screen_width < 200 ? 25:30,
      resizeMode: 'contain',
      marginLeft: screen_width*0.01,
    },
    powerbyContainer:{
      marginVertical:screen_height*0.2,
    },
    powerbytext:{
      textAlign: 'center',
      color: ColorLibrary.primary_text_border_button,
      fontFamily: 'Roboto-Regular'
    }
  });