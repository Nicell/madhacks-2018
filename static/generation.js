const client = algoliasearch('TBGMQ0SV5L', 'b1fe63a6f280ea84a773f7ec1f679c7d');
const index = client.initIndex('dev_pokedex');

const id = location.pathname.split('/').pop();

const searchParameters = {
    1: [
        'idInt <= 151'
    ],
    2: [
        'idInt >= 152',
        'idInt <= 251'
    ],
    3: [
        'idInt >= 252',
        'idInt <= 386'
    ],
    4: [
        'idInt >= 387',
        'idInt <= 493'
    ],
    5: [
        'idInt >= 494',
        'idInt <= 649'
    ],
    6: [
        'idInt >= 650'
    ],
    7: []
}

const gens = () => {
    const generation = document.getElementById('gens').value;

    window.location.href = 'http://' + window.location.host + '/gen/' + generation;
}

index.search({
    query: '',
    numericFilters: searchParameters[id],
    hitsPerPage: 800
}, (err, content) => {
    let hits = "";
    for (const hit of content.hits) {
        const ename = `<span>${hit._highlightResult.ename.value}</span>`;
        let types = '';
        for (const type of hit.type) {
            types += `<span class="${type}">${type}</span>`;
        }
        const imgNum = ("00" + hit.id).slice(-3);
        const pkmName = (hit.ename.charAt(0).toUpperCase() + hit.ename.slice(1)).replace('é', 'e').replace('é', 'e').replace('♀', '').replace('♂', '').replace('\'', '').replace(' ', '_').replace('.', '');
        const image = `<img src="/img/${imgNum}${pkmName}.png"/>`
        hits += `<a href="/pokemon/${imgNum}" target="_blank" class="hit">${image}${ename}<div class="types">${types}</div></a>`;
    }
    document.getElementById('generation').innerHTML = hits;
});
