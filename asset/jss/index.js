
const todasCartas = data 
const currentDatec = data.currentDate
let seccion = document.getElementById("sectionart")

function crearCar(events ){
  return ` <article id="cards1" class="card" style="width: 18rem;">
  <img src=${events.image} class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${events.name}</h5>

  <p>${category,events.category}</p>
  <p>${events.place}</p>
  <p>${events.capacity}</p>
  <p>${events.assistance}</p>
  <p class="card-text">${events.description}</p>
  <p>${events.date}</p>
  <div class="btn-pre">
  <a>${events.price}</a>
  <a href="./asset/page/cards.html" class="btn btn-primary">see more</a>
  </div>
</div>
</article>
  
  `
}

function cartas(todasCartas, car){
  car.innerHTML = ""
  let template = ""
  todasCartas.events.forEach(events => template += crearCar(events) )
  car.innerHTML = template
}

cartas(todasCartas, seccion)

re