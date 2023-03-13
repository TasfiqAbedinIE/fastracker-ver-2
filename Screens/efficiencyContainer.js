import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import ManageEfficiency from './Screens/manageefficiency';
import ManageEfficiency from '../EfficiencyAnalysis/Screens/manageefficiency'
import Recentefficiencies from '../EfficiencyAnalysis/Screens/recentefficiencies';
import Allefficiencies from '../EfficiencyAnalysis/Screens/Allefficiencies'
import { GlobalStyles } from '../EfficiencyAnalysis/constants/styles';
import {  Ionicons } from "@expo/vector-icons";
import IconButton from '../EfficiencyAnalysis/components/UI/iconButton';
import EfficienciesContextProvider from '../EfficiencyAnalysis/Store/efficiencies-context';



const Stack= createNativeStackNavigator();
const Bottomtabs= createBottomTabNavigator();

function EfficiencyOverview(){
  return <Bottomtabs.Navigator screenOptions={({navigation})=>({
          headerStyle:{ backgroundColor: GlobalStyles.colors.headerColor},
          headerTintColor:GlobalStyles.colors.text_border_button,
          tabBarStyle:{backgroundColor:GlobalStyles.colors.headerColor},
          tabBarActiveTintColor:GlobalStyles.colors.accent500,
          headerLeft:({tintColor})=> <IconButton icon="arrow-back-outline" size={24} color={tintColor} onPress={()=>{ navigation.navigate('HOME')}} />,
          headerRight:({tintColor})=> <IconButton icon="add" size={24} color={tintColor} onPress={()=>{ navigation.navigate('ManageEfficiency')}} />
         })}>
              <Bottomtabs.Screen 
              name='Recent Efficiencies' 
              component={Recentefficiencies}
              options={{
                title:'Efficiency Informations',
                tabBarLabel: '',
                tabBarIcon:({color,size})=>(
                  <Ionicons name='hourglass' size={size} color={color}/>
                ),
              }}/>
              <Bottomtabs.Screen 
              name='All Efficiencies'  
              component={Allefficiencies} 
              listeners={{
                tabPress: e => {
                  // Prevent default action
                  e.preventDefault();}}}
              options={{
                title:'All Efficiency Information',
                tabBarLabel: '',
                tabBarIcon:({color,size})=>(
                  <Ionicons name='calendar' size={size} color={color}/>
                ),
              }}/>
        </Bottomtabs.Navigator>
}

export default function EfficiencyContainer() {
  return (
      <>
        <StatusBar style="dark" />
        <EfficienciesContextProvider>
          {/* <NavigationContainer> */}
            <Stack.Navigator screenOptions={{
              headerStyle:{backgroundColor:GlobalStyles.colors.headerColor},
              headerTintColor:GlobalStyles.colors.text_border_button,
            }}>

                <Stack.Screen 
                name='EfficienciesOverview' 
                component={EfficiencyOverview} 
                options={{headerShown: false}}
                />
                <Stack.Screen 
                name='ManageEfficiency' 
                component={ManageEfficiency} options={{
                  presentation:'modal',
                }}
                />
            
            </Stack.Navigator>

          {/* </NavigationContainer> */}
        </EfficienciesContextProvider>
      </>
      
    
  );
}


