const client = algoliasearch('TBGMQ0SV5L', 'b1fe63a6f280ea84a773f7ec1f679c7d');
const index = client.initIndex('dev_pokedex');

const search = () => {
    const query = document.getElementById('query').value;

    let hits = '';

    if (query.length !== 0) {
        index.search({
            query: query
        }, (err, content) => {
            for (const hit of content.hits) {
                const ename = `<span>${hit._highlightResult.ename.value}</span>`;
                let types = '';
                for (const type of hit._highlightResult.type) {
                    const cleanType = type.value.replace('<em>', '').replace('</em>', '');
                    types += `<span class="${cleanType.toLowerCase()}">${type.value}</span>`;
                }
                const imgNum = ("00" + hit.id).slice(-3);
                const pkmName = hit.ename.charAt(0).toUpperCase() + hit.ename.slice(1);
                const image = `<img src="/img/${imgNum}${pkmName}.png"/>`
                hits += `<a href="/pokemon/${imgNum}" target="_blank" class="hit">${image}${ename}<div class="types">${types}</div></a>`;
            }
            document.getElementById('hits').innerHTML = hits;
        });
    }
    document.getElementById('hits').innerHTML = hits;
};

const gens = () => {
    const generation = document.getElementById('gens').value;

    window.location.href = 'http://' + window.location.host + '/gen/' + generation;
}