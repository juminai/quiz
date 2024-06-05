import { conectaApi } from "./connectApi.js"

const opcoes = document.querySelector('.opcoes')

async function setTemas() {
    const temas = await conectaApi.listaTemas()

    temas.forEach((temaBtn) => {
        const btn = document.createElement('button')
        btn.setAttribute('type', 'button')
        btn.textContent = temaBtn
        opcoes.appendChild(btn)

        btn.addEventListener('click', () => {
            addTheme(temaBtn)
            window.location.href = './quiz.html'
        })
    })
}

setTemas()

function addTheme(themeName) {
    if (localStorage.getItem('resultados')) {
        localStorage.removeItem('resultados')
    }

    const resultados = {
        'score': 0,
        'acertos': 0,
        'theme': themeName
    }

    localStorage.setItem('resultados', JSON.stringify(resultados))
}