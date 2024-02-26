const main = document.getElementById("$main")
const urlParams = new URLSearchParams(location.search)
const id = urlParams.get("id")

const peliculaEncontrada = peliculas.find( pelicula => pelicula.id == id)

main.innerHTML = `
    <div class="flex flex-col justify-center w-1/3 h-1/3 ">
    <img class="" src="${peliculaEncontrada.image}" alt="">
    <table class="border-2 border-black mt-10 text-center">
        <tr class="border-2 border-black ">
            <th class="border-2 border-black">Original Language</th>
            <td>${peliculaEncontrada.original_language}</td>
        </tr>                  
        <tr class="border-2 border-black">
            <th class="border-2 border-black">Release Date</th>
            <td>${peliculaEncontrada.release_date}</td>
        </tr>
        <tr class="border-2 border-black ">
            <th class="border-2 border-black">Runtime</th>
            <td>${peliculaEncontrada.runtime}</td>
        </tr>
        <tr class="border-2 border-black ">
            <th class="border-2 border-black">Status</th>
            <td>${peliculaEncontrada.status}</td>
        </tr>
    </table>
    </div>

    <div class="flex flex-col w-1/3 items-start ml-16 mt-9">
        <h1 class=" font-bold text-2xl ">${peliculaEncontrada.title}</h1>
        <h4 class=" underline py-2">${peliculaEncontrada.tagline}</h4>
        <h6 class=" py-2">${peliculaEncontrada.genres}</h6>
        <p class="">${peliculaEncontrada.overview}</p>
        <table class="border-2 border-black mt-16 text-center">
            <tr class="border-2 border-black">
                <th class="border-2 border-black">Vote Average</th>
                <td>${peliculaEncontrada.vote_average}%</td>
            </tr>
            <tr class="border-2 border-black">
                <th class="border-2 border-black">Budget</th>
                <td>USD ${peliculaEncontrada.budget}</td>
            </tr>
            <tr class="border-2 border-black ">
                <th class="border-2 border-black">Revenue</th>
                <td>USD ${peliculaEncontrada.revenue}</td>
            </tr>
        </table>
    </div> 
`