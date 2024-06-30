import { StatusBar } from 'expo-status-bar';
import React, { useContext} from 'react';
import { AuthContext } from '../src/context/userContext';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Opcao() {
    
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.cursor}>
                <Text style={styles.title} onPress={() => navigation.navigate('Votacao')} >Batalha entre animes </Text>
                <MaterialCommunityIcons name="cursor-default-click" size={24} color="#000" />
            </View>
               
         <View style={styles.viewImg}>
                <Image 
                    source={require('../src/img/anime.png')} 
                    style={styles.fullAnimes}
                />
                <View style={styles.cursor}>
                    <Text style={styles.title} onPress={() => navigation.navigate('Heros')}>Batalha entre herois </Text>
                    <MaterialCommunityIcons name="cursor-default-click" size={24} color="#000" />
                </View>

                <Image 
                    source={require('../src/img/personagens.png')} 
                    style={styles.fullAnimes}   
                />
        </View>
        <StatusBar style="auto" />
    </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    viewImg: {
        width: '95%',
        height: '92%',
    },
    fullAnimes: {
        width:'100%',
        height: '50%'
    },

    title:{
        color:'#000',
        textAlign: 'center',
    },
    cursor:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    }
  
});
