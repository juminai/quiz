import { conectaApi } from "./connectApi.js"

const opcoes = document.querySelector('.opcoes')

async function setTemas() {
    const temas = await conectaApi.listaTemas()
    opcoes.innerHTML = `
      <button type="button" id="opcoes__btn-1">${temas[0]}</button>
      <button type="button" id="opcoes__btn-2">${temas[1]}</button>
      <button type="button" id="opcoes__btn-3">${temas[2]}</button>
    `

  const buttons = document.querySelectorAll('button')

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            addTheme(btn.textContent)
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