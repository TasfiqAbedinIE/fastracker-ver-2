import axios from "axios"
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Button } from "react-native"
import SwitchSelector from "react-native-switch-selector"
import BarCode from "../Components/BarcodeScanner"
import { fireStoreDb } from "../lib/firebase"

function BreakdownScanner(){
    const today = new Date();
    const dateString = `${today.getFullYear()}-${(today.getMonth()+1)<10?'0'+(today.getMonth()+1):(today.getMonth()+1)}-${today.getDate()<10?'0'+today.getDate():today.getDate()}`;

    const [scannerOpen, setScannerOpen] = useState(false)
    const [data, setData] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const [line, setLine] = useState(null);
    const [problem, setProblem] = useState('');
    const [status, setStatus] = useState('');



    // const [breakdownType, setBreakdownType] = useState("start")
    
    // const options = [
    //     { label: "Start", value: "start", activeColor: 'green'},
    //     { label: "End", value: "end", activeColor: 'green'}
    // ];


    useEffect(() => {
        console.log('data useEffect called');
        if(data)
        {
            getStatusOfMachine(data);
        }
    }, [data])

    const getStatusOfMachine = async(data) => {
        const docRef = doc(fireStoreDb, "machine-info", data);
        const docSnap = await getDoc(docRef);
        setStatus(docSnap.data().status);
        setOpenModal(true);
        setScannerOpen(false);
    }

    const sendDataToServer = async(data) => {
        const docRef = doc(fireStoreDb, "machine-info", data);
        const docSnap = await getDoc(docRef);
        if(docSnap.data().status === 'ok')
        {
            await setDoc(docRef, {
                "last breakdown": new Date(),
                status: 'repairing'
            }, { merge:true })

        }
        else if(docSnap.data().status === 'repairing')
        {
            await setDoc(docRef, {
                line: Number(line),
                status: 'ok'
            }, { merge:true })

            await addDoc(collection(fireStoreDb,"machine-lost-time"), {
                id: data, 
                date: new Date(dateString),
                lost: Math.round(((new Date()).getTime() - docSnap.data()["last breakdown"].toDate().getTime())/1000), 
                line: Number(line), 
                problem: problem
            })
        }
        // console.log(docSnap.data().status)
        
        // const res = await addDoc(collection(fireStoreDb,"machine-lost-time"), {
        //     id: data, 
        //     date: new Date(), 
        //     lost: 36, 
        //     line: Number(line), 
        //     problem: problem
        // })
        // console.log("Document written with ID: ", res.id);
        // await axios.patch('https://firsttrial-cff1d-default-rtdb.firebaseio.com/machineBreakdown.json', {"scannedData":data})
        // await axios.post(`https://firestore.googleapis.com/v1/projects/firsttrial-cff1d/databases/(default)/documents/machine-lost-time`, 
        // { fields: 
        //     { 
        //         id: { stringValue: data }, 
        //         date: { timestampValue: new Date() }, 
        //         lost: { integerValue: 67 }, 
        //         line: { integerValue: line }, 
        //         problem: { stringValue: problem }
        //     } 
        // }
        // )
        setOpenModal(false);
        setData("");
        setLine(null);
        setProblem("");
    }

    return(
        <View style={styles.mainContainer}>
            <Modal
            animationType="slide"
            transparent={true}
            visible={openModal}
            onRequestClose={() => {
            setOpenModal(false);
            setScannerOpen(false);
            setData("");
            setLine(null);
            setProblem("");
            }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{fontSize:20}}>ID: {data} is {status}</Text>
                        
                        {status==='ok'?null:
                        <>
                        <View style={{display:'flex', flexDirection:'column', justifyContent:'flex-start', margin:20}}>
                            <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <Text style={{width:70}}>Line No:</Text><TextInput value={line} placeholder="line" keyboardType='numeric' onChangeText={setLine} style={{borderWidth:1, width:150, borderColor:'gray', borderRadius:5, paddingHorizontal:5, margin:5}} />
                            </View> 
                            <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <Text style={{width:70}}>Problem:</Text><TextInput value={problem} onChangeText={setProblem} placeholder="problem" style={{borderWidth:1, width:150, borderColor:'gray', borderRadius:5, paddingHorizontal:5, margin:5}} />
                            </View>
                        </View>
                        
                        </>
                        }
                        
                        <View style={{ margin:10, padding:10 }}>
                            <TouchableOpacity style={{backgroundColor:'green', padding:15, borderRadius:20}} onPress={() => sendDataToServer(data)}>
                                <Text style={{color:'white'}} >{status==='ok'?"Start Breakdown":"Finish Breakdown"}</Text> 
                            </TouchableOpacity>
                        </View>
                        {/* <View style={styles.button}>
                        <Button  title="Submit" color={'green'} onPress={async() => {
                            await sendDataToServer(data);
                            setScannerOpen(false);
                            setOpenModal(false);
                            }} />
                        </View> */}
                        
                    </View>
                </View>
            </Modal>


            {scannerOpen?
            <View style={styles.scannerContainer}>
                <BarCode setData={setData} />
            </View>
            :<TouchableOpacity
                style={styles.scannerButton}
                onPress={() => setScannerOpen(true)}
            >
            <Text style={styles.scannerButtonText}>Scan</Text>
            </TouchableOpacity>}
        </View>
        
        
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1, 
        backgroundColor:'gray', 
        justifyContent:'center', 
        alignItems:'center'
    },
    scannerContainer: {
        height:"100%", 
        width:"100%"
    },
    scannerButton: {
        alignItems:'center',
        justifyContent:'center',
        width:100,
        height:100,
        backgroundColor:'palegreen',
        borderRadius:100,
    },
    scannerButtonText: {
        fontWeight:'bold', 
        fontSize:20
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})


export default BreakdownScanner