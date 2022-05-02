//selecionando os elementos
const msgErro = document.querySelector('#mensagemErro') //# é pelo id
const botaoBuscar = document.querySelector('#botao_buscar') 
const idBusca = document.querySelector('.input') // .ponto é pela class

//elementos que receberão o retorno JSON
const tituloPost = document.querySelector('#titulo')
const corpoPost = document.querySelector('#bodyPost')
const userID = document.querySelector('#userID')



async function buscaPostagem(idBusca){
    busca= idBusca.value

    fetch(`https://jsonplaceholder.typicode.com/posts/${busca}`)
    .then((response) => response.json())    //a resposta(response) vem em PROMISE tem que tratar ela como tal e converter pro JSON
    .then((json)=>{                         //vamos salvar o JSON na variavel posts
        postagem = json
    })
    .then(()=>{
        defineValores(postagem);
    })

    
}



function core(){
    try{
        validaDados(idBusca.value)
        buscaPostagem(idBusca)
        
    }catch(error){
        msgErro.textContent = error
    }
}


function validaDados(postagem){
    if(isNaN(postagem)){
        throw new Error('SOMENTE NUMEROS')
    }else if(postagem > 100){
        throw new Error('temos somente 100 postagens, digite um numero menor que 100')
    }

}


function defineValores(postagem){
    tituloPost.textContent = postagem.title
    corpoPost.textContent = postagem.body
    userID.textContent = 'user number: '+postagem.userId

}



botaoBuscar.addEventListener('click',()=>{
    core();

})

window.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
    core();    
    }
})