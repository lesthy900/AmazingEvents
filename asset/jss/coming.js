

let cajabusqueda = document.getElementById("search")
let inputBusqueda = document.getElementById("busqueda")
let Checkbox = document.querySelector("#boxCaja")
const todasCartas = data 
const currentDatec = data.currentDate
let seccion = document.getElementById("sectionart")









// filtro de checkbox por catergoria 
const nombreEvents = todasCartas.events.map(events => events.category).filter((category, index, arry) => arry.indexOf(category) == index );
console.log(nombreEvents);

//filtro de cartas por año
const eventsFuture = todasCartas.events.filter((events) => events.date >= currentDatec ) 
console.log(eventsFuture) 
crearCar(eventsFuture, seccion)

// crear checkbox dinamicos 
const crearCheckbox = nombreEvents.reduce((acumulador, elemento, indice, array) =>{
  return acumulador += `
                   <label class="labelcaja" for="${elemento}">
                    <input type="checkbox" name="${elemento}" value="${elemento}"  id="${elemento}">
                    ${elemento}</label>
  `


}, '')

Checkbox.innerHTML = crearCheckbox;


// crear cartas dinamicas 
function crearCar(objeto ){
  return objeto.reduce( (acu, ea) =>{
     return acu += `
     <article id="cards1" class="card" style="width: 18rem;">
  <img src=${ea.image} class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${ea.name}</h5>
  <p>${ea.category}</p>
  <p>${ea.place}</p>
  <div class="btn-pre">
  <a href="./cards.html?id=${ea._id}&nombre=${ea.name}&category=${ea.category}&imagen=${ea.image} class="btn btn-primary">see more</a>
  </div>
</div>
</article>
     `
  }, '')
  
}
seccion.innerHTML = crearCar( eventsFuture)



Checkbox.addEventListener('change',  ()=>{
  let CBchecked = Array.from( document.querySelectorAll( 'input[type= "checkbox"]:checked' )).map(check => check.value)
  let fCards = filterCategory(eventsFuture, CBchecked)
  console.log(fCards)

  seccion.innerHTML = crearCar(fCards)
  
})


function filterCategory(eventsFuture, array){
  console.log(filterCategory)
  if(array.length > 0){
    return eventsFuture.filter((events) => array.includes(events.category) )
  }
  return eventsFuture
  
}  



// filtrar por busqueda

inputBusqueda.addEventListener('input', ()=>{
  const filtrarPorBusqueda = filtrarPorTitulo(eventsFuture, inputBusqueda.value)
  /* if(Checkbox.checked){
    const filtrarPorEstado =  filterPorEstado(filtrarPorBusqueda)
   crearCar(filtrarPorEstado, )
  }else{
   */
   seccion.innerHTML = crearCar( filtrarPorBusqueda, filtrarPorTitulo)
 /*  } */
  })

//filtrar por titulo 
function filtrarPorTitulo(eventsFuture, busqueda ){
  return eventsFuture.filter((events) => events.name.toLowerCase().includes(busqueda.toLowerCase()))
}

/* function filterPorEstado (eventsFuture){
  return eventsFuture.filter((events)=> events.category)
} */