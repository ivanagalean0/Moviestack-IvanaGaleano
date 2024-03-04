
const contenedor = document.getElementById("main")
const urlParams = new URLSearchParams(location.search)
const id = urlParams.get("id")
const url = "https://moviestack.onrender.com/api/movies"
const claveApi = {
    method: "GET",
    headers: {
        "x-api-key": "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"
    }
}
let peliculaEncontrada = []
let detallePelicula = []

fetch(url, claveApi)
    .then( response => response.json())
    .then((datos) => {
        peliculaEncontrada = datos.movies
        detallePelicula = peliculaEncontrada.find( movie => movie.id == id)
        function crearCardDetalles(detallePelicula) {
        return `
                <div class="flex flex-col justify-center w-1/3 h-1/3 ">
                <img class="" src="https://moviestack.onrender.com/static/${detallePelicula.image}" alt="">
                <table class="border-2 border-black mt-10 text-center">
                    <tr class="border-2 border-black ">
                        <th class="border-2 border-black">Original Language</th>
                        <td>${detallePelicula.original_language}</td>
                    </tr>                  
                    <tr class="border-2 border-black">
                        <th class="border-2 border-black">Release Date</th>
                        <td>${detallePelicula.release_date}</td>
                    </tr>
                    <tr class="border-2 border-black ">
                        <th class="border-2 border-black">Runtime</th>
                        <td>${detallePelicula.runtime}</td>
                    </tr>
                    <tr class="border-2 border-black ">
                        <th class="border-2 border-black">Status</th>
                        <td>${detallePelicula.status}</td>
                    </tr>
                </table>
                </div>

                <div class="flex flex-col w-1/3 items-start ml-16 mt-9">
                    <h1 class=" font-bold text-2xl ">${detallePelicula.title}</h1>
                    <h4 class=" underline py-2">${detallePelicula.tagline}</h4>
                    <h6 class=" py-2">${detallePelicula.genres}</h6>
                    <p class="">${detallePelicula.overview}</p>
                    <table class="border-2 border-black mt-16 text-center">
                        <tr class="border-2 border-black">
                            <th class="border-2 border-black">Vote Average</th>
                            <td>${detallePelicula.vote_average}%</td>
                        </tr>
                        <tr class="border-2 border-black">
                            <th class="border-2 border-black">Budget</th>
                            <td>USD ${detallePelicula.budget}</td>
                        </tr>
                        <tr class="border-2 border-black ">
                            <th class="border-2 border-black">Revenue</th>
                            <td>USD ${detallePelicula.revenue}</td>
                        </tr>
                    </table>
                </div> 
                `
        }
        function mostrarDetalle(detallePelicula, elemento){
                let template = crearCardDetalles(detallePelicula)
                elemento.innerHTML = template
        }
        mostrarDetalle(detallePelicula, contenedor)
})
    