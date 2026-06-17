// 🔥 CONFIG
var firebaseConfig = {
    apiKey: "AIzaSyDz4RqKjSJxB0F5eP4RzajQtW94cPXmpSg",
    databaseURL: "https://data-b6691-default-rtdb.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.database();

// 🔥 CONSTANTES
const ESTADOS = {
    OCUPADO:"OCUPADO",
    VACIA:"VACIA",
    FUERA:"FUERA"
};