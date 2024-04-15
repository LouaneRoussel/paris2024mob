import React from 'react'
import {StyleSheet, View, Text, Image, TextInput, Button, TouchableOpacity} from 'react-native'

class AthleteItem extends React.Component {
    render() {
        console.log(this.props)
        //const athlete = this.props.athlete
        const { athlete, consulterAthlete } = this.props

        return (
            <TouchableOpacity style={styles.main_container}
                              onPress={() => consulterAthlete(athlete.id)}>
                    <View style={styles.content_container}>
                        <View style={styles.header_container}>
                            <Text style={styles.title_text}>{athlete.nom}</Text>
                            <Text style={styles.title_text}>{athlete.prenom}</Text>
                        </View>
                        <View style={styles.description_container}>
                            <Text style={styles.description_text}>{athlete.dateNaissance}</Text>
                            <Text style={styles.description_text}>{athlete.sport.nom}</Text>
                        </View>
                    </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    },

})
export default AthleteItem