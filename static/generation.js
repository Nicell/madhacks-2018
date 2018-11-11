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
    ]
}

const gens = () => {
    const generation = document.getElementById('gens').value;

    window.location.href = 'http://' + window.location.host + '/gen/' + generation;
}

index.search({
    query: '',
    numericFilters: searchParameters[id],
    hitsPerPage: 200
}, (err, content) => {
    console.log(content.hits);
});
