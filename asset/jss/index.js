
let seccion = document.getElementById("sectionart")
let formpadre = document.getElementById("formPadre")
let cajabusqueda = document.getElementById("search")
let inputBusqueda = document.getElementById("busqueda")
let Checkbox = document.querySelector("#boxCaja")
let todasCartas;
let nuevaData;
const currentDatec = data.currentDate
console.log(currentDatec)


fetch('https://mindhub-xj03.onrender.com/api/amazing')
.then( data => data.json( ) )
.then( res =>{ 
 todasCartas = res
 
 seccion.innerHTML = crearCar(todasCartas.events)
 const nombreEvents = todasCartas.events.map(events => events.category).filter((category, index, array) => array.indexOf(category) == index) 
console.log(nombreEvents)

const crearCheckbox = nombreEvents.reduce((acumulador, element, indice, array) =>{
  return acumulador += `
  <label class="labelcaja" for="${element}">
  <input type="checkbox" name="${element}" value="${element}"  id="${element}">
  ${element}</label>
  `
}, '')

Checkbox.innerHTML = crearCheckbox;
  
Checkbox.addEventListener( 'change', ()=>{
  let CBchecked = Array.from( document.querySelectorAll( 'input[type= "checkbox"]:checked' )).map(check => check.value)
  let fCards = filterCards(todasCartas, CBchecked)
  let filtroCROsover =  filtrarPorTitulo( fCards,inputBusqueda.value)
  seccion.innerHTML = crearCar(filtroCROsover, filtrarPorTitulo )
  
}) 


inputBusqueda.addEventListener('input', ()=>{
  let CBchecked = Array.from( document.querySelectorAll( 'input[type= "checkbox"]:checked' )).map(check => check.value)
  let fCards = filterCards(todasCartas, CBchecked)
  let filtroCROsover =  filtrarPorTitulo( fCards,inputBusqueda.value)
  seccion.innerHTML = crearCar(filtroCROsover, filtrarPorTitulo )
  })



  } )


function crearCar(objeto ){
return objeto.reduce((acumulador, elemento)=>{
  return acumulador += `
  <article id="cards1" class="card" style="width: 18rem;">
<img src=${elemento.image} class="card-img-top" alt="...">
<div class="card-body">
<h5 class="card-title">${elemento.name}</h5>
  <p>${elemento.category}</p>  
  <p>${elemento.date}</p>
  <div class="btn-pre">
  <a href="./asset/page/cards.html?id=${elemento._id}&nombre=${elemento.name}&category=${elemento.category}&imagen=${elemento.image} class="btn btn-primary">see more</a>
  </div>
  </div>
</article>`
}, '')
}



function filterCards(todasCartas, array){
  if(array.length == 0){
    return todasCartas.events
  }
  return todasCartas.events.filter((events) => array.includes(events.category) )
}  

// filtrar por busqueda

//filtrar por titulo 
function filtrarPorTitulo(todasCartas, busqueda ){
  return todasCartas.filter(events => events.name.toLowerCase().includes(busqueda.toLowerCase()))
}







