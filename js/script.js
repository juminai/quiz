const pergunta = document.querySelector('.pergunta')
const alternativas = document.querySelector('.alternativas')
const continueBtn = document.querySelector('.continuar__button')
const alternativa = document.querySelectorAll('.alternativa')
const totalQuestoes = document.getElementById('status-questoes')
const progressBar = document.getElementById('progress-bar')
const score = document.querySelector('.pontos')
const themeQuiz = document.querySelector('.tema-quiz')
const closeBtn = document.querySelector('.close__button')

const resultados = JSON.parse(localStorage.getItem('resultados'))

const temaAtual = resultados.theme

themeQuiz.textContent = `Quiz de ${
    temaAtual.includes('mat') ? 'Matemática' :
    temaAtual.includes('eng') ? 'Inglês' : 'Lógica'
}`;

let acertou = 0;
let pontos = 0;
let pontosx10 = 0
let perguntas = [];
let atual = 0;
let jaSelecionado = false

async function loadPerguntas() {
    try {
        const busca = await fetch('http://localhost:3000/perguntas')
        perguntas = await busca.json()
        setPerguntaAtual();

    } catch (e) {
        alert('error loading questions: ', e)
    }
}

function atualizaPontos() {
    pontos++
    acertou++
    pontosx10 = parseInt(pontos * 10)
    score.textContent = pontosx10
}

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

        totalQuestoes.textContent = `${atual + 1}/${perguntas[temaAtual].length}`

        progressBar.setAttribute('max', perguntas[temaAtual].length)
        progressBar.setAttribute('value', atual + 1)
    }
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
                    alt.replaceChild(sinalCorreto, alt.querySelector('.letra-alternativa'))
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
})

loadPerguntas()