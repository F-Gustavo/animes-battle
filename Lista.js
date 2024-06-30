import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './src/context/userContext';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';

import { db } from './src/db/firebaseConnection'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'

import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Load from './src/load/load';

export default function Lista(){

    const { loading, setLoading } = useContext(AuthContext);

    const [listaAnimes, setListAnimes] = useState([])
    const [idEdit, setIdEdit] = useState(false)
    const [myStar, setMyStar] = useState([1,2,3])


      // Variáveis de paginação 

      const [itensPerPage, setItensPerPage] = useState(3)
      const [currentPage, setCurrentPage] = useState(0)
  
      const pages = Math.ceil((listaAnimes.length / itensPerPage) - 1)
  
      const startIndex = currentPage * itensPerPage;
      const endIndex = startIndex + itensPerPage;
     
      const [novaLista, setNovaLista] = useState([])

      const [refresh, setRefresh] = useState(true)

        useEffect(() => {
        let timeoutVariable

        if(refresh){
            timeoutVariable = setTimeout(() => setRefresh(false), 1000)
        }

        return () => clearTimeout(timeoutVariable)

        }, [refresh]) 

        _getData = () => {
        fetch()
        .then(data => {
            setRefresh(true)
        })
        }

        useEffect(() => {
            setTimeout(handleShuffle, 1000)
          }, [refresh]) 
    

   // Embaralhando array de animes 
       const shuffleArray = (listaAnimes) => {
        let shuffledArray = [...listaAnimes];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
      };
       
      // Chamando o metodo de embaralhar
      function handleShuffle(){
        setNovaLista(shuffleArray(listaAnimes));
        // alert('roduou')

      };

      const currentLista = novaLista.slice(startIndex, endIndex)    


    async function getStorage(){
        const storage = await AsyncStorage.getItem('@my-star')
        if(storage == '[]'){
            setMyStar([])   
        }
   }

   async function handleStorage(){
        try {
            const jsonValue = JSON.stringify(myStar);
            await AsyncStorage.setItem('@my-star', jsonValue);
            // alert('salvou storage')
          } catch (err) {
              console.log(err)
          }

    }

   async function removeStorage(){
    AsyncStorage.clear();

    alert('limpou storage')
   }


//    setTimeout(removeStorage,5000)

    useEffect(()=>{

        async function getDadosListAnimes(){

            const usersRef = collection(db, "animes");
    
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

              setListAnimes(lista)

            })
            .catch((err)=>{
                console.log(err)
            })
        }
        getDadosListAnimes()
        getStorage()
       

    }, [idEdit])



    function proximoItem() {
        if (currentPage == pages) {
            alert('Você estar na ultima página')
            return
        }
        setCurrentPage(currentPage + 1)
    }

    function anteriorItem() {
        if (currentPage == 0) {
            alert('Você estar na primeira página')
            return
        }
        setCurrentPage(currentPage - 1)
    }

   async function handleUpdateVoto(item){

        if(myStar.length == 0){
            alert('Você não pode mais avaliar!')
            return;
        }
        
        setIdEdit(!idEdit)

       let idAnime = item.id
       let pontos = item.votos

       const docRef = doc(db, "animes", idAnime)
       await updateDoc(docRef, {
        votos: pontos + 1
       })

       alert('Voto Registrado ' + " " + `${item.nome}`)
       myStar.shift();
       handleShuffle()

       if(myStar.length == 0){
            setTimeout(handleStorage, 2000)
            return;
       }else{
            console.log('não salvou!')
       }

    }

   
    return (
        <View style={styles.container}>
            <View  style={styles.containerStar}>
                <Text style={{color:'#000'}}> {myStar.length == 0 ? 'Você não tem estrelas...' : 'A cada voto você usa 1 estrela' } </Text>
                <View style={styles.viewStar}>
                    {myStar.map((index)=>{
                        return(
                            <View key={index}>  
                                <Foundation name="star" size={14} color="#ff8000" />
                            </View>
                        )
                    })}
                </View> 
            </View>

            {listaAnimes.length === 0 ? <Load/> : (
                
                    <View style={styles.viewAnimes}>
                     {currentLista.map((item, index)=>{
                       return(
                       <View key={index} style={styles.viewProsseguir}>
                            <TouchableOpacity style={{height: 100, width:'97%'}} onPress={() => handleUpdateVoto(item)}>
                                <Image 
                                    style={styles.img}
                                    src={item.avatar}
                                />
                                 <Text style={styles.titleProsseguir}>{item.nome}</Text>
                            </TouchableOpacity>
                       </View>
                       
                       )
                   })} 
                  </View> 
              
            )}
            {/* <Button title='teste' onPress={removeStorage}/>  */}
            <View style={styles.viewPaginas}>
                <AntDesign onPress={anteriorItem} name="left" size={24} color="#000" />
                     <Text style={{color:'#000'}}>{currentPage + 1} / {listaAnimes.length / 3 }</Text>
                <AntDesign onPress={proximoItem} name="right" size={24} color="#000" />
            </View>
        <StatusBar style="auto" />
    </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    viewAnimes:{
        height: '90%',
        justifyContent: 'space-around',
        marginLeft: 5
    },
    img: {
        width: '98%',
        height: '120%'
    },

    viewProsseguir: {
        width:'100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    prosseguir: {
        width: '98%',
        height: 30,
        marginTop: '1%',
        backgroundColor: '#0B5345',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    titleProsseguir: {
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center'

    },
    viewPaginas:{
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginEnd: 5,
        marginLeft: 5
    },
    containerStar:{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginEnd: 5,
        marginLeft: 5,

    },
    viewStar:{
        flexDirection: 'row',
    }


});
