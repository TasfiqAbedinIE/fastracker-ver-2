import { useContext, useEffect, useState } from "react";
import {  Button, Text, TouchableOpacity, View } from "react-native";
import EfficienciesOutput from "../components/efficienciesOutput/EfficienciesOutput";
import { EfficienciesContext } from "../Store/efficiencies-context";
import { getFormattedDate,getdateMinusdays} from "../util/date";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { GlobalStyles } from "../constants/styles";
import { Fontisto } from '@expo/vector-icons';
import { fetchEfficiencies } from "../util/forDataSendingGetting";
import { async } from "@firebase/util";
import Loadingspinner from "../components/UI/loading";


const blockWiseLine = [
    [1,2,3,4,5,6],
    [7,8,9,10,11,12,13,14,15],
    [16,17,18,19,20,21],
    [22,23,24,25,26,27,28,29,30],
    [31,32,33,34,35,36],
    [37,38,39,40,41,42,43,44,45],
    [46,47,48,49],
    [50,51,52,53,54,55],
    [56,57,58,59,60,61,62],
    [63,64,65,66,67,68,69],
    [70,71,72,73,74,75,76],
    [77,78,79,80,81],
    [82,83,84,85,86],
    [87,88,89,90,91],
    [92,93,94,95,96],
    [97,98,99,100,101,102,103,104,105],
    [106,107,108,109,110,111,112,113,114]
]


const checkNumberInArray = (number, array) => {
    
    for(let i=0; i<array.length; i++)
    {
        if(number === array[i])
            {
                return true;
            }
    }
    

    return false;
}


export default function Recentefficiencies(){
   

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState({label: 'Line 1-6', value: [1,2,3,4,5,6]});
    const [items, setItems] = useState(
        blockWiseLine.map((e) => ({label: `Line ${e[0]} - ${e[e.length - 1]}`,value:e}))
    );
    const [ isfetching,setIsfetching]= useState(true)
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    
    
    
   const efficienciesCtx= useContext(EfficienciesContext);
     
   useEffect(() => {
   async  function getEfficiencies(){
   const efficiencies=  await fetchEfficiencies();
   setIsfetching(false);
   efficienciesCtx.setEfficiency(efficiencies);
  }
  getEfficiencies();

     },[]);
    
     if(isfetching){
        return <Loadingspinner/>       
     }
    const recentEfficiencies= efficienciesCtx.efficiencies.filter((efficiency)=>{
        const today= new Date('2023-02-28');
        //const recent = getdateMinusdays(today,0);
        // console.log(efficiency.date >= recent && efficiency.line===7);
        //const date1 = efficiency.date.toLocaleDateString();
        //const date2 = today.toLocaleDateString();
        //console.log(today.valueOf() === efficiency.date.valueOf() && checkNumberInArray(Number(efficiency.lineNumber), value) );
        //console.log(getFormattedDate(efficiency.date))
        return  getFormattedDate(selectedDate) === getFormattedDate(efficiency.date) && checkNumberInArray(Number(efficiency.lineNumber), value) ;
        
    });
return (
    <>
    
    
       <View style={{flexDirection:'row'}}>
       <View style={{flex:6, zIndex:10000, backgroundColor:GlobalStyles.colors.backroundColor}}>
        <DropDownPicker
            listMode="MODAL"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{borderRadius:10,borderWidth:.5}}
            placeholder="Select a Block"
            
           />
        
        <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode='date'
                        onConfirm={(date) => {
                            setSelectedDate(date); 
                            setIsDatePickerVisible(false);
                        }}
                        onCancel={() => setIsDatePickerVisible(false)}
                    />
       
       </View>
        <View style={{backgroundColor:GlobalStyles.colors.backroundColor,flex:4}}>
            <TouchableOpacity onPress={() => setIsDatePickerVisible(true)} style={{borderWidth:.5,padding:'2%',alignItems:'flex-start',borderRadius:10,backgroundColor:'white'}}>
                <View style={{flexDirection:'row', minHeight:42, alignContent:"center"}}>
                    <View style={{ justifyContent:'center',marginRight:'3%'}}>
                        <Text style={{}}> Date: {selectedDate.toLocaleDateString()} </Text>

                    </View>
                    <View style={{ justifyContent:'center', marginLeft:10}}>
                        <Fontisto name="date" size={16} color="black" />
                    </View>
                </View>
            </TouchableOpacity> 
            </View>
        </View>
        <EfficienciesOutput  efficiencies={recentEfficiencies}  fallbackText={' No Data Found at Today for Selected Block'}/>
    </>
)}