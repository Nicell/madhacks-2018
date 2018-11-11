const client = algoliasearch('TBGMQ0SV5L', 'b1fe63a6f280ea84a773f7ec1f679c7d');
const index = client.initIndex('dev_pokedex');

const id = location.pathname.split('/').pop();

const gens = () => {
    const generation = document.getElementById('gens').value;

    window.location.href = 'http://' + window.location.host + '/gen/' + generation;
}