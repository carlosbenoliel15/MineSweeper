/* ------------------------------------------------------------------------------- */
/* Introdução às Tecnologias Web (ITW) - LTI - Departamento de Informática - FCUL. */
/*                              Ano letivo: 2021/2022                              */
/*                   Site realizado pelo Grupo 40 do turno PL23:                   */
/*   Beatriz Pereira nº57579 | Carlos Martins nº57574 | Gonçalo Domingues nº51751  */
/* ------------------------------------------------------------------------------- */

// Impede alguns erros fáceis de cometer.
"use strict";
/* ------------------------------------------------------------------------------- */
// LS = LOCAL STORAGE.

/** Identificador da informação e detalhes do jogo e utilizador. */
const USER_INFO = "Info";

/** Variável que guarda o utilizador que se encontra com a sessao iniciada. */
let currentUser = null;

/** Identificador da informação do utilizador no elemento div. */
let userInfoDiv = document.getElementById(USER_INFO);

/** Identificador da informção que está no histórico do LS do browser. */
let historico = [];

/** Identificador da info do utilizador que está no histórico do LS do browser. */
let userhistorico;
/* ------------------------------------------------------------------------------- */

// A função principal() é automaticamente invocada quando o documento HTML
// tiver sido completamente carregado pelo browser.
window.onload = principal;

/* ------------------------------------------------------------------------- */
/**
 * Primeira função a ser executada após o browser completar o carregamento
 * de toda a informação presente no documento HTML. 
*/
function principal() {

    currentUser = JSON.parse(localStorage.getItem("currentUser"));

    mostrarInfoUser();
    
    historico = JSON.parse(localStorage.getItem("historico")) || [];


    userhistorico = getUserHistorico(currentUser.nome);
    mostrarInfoUser();

   

    mostraHistoricoUser();
}
/* ------------------------------------------------------------------------- */
/** Atualiza a interface com as informações e detalhes do utilizador 
 * com sessão iniciada.
*/
function mostrarInfoUser(){
    // Verifica se o utilizador está logado na conta do jogo.
    if(currentUser !== null){
        let nome = currentUser.nome;
        let email = currentUser.mail;
        let idade = currentUser.idade;
        let genero = null;
        let record=null;
        if  (userhistorico==null){
             record="-----"
        }else{
            record = getUserHistorico(currentUser.nome)[0].pontuacao;
        }
        

        if (currentUser.genero === "M"){
            genero = "Masculino";
            document.getElementById("icone-genero").innerHTML = `<img src="../imagens/icone_masculino.jpg" alt="imagem masculina do perfil" height="100">`;
        }else{
            genero = "Feminino";
            document.getElementById("icone-genero").innerHTML = `<img src="../imagens/icone_feminino.jpg" alt="imagem feminina do perfil" height="100">`;
        }
        userInfoDiv.innerHTML = "<p><strong>Nome:</strong>&emsp;" + nome + "</p>"+
        "<p><strong>Email:</strong>&emsp;" + email + "</p>"
        + "<p><strong>Género:</strong>&emsp;" + genero +"</p>"
        + "<p><strong>Idade:</strong>&emsp;" + idade +" anos</p>"
        + "<p><strong>Record:</strong>&emsp;" + record +" pontos</p>";

    }else{
        userInfoDiv.innerHTML = "Não exite nenhum utilizador com sessão iniciada!";
    }
}

/* ------------------------------------------------------------------------- */
/** Verifica se o nome do utilizador coincide com o nome do utilizador 
 * logado na conta, buscando essa informação no LS do browser.
 * 
 * @param {string} nome -> nome do utilizador
*/
function getUserHistorico(nome){
    let result = historico.filter(jogo=>{
        return jogo.user === nome;
    });
    console.log(result);
    result.sort((a,b) =>  b.pontuacao - a.pontuacao);
    return result;
}

/* ------------------------------------------------------------------------- */
/** Mostra as informações e detalhes do utilizador com sessão iniciada
 * numa tabela. 
 * Após um jogo, mostra uma tabela com os dez melhores tempos e resultados
 * do respetivo jogador na página do perfil, devendo essa informação ficar 
 * guardada em local storage do browser.
*/
function mostraHistoricoUser() {
    
    let tabelaAntiga = document.getElementById("tabela");
    

    // A nova tabela de histórico dos dados do utilizador tem o mesmo 
    // identificador da antiga, pois irá substituí-la na íntegra.
    let tabelaNova = document.createElement("table");
    tabelaNova.setAttribute("id", "tabela");

    // Linha de cabeçalho da tabela.
    let linhaTabela = document.createElement("tr");
    linhaTabela.innerHTML = "<th>Rank</th>" +
                            "<th>Data</th>" +
                            "<th>Dificuldade</th>" +
                            "<th>Pontos</th>" +
                            "<th>Tempo</th>";
    tabelaNova.appendChild(linhaTabela);

    let numerojogos = 1;
    for (let jogo of userhistorico) {

        if(numerojogos > 10){
            break;
        }
        // Uma linha de dados por cada informação no histórico.
        linhaTabela = document.createElement("tr");
        linhaTabela.innerHTML = "<td>" + numerojogos + "</td>" +
                                "<td>" + jogo.dataJogo + "</td>" +
                                "<td>" + jogo.dificuldade + "</td>" +
                                "<td>" + jogo.pontuacao + "</td>" +
                                "<td>" + jogo.tempoJogado + "</td>";
        tabelaNova.appendChild(linhaTabela);
        numerojogos++;
    }

    // Substitui a tabela antiga pela nova.
    tabelaAntiga.parentNode.replaceChild(tabelaNova, tabelaAntiga);
}
