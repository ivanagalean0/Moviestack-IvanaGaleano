const url = "https://moviestack.onrender.com/api/movies"
const claveApi = {
    method: "GET",
    headers: {
        "x-api-key": "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"
    }
}
let pelis = []
let pelisEncontradas=[];
const peliculasFav = JSON.parse( localStorage.getItem('favoritos') || [] )
fetch(url, claveApi)
    .then(response => response.json())
    .then((datos) => {
        pelis = datos.movies
            pelis.forEach(peli => {
                peliculasFav.forEach(peliFav => {
                    if(peli.id === peliFav){
                        pelisEncontradas.push(peli);
                    }
                });
            });
           
        const main = document.getElementById("main");
        imprimirTarjetas(pelisEncontradas, main);

        function crearTarjetas(movie){
            return `
                <article class="relative flex flex-col gap-3 w-10/12 md:w-5/12 lg:w-3/12 rounded-b-[24px] justify-evenly bg-purple-950	text-white">
                    <img class="w-full" src="https://moviestack.onrender.com/static/${movie.image}" alt="">
                    <button class="absolute top-1  bg-white text-black w-12 m-2  rounded hover:bg-gray-300" id="btnFavorito" data-id="${movie.id}">
                        <img src="./Recursos Moviestack/guardado.png" alt="">
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
            elemento.innerHTML = template;

        }
})