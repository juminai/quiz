const opcoesBtn = document.querySelectorAll('button')

opcoesBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        addTheme(btn.id, btn.textContent)
        window.location.href = './quiz.html'
    })
})

function addTheme(themeName, name) {
    if (localStorage.getItem('resultados')) {
        localStorage.removeItem('resultados')
    }

    const resultados = {
        'score': 0,
        'acertos': 0,
        'theme': themeName,
        'name': name
    }

    localStorage.setItem('resultados', JSON.stringify(resultados))
}