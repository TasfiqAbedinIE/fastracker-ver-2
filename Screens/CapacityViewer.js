import axios from 'axios';
import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { Col, Row, Rows, Table, TableWrapper } from 'react-native-table-component';

const CapacityViewer = () => {
    
    const [operatorId, setOperatorId] = useState('330');
    const [result, setResult] = useState('')

    const capacityTableHead = ['Process', 'Item', 'Fabric Type', 'Cycle Time']
    const [capacityTableData, setCapacityTableData] = useState([])

    const getCapacity = async() => {
        axios.get(`https://firsttrial-cff1d-default-rtdb.firebaseio.com/capacityDatabase/${operatorId}.json`)
        .then((res) => {
            const data = res.data
            const tempProcess = Object.keys(data);
            const tempCapacityTableData = []

            tempProcess.forEach(element => {
                const dates = Object.keys(data[element])
                
                const lastDate = dates[dates.length-1]
                
                const rowData = []
                rowData.push(element)
                rowData.push(data[element][lastDate]["Item"])
                rowData.push(data[element][lastDate]["Fab Type"])
                rowData.push(data[element][lastDate]["Cycle Time"])

                tempCapacityTableData.push(rowData);
                console.log('row data :'+rowData)
            });
            setCapacityTableData([...tempCapacityTableData])
        })
    }
  return (
    <View style={styles.mainContainer}>
        {/* <Text style={styles.headerText}>Capacity Viewer</Text> */}
        <View style={styles.searchContainer}>
            <TextInput style={styles.input} value={operatorId} onChangeText={setOperatorId} />
            <Button title='Search' onPress={getCapacity}/>
        </View>
        <View  style={styles.tableContainer}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={capacityTableHead} flexArr={[3, 1, 1, 1]} style={styles.head} textStyle={styles.tableHeaderText}/>
          <Rows data={capacityTableData} flexArr={[3, 1, 1, 1]} style={styles.row} textStyle={styles.text}/>
        </Table>
        </View>
        
    </View>
  )
}

export default CapacityViewer


const styles = StyleSheet.create({
    mainContainer: {
        margin:5,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    input: {
        height: 40,
        width: '50%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tableContainer: {
        marginVertical: 20,
        width:'100%'
    },
  head: {  height: 40,  backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row', },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  tableHeaderText:{textAlign: 'center', fontSize:12 },
  text: { textAlign: 'center', fontSize:10 }
})