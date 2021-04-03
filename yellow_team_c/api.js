"use strict"

const fetch = require("node-fetch");
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

async function getAccessToken() {
    var myHeaders = new fetch.Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "pxl-secadv");
    urlencoded.append("client_secret", "maarten_lust_geen_spruitjes");
    urlencoded.append("scope", "api1");
    urlencoded.append("grant_type", "client_credentials");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    let data = await fetch("https://ventielshop.dubbadub.be:8081/connect/token", requestOptions)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then((data) => {
            return data.access_token;
        })
        .catch((error) => {
            console.log(error)
        });
    return data;
}

async function getDataFromApi(token) {
    var myHeaders = new fetch.Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let data = await fetch("https://ventielshop.dubbadub.be/fiets", requestOptions)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
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
    let token = await getAccessToken();
    console.log(await getDataFromApi(token));
}

run();