import { Product } from "./Product"

//botão para ver mais cores:
const btn = document.querySelector(".content-option-color__see-more")
btn.addEventListener("click", function () {
  var checkbox = document.querySelector(".content-option-color__active")
  checkbox.classList.remove("content-option-color__active")
  btn.classList.add("content-option-color__active")
})


//botão que abre as opções de filtragem de mais recente, maior e menor preço:
const order = document.querySelector(".content-order__order")
order.addEventListener("click", function() {
    const orderBy = document.querySelector(".content-order__order-by")
    orderBy.classList.toggle("content-order__order-by-active")
})

//ordernar pelo mais recente:
const mostRecent = document.querySelector(".content-order__order-by-active__most-recent");
    mostRecent.addEventListener("click", function() {
      getAllposts("http://localhost:5000/products?_sort=date")
})
//ordenar pelo menor preço:
const lowPrice = document.querySelector(".content-order__order-by-active__low-price");
    lowPrice.addEventListener("click", function() {
      getAllposts("http://localhost:5000/products?_sort=price")
})
//ordenar pelo maior preço:
const bigPrice = document.querySelector(".content-order__order-by-active__big-price");
    bigPrice.addEventListener("click", function() {
      getAllposts("http://localhost:5000/products?_sort=price&_order=desc")
})

//tag pai do layout de produtos:
const post = document.querySelector(".content-product")
//função que recebe o json, filtra e cria os elementos do layout de produtos:
async function getAllposts(serverUrl:string) {
  post.innerHTML = "";
  const response = await fetch(serverUrl)
  const product = await response.json()
  product.removeChild
  product.map((prod:Product) => {
    const div = document.createElement("div")
    const name = document.createElement("h2")
    const button = document.createElement("button")
    const img = document.createElement("img")
    const price:any = document.createElement("p")
    const parcelamento:any = document.createElement("p")


    img.src = prod.image
    name.innerText = prod.name
    price.innerText = (`${Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(prod.price)}`)
    parcelamento.innerText = (`até ${prod.parcelamento[0]}x de R$ ${Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(prod.parcelamento[1])}`)
    button.innerText = "COMPRAR"


    div.classList.add("content-product__product")
    div.appendChild(img)
    div.appendChild(name)
    name.classList.add("content-product__name")
    div.appendChild(price)
    price.classList.add("content-product__price")
    div.appendChild(parcelamento)
    parcelamento.classList.add("content-product__parcelamento")
    div.appendChild(button)
    button.classList.add("content-product__button")
    post.appendChild(div);
  })
}
getAllposts("http://localhost:5000/products");