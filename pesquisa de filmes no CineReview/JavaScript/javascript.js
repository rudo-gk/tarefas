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
        const imagens = filme_serie.image ? filme_serie.image.medium : "https://placehold.co/200x280?text=Sem+imagem";
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "300px";

            const imgcard = document.createElement("img");
            imgcard.src = imagens;
            imgcard.alt = filme_serie.name;
            card.appendChild(imgcard);


            const titulo = document.createElement("h2");
            titulo.innerHTML = filme_serie.name;
            card.appendChild(titulo);

            const score = document.createElement("p");
            score.innerHTML = filme_serie.rating.average;
            card.appendChild(score);
            score.textContent = "Score: " + (filme_serie.rating.average ?? "não possui imagens");

           const descricao = document.createElement("p");
           descricao.innerHTML = filme_serie.summary;
           card.appendChild(descricao);

        container.appendChild(card);
    });

    document.querySelector("#busca").value = "";

}