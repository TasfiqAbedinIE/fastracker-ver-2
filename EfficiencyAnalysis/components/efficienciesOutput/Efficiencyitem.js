import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";


export default function EfficiencyItem({date,lineNumber,id,buyerName,SO,styleName,SMV,manpower,hour,production,without,due,rejection}){
     const navigation=useNavigation();
     function efficiencyPresshandler(){
         navigation.navigate('ManageEfficiency',{
            efficiencyId: id
            
         });
         
     }

     const netproduction= production+without-due+rejection;
    return(

        <Pressable onPress={efficiencyPresshandler} style={({pressed})=> pressed && styles.pressed} >
            <View style={styles.rootEfficiencyItem}>
                <View style={styles.lineDate}>
                    <View> 
                        <Text style={styles.textBase}>Date:</Text>
                        <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                    </View>
                    <View style={{flexDirection:"row",marginTop:6}}> 
                        <Text style={styles.textBase}> Line: </Text>
                        <Text style={[styles.textBase,{fontWeight:'bold',fontSize:15}]}> {lineNumber}</Text>
                    </View>
                    
                    
                    
                </View>
                <View style={styles.productionContainer}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={styles.productionComponents}>
                             <Text style={styles.production}>Production:</Text>
                        </View>
                        <View style={styles.productionComponents}>
                         <Text style={styles.production}>{netproduction}</Text>  
                        </View>
                    </View>  
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>  
                        <View style={styles.productionComponents}>
                         <Text style={styles.production}>Style Name:</Text>
                        </View>
                        <View style={styles.productionComponents}>
                        <Text style={styles.production}>{styleName}</Text>  
                        </View>
                    </View> 
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={styles.productionComponents}>
                         <Text style={styles.production}>Efficiency:</Text>
                        </View>
                        <View style={styles.productionComponents}>
                        <Text style={styles.production}>{(SMV*netproduction/manpower/hour/60*100).toFixed(2)} %</Text>  
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
        
    )
}

const styles= StyleSheet.create({
    pressed:{
        opacity:.75
    },
    ExpenseItem:{
        padding:5,
        marginVertical:8,
        backgroundColor:GlobalStyles.colors.primary500,
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:8,
        elevation:3,
    
    },
    rootEfficiencyItem:{
        padding:5,
        marginVertical:6,
        backgroundColor:GlobalStyles.colors.primary500,
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:8,
        elevation:3,
    
    },
    textBase:{
        color:GlobalStyles.colors.primary50,

    },
    description:{
        fontSize:16,
        marginBottom:4,
        fontWeight:'bold'
    },
    lineDate:{
      
        flex:.4,
        fontWeight:'bold',
        flexDirection:'column'
    },
    productionContainer:{
        paddingHorizontal:1,
        paddingVertical:1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8,
        minWidth:70,
        flex:.6,
    },
    production:{
        color: GlobalStyles.colors.primary50,
        fontWeight:'bold',
        
    },
    productionComponents:{
        borderWidth:.1,
        borderColor:'gray',
        borderRadius:1,
        margin:1,
        padding:1,
        flex:1,
        alignItems:'center'
    }
})