"use strict"

const fetch = require("node-fetch");
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

async function getAccessToken(secret, scope) {

    var urlencoded = new URLSearchParams();
    urlencoded.append("secret", secret);
    urlencoded.append("scope", scope);

    var requestOptions = {
        method: 'POST',
        body: urlencoded,
        redirect: 'follow'
    };

    let data = await fetch("https://localhost:3000/auth", requestOptions)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then((data) => {
            return data.accessToken;
        })
        .catch((error) => {
            console.log(error)
        });
    return data;
}

async function getDataFromApi(endpoint, token) {
    var myHeaders = new fetch.Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let data = await fetch(`https://localhost:3000/${endpoint}`, requestOptions)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                return response.status
            }
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.log(error);
        });
    return data;
}

async function run() {
    console.log("scope: team")
    let token = await getAccessToken("PXL", "team");
    console.log(await getDataFromApi("members", token));
    console.log(await getDataFromApi("poem", token));

    console.log("scope: admin")
    token = await getAccessToken("PXL", "admin");
    console.log(await getDataFromApi("members", token));
    console.log(await getDataFromApi("poem", token));
}

run();