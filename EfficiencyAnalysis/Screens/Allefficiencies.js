import { useContext, useEffect, useState } from "react";

import EfficienciesOutput from "../components/efficienciesOutput/EfficienciesOutput";
import { EfficienciesContext } from "../Store/efficiencies-context";
import {setDoc,addDoc, collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import { database } from "../util/firebase";
import { async } from "@firebase/util";
import { Button, TextInput, View } from "react-native";
import { fetchEfficiency } from "../util/forDataSendingGetting";


export default function Allexpenses(){
    const efficienciesCtx = useContext(EfficienciesContext);
    
    
    // const getData = async() => {
    //     // const ref = doc(database, "efficiencies", "XQxDCY3vasCNCURVg0Lk");
    //     const collRef = collection(database, "efficiencies");
    //     // const q = query(collRef, where("buyer","==", "Tommy"));
    //     // const docSnap = await getDoc(ref);
    //     // const qs = await getDocs(q);
    //     await addDoc(collRef, {
    //         "buyer": "Esprit",
    //         "line": "45",
    //         "date": new Date("2023-03-01")
    //     })
    
    //     // qs.forEach((doc) => {
    //     //     console.log(doc.data())
    //     // })
    //     // console.log(qs.docs);
    // }
    
    


    

 return  <EfficienciesOutput efficiencies={efficienciesCtx.efficiencies} efficienciesPeriod= " Total " fallbackText={'No Data Found'} />
}