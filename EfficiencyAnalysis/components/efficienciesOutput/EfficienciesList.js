import { FlatList, Text, View } from "react-native";
import EfficiencyItem from "./Efficiencyitem";


function renderEfficiencyItem(itemData){
    return <EfficiencyItem {...itemData.item}/>;
    
}


export default function EfficienciesList({efficiencies}){
    return <FlatList 
        data={efficiencies} 
        renderItem={renderEfficiencyItem} 
        key={(item)=>item.id}/>

}