async function listaPerguntas() {
    try {
        const conexao = await fetch('https://json-server-two-nu.vercel.app/perguntas')
        return await conexao.json()
    } catch (e) {
        console.log('error: ', e)
    }
}

async function listaTemas() {
    try {
        const data = await listaPerguntas()
        const temas = Object.keys(data)

        return temas
    } catch (e) {
        console.log('error: ', e)
    }
}

export const conectaApi = {
    listaPerguntas,
    listaTemas
}