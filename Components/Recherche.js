
import React from 'react'
import {StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator} from 'react-native'
import {getAthletes, getAthletesByRecherche, createAthlete} from '../API/ApiAthletes'
import AthleteItem from "./AthleteItem";
import {NavigationContainer} from "@react-navigation/native";
import Consulter from './Consulter'

class Recherche extends React.Component
{
    constructor(props) {
        super(props)
        //this.athletes = []
        this.state = {
            athletes: [],
            isLoading: false // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
             }
        this.champDeRecherche = ""
        const { athlete, consulterAthlete } = this.props
    }

    displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                    {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement :
                    small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
                </View>
            )
        }
    }

    loadAthletes() {
        if (this.champDeRecherche.length > 0) { // Seulement si le texte recherché n'est pas vide
            this.setState({ isLoading: true })
            getAthletesByRecherche(this.champDeRecherche).then(data => {
            this.setState({ athletes: data,isLoading: false})
        });
    }}

    rechercheChampDeSaisie(text) {
            this.champDeRecherche = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
    }

    consulterAthlete = (idAthlete) => {
        console.log("consulter athlete ayant id " + idAthlete)
        this.props.navigation.navigate("Consulter", { idAthlete: idAthlete })
    }

    ajouter = () => {
        console.log("AddAthlete")
        this.props.navigation.navigate("AddAthlete") // Naviguez vers AddAthlete
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }} >


            <TextInput
                    placeholder='athlete'
                    style={{textAlign: 'center'}}
                    onChangeText={(text) => this.rechercheChampDeSaisie(text)}
                    onSubmitEditing={() => this.loadAthletes()}
                />

                <Button
                    title='Rechercher'
                    onPress={() => this.loadAthletes()}
                />

                <Button
                    title="Ajouter"
                    onPress={() =>
                        this.ajouter()
                    }

                />

                <FlatList
                    //data={{this. athletes}}
                    data={this.state.athletes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item})=>
                        <AthleteItem athlete={item}
                                     getAthletesByRecherche={this.getAthletesByRecherche}
                                     consulterAthlete={this.consulterAthlete}
                        />
                    }
                />
                {this.displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Recherche