let tablet = document.getElementById("tabla-uno")
let tablet2 = document.getElementById("tabla-dos")
let tablet3 = document.getElementById("tabla-tres")

let datos;
fetch('https://mindhub-xj03.onrender.com/api/amazing')
.then(data => data.json())
.then(res => {
    datos = res
    currentDate = res.currentDate
    
    // eventos pasados
    let pasado = datos.events.filter((events) => events.date <= currentDate )
    console.log(pasado)

    // categorias pasadas
    let categoriapasada = Array.from( new Set (pasado.map(events => events.category)))
    console.log(categoriapasada)

    // eventos fururos
    let fururo = datos.events.filter((events) => events.date >= currentDate )
    console.log(fururo)

    //  categorias futuras
    let categoriafutura = Array.from( new Set(fururo.map(events => events.category)))
    console.log(categoriafutura)
    

  // primera tabla
    function topAsistencia( pasado){
        console.log(pasado)
        let porciento = 0;
        let nombre = " "
        pasado.forEach(pasado => {
            let total = (pasado.assistance / pasado.capacity )* 100;
            // condicion
            if(total > porciento){
                porciento = total;
                nombre = pasado.name;
            }
        })
        return `${nombre} ${porciento}% `
    } 

    //menor asistencia

    function lowerAsistencia( pasado){
        console.log(pasado)
        let porciento = 100;
        let nombre = " "
        pasado.forEach(pasado => {
            let total = (pasado.assistance / pasado.capacity )* 100;
            if(total < porciento){
                porciento = total;
                nombre = pasado.name;
            }
        })
        return `${nombre} ${porciento}% `
    } 

    // capacidad

    function topCapacidad( pasado){
        console.log(pasado)
        let capacidad = 0;
        let nombre = " "
        pasado.forEach((event )=> {
            if(event.capacity > capacidad){
                capacidad  = event.capacity 
                nombre = event.name;
            }
        })
        return `${nombre} ${capacidad}% `
    } 

    
    let crearCarTable1 = categoriapasada.reduce((acumulador, elemento, indice, array ) => {
        return acumulador = `
        <tr class="text-center">
            <td>${topAsistencia(pasado)}</td>
            <td>${lowerAsistencia(pasado)}</td>
            <td>${ topCapacidad(pasado)}</td>
        </tr>
        `
    }, '')
    tablet.innerHTML = crearCarTable1;

  //////////////////////////// tabla 2 ///////////////////////////////////////
    function datoDetablet (categoria, eventos){
        console.log(eventos)
        console.log(categoria)
        let resultado = [];
        categoria.map((category) => {
            
            let futuroCategoria = eventos.filter(events => category == events.category)
            console.log(futuroCategoria);

            let ingresos = calculoIngresos(futuroCategoria);
            console.log(ingresos);

            let asistencia = calculoAsistencia(futuroCategoria);
            console.log(asistencia);

            resultado.push({category, ingresos, asistencia: asistencia / futuroCategoria.length})
        
        });
        return resultado;
    }

    function calculoIngresos(fururo){
    let totalI = 0;
    fururo.forEach(fururo => {
        totalI += fururo.price * (fururo.estimate || fururo.assistance);
    })
    return totalI;
   }
   
   function calculoAsistencia(fururo){
    let totalA = 0;
    fururo.forEach(fururo => {
        totalA += ((fururo.assistance || fururo.estimate) / fururo.capacity) * 100;

    })
    return totalA
   }
   
   let totalInformacionFuturo = datoDetablet(categoriafutura, fururo)

   let crearCarTable2 = totalInformacionFuturo.reduce((acumulador, elemento, indice, array ) => {
    return acumulador += `
    <tr class="text-center">
        <td>  ${elemento.category}</td>
        <td> $ ${elemento.ingresos.toLocaleString()}  </td>
        <td>  ${elemento.asistencia.toFixed(2)} % </td>
    </tr>
    
    `
}, '')
tablet2.innerHTML = crearCarTable2;

///// tabla 3

function calculoIngresos(pasado){
    let totalIi = 0;
    pasado.forEach(pasado => {
        totalIi += pasado.price * (pasado.estimate || pasado.assistance);
    })
    return totalIi;
   }
   
   function calculoAsistencia(pasado){
    let totalAa = 0;
    pasado.forEach(pasado => {
        totalAa += ((pasado.assistance || pasado.estimate) / pasado.capacity) * 100;

    })
    return totalAa
   }
   
   let totalInformacionpasado = datoDetablet(categoriapasada, pasado)

   let crearCarTable3 = totalInformacionpasado.reduce((acumulador, elemento, indice, array ) => {
    return acumulador += `
    <tr class="text-center">
        <td>${elemento.category}</td>
        <td>$ ${elemento.ingresos.toLocaleString()}</td>
        <td>${elemento.asistencia.toFixed(2)} % </td>
    </tr>
    
    `
}, '')
tablet3.innerHTML = crearCarTable3;

})  











