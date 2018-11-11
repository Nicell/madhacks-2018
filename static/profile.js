const client = algoliasearch('TBGMQ0SV5L', 'b1fe63a6f280ea84a773f7ec1f679c7d');
const index = client.initIndex('dev_pokedex');

const id = location.pathname.split('/').pop();

index.search({
    query: id
}, (err, content) => {
    const pokemon = content.hits[0];
    const pkmName = pokemon.ename.charAt(0).toUpperCase() + pokemon.ename.slice(1);

    document.getElementById("favicon").setAttribute("href", `/spr/${id}${pkmName}.png`)
    let types = "";
    for (const type of pokemon.type) {
        types += `<span class="${type}">${type}</span>`;
    }

    const template = `
        <div class="identity"> 
            <img src="/img/${id}${pkmName}.png"/>
            <span>${pkmName}</span>
            <div class="types">${types}</div>
        </div>

        <div class="stats">

        </div>
    `;

    document.getElementById("profile").innerHTML = template;
});

