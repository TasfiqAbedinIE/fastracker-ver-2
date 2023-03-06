import { FlatList, Text, View, StyleSheet, Dimensions } from "react-native";
import GridTile from "../Components/GridTile";
import { NewsValue } from "../Components/News_data";
import { ColorLibrary } from "../Style/color";

screen_width = Dimensions.get('window').width
screen_height = Dimensions.get('window').height

/////////////// Render on scroll Down /////////////////

function SquareNews(){

    function renderNews(itemData){
        return(
            <GridTile
                image = {itemData.item.image}
                serial = {itemData.item.serial}
                dept = {itemData.item.dept}
                news = {itemData.item.news}
            />
        )
    }
    return(
        <View style={styles.container}>
                <FlatList style={styles.newslist}
                    data={NewsValue}
                    keyExtractor={(item) => item.serial}
                    renderItem={renderNews}
                />
        </View>
        
    )
}

export default SquareNews

screen_width = Dimensions.get('window').width
screen_height = Dimensions.get('window').height

const styles = StyleSheet.create({
    header:{
        height: screen_height*0.08,
        marginTop: '8%',
    },
    headerText:{
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: "5%",
        marginLeft: '35%',
        color: ColorLibrary.primary_text_border_button
    },
    container:{
        height: screen_height,
        backgroundColor: ColorLibrary.body_background,
        paddingBottom: screen_height * 0.08,
    },
})

