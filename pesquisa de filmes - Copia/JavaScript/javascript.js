const form = document.querySelector("#formBusca");
const container = document.querySelector("#container");
const mensagem = document.querySelector("#mensagem");

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const busca = document.querySelector("#busca").value;

    if(busca === ""){
        mensagem.textContent = "Por favor, insira um filme ou série para buscar.";
        return;
    }

    else if (busca ===" "){
        mensagem.textContent = "Por favor, insira um filme ou série para buscar.";
        return;
    }

    try {
        mensagem.textContent = "Buscando resultados para: " + busca + "...";

        const resposta = await fetch("https://api.tvmaze.com/search/shows?q=" + busca);
        const infos = await resposta.json();

        mensagem.textContent = "Resultados para: " + busca;
        cardsfilmes(infos);
    } catch (falha) {
        console.error("Erro ao buscar dados:", falha);
        mensagem.textContent = "Erro ao buscar dados. Por favor, tente novamente.";
    }
});

function cardsfilmes(infos) {
    container.innerHTML = "";

    if (infos.length === 0) {
        mensagem.textContent = "Nenhum resultado encontrado para a busca: " + document.querySelector("#busca").value;
        return;
    }

    infos.forEach(function (dados) {
        const filme_serie = dados.show;
        const imagens = filme_serie.image ? filme_serie.image.medium : "https://via.placeholder.com/200x280?text=Sem+imagem";
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "300px";

        card.innerHTML = `
            <img src="${imagens}" alt="${filme_serie.name}">
            <div class="card-body">
                <h3 class="card-title">${filme_serie.name}</h3>
                <p class="card-text">${filme_serie.summary ? filme_serie.summary : "Sem descrição disponível."}</p>
            </div>
        `;
        container.appendChild(card);
    });

}
