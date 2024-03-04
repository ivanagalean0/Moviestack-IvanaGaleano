// funciones para crear las tarjetas e imprimirlas
export function crearTarjetas(pelicula){
    return `
        <article class="flex flex-col gap-3 w-10/12 md:w-5/12 lg:w-3/12 rounded-b-[24px] justify-evenly bg-purple-950	text-white">
            <img class="w-full" src="${pelicula.image}" alt="">
            <h1 class="font-bold text-2xl ">${pelicula.title}</h1>
            <h4 class="underline">${pelicula.tagline}</h4>
            <p class="px-5 text-center line-clamp-3">${pelicula.overview}</p>
            <div class=" flex gap-5 justify-evenly">
                <a href="./detalles.html?id=${pelicula.id}" class="border border-white w-20 text-center p-2 m-5 font-semibold rounded hover:bg-violet-400"> Details </a>
                <a href="#" class="border border-white w-20 text-center py-2 m-5 font-semibold rounded hover:bg-violet-400"> Page </a>

            </div>
        </article> 
    `
}

export function imprimirTarjetas(listaPeliculas, elemento){
    let template = ""
    for (const peliculaIterada of listaPeliculas) {
        template += crearTarjetas(peliculaIterada)
    }
    if(listaPeliculas.length == 0){
        template = `<h2 class="font-semibold text-2xl">No hay películas con los filtros aplicados</h2>`
    }
    elemento.innerHTML = template
}

// creo una funcion que filtre peliculas por titulo
export function filtrarTituloDePeliculas(listaPeliculas, titulo) {
    return listaPeliculas.filter( pelicula => pelicula.title.toLowerCase().startsWith(titulo.toLowerCase()))
            
}

//filtrar por generos
export function filtrarPeliculasPorGenero(listaPeliculas, generoSeleccionado) {
    if(!generoSeleccionado){
        return listaPeliculas
    }else{
        return listaPeliculas.filter(pelicula => pelicula.genres.includes(generoSeleccionado))
    }
}


