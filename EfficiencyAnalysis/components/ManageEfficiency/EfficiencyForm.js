import { useEffect, useState } from "react";
import {  StyleSheet, Text, View ,TouchableOpacity,TextInput} from "react-native";
import Input from "./Input";
import Button from "../../util/Button";
import { getdateMinusdays, getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
import Datepicker from "../../util/datepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function EfficiencyForm({onSubmit,onCancel,onButton, defaultValues,testp}) {
    
    const [inputs,setInputs]= useState({
        lineNumber:     {
                        value: defaultValues? defaultValues.lineNumber.toString():'',
                        isValid: true  //defaultValues? true :false
                       
                    },
        date:       {
                        value: defaultValues?getFormattedDate(defaultValues.date):'',
                        isValid: true
                    },
        buyerName:{
                     value: defaultValues?defaultValues.buyerName:'',
                     isValid: true
                    },
        SO:{
                        value: defaultValues?defaultValues.SO.toString():'',
                        isValid: true
                       },
        styleName:{
                        value: defaultValues?defaultValues.styleName.toString():'',
                        isValid: true
                       },
                      
        SMV:{
                           value: defaultValues?defaultValues.SMV.toString():'',
                           isValid: true
                          },
        manpower:{
                           value: defaultValues?defaultValues.manpower.toString():'',
                           isValid: true
                          },
                          
                           
        hour:{
                               value: defaultValues?defaultValues.hour.toString():'',
                               isValid: true
                              },
        production:{
                               value: defaultValues?defaultValues.production.toString():'',
                               isValid: true
                              },
        without:{
                                value: defaultValues?defaultValues.without.toString():'',
                                isValid: true
                               },
        due:{
                                value: defaultValues?defaultValues.due.toString():'',
                                isValid: true
                               },
        rejection:{
                                value: defaultValues?defaultValues.rejection.toString():'',
                                isValid: true
                               },
        Button:{
                                Value: true,
                                isValid: true
        }
    });
    
    function inputChangeHandler(inputIdentifier,enteredValue) {
        // console.log("Entered val: "+enteredValue);

        setInputs((curInputs)=>{
                                return{
                                        ...curInputs,
                                        [inputIdentifier]: {value: enteredValue, isValid: true}
                                    };
        });
    }

    function checkevalerror(value){
        let result=''
        try {
           result= eval(value) ;
        } catch (error) {
            result=0;
        }
        return result;
    }



    function submitHandler(){
                            //console.log(!isNaN(inputs.hour.value));
                            const efficiencyData={
                                                    lineNumber: inputs.lineNumber.value,
                                                    date: new Date(inputs.date.value),
                                                    buyerName: inputs.buyerName.value,
                                                    SO:        inputs.SO.value,
                                                    styleName: inputs.styleName.value,
                                                    SMV:       +inputs.SMV.value,
                                                    manpower:  +eval(inputs.manpower.value),
                                                    hour:       +!isNaN(inputs.hour.value)?+inputs.hour.value:+checkevalerror(inputs.hour.value),
                                                    production: +!isNaN(inputs.production.value)?+inputs.production.value:+checkevalerror(inputs.production.value),
                                                    without:     +!isNaN(inputs.without.value)?+inputs.without.value:+checkevalerror(inputs.without.value),
                                                    due:         +!isNaN(inputs.due.value)?+inputs.due.value:+checkevalerror(inputs.due.value),
                                                    rejection:   +!isNaN(inputs.rejection.value)?+inputs.rejection.value:+checkevalerror(inputs.rejection.value),
                                                 };

 
                                                 
                               
                                
                                            
                                const lineNumberIsValid =!isNaN(efficiencyData.lineNumber.trim()) && efficiencyData.lineNumber.trim().length > 0;
                                const buyerNameIsValid = efficiencyData.buyerName.trim().length > 0;
                                const SOIsValid = efficiencyData.SO.trim().length > 0;
                                const styleNameIsValid = efficiencyData.styleName.trim().length > 0;
                                const dateIsValid = efficiencyData.date.toString() !== 'Invalid Date';
                               
                                const SMVIsvalid = !isNaN(efficiencyData.SMV) && efficiencyData.SMV > 0;
                                // const manpowerIsvalid = !isNaN(efficiencyData.manpower) && efficiencyData.manpower > 0;
                                // const hourIsvalid = !isNaN(efficiencyData.hour) && efficiencyData.hour > 0;
                                // const productionIsvalid = !isNaN(efficiencyData.production) ;
                                // const withoutsvalid = !isNaN(efficiencyData.without) ;
                                // const dueIsvalid = !isNaN(efficiencyData.due) ;
                                // const rejectionIsvalid = !isNaN(efficiencyData.rejection) ;
                                const manpowerIsvalid = true
                                const hourIsvalid = true;
                                const withoutsvalid = true ;
                                const dueIsvalid = true ;
                                const rejectionIsvalid = true ;
                                const productionIsvalid = true;
                                
                               



                                if ( !lineNumberIsValid || !buyerNameIsValid || !SOIsValid || !styleNameIsValid || !dateIsValid || !SMVIsvalid ||!manpowerIsvalid || !hourIsvalid || !productionIsvalid ||!withoutsvalid || !dueIsvalid || !rejectionIsvalid){
                                // Alert.alert('invalid Input','Please, check your input values');
                                    setInputs((curInputs)=>{

                                        return{
                                            lineNumber:{ value:curInputs.lineNumber.value, isValid:lineNumberIsValid},
                                            date:{ value:curInputs.date.value, isValid:dateIsValid},
                                            buyerName:{ value:curInputs.buyerName.value, isValid:buyerNameIsValid},
                                            SO:{ value:curInputs.SO.value, isValid:SOIsValid},
                                            styleName:{ value:curInputs.styleName.value, isValid:styleNameIsValid},
                                            SMV:{ value:curInputs.SMV.value, isValid:SMVIsvalid},
                                            manpower:{ value:curInputs.manpower.value, isValid:manpowerIsvalid},
                                            hour:{ value:curInputs.hour.value, isValid:hourIsvalid},
                                            production:{ value:curInputs.production.value, isValid:productionIsvalid},
                                            without:{ value:curInputs.without.value, isValid:withoutsvalid},
                                            due:{ value:curInputs.due.value, isValid:dueIsvalid},
                                            rejection:{ value:curInputs.rejection.value, isValid:rejectionIsvalid},
                                            Button:{value:true, isValid:submitButtonisValid},
                                        }   
                                    })

                                    return;
                                }

                                onSubmit(efficiencyData); // to pass the data at manageefficiency confirm handler
    }

    const [selectDate,setSelectDate]= useState(selectDate);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
        
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
        // onchange=(selectDate)
    };

    const handleConfirm = (d) => {
    

    const dt = new Date(d);
    console.log(dt);
    const x= dt.toISOString().split('T');
    const x1= x[0].split('-');
    
    setSelectDate(x1[0]+'-'+x1[1]+'-'+x1[2])
    hideDatePicker();
    // DateData(x);

    inputChangeHandler("date", x1[0]+'-'+x1[1]+'-'+x1[2])
    
    
    };


    const formIsValid = !inputs.lineNumber.isValid|| !inputs.date.isValid || !inputs.buyerName.isValid|| !inputs.styleName.isValid || !inputs.SO.isValid|| !inputs.SMV.isValid || !inputs.hour.isValid|| !inputs.manpower.isValid || !inputs.production.isValid|| !inputs.due.isValid || !inputs.without.isValid|| !inputs.rejection.isValid  ;
    const today= new Date();  
    
    const Difference_In_Time=today.valueOf()-new Date(inputs.date.value).valueOf();
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    const submitButtonisValid= Difference_In_Days+6/24 <1+10/24 || Number(inputs.date.value)===0; 
    //console.log(Difference_In_Days+6/24)   
    useEffect(() => {
       // &&  new Date('2023-02-28T04:00:00').toLocaleTimeString()>today.toLocaleTimeString() > new Date('2023-02-28T09:00:00').toLocaleTimeString();
        testp(submitButtonisValid)
    }, [inputs.date.value]);
   // console.log(new Date('2023-02-28T04:00:00').toLocaleTimeString().split(':')[0])  ; 
    return (
       
        <View style={styles.form}>
            <Text style={styles.title}>Your line-wise style efficiency Data</Text>
            
            <View >
                
                     <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode='date'
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                
                <View style={styles.inputsRow}>
                    <Input 
                    style={styles.rowInput}
                    invalid={!inputs.lineNumber.isValid}
                    label='Line:' textInputConfig={{
                        keyboardType:'phone-pad',
                        onChangeText: inputChangeHandler.bind(this,'lineNumber'),
                        value: inputs.lineNumber.value,
                    }} 
                    />
                    <TouchableOpacity style={styles.rowInput} onPress={showDatePicker} >    
                        <Input 
                            style={styles.rowInput}
                            invalid={!inputs.date.isValid}
                            label='Date:' textInputConfig={{
                                
                                maxLentgh: 10,
                                onChangeText: inputChangeHandler.bind(this,'date'),
                                value: inputs.date.value,
                    }} /> 
                    </TouchableOpacity>  
                </View>
                <View style={styles.inputsRow}>
                    <Input 
                    style={styles.rowInput}
                    invalid={!inputs.buyerName.isValid}
                    label='Buyer Name:' textInputConfig={{
                        
                        onChangeText: inputChangeHandler.bind(this,'buyerName'),
                        value: inputs.buyerName.value
                    }} />
                    
                    <Input 
                    style={styles.rowInput}
                    invalid={!inputs.styleName.isValid}
                    label='Style Name:' textInputConfig={{
                        
                        maxLentgh: 10,
                        onChangeText: inputChangeHandler.bind(this,'styleName'),
                        value: inputs.styleName.value,
                    }} />
                </View>
                <View style={styles.inputsRow}>
                    <Input 
                    style={styles.rowInput}
                    invalid={!inputs.SO.isValid}
                    label='SO:' textInputConfig={{
                        keyboardType:'phone-pad',
                        onChangeText: inputChangeHandler.bind(this,'SO'),
                        value: inputs.SO.value
                    }} />
                    <Input 
                    style={styles.rowInput}
                    invalid={!inputs.SMV.isValid}
                    label='SMV:' textInputConfig={{
                        keyboardType:'phone-pad',
                        maxLentgh: 10,
                        onChangeText: inputChangeHandler.bind(this,'SMV'),
                        value: inputs.SMV.value,
                    }} />
                </View>
                
                <View style={styles.inputsRow}>
                    
                    <Input 
                    style={styles.rowInput}
                    invalid={!inputs.manpower.isValid}
                    label='ManPower:' textInputConfig={{
                        keyboardType:'phone-pad',
                        maxLentgh: 10,
                        onChangeText: inputChangeHandler.bind(this,'manpower'),
                        value: inputs.manpower.value,
                    }} />
                   <Input 
                    style={styles.rowInput}
                    invalid={!inputs.hour.isValid}
                    label='Hour:' textInputConfig={{
                        keyboardType:'phone-pad',
                        maxLentgh: 10,
                        onChangeText: inputChangeHandler.bind(this,'hour'),
                        value: inputs.hour.value,
                    }} />
                    
                </View>
                <View style={styles.inputsRow}>
                <Input 
                    style={styles.rowInput}
                    invalid={!inputs.production.isValid}
                    label='Production:' textInputConfig={{
                        keyboardType:'phone-pad',
                        maxLentgh: 10,
                        onChangeText: inputChangeHandler.bind(this,'production'),
                        value: inputs.production.value,
                    }} />
                </View>
                <View style={styles.inputsRow}>
                 <Input 
                    style={styles.rowInput}
                    invalid={!inputs.without.isValid}
                    label='Without:' textInputConfig={{
                        keyboardType:'phone-pad',
                        maxLentgh: 10,
                        onChangeText: inputChangeHandler.bind(this,'without'),
                        value: inputs.without.value,
                    }} />
                 <Input 
                    style={styles.rowInput}
                    invalid={!inputs.due.isValid}
                    label='Due:' textInputConfig={{
                        keyboardType:'phone-pad',
                        maxLentgh: 10,
                        onChangeText: inputChangeHandler.bind(this,'due'),
                        value: inputs.due.value,
                    }} />
                 <Input 
                    style={styles.rowInput}
                    invalid={!inputs.rejection.isValid}
                    label='Rejection:' textInputConfig={{
                        keyboardType:'phone-pad',
                        maxLentgh: 10,
                        onChangeText: inputChangeHandler.bind(this,'rejection'),
                        value: inputs.rejection.value,
                    }} />
                </View>
            </View>

               

        {formIsValid && <Text style={styles.errortext}>Invalid inputs data, check that out</Text>}
        
        <View style={styles.buttons}>
            <Button mode='flat' onPress={onCancel} style={styles.button}> Cancel </Button>
           { submitButtonisValid && <Button onPress={submitHandler} style={styles.button}>{onButton}</Button>}
        </View>

    </View>
    
    )
    
}

const styles = StyleSheet.create({
    form:{
        marginTop:'1%',
        marginBottom:2,
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        color:GlobalStyles.colors.button1,
        marginBottom:25,
        textAlign:'center',
    },
    inputsRow:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    rowInput:{
        flex:1,
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5%',
    },
    button:{
        minWidth:130,
        marginHorizontal:10,
    },
    errortext:{
        textAlign:'center',
        color: GlobalStyles.colors.error500,
        margin:8,
    }
});