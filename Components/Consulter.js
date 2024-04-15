import {StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator, ScrollView, image} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {createAthlete, getAthleteparnom} from "../API/ApiAthletes";
import {deleteAthlete} from "../API/ApiAthletes";

class Consulter extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            athlete : undefined,
            isLoading: true // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer les infos de l'Athlete
        }
    }

    displayLoading() {
        if (this.state.isLoading) {
            // Si isLoading vaut true, on affiche le chargement à l'écran
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    supprimer = () => {
        console.log("deleteAthlete")
        deleteAthlete(this.props.route.params.idAthlete)

    }

    afficherInfosAthlete() {
        if (this.state.athlete !== undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>

                    <View style={styles.content_container}>
                        <image style={styles.image} source={{uri: this.state.athlete.image}}></image>
                        <Text style={styles.title_text}>{this.state.athlete.nom} {this.state.athlete.prenom}</Text>
                        <Text style={styles.description_text}> date de naissance
                            : {this.state.athlete.dateNaissance} </Text>
                        <Text style={styles.description_text}> pays : {this.state.athlete.pays.libelle} </Text>
                        <Text style={styles.description_text}> sport: {this.state.athlete.sport.nom} </Text>
                        <Text style={styles.description_text}> numero d'olympiade
                            : {this.state.athlete.sport.olympiade.numero} </Text>
                        <Text style={styles.description_text}> ville de l'olympiade
                            : {this.state.athlete.sport.olympiade.ville.nom} </Text>
                        <Text style={styles.description_text}> pays de l'olympiade
                            : {this.state.athlete.sport.olympiade.ville.pays.libelle} </Text>

                    </View>


                </ScrollView>
            )
        }
    }

    render() {

        console.log('vue consulter');
        const  idAthlete  = this.props.route.params.idAthlete;
        //const  nomAthlete  = this.props.route.params.nomAthlete;
        //const  prenomAthlete  = this.props.route.params.prenomAthlete;
        return (
            <View style={styles.main_container}>
                {this.displayLoading()}
                {this.afficherInfosAthlete()}
                <Button
                    title='supprimer'
                    onPress={() => this.supprimer()}
                />
            </View>
        )
    }

    componentDidMount() {
        console.log("Component athleteconsulter monté")
        getAthleteparnom(this.props.route.params.idAthlete).then(data => {
            this.setState({
                athlete: data,
                isLoading: false
            })
        })
    }

}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },

    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5,

    },

    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },

    content_container:{
        alignItems: 'center',
        justifyContent: 'center'
    },

    image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
    },




})

export default Consulter