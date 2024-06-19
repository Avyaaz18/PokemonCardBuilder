const btn = document.querySelector(".srch");
const bar = document.querySelector(".search-bar");
const card = document.querySelector(".card");

async function validInput(input){
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${input.toLowerCase()}`);
    try{
       if(response.ok){
        const data = await response.json();
        generateCard(data);
       }
    }
    catch(err){
        console.log("API Error:",err);
    }
 
}

const typeColor = {
    bug: "#A8B820",     
    dragon: "#8b56fe",    
    electric: "#fed330", 
    fairy: "#f87ea7",     
    fighting: "#e8121a",  
    fire: "#f0932b",      
    flying: "#dce5ea",  
    grass: "#78C850",     
    ground: "#604733",    
    ghost: "#705898",     
    ice: "#98D8D8",       
    normal: "#ccc9aa",   
    poison: "#A040A0",    
    psychic: "#ed0f64",  
    rock: "#efe294",      
    water: "#6890F0",     
    steel:"#095865",
    dark:"#4f4f4f",
};


function generateCard(data){
    const pokeName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const hp = data.stats[0].base_stat;
    const speed = data.stats[5].base_stat;
    const attack = data.stats[1].base_stat;
    const defense = data.stats[2].base_stat;
    const src = data.sprites.front_default;
    const shiny_src = data.sprites.front_shiny;

    const theme = typeColor[data.types[0].type.name];
    card.innerHTML = `
            <p class="hp">
          <span>HP</span>
            ${hp}
        </p>
        <div class = "img">
          <img src="${src}" alt="${pokeName}" data-normal="${src}" data-shiny="${shiny_src}" />
        </div>
        <h2 class="poke-name">${pokeName}</h2>
        <div class="types">
         
        </div>
        <div class="stats">
          <div class="stats1">
            <h3>${attack}</h3>
            <p>Attack</p>
          </div>
          <div class="stats2">
            <h3>${defense}</h3>
            <p>Defense</p>
          </div>
          <div class="stats3">
            <h3>${speed}</h3>
            <p>Speed</p>
          </div>
        </div>
    `
    typeNames(data.types);
    styleCard(theme);
    createShinyButton(theme);
}

let typeNames= (types)=>{
        types.forEach(item => {
            let span = document.createElement("SPAN");
            span.textContent = item.type.name;
            document.querySelector(".types").appendChild(span);
        });
};

let styleCard = (color) => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
    card.querySelectorAll(".types span").forEach((typeColor) => {
      typeColor.style.backgroundColor = color;
    });
};


btn.addEventListener("click", () => {
    const search = document.querySelector(".input-text").value.trim();
    if (search) {
        validInput(search);
    } else {
        displayError("Please enter a valid Pokémon name.");
    }
});

function displayError(message) {
    alert(message); 
}

function createShinyButton(theme) {
    let shinyBtn = document.querySelector(".shiny-btn");
    if (shinyBtn) {
        shinyBtn.remove();
    }

    shinyBtn = document.createElement("button");
    shinyBtn.classList.add("shiny-btn");
    shinyBtn.textContent = "Shiny form";
    card.appendChild(shinyBtn);  

    shinyBtn.addEventListener("click", () => {
        const image = document.querySelector(".img img");
        const currentSrc = image.getAttribute("src");
        const normalSrc = image.getAttribute("data-normal");
        const shinySrc = image.getAttribute("data-shiny");

        if (currentSrc === normalSrc) {
            image.setAttribute("src", shinySrc);
            shinyBtn.textContent = "Normal Form";
        } else {
            image.setAttribute("src", normalSrc);
            shinyBtn.textContent = "Shiny Form";
        }
    });
}



