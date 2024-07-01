import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect} from 'react';
// import { AuthContext } from '../src/context/userContext';
import { StyleSheet, View, Text, Image, TouchableOpacity, Button} from 'react-native';

import { db } from '../../db/firebaseConnection'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'


import {Container, ViewPersonagens, ViewPaginas, 
    ViewButton, Imagem, ImagemVs, ViewImagem, 
    ButtonImg, ViewTeste } from './styles'

import Load from '../../src/load/load';


export default function Heros() {

    // const { loading, setLoading } = useContext(AuthContext);
  
   // Variáveis de paginação 

   const [listaPersonagens, setListaPersonagens] = useState([])
   const [idEdit, setIdEdit] = useState(false)

   const [itensPerPage, setItensPerPage] = useState(2)
   const [currentPage, setCurrentPage] = useState(0)

   const pages = Math.ceil((listaPersonagens.length / itensPerPage) - 1)

   const startIndex = currentPage * itensPerPage;
   const endIndex = startIndex + itensPerPage;

   const [novaLista, setNovaLista] = useState([])

   const [control, setControl] = useState(true)

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
       const shuffleArray = (listaPersonagens) => {
        let shuffledArray = [...listaPersonagens];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
      };
       
      // Chamando o metodo de embaralhar
      function handleShuffle(){
        setNovaLista(shuffleArray(listaPersonagens));

      };

      const currentLista = novaLista.slice(startIndex, endIndex)    


    useEffect(()=>{

        async function getDadosListAnimes(){

            const usersRef = collection(db, "personagens");
    
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

              setListaPersonagens(lista)

            })
            .catch((err)=>{
                console.log(err)
            })
        }

        getDadosListAnimes()
        setTimeout(handleShuffle, 1500)

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
        setIdEdit(!idEdit)

       let idAnime = item.id
       let pontos = item.votos

       const docRef = doc(db, "personagens", idAnime)
       await updateDoc(docRef, {
        votos: pontos + 1
       })

       alert('Voto Registrado' + " " + `${item.nome}`)
    }
    
    function handleControl(){
        setControl(false)
    }

    setTimeout(handleControl, 3000)


    function Votar(e) {
        e.preventDefault()
        // setTxt(event.target.innerText)
        alert(`${e.target.innerText}`)


    }

    return (
        <Container>
            <ViewTeste>
                <ViewPersonagens>
                        {control == true ? <Load/> : (
                           <>
                                  {currentLista.map((item, index)=>{
                                        return(
                                    <ViewButton key={index}>
                                        <ButtonImg onPress={() => handleUpdateVoto(item)}>
                                             <Imagem
                                                src={item.avatar}
                                             />
                                                <Text >{item.nome}</Text>
                                        </ButtonImg>
                                    </ViewButton>
                                
                                )
                            })} 
                            </> 
                        )}
        
                </ViewPersonagens>
            </ViewTeste>
            
            <ViewImagem>
                <ImagemVs
                    source={require('../../src/img/vs1.png')}
                    />
            </ViewImagem>
        
            {/* <Button onPress={generateRandomNumber} title='sortear'/> */}
        <StatusBar style="auto" />
    </Container>


    );
}

