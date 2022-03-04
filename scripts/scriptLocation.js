const GEOCODING_LINK = "http://api.openweathermap.org/geo/1.0";
const API_KEY = "8bdb71c1758a1a69b7f51aa4dc56fe95";

const botaoBusca = document.querySelector("button");
const titulo = document.querySelector(".titulo");

titulo.addEventListener("click", () => {
    window.location.reload();
})

let longitude;
let latitude;
let cidade;
let estado;
let pais;

function questionarUsoLocalizacao() {
    const acessarLocalizacao = confirm("Deseja que o navegador obtenha sua localização?");
    if (acessarLocalizacao){
        navigator.geolocation.getCurrentPosition(position => {
            buscarCidade(position.coords.longitude, position.coords.latitude);
        });
        document.querySelector('.localizacao').classList.add('escondido');
    }
}

function buscarCidade(lon, lat) {
    longitude = lon;
    latitude = lat;
    const promise = axios.get(`${GEOCODING_LINK}/reverse?lat=${latitude.toFixed(4)}&lon=${longitude.toFixed(4)}&limit=5&appid=${API_KEY}`);
    promise.then(preencherDadosCidade);

    promise.catch(erro => {
        console.log(erro.response.data);
    })
}

function preencherDadosCidade(resposta) {
    document.querySelector(".localizacao").classList.add("escondido");
    console.log(resposta.data);
    cidade = resposta.data[0].name;
    estado = resposta.data[0].state;
    pais = resposta.data[0].country;
    requisitarClima();
}

botaoBusca.addEventListener("click", procurarLongitudeLatitude);

function procurarLongitudeLatitude() {
    cidade = document.querySelector(".cidade").value;
    estado = document.querySelector(".estado").value;
    pais = document.querySelector(".pais").value;
    const promise = axios.get(`${GEOCODING_LINK}/direct?q=${cidade},${estado},${pais}&limit=5&appid=${API_KEY}`);
    promise.then(resposta => {
        buscarCidade(resposta.data[0].lon, resposta.data[0].lat);
    });

    promise.catch(erro => {
        console.log(erro.response.data);
    })
}



questionarUsoLocalizacao();