let cajabusqueda = document.getElementById("search")
let Checkbox = document.querySelector("#boxCaja")
let inputBusqueda = document.getElementById("busqueda")
let seccion = document.getElementById("sectionart")

const todasCartas = data 
const currentDatec = data.currentDate


const nombreEvents = todasCartas.events.map(events => events.category).filter((category, index, arry) => arry.indexOf(category) == index );


const eventspast = todasCartas.events.filter((events) => events.date <= currentDatec ) 


const crearCheckbox = nombreEvents.reduce((acumulador, element, indice, array) =>{
  return acumulador += `
  <label class="labelcaja" for="${element}">
  <input type="checkbox" name="${element}" value="${element}"  id="${element}">
  ${element}</label>
  `
  
  
}, '')
Checkbox.innerHTML = crearCheckbox;


/* crearCar(eventspast, seccion) */
function crearCar(objeto){
  console.log(objeto)
  return objeto.reduce(( acumulado, element) =>{
     return acumulado += `<article id="cards1" class="card" style="width: 18rem;">
     <img src=${element.image} class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-title">${element.name}</h5>
     <p>${element.category}</p>
     <div class="btn-pre">
     <a href="./cards.html?id=${element._id}&nombre=${element.name}&category=${element.category}&imagen=${element.image} class="btn btn-primary">see more</a>
     </div>
     </div>
     </article>`
    }, '')
    
  }
  seccion.innerHTML = crearCar( eventspast)
  


  Checkbox.addEventListener('change',  ()=>{
    let CBchecked = Array.from( document.querySelectorAll( 'input[type= "checkbox"]:checked' )).map(check => check.value) 
    let fCards = filterCards(eventspast, CBchecked) 
    console.log(fCards)
    seccion.innerHTML = crearCar(fCards)
   
  })
  
  
  function filterCards(eventspast, array){
    console.log(array)
    if(array.length == 0){
      return eventspast
    }
    return eventspast.filter((events) => array.includes(events.category) )
    
  }


  inputBusqueda.addEventListener('input', ()=>{
    const filtrarPorBusqueda = filtrarPorTitulo(eventspast, inputBusqueda.value)
      
      seccion.innerHTML = crearCar(filtrarPorBusqueda)
    })
  
  //filtrar por titulo 
  function filtrarPorTitulo(eventspast, busqueda ){
    return eventspast.filter((events) => events.name.toLowerCase().includes(busqueda.toLowerCase()))
  }