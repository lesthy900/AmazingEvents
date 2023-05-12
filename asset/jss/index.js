
let seccion = document.getElementById("sectionart")
let formpadre = document.getElementById("formPadre")
/* let form = document.getElementById("form") */
let cajabusqueda = document.getElementById("search")
let inputBusqueda = document.getElementById("busqueda")
let Checkbox = document.querySelector("#boxCaja")
const todasCartas = data
const currentDatec = data.currentDate
console.log(todasCartas)

const nombreEvents = todasCartas.events.map(events => events.category).filter((category, index, array) => array.indexOf(category) == index)

const cearCheckbox = (acumulador, element, indice, array) =>{
  return acumulador +`
                        
                        <label class="labelcaja" for="${element}">
                        <input type="checkbox" name="${element}" value="${element}"  id="${element}">
                        ${element}</label>
                       `

}
const  templateCheck = nombreEvents.reduce(cearCheckbox, '')
Checkbox.innerHTML =templateCheck;






function crearCar(objeto ){
return objeto.reduce((acu, ea)=>{
  return acu += `
  <article id="cards1" class="card" style="width: 18rem;">
<img src=${ea.image} class="card-img-top" alt="...">
<div class="card-body">
<h5 class="card-title">${ea.name}</h5>
  <p>${ea.category}</p>  
  <p>${ea.date}</p>
  <div class="btn-pre">
  <a href="./asset/page/cards.html?id=${ea._id}&nombre=${ea.name}&category=${ea.category}&imagen=${ea.image} class="btn btn-primary">see more</a>
  </div>
  </div>
</article>`
}, '')
}
seccion.innerHTML = crearCar(todasCartas.events)
           

Checkbox.addEventListener( 'change', ()=>{
  let CBchecked = Array.from( document.querySelectorAll( 'input[type= "checkbox"]:checked' )).map(check => check.value)
  let fCards = filterCards(todasCartas, CBchecked)
  seccion.innerHTML = crearCar(fCards, filtrarPorTitulo )
  
})  

function filterCards(todasCartas, array){
  if(array.length == 0){
    return todasCartas.events
  }
  return todasCartas.events.filter((events) => array.includes(events.category) )
  
}  

// filtrar por busqueda

inputBusqueda.addEventListener('input', ()=>{
  const filtrarPorBusqueda = filtrarPorTitulo(todasCartas.events, inputBusqueda.value)
    
    seccion.innerHTML = crearCar(filtrarPorBusqueda)
  })

//filtrar por titulo 
function filtrarPorTitulo(todasCartas, busqueda ){
  return todasCartas.filter(events => events.name.toLowerCase().includes(busqueda.toLowerCase()))
}







