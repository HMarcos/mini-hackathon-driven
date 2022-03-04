/* -- Conjunto de Variáveis Globais --*/
API_KEY = "8bdb71c1758a1a69b7f51aa4dc56fe95";
let latitude = 35;
let longitute = 139;

let temperatura;
let temperaturaMin;
let temperaturaMax;
let sensacaoTermica;
let clima;
let descricao;
let linkIcone;
let humidade;
let velocidadeVento;

/* -- Conjunto de Funções -- */
function requisitarClima() {
    const linkRequisicao = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitute}&appid=${API_KEY}`;
    console.log(linkRequisicao);
    const promessaClima = axios.get(linkRequisicao);

    promessaClima.then(exibirInformacoesClima);
    promessaClima.catch(tratarErroResicaoClima);
}

function exibirInformacoesClima(resposta){
    console.log(resposta.data);

    extrairInformacoes(resposta.data);
}

function tratarErroResicaoClima(erro) {
    alert("Não foi possível recuperar as informações do clima para o local desejado");
    console.error(erro.response.data);
}


function extrairInformacoes(dadosClima){
    clima = dadosClima.weather[0].main;
    descricao = dadosClima.weather[0].description;
    linkIcone = montarLinkIcone(dadosClima.weather[0].icon);
    temperatura = converterKelvinParaCelcius(dadosClima.main.temp);
    temperaturaMax = converterKelvinParaCelcius(dadosClima.main.temp_max);
    temperaturaMin = converterKelvinParaCelcius(dadosClima.main.temp_min); 
    sensacaoTermica = converterKelvinParaCelcius(dadosClima.main.feels_like);
    humidade = dadosClima.main.humidity;
    velocidadeVento = dadosClima.wind.speed;

}


function montarLinkIcone(icone) {
    return `http://openweathermap.org/img/wn/${icone}@2x.png`;
}

function converterKelvinParaCelcius(temperaturaKelvin){
    return (temperaturaKelvin - 273.15).toFixed(1);
}

/* --- Execução das Funções ---*/
requisitarClima();
