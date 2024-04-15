export function getAthletes () {

    const url = 'http://172.30.31.15:9007/athletes'
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function getAthletesByRecherche (recherche) {

    const url = 'http://172.30.31.15:9007/athletes/'+recherche
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function getAthleteparnom (nom) {

    const url = 'http://172.30.31.15:9007/athlete/'+ nom
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function createAthlete  (athlete) {
    const { nom, prenom, dateNaissance, paysId, sportId } = athlete;



    var raw = JSON.stringify({
        "nom": nom,
        "prenom": prenom,
        "dateNaissance": dateNaissance,
        "pays": {
            "id": paysId
        },
        "sport": {
            "id": sportId
        }
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const url = 'http://172.30.31.15:9007/athlete';
    return fetch(url, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erreur HTTP, statut : ' + response.status);
            }
            return response.json();
        })
        .then((response) => response.json())
        .then(result => console.log(result))
        .catch((error) => console.error(error))
}


export function getSports  (id) {


    const url = 'http://172.30.31.15:9007/sports'
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}


export function getPays  (id) {


    const url = 'http://172.30.31.15:9007/pays'
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function deleteAthlete(id) {
    const url = 'http://172.30.31.15:9007/athlete/delete/' + id;

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(result => {
            console.log('Delete request successful:', result);
            return result; // Optionally, you can return the result
        })
        .catch(error => {
            console.error('Error during DELETE request:', error);
            throw error; // Rethrow the error to handle it in the calling code
        });
}




