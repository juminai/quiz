import { conectaApi } from "./connectApi.js";

const pergunta = document.querySelector('.pergunta')
const alternativas = document.querySelector('.alternativas')
const continueBtn = document.querySelector('.continuar__button')
const totalQuestoes = document.querySelectorAll('#status-questoes')
const progressBar = document.querySelectorAll('#progress-bar')
const score = document.querySelector('.pontos')
const themeQuiz = document.querySelector('.tema-quiz')
const closeBtn = document.querySelector('.close__button')
const resultados = JSON.parse(localStorage.getItem('resultados'))
const temaAtual = resultados.theme

themeQuiz.textContent = `Quiz de ${temaAtual}`

let perguntas = []
let atual = 0;
let jaSelecionado = false
let acertou = 0;
let pontos = 0;
let pontosx10 = 0

async function startGame() {
    perguntas = await conectaApi.listaPerguntas()

    if (!perguntas) {
        throw new Error('Nao foram encontradas perguntas')
    }

    setPerguntaAtual()
}
 
function atualizaPontos() {
    pontos++
    acertou++
    pontosx10 = parseInt(pontos * 10)
    score.textContent = pontosx10
}

closeBtn.addEventListener('click', () => {
    window.location.href = './index.html'
})

continueBtn.addEventListener('click', () => {
    atual++

    if (atual < perguntas[temaAtual].length) {
        setPerguntaAtual()
    } else {
        resultados.score = pontosx10
        resultados.acertos = acertou

        localStorage.setItem('resultados', JSON.stringify(resultados))
        window.location.href = './results.html'
    }

    if (perguntas[temaAtual].length - atual == 1) {
        continueBtn.textContent = 'FINISH'
    }
})

function setPerguntaAtual() {
    if (atual < perguntas[temaAtual].length) {

        const perguntaAtual = perguntas[temaAtual][atual];

        setPerguntas(
            perguntaAtual.pergunta,
            perguntaAtual.a,
            perguntaAtual.b,
            perguntaAtual.c,
            perguntaAtual.resposta
        );

        atualizaStatus()
    }
}

function atualizaStatus() {
    totalQuestoes.forEach((total) => {
        total.textContent = `${atual + 1}/${perguntas[temaAtual].length}`
    })

    progressBar.forEach((bar) => {
        bar.setAttribute('max', perguntas[temaAtual].length)
        bar.setAttribute('value', atual + 1)
    })
}

function setPerguntas(perguntaTexto, a, b, c, resposta) {
    pergunta.textContent = perguntaTexto;
    continueBtn.disabled = true
    jaSelecionado = false

    alternativas.innerHTML = `
  <div class="alternativa alternativa-a">
      <p class="letra-alternativa">A</p>
      <p class="texto-alternativa">${a}</p>
  </div>
  <div class="alternativa alternativa-b">
      <p class="letra-alternativa">B</p>
      <p class="texto-alternativa">${b}</p>
  </div>
  <div class="alternativa alternativa-c">
      <p class="letra-alternativa">C</p>
      <p class="texto-alternativa">${c}</p>
  </div>
  `;

    document.querySelectorAll('.alternativa').forEach((alt) => {
        alt.addEventListener('click', () => {
            if (!jaSelecionado) {
                const letra = alt.querySelector('.letra-alternativa').textContent.toLocaleLowerCase()

                let condition = resposta == letra ? 'correto' : 'errado'
                alt.classList.add(`${condition}`)
                jaSelecionado = true

                if (condition == 'correto') {
                    const sinalCorreto = document.createElement('img')
                    sinalCorreto.classList.add('sinal-correto')
                    sinalCorreto.setAttribute('src', './assets/Outline.svg');
                    const imgDiv = document.createElement('div')
                    imgDiv.classList.add('sinal-correto-div')
                    imgDiv.appendChild(sinalCorreto)
                    alt.replaceChild(imgDiv, alt.querySelector('.letra-alternativa'))

                    atualizaPontos()
                } else {
                    alt.querySelector('.letra-alternativa').textContent = 'X'
                }

                continueBtn.disabled = false

                document.querySelectorAll('.alternativa').forEach((alt) => {
                    if (alt != this) {
                        alt.classList.add('cursor-not-allowed')
                    }
                })
            }
        })
    })
}

startGame()