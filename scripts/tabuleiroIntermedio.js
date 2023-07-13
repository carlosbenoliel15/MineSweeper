const NUMERO_BOMBAS_OMISSAO = 40; //guarda o numero de bombas

const TAMANHO_TABULEIRO_OMISSAO = 16; //guarda o numero correspondente a altura do tabuleiro 

let celulas = new Array();

document.addEventListener("DOMContentLoaded", () => {
    const tabuleiro = document.querySelector('.tabuleiro');
    let tamanho = TAMANHO_TABULEIRO_OMISSAO; //numero de colunas
    let linhas = new Array();
    let numeroBombas = NUMERO_BOMBAS_OMISSAO; 
    let jogo = new Array();
    let celulasBomba = new Array();
    let celulasLivres = new Array();


    function criarTabuleiro(tamanho, numeroBombas) { //funçao que cria o tabuleiro 
        for (let y = 0; y < numeroBombas; y++) { // cria lista com string = "bomba" para colocar na class
            celulasBomba.push("bomba");
        }
        for (let z = 0; z < tamanho ** 2 - numeroBombas; z++) { // cria lista com string = "livre" para colocar na class
            celulasLivres.push("livre");
        }
        jogo = celulasBomba.concat(celulasLivres); // junta os dois arrays
        jogo = jogo.sort(() => Math.random() - 0.5); //baralha aleatoriamente o array jogo que contem as classes para defenir as bombas

        let idCelula = 0;
        for (let linha = 0; linha < tamanho; linha++) {
            for (let coluna = 0; coluna < tamanho; coluna++) {
                const celula = document.createElement("div") // cria elemento div 
                celula.setAttribute("id", idCelula); //cria div com id = "l"
                linhas.push(celula); // adiciona ao array linha cada celula criada 
                celula.setAttribute("class", jogo[idCelula]) //adiciona o atributo class a cada div de forma a ser atribuido um estado (livre/bomba)
                tabuleiro.appendChild(celula) // adiciona a div celula ao tabuleiro 
                idCelula++
                celula.addEventListener("click", function(e) {
                    click(celula)
                })

            }
            celulas.push(linhas) // adiciona ao array linhas o array de celulas
            linhas = [];
        }

        for (let linha = 0; linha < tamanho; linha++) { // 
            let total = 0
            for (let coluna = 0; coluna < tamanho; coluna++) {
                if (coluna > 0 && celulas[linha][coluna - 1].classList.contains("bomba")) { //compara com o lado oeste
                    total++
                }
                if (coluna < tamanho - 1 && celulas[linha][coluna + 1].classList.contains("bomba")) { // compara com o lado este
                    total++
                }
                if (linha > 0 && celulas[linha - 1][coluna].classList.contains("bomba")) { // compara com o lado norte  sem ser a primeira linha
                    total++;
                }
                if (linha < tamanho - 1 && celulas[linha + 1][coluna].classList.contains("bomba")) { // compara com o lado sul  se ser a ultima linha
                    total++;
                }

                //-----------------------------//
                if (coluna > 0 && linha > 0 && celulas[linha - 1][coluna - 1].classList.contains("bomba")) { // compara com o lado noroeste sem ser a primeira linha 
                    total++;
                }
                if (coluna < tamanho - 1 && linha > 0 && celulas[linha - 1][coluna + 1].classList.contains("bomba")) { // compara com o lado nordeste sem ser a primeira linha 
                    total++;
                }
                if (coluna > 0 && linha < tamanho - 1 && celulas[linha + 1][coluna - 1].classList.contains("bomba")) { // compara com o lado sudoeste sem ser a primeira linha 
                    total++;
                }

                if (coluna < tamanho - 1 && linha < tamanho - 1 && celulas[linha + 1][coluna + 1].classList.contains("bomba")) { // compara com o lado sudeste sem ser a primeira linha 
                    total++;
                }


                celulas[linha][coluna].setAttribute("data", total)
                console.log(celulas[linha][coluna])
                total = 0
            }
        }
        console.log(celulas)



    }


    criarTabuleiro(tamanho, numeroBombas)

    //funcao click celula 
    function click(celula) {
        if (celula.classList.contains("bomba")) {
            console.log("Game Over");
        } else {
            let total = celula.getAttribute("data");
            if (total != 0) {
                celula.classList.add("verificada")
                celula.innerHTML = total
                return
            }
            celula.classList.add("verificada")
        }
    }
});
