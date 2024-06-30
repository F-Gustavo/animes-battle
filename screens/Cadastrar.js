import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback } from "react-native"
import { useEffect, useState } from "react"
import { db } from '../src/db/firebaseConnection'
import { collection, addDoc,} from 'firebase/firestore'

import { Picker } from '@react-native-picker/picker';

export default function Cadastrar(){

    const [nome, setNome] = useState('')
    const [urlAvatar, setUrlAvatar] = useState('')
    const [pontos, setPontos] = useState('')

    const [select, setSelect] = useState('')
    
    async function cadastrarAnimes(){
        if(nome == '' || urlAvatar == '' || select == '' ){
            alert('Preencha os campos')
            return;
        }
        await addDoc(collection(db, `${select}`), {
            nome: nome,
            avatar: urlAvatar,
            votos: 0
        })
        .then(()=>{
            alert("Cadastrado com sucesso!")
            console.log("Cadastrado com sucesso!")
            Keyboard.dismiss();
            setNome('')
            setUrlAvatar('')
        })
        .catch((erro)=>{
            console.log(erro)
        })
    }

    


    return(
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()} >
        <View style={styles.containerCadastrar}>
            <View style={styles.viewbuttons}> 
                <TextInput style={styles.inputCadastrar}
                    placeholder="Nome do anime..."
                    placeholderTextColor='#000'
                    value={nome}
                    onChangeText={(txt)=> setNome(txt)}
                />

                <TextInput style={styles.inputCadastrar}
                    placeholder="Url da imagem..."
                    placeholderTextColor='#000'
                    value={urlAvatar}
                    onChangeText={(txt)=> setUrlAvatar(txt)}
                />
                <Picker style={styles.drop}
                    selectedValue={select}
                    onValueChange={(itemValue, itemIndez) => 
                        setSelect(itemValue)
                    }
                >   
                    <Picker.Item label="Selecione" value="selecione" />   
                    <Picker.Item label="animes" value="animes" />
                    <Picker.Item label="personagens" value="personagens" />
                </Picker>
                        <TouchableOpacity style={styles.btnCadastrar} onPress={cadastrarAnimes}>
                            <Text style={{fontSize:20, color:'white'}}>Cadastrar</Text>
                        </TouchableOpacity>
                <View style={styles.viewImagem}>
                    <Image
                        style={styles.imgCadastrar}
                        source={require('../src/img/super.png')}
                        />
                </View>
              </View>
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles=StyleSheet.create({
    viewbuttons:{
        width: 400,
        height: 200,
        marginTop: '1%',
        alignItems:'center',
    },
    containerCadastrar:{
        height: '100%',
        alignItems:'center',
        backgroundColor:'black',
    },
    inputCadastrar:{
        width: '95%',
        height: 50,
        // borderWidth: 2,
        // borderColor: 'gray',
        padding: 8,
        color:'#000',
        marginBottom: 4,
        backgroundColor:'white'
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
    btnCadastrar:{
        width: '95%',
        height: 50,
        backgroundColor: '#0B5345',
        marginTop: 4,
        alignItems:'center',
        justifyContent:"center"
    },
    imgCadastrar: {
        width: '95%',
        height: '95%',
    },
    viewImagem:{
        width: '95%',
        height: 450,
        alignItems:'center',
        justifyContent:'center'
    },
    keyboard:{
        flex: 1
    }
})