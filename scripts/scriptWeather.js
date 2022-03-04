/* -- Conjunto de Variáveis Globais --*/
// let latitude = 35;
// let longitute = 139;

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
    const linkRequisicao = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude.toFixed(4)}&lon=${longitude.toFixed(4)}&appid=${API_KEY}`;
    console.log(linkRequisicao);
    const promessaClima = axios.get(linkRequisicao);

    promessaClima.then(exibirInformacoesClima);
    promessaClima.catch(tratarErroResicaoClima);
}

function exibirInformacoesClima(resposta){
    console.log(resposta.data);

    extrairInformacoes(resposta.data);

    exibirInfoTela();
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

function exibirInfoTela() {
    const elementoHTML = `
    <div class="cidade">
                <h3>${cidade}, ${estado} - ${pais}</h3>
            </div>
            <div class="clima__informacoes-principais">
                <div class="clima__informacoes-principais__temp">
                    <img src="${linkIcone}" alt="clima">
                    <div class="clima__informacoes-principais__temp__container">
                        <span class="temperatura"> ${temperatura}°C</span>
                        <span class="clima_principal"> ${clima}</span>
                        <span class="clima_descricao">${descricao}</span>
                    </div>
                </div>
                <div class="clima__informacoes-principais__humidade-vento">
                    <span class="humidade"> Humidity: ${humidade}%</span>
                    <span class="velocidade-vento"> Wind Speed ${velocidadeVento} m/s</span>
                </div>
            </div>`;
    
    const secaoClima = document.querySelector(".clima");
    secaoClima.innerHTML = elementoHTML;
    secaoClima.classList.remove("escondido");
}

function montarLinkIcone(icone) {
    return `http://openweathermap.org/img/wn/${icone}@2x.png`;
}

function converterKelvinParaCelcius(temperaturaKelvin){
    return (temperaturaKelvin - 273.15).toFixed(1);
}

/* --- Execução das Funções ---*/
// requisitarClima();
