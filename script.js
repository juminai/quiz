const pergunta = document.querySelector('.pergunta')
const alternativas = document.querySelector('.alternativas')
const continueBtn = document.querySelector('.continuar__button')
const alternativa = document.querySelectorAll('.alternativa')
const totalQuestoes = document.getElementById('status-questoes')
const progressBar = document.getElementById('progress-bar')

let perguntas = [];
let atual = 0;
let pontos;

async function loadPerguntas() {
    try {
        const busca = await fetch('http://localhost:3000/lista')
        perguntas = await busca.json()
        setPerguntaAtual();

    } catch (e) {

    }
}

function atualizaProgressBar(maximo, valor) {
    progressBar.setAttribute('max', maximo)
    progressBar.setAttribute('value', valor + 1)
}

function setPerguntaAtual() {
    if (atual < perguntas.length) {
        
        const perguntaAtual = perguntas[atual];
        setPerguntas(
            perguntaAtual.pergunta, 
            perguntaAtual.a, 
            perguntaAtual.b, 
            perguntaAtual.c,
            perguntaAtual.resposta
        );

        totalQuestoes.textContent = `${atual + 1}/${perguntas.length}`
        atualizaProgressBar(perguntas.length, atual)
    }
}

function setPerguntas(perguntaTexto, a, b, c, resposta) {
    pergunta.textContent = perguntaTexto;

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
            const texto = alt.querySelector('.texto-alternativa').textContent

            let condition = resposta == texto ? 'correto' : 'errado'
            alt.classList.add(`${condition}`)

            if (condition == 'correto') {
                const sinalCorreto = document.createElement('img')
                sinalCorreto.classList.add('sinal-correto')
                sinalCorreto.setAttribute('src', './assets/Outline.svg');
                alt.replaceChild(sinalCorreto, alt.querySelector('.letra-alternativa'))
            } else {
                alt.querySelector('.letra-alternativa').textContent = 'X'
            }

        })
    })
}

continueBtn.addEventListener('click', () => {
    atual++
    if (atual < perguntas.length) {
        setPerguntaAtual()
    } else {
        alert('sem teres')
    }
})

loadPerguntas()