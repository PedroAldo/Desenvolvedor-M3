import { Product } from "./Product"

//função que reseta os checkboxs marcados e as opções de filtragem
function reset (option:string) {
  var check = document.getElementsByName(option)
  var checks:any = Array.from(check)
  for (var i=0; i < checks.length; i++) {
    if (checks[i].checked === true) {
      checks[i].checked = false
    }
  }
  mostRecent.classList.remove("content-order__order-by-active__most-recent-active")
  lowPrice.classList.remove("content-order__order-by-active__low-price-active")
  bigPrice.classList.remove("content-order__order-by-active__big-price-active")
}



//botão para ver mais cores:
const btn = document.querySelector(".content-option-color__see-more")
btn.addEventListener("click", function () {
  var checkbox = document.querySelector(".remove")
  checkbox.classList.remove("remove")
  btn.classList.add("remove")
})


//botão que abre as opções de filtragem de mais recente, maior e menor preço:
const order = document.querySelector(".content-order__order")
order.addEventListener("click", function() {
    const orderBy = document.querySelector(".content-order__order-by")
    orderBy.classList.toggle("content-order__order-by-active")
})

//ordernar pelo mais recente desktop:
const mostRecent = document.querySelector(".content-order__order-by-active__most-recent");
    mostRecent.addEventListener("click", function() {
      reset("color")
      reset("size")
      reset("price")
      mostRecent.classList.add("content-order__order-by-active__most-recent-active")
      getAllposts("http://localhost:5000/products?_sort=date&_start=0&_limit=9")
})
//ordenar pelo menor preço desktop:
const lowPrice = document.querySelector(".content-order__order-by-active__low-price");
    lowPrice.addEventListener("click", function() {
      reset("color")
      reset("size")
      reset("price")
      lowPrice.classList.add("content-order__order-by-active__low-price-active")
      getAllposts("http://localhost:5000/products?_sort=price&_start=0&_limit=9")
})
//ordenar pelo maior preço desktop:
const bigPrice = document.querySelector(".content-order__order-by-active__big-price");
    bigPrice.addEventListener("click", function() {
      reset("color")
      reset("size")
      reset("price")
      bigPrice.classList.add("content-order__order-by-active__big-price-active")
      getAllposts("http://localhost:5000/products?_sort=price&_order=desc&_start=0&_limit=9")
})

//função que filtra as cores, tamanho e preço
function filter(option:string) {
  var check = document.getElementsByName(option)
      var checks:any = Array.from(check)
      for (var i=0; i < checks.length; i++) {
        if (checks[i].checked === true) {
          if (option === "color"){
            getAllposts(`http://localhost:5000/products?${option}=${checks[i].value}`)
            reset("size")
            reset("price")
          } else if (option === "size") {
            getAllposts(`http://localhost:5000/products?${option}_like=${checks[i].value}`)
            reset("color")
            reset("price")
          } else if (option === "price"){
              if (checks[i].value == 50) {
                getAllposts(`http://localhost:5000/products?price_gte=0&price_lte=50`)
              }else if (checks[i].value == 150){
                getAllposts(`http://localhost:5000/products?price_gte=50&price_lte=150`)
              }else if (checks[i].value == 300){
                getAllposts(`http://localhost:5000/products?price_gte=151&price_lte=300`)
              }else if (checks[i].value == 500){
                getAllposts(`http://localhost:5000/products?price_gte=301&price_lte=500`)
              }else {
                getAllposts(`http://localhost:5000/products?price_gte=500`)
              }
            reset("color")
            reset("size")
          }
        }
      }
}

//Botão que faz a requisição de filtragem por cor
const checkboxColor = document.querySelector(".content-option-color")
checkboxColor.addEventListener("click", function () {
      filter("color")
})
//Botão que faz a requisição de filtragem por tamanho
const checkboxSize = document.querySelector(".content-option-size")
checkboxSize.addEventListener("click", function () {
      filter("size")
})
//Botão que faz a requisição de filtragem por preço
const checkboxPrice = document.querySelector(".content-option-price")
checkboxPrice.addEventListener("click", function () {  
    filter("price")
})

