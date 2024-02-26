const main = document.getElementById("contenedor")

function crearTarjetas(pelicula){
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

function imprimirTarjetas(listaPeliculas, elemento){
    let template = ""
    for (const peliculaIterada of listaPeliculas) {
        template += crearTarjetas(peliculaIterada)
    }
    if(listaPeliculas.length == 0){
        template = `<h2 class="font-semibold text-2xl">No hay películas con los filtros aplicados</h2>`
    }
    elemento.innerHTML = template
}
imprimirTarjetas(peliculas, main)



const input = document.getElementById("inputBusqueda")
const contenedorSelect = document.getElementById("divOpciones")

        /* FILTRAR EL INPUT POR TITULO */
// 1. creo una funcion que filtre peliculas por titulo
function filtrarTituloDePeliculas(listaPeliculas, titulo) {
    return listaPeliculas.filter( pelicula => pelicula.title.toLowerCase().startsWith(titulo.toLowerCase()))
            
}
//2. crear evento que detecte que cuando se escriba algun titulo de pelicula, me devuelva esa pelicula
input.addEventListener("input", (event) => {
    const tituloIngresado = input.value;
    const generoSeleccionado = selectGeneros.value
    const peliculasFiltradasPorTitulo = filtrarTituloDePeliculas(peliculas, tituloIngresado)
    const peliculasFiltradas = filtrarPeliculasPorGenero(peliculasFiltradasPorTitulo, generoSeleccionado)
    // muestro las peliculas a la vista, imprimir en las cards segun lo filtrado
    imprimirTarjetas(peliculasFiltradas, main)
})

        /* FILTRAR LOS SELECT POR GENERO*: ¡¡¡NO ME FUNCIONA, HAY ALGO MAL!!! */ 
// 1. conseguir los generos, 
// 2. quitar repetidos (.flat)
const generos = new Set(peliculas.map(pelicula => pelicula.genres).flat())
// lo convierto en array de nuevo, ya que el SET me lo convierte en size
const arrayGeneros = Array.from(generos)
console.log(arrayGeneros);

//3. crear la OPTION y agregarle los generos 
const selectGeneros = document.getElementById("filtro-genero")
arrayGeneros.forEach((genres) => {
    const option = document.createElement("option")
    option.value = genres
    option.textContent = `${genres}`
    selectGeneros.appendChild(option)
})
//5. filtrar por generos
function filtrarPeliculasPorGenero(listaPeliculas, generoSeleccionado) {
    if(!generoSeleccionado){
        return listaPeliculas
    }else{
        return listaPeliculas.filter(pelicula => pelicula.genres.includes(generoSeleccionado))
    }
}
// 4. crear evento que detecte que cuando seleccione uno de los generos, me devuelva las peliculas que contienen ese genero
    // esta parte no me funciona 
contenedorSelect.addEventListener("change", (event) => {
    const tituloIngresado = input.value
    const generoSeleccionado = event.target.value
    const peliculasFiltradasPorGenero = filtrarPeliculasPorGenero(peliculas, generoSeleccionado)
    const peliculasFiltradas = filtrarTituloDePeliculas(peliculasFiltradasPorGenero, tituloIngresado)
    // muestro las peliculas a la vista, imprimir en las cards segun lo filtrado
    imprimirTarjetas(peliculasFiltradas, main)
})




