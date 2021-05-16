import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text } from 'react-native';


export default function closeTrip({ navigation }) {

    const [trip, setTrip] = useState("");
    const [userMessage, setUserMessage] = useState("");

    function closing() {
        console.log("function called");

        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch("http://localhost:8080/" + (trip.trim().toLowerCase()) + "/close", requestOptions)
            .then(response => response.text())
            .then(data => {
                if (data == "true") {
                    setUserMessage("Trip closed successfully!")
                } else {
                    setUserMessage("This trip was not found. Please try again.")
                }
                console.log(typeof (data))
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function getSummary() {
        console.log("function called");

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8080/rio/summary", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log(data.amilcar)
            })
            .catch(error => console.log('error', error));
    }

    return (

        <View style={styles.container}>
            <TextInput style={{
                height: 40,
                borderColor: 'blue',
                borderWidth: 1,
                width: "30%",
                margin: "0.5%",
                padding: "4px"
            }}
                onChangeText={setTrip}
                placeholder="Trip label"
            />
            <View style={styles.buttons}>
                <Button
                    onPress={() => {
                        closing();
                    }}
                    title="Close trip"
                />
            </View>
            <View>
                <Text>{userMessage}</Text>
            </View>
            <View style={styles.buttons}>
                <Button
                    onPress={() => {
                        getSummary();
                    }}
                    title="Get Summary"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttons: {
        width: "30%",
        margin: "1%"
    }
});