//tag pai do layout de produtos:
const post = document.querySelector(".content-product")
//função que recebe o json e cria os elementos do layout de produtos:
async function getAllposts(serverUrl:string) {
  post.innerHTML = "";
  const response = await fetch(serverUrl)
  const product = await response.json()
  post.innerHTML = "";
  product.map((prod:Product) => {
    const div = document.createElement("div")
    const name = document.createElement("h2")
    const button = document.createElement("button")
    const img = document.createElement("img")
    const price = document.createElement("p")
    const parcelamento = document.createElement("p")


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
    name.classList.add("content-product__name")
    price.classList.add("content-product__price")
    parcelamento.classList.add("content-product__parcelamento")
    button.classList.add("content-product__button")
    div.appendChild(img)
    div.appendChild(name)
    div.appendChild(price)
    div.appendChild(parcelamento)
    div.appendChild(button)
    post.appendChild(div)
  })
  //botão de carregar mais itens
    if (serverUrl === "http://localhost:5000/products?_sort=price&_order=desc&_start=0&_limit=4"
    || serverUrl === "http://localhost:5000/products?_sort=price&_start=0&_limit=4"
    || serverUrl=== "http://localhost:5000/products?_sort=date&_start=0&_limit=4" 
    || serverUrl === "http://localhost:5000/products?_start=0&_limit=4" 
    || serverUrl === "http://localhost:5000/products?_start=0&_limit=9" 
    || serverUrl === "http://localhost:5000/products?_sort=date&_start=0&_limit=9" 
    || serverUrl === "http://localhost:5000/products?_sort=price&_start=0&_limit=9" 
    || serverUrl ===  "http://localhost:5000/products?_sort=price&_order=desc&_start=0&_limit=9") { 
      var more = document.createElement("div")
      var moreButton = document.createElement("button")
      moreButton.innerHTML = "CARREGAR MAIS"
      more.classList.add("content-product__more")
      more.appendChild(moreButton)
      post.appendChild(more)
      moreButton.addEventListener("click", function () {
      getAllposts(`${serverUrl}1`)
    }
  )}
}

//Abre as opções de ordem no mobile
const mobileOrder = document.querySelector(".content-order__mobile-order")
mobileOrder.addEventListener("click", function() {
      const query = document.querySelector(".content-order__mobile-sort")
      query.classList.add("content-order__mobile-sort-active")
      document.querySelector(".content-option-product").classList.add("content-option-product-desactive")
})
//abre as opções de filtragem no mobile
const mobileFilter = document.querySelector(".content-order__mobile-filter")
mobileFilter.addEventListener("click", function() {
    const query = document.querySelector(".content-filter__mobile-option")
    query.classList.add("content-filter__mobile-option-active")
    document.querySelector(".content-option-product").classList.add("content-option-product-desactive")
})




//configura a opção de fechar, no icone X quando clicamos em ordenar no mobile
const closeOrder = document.querySelector(".content-order__mobile-close")
closeOrder.addEventListener("click", function(){
  document.querySelector(".content-order__mobile-sort-active").classList.remove("content-order__mobile-sort-active")
  document.querySelector(".content-option-product").classList.remove("content-option-product-desactive")
})
//configura a opção de fechar, no icone X quando clicamos em filtrar no mobile
const closeFilter = document.querySelector(".content-filter__mobile-close")
closeFilter.addEventListener("click", function(){
  document.querySelector(".content-filter__mobile-option-active").classList.remove("content-filter__mobile-option-active")
  document.querySelector(".content-option-product").classList.remove("content-option-product-desactive")
})

