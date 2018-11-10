const client = algoliasearch('TBGMQ0SV5L', 'b1fe63a6f280ea84a773f7ec1f679c7d');
const index = client.initIndex('dev_pokedex');

const search = () => {
    const query = document.getElementById('query').value;

    let hits = '';

    if (query.length !== 0) {
        index.search({
            query: query
        }, (err, content) => {
            console.log(content);
            for (const hit of content.hits) {
                const ename = hit._highlightResult.ename ? hit._highlightResult.ename.value : hit.ename;
                hits += `<span>${ename}</span>`;
            }
            document.getElementById('hits').innerHTML = hits;
        });
    }
    document.getElementById('hits').innerHTML = hits;
};