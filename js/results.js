const scoreResult = document.querySelector('.score-total')
const acertouTotal = document.querySelector('.acertou-total')
const themeQuiz = document.querySelector('.tema-quiz')

const resultados = JSON.parse(localStorage.getItem('resultados'))

scoreResult.textContent = resultados.score
acertouTotal.textContent = resultados.acertos
themeQuiz.textContent = `Resultado do Quiz de ${resultados.name}`