//ordenar pelo mais recente mobile:
const mostRecentMobile = document.querySelector(".content-order__order-by-active__most-recent-mobile");
    mostRecentMobile.addEventListener("click", function() {
      getAllposts("http://localhost:5000/products?_sort=date&_start=0&_limit=4")
      document.querySelector(".content-order__mobile-sort-active").classList.remove("content-order__mobile-sort-active")
      document.querySelector(".content-option-product").classList.remove("content-option-product-desactive")
})
//ordenar pelo menor preço mobile:
const lowPriceMobile = document.querySelector(".content-order__order-by-active__low-price-mobile");
    lowPriceMobile.addEventListener("click", function() {
      getAllposts("http://localhost:5000/products?_sort=price&_start=0&_limit=4")
      document.querySelector(".content-order__mobile-sort-active").classList.remove("content-order__mobile-sort-active")
      document.querySelector(".content-option-product").classList.remove("content-option-product-desactive")
})
//ordenar pelo maior preço mobile:
const bigPriceMobile = document.querySelector(".content-order__order-by-active__big-price-mobile");
    bigPriceMobile.addEventListener("click", function() {
      getAllposts("http://localhost:5000/products?_sort=price&_order=desc&_start=0&_limit=4")
      document.querySelector(".content-order__mobile-sort-active").classList.remove("content-order__mobile-sort-active")
      document.querySelector(".content-option-product").classList.remove("content-option-product-desactive")
})

//botão de exibir as cores
const bntMobileColor = document.querySelector(".content-filter__color-title")
bntMobileColor.addEventListener("click", function() {
  var colors = document.querySelector(".content-option-color")
  var contentColor = document.querySelector(".content-filter__color")
  var checkbox = document.querySelector(".remove")
  checkbox.classList.remove("remove")
  btn.classList.add("remove")
  document.querySelector(".content-filter__color-icon1").classList.toggle("content-filter__color-icon-active1");
  document.querySelector(".content-filter__color-icon2").classList.toggle("content-filter__color-icon-active2");
  
  if(colors.parentNode.nodeName === "H5") {
    contentColor.appendChild(colors)
  } else
    document.querySelector(".content-option__title").appendChild(colors)
    reset("color")
    getAllposts("http://localhost:5000/products?_start=0&_limit=4")
})

//botão de exibir os tamanhos
const bntMobileSize = document.querySelector(".content-filter__size-title")
bntMobileSize.addEventListener("click", function() {
  var sizes = document.querySelector(".content-option-size")
  var contentSize = document.querySelector(".content-filter__size")
  var checkbox = document.querySelector(".remove")
  checkbox.classList.remove("remove")
  btn.classList.add("remove")
  document.querySelector(".content-filter__size-icon1").classList.toggle("content-filter__size-icon-active1");
  document.querySelector(".content-filter__size-icon2").classList.toggle("content-filter__size-icon-active2");
  
  if(sizes.parentNode.nodeName === "H5") {
    contentSize.appendChild(sizes)
  } else
    document.querySelector(".content-option__title").appendChild(sizes)
    reset("size")
    getAllposts("http://localhost:5000/products?_start=0&_limit=4")
})
//botão de exibir os preços
const bntMobilePrice = document.querySelector(".content-filter__price-title")
bntMobilePrice.addEventListener("click", function() {
  var prices = document.querySelector(".content-option-price")
  var contentprice = document.querySelector(".content-filter__price")
  var checkbox = document.querySelector(".remove")
  checkbox.classList.remove("remove")
  btn.classList.add("remove")
  document.querySelector(".content-filter__price-icon1").classList.toggle("content-filter__price-icon-active1");
  document.querySelector(".content-filter__price-icon2").classList.toggle("content-filter__price-icon-active2");
  
  if(prices.parentNode.nodeName === "H5") {
    contentprice.appendChild(prices)
  } else
    document.querySelector(".content-option__title").appendChild(prices)
    reset("price")
    getAllposts("http://localhost:5000/products?_start=0&_limit=4")
})

//Confere o tamanho da página e define a partir dai quantos produtos serão carregados inicialmente
media()
function media () {
  var queryMobile = window.matchMedia("(max-width:768px)")
  if (queryMobile.matches) {
    getAllposts("http://localhost:5000/products?_start=0&_limit=4");
  }else
  getAllposts("http://localhost:5000/products?_start=0&_limit=9");
}