import { useCallback } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorLibrary } from './Style/color';
import IntroScreen from './Screens/IntroScreen';
import SquareNews from './Screens/squareNews';
import HourlyProductionContainer from './Screens/HourlyProductionContainer';
import MachineOptimizationContainer from './Screens/MachineOptimizationContainer';
import CapacityAnalysisContainer from './Screens/CapacityAnalysisContainer';
import GuestScreen from './Screens/GuestScreen'
import Dashboard from './Screens/Dashboard';
import CapacityViewer from './Screens/CapacityViewer';
import LogIn from './Screens/logIn';

import {useFonts} from 'expo-font'      //Importing Font module
import * as SplashScreen from 'expo-splash-screen';

const Stack =createNativeStackNavigator()
const userstate = true

SplashScreen.preventAutoHideAsync();

export default function App() {

  //----------------- THIS SECTION TO LOAD CUSTOM FONT IN THE APP -----------------//
    // Always use this after all other function defined in a section //
    const [fontsLoaded] = useFonts({
      'phudu-Black': require('./assets/Phudu-Black.ttf'),
      'phudu-Light': require('./assets/Phudu-Light.ttf'),
      'phudu-Regular': require('./assets/Phudu-Regular.ttf'),
      'Dosis-Regular': require('./assets/Dosis-Regular.ttf'),
      'Roboto-Regular': require('./assets/RobotoCondensed-Regular.ttf'),
      'Roboto-Bold': require('./assets/RobotoCondensed-Bold.ttf'),

      'NoiseMachine': require('./assets/NoiseMachine.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }, [fontsLoaded]);
  
  if (!fontsLoaded) {
      return null;
  }

  //--------------------------------------------//




  function AuthStack(){
    return(
      <Stack.Navigator screenOptions={{animation: 'simple_push', headerStyle:{backgroundColor: ColorLibrary.body_background}}}>
        <Stack.Screen options={{headerShown: false}} name='LOGINSCREEN' component={LogIn}/>
        <Stack.Screen options={{headerShown:false}} name="GUESTHOME" component={GuestScreen}/>
        <Stack.Screen name="DASHBOARD" component={Dashboard} options={{title:"HOURLY PRODUCTION", headerTitleStyle:{fontWeight:'bold', color:ColorLibrary.primary_text_border_button, fontSize:22}}}/>
        <Stack.Screen name="CAPACITYVIEWER" component={CapacityViewer} options={{title:"SKILL MATRIX", headerTitleStyle:{fontWeight:'bold', color:ColorLibrary.primary_text_border_button, fontSize:22}}}/>
        <Stack.Screen name="SQUARE NEWS" component={SquareNews} options={{title:"SQUARE NEWS", headerTitleStyle:{fontWeight:'bold', color:ColorLibrary.primary_text_border_button, fontSize:22}}}/>
      </Stack.Navigator>
    )
  }

  function AuthenticatedUser(){
    return(
      // <NavigationContainer >
        <Stack.Navigator screenOptions={{animation: 'simple_push', headerStyle:{backgroundColor: "#9fff8c"}}}>
          <Stack.Screen options={{headerShown:false}} name="HOME" component={IntroScreen}/>
          <Stack.Screen name="HOURLY PRODUCTION CONTAINER" component={HourlyProductionContainer} options={{title:"SEWING PRODUCTION"}}/>
          <Stack.Screen name="MACHINE OPTIMIZATION" component={MachineOptimizationContainer}/>
          <Stack.Screen name="CAPACITY ANALYSIS" component={CapacityAnalysisContainer} options={{title:"CAPACITY ANALYSIS"}}/>
          <Stack.Screen name="SQUARE NEWS" component={SquareNews}/>
        </Stack.Navigator>
      // </NavigationContainer>
    )
  }

  function Navigation(){
    return(
      <NavigationContainer>
        {userstate && <AuthStack/>}
        {!userstate && <AuthenticatedUser/>}
        
      </NavigationContainer>
    )
  }

  // <NavigationContainer>
  //   <Stack.Navigator>
  //   <Stack.Screen options={{headerShown:false}} name="GUESTHOME" component={GuestScreen}/>
  //   </Stack.Navigator>
  // </NavigationContainer>

  return(
    <>
      <StatusBar style='dark'/>
      {/* <NavigationContainer >
        <Stack.Navigator screenOptions={{animation: 'simple_push', headerStyle:{backgroundColor: "#9fff8c"}}}>
          <Stack.Screen options={{headerShown:false}} name="HOME" component={IntroScreen}/>
          <Stack.Screen name="HOURLY PRODUCTION CONTAINER" component={HourlyProductionContainer} options={{title:"SEWING PRODUCTION"}}/>
          <Stack.Screen name="MACHINE OPTIMIZATION" component={MachineOptimizationContainer}/>
          <Stack.Screen name="CAPACITY ANALYSIS" component={CapacityAnalysisContainer} options={{title:"CAPACITY ANALYSIS"}}/>
          <Stack.Screen name="SQUARE NEWS" component={SquareNews}/>
        </Stack.Navigator>
      </NavigationContainer> */}
      {/* {!userstate && <AuthenticatedUser/>}
      {userstate && <GuestUser/>} */}
      <Navigation onLayout={onLayoutRootView}/>

    </>
  )
}