import { useState, useCallback, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Pressable, Alert } from 'react-native';
import { ColorLibrary } from '../Style/color';
import {useFonts} from 'expo-font'      //Importing Font module
import * as SplashScreen from 'expo-splash-screen';

import { authenticate } from '../Util/auth';
import { AuthContext } from '../store/authContext';

SplashScreen.preventAutoHideAsync();



function LogIn({navigation}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticate, setisAuthenticate] = useState(false)

    function record_email(email){
        setEmail(email)
    }
    function record_password(password){
        setPassword(password)
    }

    function print(){
        console.log(email, password)
    }

    function pressHandler_GUESTSCREEN(){
        navigation.navigate("GUESTHOME")
    }

    const authCtx = useContext(AuthContext)

    async function loginHandler(){
        try{
            const token = await authenticate(email, password)
            authCtx.authenticate(token)
        } catch(error){
            Alert.alert("Wrong Email or Password, Try Again!")
        }
    }

    //----------------- THIS SECTION TO LOAD CUSTOM FONT IN THE APP -----------------//
    // Always use this after all other function defined in a section //
    const [fontsLoaded] = useFonts({
        'phudu-Black': require('../assets/Phudu-Black.ttf'),
        'phudu-Light': require('../assets/Phudu-Light.ttf'),
        'phudu-Regular': require('../assets/Phudu-Regular.ttf'),
        'Dosis-Regular': require('../assets/Dosis-Regular.ttf'),
        'Roboto-Regular': require('../assets/RobotoCondensed-Regular.ttf'),
        'Roboto-Bold': require('../assets/RobotoCondensed-Bold.ttf'),

        'NoiseMachine': require('../assets/NoiseMachine.ttf'),
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

    return(
        <View style={styles.backgroundimage} onLayout={onLayoutRootView}>
            <View style={styles.logoBar}>
                <Text style={styles.logo}>FasTracker</Text>
                <Text style={styles.slogan}>Let's Make The World Better Together</Text>
            </View>
            <View style={styles.LoginContainer}>
                <Text style={styles.logintext}>LOG IN</Text>
                <TextInput style={styles.inputBox} placeholder="EMAIL" onChangeText={record_email}></TextInput>
                <TextInput style={styles.inputBox} placeholder="PASSWORD" onChangeText={record_password}></TextInput>
                <View style={styles.button_view}>
                    <Pressable style={styles.button} android_ripple={{color: '#fff'}} onPress={loginHandler}>
                        <Text style={styles.submitButtonText}>SUBMIT</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.guestBar}>
                <Text style={styles.guestBarTitle}>Not A Member?</Text>
                <Text style={styles.guestBarbutton} onPress={pressHandler_GUESTSCREEN}>USE AS A GUEST</Text>
            </View>
            <View style={styles.powerbyContainer}>
                <Text style={styles.powerbytext}>Powered By SQUARE</Text>
                <Text style={styles.powerbytext}>Developed By - Industrial Engineering Department</Text>
                <Text style={styles.powerbytext}>Version - 4.0.0</Text>
            </View>
        </View>
    )
}

export default LogIn

screen_width = Dimensions.get("window").width
screen_height = Dimensions.get("window").height

const styles = StyleSheet.create({
    backgroundimage:{
      width:screen_width,
      height: screen_height * 1.1,
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
    slogan:{
        fontFamily: 'phudu-Regular',
        fontSize: 12,
    },
    LoginContainer:{
        height: screen_height * 0.4,
        width: screen_width * 0.9,
        marginLeft: (screen_width * 0.9) * 0.06,
        backgroundColor: ColorLibrary.body_sub_1,
        marginTop: screen_height * 0.1,
        borderRadius: 20,
        alignItems: 'center',
    },
    logintext:{
        fontSize: screen_width < 200 ? 18:23,
        fontFamily: 'Roboto-Bold',
        color: ColorLibrary.primary_text_border_button,
        marginTop: screen_height * 0.03,
    },
    inputBox: {
        height: screen_height * 0.06,
        width: screen_width * 0.8,
        marginTop: screen_height * 0.025,
        borderWidth: 2,
        borderColor: ColorLibrary.primary_text_border_button,
        padding: 10,
        borderRadius: 20,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },
    button_view:{
        overflow: "hidden",
        borderRadius: 20,
        marginTop: screen_height * 0.05,
    },
    button: {
        width: screen_width * 0.5,
        height: screen_height * 0.06,
        backgroundColor: ColorLibrary.primary_text_border_button,
        alignItems: 'center',
    },
    submitButtonText:{
        fontSize: screen_width < 200 ? 18:26,
        fontFamily: 'Roboto-Bold',
        color: ColorLibrary.button_text_color_1,
        marginTop: screen_height * 0.06 * 0.15,
    },
    guestBar:{
        alignItems: 'center',
    },
    guestBarTitle:{
        fontSize: screen_width < 200 ? 14:18,
        fontFamily: 'Roboto-Bold',
        marginTop: 10,
        color: ColorLibrary.primary_text_border_button,
    },
    guestBarbutton:{
        fontSize: screen_width < 200 ? 18:28,
        fontFamily: 'phudu-Black',
        marginTop: 10,
        color: ColorLibrary.primary_text_border_button,
    },
    powerbyContainer:{
        marginVertical:screen_height * 0.1,
    },
    powerbytext:{
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: ColorLibrary.primary_text_border_button,
    }
})