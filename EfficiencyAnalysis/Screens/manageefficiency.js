import { async } from "@firebase/util";
import { useContext, useLayoutEffect, useState } from "react";
import { Text, View ,StyleSheet,KeyboardAvoidingView, ScrollView,} from "react-native"
import EfficiencyForm from "../components/ManageEfficiency/EfficiencyForm";
import IconButton from "../components/UI/iconButton";
import Loadingspinner from "../components/UI/loading";
import { GlobalStyles } from "../constants/styles";
import { EfficienciesContext } from "../Store/efficiencies-context";
import { deleteefficiency, storeEfficiency, updateEfficiency } from "../util/forDataSendingGetting";





export default function ManageEfficiency({route,navigation}){
    const [isSubmitting,setIsSubmitting]= useState(false);
    const efficienciesCtx= useContext(EfficienciesContext);
    const editedEfficiencyId= route.params?.efficiencyId; //efficiencyId from efficiencyitem
    const isEditing = !! editedEfficiencyId;
    const selectedEfficiency= efficienciesCtx.efficiencies.find(
        (efficiency)=> {if(efficiency.id==editedEfficiencyId){
        return editedEfficiencyId;
        };}
        )
  

    useLayoutEffect(()=>{
        navigation.setOptions({
        title: isEditing ? 'Edit Efficiency' : 'Add Efficiency',
       
    });
    },[navigation,isEditing]);

    async function deleteEfficiencyhandler(){
        setIsSubmitting(true);
        await deleteefficiency(editedEfficiencyId);
        efficienciesCtx.deleteEfficiency(editedEfficiencyId);
        navigation.goBack();
    }

    function cancelHandler(){
        navigation.goBack();
    }

    async function confirmHandler(efficiencyData){
        setIsSubmitting(true);
        if(isEditing){
            await updateEfficiency(editedEfficiencyId,efficiencyData);
            efficienciesCtx.updateEfficiency(editedEfficiencyId,efficiencyData);
        }else{
        const id= await storeEfficiency(efficiencyData);
        // console.log({...efficiencyData,id:id});
            efficienciesCtx.addEfficiency({...efficiencyData,id:id});
        }
        navigation.goBack();
    }

    const [deleteButton, setdeleteButton] = useState(true);
    function testp(testp){
        setdeleteButton(testp);
       // console.log(testp);
    }

    if(isSubmitting){
        return <Loadingspinner/> 
         console.log(isSubmitting)      
     }

    return (
    
        <View style={styles.container}>
       
        <View>
            <ScrollView>
            <EfficiencyForm 
            onButton={isEditing?'Update': 'Add'} 
            onCancel={cancelHandler} 
            onSubmit={confirmHandler}
            defaultValues={selectedEfficiency}
            testp={testp}
            />
            </ScrollView>
        </View>
       
       
        
         { isEditing && (
            
            <View style={styles.deleteContainer }>
               {deleteButton && <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteEfficiencyhandler}/>}
            </View>
           
        )}
        
        </View>
   
)
}


const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:'5%',
        backgroundColor:GlobalStyles.colors.manageEfficiencyBackground,
        justifyContent:'center',
        

        },
    
    deleteContainer:{
        marginTop:"5%",
        paddingTop:20,
        borderTopWidth: 2,
        borderTopColor: 'white',
        alignItems:'center'
    }
})