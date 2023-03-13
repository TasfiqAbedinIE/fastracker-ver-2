import { useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ColorLibrary } from './Style/color';
import IntroScreen from './Screens/IntroScreen';
import SquareNews from './Screens/squareNews';
import HourlyProductionContainer from './Screens/HourlyProductionContainer';
import MachineOptimizationContainer from './Screens/MachineOptimizationContainer';
import CapacityAnalysisContainer from './Screens/CapacityAnalysisContainer';
import GuestScreen from './Screens/GuestScreen';
import Dashboard from './Screens/Dashboard';
import CapacityViewer from './Screens/CapacityViewer';
import LogIn from './Screens/logIn';
import EfficiencyContainer from './Screens/efficiencyContainer';
import AuthContextProvider, { AuthContext } from './store/authContext';

const Stack = createNativeStackNavigator()

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
      <Stack.Navigator screenOptions={{animation: 'simple_push', headerStyle:{backgroundColor: ColorLibrary.body_background}}}>
        <Stack.Screen options={{headerShown:false}} name="HOME" component={IntroScreen}/>
        <Stack.Screen name="HOURLY PRODUCTION CONTAINER" component={HourlyProductionContainer} options={{title:"SEWING PRODUCTION", headerTitleStyle:{fontWeight:'bold', color:ColorLibrary.primary_text_border_button, fontSize:22}}}/>
        <Stack.Screen name="MACHINE OPTIMIZATION" component={MachineOptimizationContainer} options={{title:"MACHINE DATABASE", headerTitleStyle:{fontWeight:'bold', color:ColorLibrary.primary_text_border_button, fontSize:22}}}/>
        <Stack.Screen name="CAPACITY ANALYSIS" component={CapacityAnalysisContainer} options={{title:"CAPACITY ANALYSIS", headerTitleStyle:{fontWeight:'bold', color:ColorLibrary.primary_text_border_button, fontSize:22}}}/>
        <Stack.Screen name="EFFICIENCY ANALYSIS" component={EfficiencyContainer} options={{headerShown:false}}/>
        <Stack.Screen name="SQUARE NEWS" component={SquareNews} options={{title:"SQUARE NEWS", headerTitleStyle:{fontWeight:'bold', color:ColorLibrary.primary_text_border_button, fontSize:22}}}/>

        
      </Stack.Navigator>
  )
}

function Navigation(){
  const authCtx = useContext(AuthContext)
  return(
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack/>}
      {authCtx.isAuthenticated && <AuthenticatedUser/>}
      
    </NavigationContainer>
  )
}

function Root(){
  const authCtx = useContext(AuthContext)

    useEffect(() => {
      async function fetchToken(){
          const storedToken = await AsyncStorage.getItem('token')
  
          if (storedToken){
              authCtx.authenticate(storedToken)
          }
      }
      fetchToken()
  }, [])
  return <Navigation/>
}

export default function App() {

  return(
    <>
      <StatusBar style='dark'/>
      <AuthContextProvider>
          <Root/>
      </AuthContextProvider>
    </>
  )
}