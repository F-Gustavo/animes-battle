import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity } from 'react-native';

export default function Inicial() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backgroundImagem} source={require('../src/img/animes.png')} />
            {/* <Button style={styles.btn} title='Processiguir para votação' onPress={() => navigation.navigate('Votacao')} /> */}
            <View style={styles.viewProsseguir}>
                <TouchableOpacity style={styles.prosseguir} onPress={() => navigation.navigate('Opcao')}>
                    <Text style={styles.titleProsseguir}> MODO BATTLE </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.prosseguir} onPress={() => navigation.navigate('Rank')}>
                    <Text style={styles.titleProsseguir}> RANKED </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.prosseguir} onPress={() => navigation.navigate('Cadastrar')}>
                    <Text style={styles.titleProsseguir}>REGISTER</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    title: {
        color: '#fff',
        fontSize: 18
    },
    backgroundImagem: {
        flex: 1,
        marginBottom: 5,
    },
    btn: {
        marginTop: 10
    },

    viewProsseguir: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    prosseguir: {
        width: '95%',
        height: 30,
        backgroundColor: '#0B5345',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 1.5
    },
    titleProsseguir: {
        color: '#fff',
        fontWeight: 'bold',

    }
});
