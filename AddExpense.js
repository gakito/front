import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';


export default function AddExpense({ navigation }) {

    const [trip, setTrip] = useState("");
    const [amount, setAmount] = useState(0);
    const [label, setLabel] = useState("");

    function expense() {
        console.log("function called");

        var username = sessionStorage.getItem("user");
        var token = sessionStorage.getItem("token");

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var raw = JSON.stringify({
            "name": username,
            "amount": amount,
            "label": label
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/" + (trip.trim().toLowerCase()) + "/expense", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

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
            <TextInput style={{
                height: 40,
                borderColor: 'blue',
                borderWidth: 1,
                width: "30%",
                margin: "0.5%",
                padding: "4px"
            }}
                onChangeText={setAmount}
                placeholder="Amount"
            />
            <TextInput style={{
                height: 40,
                borderColor: 'blue',
                borderWidth: 1,
                width: "30%",
                margin: "0.5%",
                padding: "4px"
            }}
                placeholder="Description"
                onChangeText={setLabel}
            />
            <View style={styles.buttons}>
                <Button
                    onPress={() => {
                        expense();
                    }}
                    title="Add Expense"
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