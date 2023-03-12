import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import EfficienciesList from "./EfficienciesList";
import EfficienciesSummery from "./EfficienciesSummery";





export default function EfficienciesOutput({efficiencies, efficienciesPeriod,fallbackText}){
    let content =<Text style={styles.infoText}>{fallbackText}</Text>;
    if(efficiencies.length > 0){
       content =<EfficienciesList efficiencies={efficiencies} />
   }


    return(
        <View style={styles.container}>
            {/* <EfficienciesSummery efficiencies={efficiencies} periodName={efficienciesPeriod}/> */}
         {content}

            {/* <EfficienciesList efficiencies={efficiencies}/> */}
        </View>
    )

}

const styles= StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:10,
        paddingTop:25,
        paddingBottom:0,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    infoText:{
        color:'white',
        fontSize: 16,
        textAlign:'center',
        marginTop:32,
    }
})