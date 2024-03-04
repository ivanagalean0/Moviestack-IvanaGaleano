let peliculas = [];
const url = 'https://moviestack.onrender.com/api/movies'
const apiKey = {
    method: "GET",
    headers: {
        "x-api-key": "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"
    }
}

fetch(url, apiKey)
    .then( resolve => resolve.json())
    .then((datos) => {
        peliculas = datos.movies; //peliculas guarda el array de movies
        function crearTarjetas(movie){
            return `
                <article class="relative flex flex-col gap-3 w-10/12 md:w-5/12 lg:w-3/12 rounded-b-[24px] justify-evenly bg-purple-950	text-white">
                    <img class="w-full" src="https://moviestack.onrender.com/static/${movie.image}" alt="">
                    <button class="absolute top-1  bg-white text-black w-12 m-2  rounded hover:bg-gray-300" id="btnFavorito" data-id="${movie.id}">
                        <img src="./Recursos Moviestack/guardar.png" alt="">
                    </button>
                    <h1 class="font-bold text-2xl ">${movie.title}</h1>
                    <h4 class="underline">${movie.tagline}</h4>
                    <p class="px-5 text-center line-clamp-3">${movie.overview}</p>
                    <div class=" flex gap-5 justify-evenly">
                        <a href="./detalles.html?id=${movie.id}" class="border border-white w-20 text-center p-2 m-5 font-semibold rounded hover:bg-violet-400"> Details </a>
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
                    template = `<h2 class="font-semibold text-2xl">No movies with filters applied.</h2>`
            }
            elemento.innerHTML = template

        }
        function filtrarTituloDePeliculas(listaPeliculas, titulo) {
            return listaPeliculas.filter( movie => movie.title.toLowerCase().startsWith(titulo.toLowerCase()))
        } 
        //5. filtrar por generos
        function filtrarPeliculasPorGenero(movies, generoSeleccionado) {
            if(!generoSeleccionado){
                return movies
            }else{
                return movies.filter(movie => movie.genres.includes(generoSeleccionado))
            }
        }
        const main = document.getElementById("contenedor")
        const input = document.getElementById("inputBusqueda")
        // 4. crear evento que detecte que cuando seleccione uno de los generos, me devuelva las peliculas que contienen ese genero
        const contenedorSelect = document.getElementById("divOpciones")
        contenedorSelect.addEventListener("change", (event) => {
            const tituloIngresado = input.value
            const generoSeleccionado = event.target.value
            const peliculasFiltradasPorGenero = filtrarPeliculasPorGenero(peliculas, generoSeleccionado)
            const peliculasFiltradas = filtrarTituloDePeliculas(peliculasFiltradasPorGenero, tituloIngresado)
            // muestro las peliculas a la vista, imprimir en las cards segun lo filtrado
            imprimirTarjetas(peliculasFiltradas, main)
        })

        input.addEventListener("input", () => {
            const tituloIngresado = input.value;
            const generoSeleccionado = selectGeneros.value
            const peliculasFiltradasPorTitulo = filtrarTituloDePeliculas(peliculas, tituloIngresado)
            const peliculasFiltradas = filtrarPeliculasPorGenero(peliculasFiltradasPorTitulo, generoSeleccionado)
            // muestro las peliculas a la vista, imprimir en las cards segun lo filtrado
            imprimirTarjetas(peliculasFiltradas, main)
        })
        /* FILTRAR LOS SELECT POR GENERO */ 
        // 1. conseguir los generos, 2. quitar repetidos (.flat)
        const generos = new Set(peliculas.map(movies => movies.genres).flat())
        // lo convierto en array de nuevo, ya que el SET me lo convierte en size
        const arrayGeneros = Array.from(generos)
        //3. crear la OPTION y agregarle los generos 
        const selectGeneros = document.getElementById("filtro-genero")
        arrayGeneros.forEach((genres) => {
            const option = document.createElement("option")
            option.value = genres
            option.textContent = `${genres}`
            selectGeneros.appendChild(option)  
        })
        imprimirTarjetas(peliculas, main)
        //////////////// evento para que cuando haga click en el boton de guardar, se cambie el icono a negro y se guarde en la página
        const botonesFavorito = document.querySelectorAll("#btnFavorito");

        function manejarClickFavorito(event) {
            let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
            let idMovie = event.target.parentNode.dataset.id;
            if (!favoritos.includes(idMovie)) {
                favoritos.push(idMovie);
                localStorage.setItem('favoritos', JSON.stringify(favoritos));
                alert('Película agregada a favoritos');
                event.target.src = "./Recursos Moviestack/guardado.png"
            } else {
                alert('Esta película ya está en favoritos');
            }
        }
        botonesFavorito.forEach(boton => {
            boton.addEventListener("click", manejarClickFavorito)
        });
})
