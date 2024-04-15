import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getSports, getPays, createAthlete } from '../API/ApiAthletes';


export default function AddAthlete({ navigation }) {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [paysId, setPaysId] = useState('');
    const [sportId, setSportId] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [sports, setSports] = useState([]); // État pour stocker les sports récupérés depuis l'API
    const [paysList, setPaysList] = useState([]); // État pour stocker les pays récupérés depuis l'API
    const [listePays, setListePays] = useState([]);
    const [listeSports, setListeSports] = useState([]);

    useEffect(() => {
        // Récupérer les sports depuis l'API et mettre à jour l'état
        getSports().then(data => setSports(data));
        // Récupérer les pays depuis l'API et mettre à jour l'état
        getPays().then(data => setPaysList(data));
    }, []);


    useEffect(() => {
        checkInputs(); // Vérifier les champs obligatoires à chaque changement
    }, [nom, prenom, dateNaissance, paysId, sportId]);
    getPays().then(data => {
        setListePays(data);
    });
    getSports().then(data => {
        setListeSports(data);
    });

    const checkInputs = () => {
        setIsButtonDisabled(!(nom.trim() !== '' && prenom.trim() !== '' && dateNaissance.trim() !== '' && paysId.trim() !== '' && sportId.trim() !== ''));
    };


    const handleRegistration = async () => {
        try {
            const athlete = {
                nom: nom,
                prenom: prenom,
                dateNaissance: dateNaissance,
                paysId: paysId,
                sportId: sportId
            };

            const response = await createAthlete(athlete); // Appeler la fonction pour créer un athlète avec l'objet
            console.log(sportId, paysId);

            console.log('Athlete enregistré avec succès!', response);
            Alert.alert('Inscription réussie', 'Votre inscription a été enregistrée avec succès.');
            // Réinitialiser les champs après l'inscription réussie
            setNom('');
            setPrenom('');
            setDateNaissance('');
            setPaysId('');
            setSportId('');

        } catch (error) {
            console.error('Erreur lors de l\'enregistrement de l\'Athlete:', error);
        }
    };


    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Formulaire d'inscription</Text>
                <View style={styles.form}>

                    <TextInput
                        style={styles.input}
                        value={nom}
                        onChangeText={(text) => setNom(text)}
                        placeholder="Nom"
                        placeholderTextColor="#000"
                    />

                    <TextInput
                        style={styles.input}
                        value={prenom}
                        onChangeText={(text) => setPrenom(text)}
                        placeholder="Prénom"
                        placeholderTextColor="#000"
                    />
                    <Text style={styles.description}>Date de naissance</Text>

                    <TextInput
                        style={styles.input}
                        value={dateNaissance}
                        onChangeText={(text) => setDateNaissance(text)}
                        placeholderTextColor="#000"
                    />

                    <Text style={styles.description}>Quel pays venez-vous ?</Text>

                    <Picker
                        selectedValue={paysId}
                        onValueChange={(itemValue) => setPaysId(itemValue)}
                        style={styles.input}
                    >
                        <Picker.Item label="Sélectionnez un pays" value="" />
                        {listePays.map(pays => (
                            <Picker.Item key={pays.id} label={pays.libelle} value={pays.id} />
                        ))}
                    </Picker>

                    <Text style={styles.description}>Quel sport pratiquez-vous ?</Text>

                    <Picker
                        selectedValue={sportId}
                        onValueChange={(itemValue) => setSportId(itemValue)}
                        style={styles.input}
                    >

                        <Picker.Item label="Sélectionnez un sport" value="" />

                        {listeSports.map(sport => (
                            <Picker.Item key={sport.id} label={sport.nom} value={sport.id} />
                        ))}
                    </Picker>

                    <TouchableOpacity
                        style={[styles.button, isButtonDisabled && styles.disabledButton]}
                        onPress={handleRegistration}
                        disabled={isButtonDisabled}
                    >
                        <Text style={styles.buttonText}>S'inscrire</Text>

                    </TouchableOpacity>

                </View>

            </View>

        </ScrollView>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        margin:5,
        padding:5,
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop:15,
        color:'#000',
    },

    form: {
        width: '80%',
    },

    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
    },

    button: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        marginTop:10,
        marginBottom:50,
    },

    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

    disabledButton: {
        backgroundColor: 'rgba(169, 169, 169, 0.5)',
    },

    description: {
        fontSize: 16,
        marginBottom: 8,
        marginTop: 8,
    },
});
