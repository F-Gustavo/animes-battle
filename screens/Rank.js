import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

import { db } from '../db/firebaseConnection'
import { getDocs,  collection,} from 'firebase/firestore'

import { Picker } from '@react-native-picker/picker';

export default function Rank() {

    const navigation = useNavigation();

    const [dados, setDados] = useState([])
    const [select, setSelect] = useState('animes')

    useEffect(()=>{

        async function getDadosListAnimes(){

            const usersRef = collection(db, `${select}`);
    
            getDocs(usersRef)
            .then((snapshot)=>{
                let lista = [];

                snapshot.forEach((doc)=>{
                    lista.push({
                        id: doc.id,
                        nome: doc.data().nome,
                        avatar: doc.data().avatar,
                        votos: doc.data().votos
                    })
                })

                let sortPoints = lista.sort((a, b) => {
                    return a?.votos >= b?.votos ? -1 : 1;
                });

              setDados(sortPoints)

            })
            .catch((err)=>{
                console.log(err)
            })
        }

        getDadosListAnimes()

    }, [select])


    console.log(select)

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Rank dos Melhores </Text> */}
            <StatusBar style="auto" />
            <Picker style={styles.drop}
                    selectedValue={select}
                    onValueChange={(itemValue, itemIndez) => 
                        setSelect(itemValue)
                    }
                >   
                    <Picker.Item label="animes" value="animes" />
                    <Picker.Item label="personagens" value="personagens" />
                </Picker>

            <ScrollView style={styles.viewInfos}>
                {dados.map((item, index)=>{
                    return(
                        <View key={index} style={styles.viewInfos}>
                            <View style={styles.viewDetails}>
                             <  View style={styles.viewImage}>
                                    <Image
                                        style={styles.img}
                                        src={item.avatar}
                                        />
                                     <View>
                                        <Text style={styles.title}> {item.nome} </Text>
                                        </View>
                                </View>
                                        <View >
                                         <Text style={styles.titlePontos}>{item.votos}</Text>
                                        </View>
                                    </View>
                            </View>
                    )
                })}
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    viewInfos: {
        width: '97%',
        height: 'auto',
        marginTop: '3%',
        borderWidth: 1,
        // borderColor: '#F4A460',
        // border-image: url("./132d0b11f96dcffaa700966900312a52.jpg") 150 round;
    },
    viewDetails: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: 2,
        backgroundColor: '#0B5345'
    },
    viewImage: {
        width: 210,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        marginLeft: '3%'
    },
    titlePontos: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    img: {
        width: 45,
        height: 45,
        borderRadius: 50,
        marginStart: -45,
        marginTop: 2,
        marginBottom: 2,
        objectFit: 'contain'

    },
    drop:{
        width: '95%',
        height: 50,
        borderWidth: 2,
        borderColor: 'gray',
        padding: 8,
        color:'#000',
        marginBottom: 4,
        backgroundColor:'white'
    },

});
