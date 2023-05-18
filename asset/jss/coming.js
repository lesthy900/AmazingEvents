

const currentDatec = data.currentDate
let cajabusqueda = document.getElementById("search")
let inputBusqueda = document.getElementById("busqueda")
let Checkbox = document.querySelector("#boxCaja")
let seccion = document.getElementById("sectionart")
let currentDate; 
let todasCartas;

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(data =>  data.json( ))
    .then(res => {
      todasCartas = res
      //filtro de cartas por año
      const eventsFuture = todasCartas.events.filter((events) => events.date >= currentDatec ) 
      seccion.innerHTML = crearCar(eventsFuture)
      // filtro de checkbox por catergoria 
      const nombreEvents = todasCartas.events.map(events => events.category).filter((category, index, arry) => arry.indexOf(category) == index );


      Checkbox.addEventListener('change',  ()=>{
        let CBchecked = Array.from( document.querySelectorAll( 'input[type= "checkbox"]:checked' )).map(check => check.value)
        let fCards = filterCategory(eventsFuture, CBchecked)
        filtroCROsover = filtrarPorTitulo( fCards, inputBusqueda.value )
        console.log(fCards)
        seccion.innerHTML = crearCar(filtroCROsover,fCards)
        
      })

      inputBusqueda.addEventListener('input', ()=>{
        let CBchecked = Array.from( document.querySelectorAll( 'input[type= "checkbox"]:checked' )).map(check => check.value)
        let fCards = filterCategory(eventsFuture, CBchecked)
        filtroCROsover = filtrarPorTitulo( fCards, inputBusqueda.value )
        console.log(fCards)
        seccion.innerHTML = crearCar(filtroCROsover,fCards)
      
        })



// crear checkbox dinamicos 
  const crearCheckbox = nombreEvents.reduce((acumulador, elemento, indice, array) =>{
  return acumulador += `
                   <label class="labelcaja" for="${elemento}">
                    <input type="checkbox" name="${elemento}" value="${elemento}"  id="${elemento}">
                    ${elemento}</label>
  `


}, '')

Checkbox.innerHTML = crearCheckbox;


    })



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
          
          
          


function filterCategory(eventsFuture, array){
  console.log(filterCategory)
  if(array.length > 0){
    return eventsFuture.filter((events) => array.includes(events.category) )
  }
  return eventsFuture
  
}  

// filtrar por busqueda



//filtrar pos;r titulo 
function filtrarPorTitulo(eventsFuture, busqueda ){
  return eventsFuture.filter((events) => events.name.toLowerCase().includes(busqueda.toLowerCase()))
}
 







