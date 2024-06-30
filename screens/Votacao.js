import { StatusBar } from 'expo-status-bar';
import React, { useContext} from 'react';
import { AuthContext } from '../src/context/userContext';
import { StyleSheet, View,} from 'react-native';

import Load from '../src/load/load';
import Lista from '../Lista';


export default function Votacao() {

    const { loading, setLoading } = useContext(AuthContext);
  
    function Votar(item) {
        // e.preventDefault()
        // setTxt(event.target.innerText)
        // alert(`${e.target.innerText}`)

        alert(item)
    }
    
    return (
        <View style={styles.container}>
           <Lista/>
        <StatusBar style="auto" />
    </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    }
});
