const opcoesBtn = document.querySelectorAll('button')

opcoesBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        addTheme(btn.textContent)
        console.log(btn.textContent)
        window.location.href = './quiz.html'
    })
})

function addTheme(themeName) {
    if (localStorage.getItem('resultados')) {
        localStorage.removeItem('resultados')
    }

    const resultados = {
        'score': 0,
        'acertos': 0,
        'theme': themeName.toLowerCase()
    }

    localStorage.setItem('resultados', JSON.stringify(resultados))
}