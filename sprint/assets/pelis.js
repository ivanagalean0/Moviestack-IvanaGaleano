const main = document.getElementById("contenedor")

function crearTarjetas(pelicula){
    return `
        <article class="flex flex-col gap-3 w-10/12 md:w-5/12 lg:w-3/12 border-2 border-white rounded-lg justify-evenly">
            <img class="w-full" src="${pelicula.imagen}" alt="">
            <h1 class="font-bold text-xl">${pelicula.título}</h1>
            <h3>${pelicula.lema}</h3>
            <p class="px-5 text-center line-clamp-3">${pelicula.overview}</p>
        </article> 
    `
}

function imprimirTarjetas(listaPeliculas, elemento){
    let template = ""
    for (const peliculaIterada of listaPeliculas) {
        template += crearTarjetas(peliculaIterada)
    }
    elemento.innerHTML = template
}
imprimirTarjetas(peliculas, main)



