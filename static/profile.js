const client = algoliasearch('TBGMQ0SV5L', 'b1fe63a6f280ea84a773f7ec1f679c7d');
const index = client.initIndex('dev_pokedex');

const id = location.pathname.split('/').pop();

index.search({
    query: id
}, (err, content) => {
    console.log(content.hits[0]);
});