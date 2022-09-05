let searchBox = document.querySelector("#search-box");
let form = document.querySelector("form");
let section = document.querySelector("section");
function showDetails(e){
    console.log(e);
    section.innerHTML = "";
    section.classList.add("single");
    let link = document.createElement("a");
    let img = document.createElement("img");
    let title = document.createElement("div");
    let name = document.createElement("h1");
    let desc = document.createElement("div");
    try{
        img.src = e.show.image.medium;
    } catch(e){
        img.src = "https://www.pngfind.com/pngs/m/5-55256_television-clipart-classic-tv-classic-tv-icon-png.png";
        img.style.width = "210px";
        img.style.height = "295px"
    }
    link.href = e.show.url;
    name.innerText = e.show.name;
    desc.innerHTML = e.show.summary;
    link.appendChild(img);
    title.appendChild(name);
    title.appendChild(desc);
    link.appendChild(title);
    section.appendChild(link);
}
form.addEventListener("submit", (e) => {
    section.classList.remove("single");
    e.preventDefault();
    section.innerHTML = '<p>Loading...</p>';
    fetch(`https://api.tvmaze.com/search/shows?q=${searchBox.value}&page=3`)
        .then((res) => {
            res.json()
            .then((data)=>{
                section.innerHTML = '';
                console.log(data);
                for(let x of data){
                    let link = document.createElement("a");
                    let img = document.createElement("img");
                    let title = document.createElement("div");
                    let name = document.createElement("p");
                    link.href = "#";
                    try{
                        img.src = x.show.image.medium;
                    } catch(e){
                        img.src = "https://www.pngfind.com/pngs/m/5-55256_television-clipart-classic-tv-classic-tv-icon-png.png";
                        img.style.width = "210px";
                        img.style.height = "295px"
                    }
                    name.innerText = x.show.name;
                    link.appendChild(img);
                    title.appendChild(name);
                    link.appendChild(title);
                    section.appendChild(link);
                    link.addEventListener("click", (e)=>{showDetails(x)});
                }
                
            })
        })
        .catch((e) => {
            console.log("error !", e);
        })
})