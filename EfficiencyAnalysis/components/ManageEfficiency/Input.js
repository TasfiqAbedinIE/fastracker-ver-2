import { TextInput, View,Text, StyleSheet, ScrollView } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function Input({label,style,textInputConfig,invalid}) {

    const inputStyles=[styles.input];

    if (textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline)
    };
    if (invalid) {
        inputStyles.push(styles.invalidinput)
    };

    return (    
                <View style={[styles.inputContainer, style]}>
                    <Text style={[styles.label,invalid && styles.invalidlabel]}>{label}</Text>
                    <TextInput style={inputStyles} {...textInputConfig} />
                </View>
                
            )
    
}

const styles = StyleSheet.create({
    inputContainer:{
        marginHorizontal:4,
        marginVertical:8,
        
    },
    label:{
        fontSize:12,
        color:GlobalStyles.colors.text_border_button,
        marginBottom: 4
    },
    input:{
        backgroundColor:'white',
        padding:6,
        borderRadius:15,
        fontSize:18,
        color:GlobalStyles.colors.primary800,
        elevation:5,
        borderWidth:.4,
        borderColor:'gray',
    },
    inputMultiline:{
        minHeight:100,
        textAlignVertical:'top',
    },
    invalidlabel:{
        color: 'red'
    },
    invalidinput:{
        backgroundColor:GlobalStyles.colors.error50
    },
})