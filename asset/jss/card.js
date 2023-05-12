
const contenedorMain = document.getElementById("maincards")
const params = new URLSearchParams(location.search)
const idparams = params.get('id')
const todoLosDa = data
let todoLosDatos = todoLosDa.events.find(events => events._id == idparams  )
console.log(idparams)


const asistencia_Estimate = definirFecha (todoLosDatos.date, data.currentDate )
console.log(asistencia_Estimate)

function definirFecha(evento, date){
  if (evento > date) {
      return `<li>Estimate: ${todoLosDatos.estimate}</li>`
  }else{

      return `<li>Assistance: ${todoLosDatos.assistance}</li>`
  }
}



/* document.title = `Detalles de ${todoLosDatos.name}` */

contenedorMain.innerHTML = `
<section class="section-4 d-flex justify-content-center ">
                  <div class="section col-md-8 col-lg-8 col-12 ">
                    <h1>${todoLosDatos.name}</h1>
                    <!-- <img src="./asset/images/Books.jpg" alt=""> -->
                    
                  </div>
            </section>
            <div class="div-articulos col-8 col-md-10 col-lg-11">
    
                 <div class="articulo-img col-10 col-md-8 col-lg-7 d-flex justify-content-center">
                     <img class=" col-10 col-md-8 col-lg-7" src="${todoLosDatos.image}" alt="">
                 </div>
                <article class="articulo-txt col-md-6 col-lg-4 d-flex flex-column justyfi-content-around ">
                <div class=" d-flex col-12 justify-content-between gap-5 " >
                 
                    <p>${todoLosDatos.date}</p>
                    <p>${todoLosDatos.place}</p>
                </div>
                
                    <h3>${todoLosDatos.category}</h3>
                   <p>${todoLosDatos.description}</p>
                   <div class=" d-flex col-12  gap-5 flex-column  " >  
                  <li>capacity: ${todoLosDatos.capacity}</li>
                  <li>${asistencia_Estimate}</li>
                  <li>price: ${todoLosDatos.price}</li>

                </div>
                </article>
                
            </div>
`