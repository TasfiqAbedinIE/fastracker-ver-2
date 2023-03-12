import {setDoc,addDoc, collection, doc, getDoc, getDocs, query, where,deleteDoc,updateDoc, orderBy} from "firebase/firestore";
import { database } from "../util/firebase";
import { async } from "@firebase/util";
import { Button, TextInput, View } from "react-native";





export const storeEfficiency=async(efficiencyData)=>{
  const response = await addDoc(collection(database, "efficiencies"), efficiencyData) ; 
  const id= response.id;
  // console.log("res"+response.id);
  return id;
  
}

export const fetchEfficiencies = async()=>{
  const docSnap = await getDocs(collection(database, "efficiencies"));
  
  const efficiencies= [];
  if (docSnap){
   docSnap.forEach((doc) => {
    //console.log(doc.data().date.toDate());
    const data= doc.data();
     const efficiencyobj= {
      id:doc.id,
      lineNumber: data.lineNumber,
      date: data.date.toDate(),
      buyerName: data.buyerName,
      SO:        data.SO,
      styleName: data.styleName,
      SMV:       +data.SMV,
      manpower:  +data.manpower,
      hour:       +data.hour,
      production: +data.production,
      without:     +data.without,
      due:         +data.due,
      rejection:   +data.rejection,
      
     };
    efficiencies.push(efficiencyobj)
     
       })
  }else{
   console.log('no such data')
  }
  return efficiencies.sort((a,b)=>{return b.lineNumber -a.lineNumber});
 }
 
export  async function deleteefficiency(id){
  await deleteDoc(doc(database, "efficiencies", id));
   //console.log(id)
}

export async function updateEfficiency (id,efficiencies){
  const up=  doc(database, "efficiencies", id);
  await updateDoc(up,efficiencies);
}