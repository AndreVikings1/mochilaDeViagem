const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (elemento) => {
    criaElemento(elemento)
} )

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find( elemento => elemento.nome === nome.value )

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id
        
        atualizaElemento(itemAtual)

        itens[existe.id] = itemAtual.id  //como atualiza o localstorage?
    } else {
        itemAtual.id = itens.length
        criaElemento(itemAtual)
        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item) {
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    const numeroItem = document.createElement("strong")
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)
    
    novoItem.innerHTML += item.nome
   novoItem.appendChild(deletaBotao(item.id))
    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function deletaBotao(id) {
    const elementoBotao = document.createElement('button')
    elementoBotao.innerHTML = 'x'
        elementoBotao.addEventListener('click', function () {
            deletaElemento(this.parentNode, id)
          
        })
    return elementoBotao
}

function deletaElemento(tags,id) {
    tags.remove()   

    itens.splice(itens.findIndex(elemento => elemento.id === elemento.id , 1))
    console.log(itens)

    localStorage.setItem("itens", JSON.stringify(itens))
}
