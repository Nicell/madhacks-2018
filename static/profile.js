const client = algoliasearch('TBGMQ0SV5L', 'b1fe63a6f280ea84a773f7ec1f679c7d');
const index = client.initIndex('dev_pokedex');

const id = location.pathname.split('/').pop();

index.search({
    query: id
}, (err, content) => {
    const pokemon = content.hits[0];
    const pkmName = (pokemon.ename.charAt(0).toUpperCase() + pokemon.ename.slice(1)).replace('é', 'e').replace('é', 'e').replace('♀', '').replace('♂', '').replace('\'', '').replace(' ', '_').replace('.', '');

    document.getElementById("favicon").setAttribute("href", `/spr/${id}${pkmName}.png`)
    let types = "";
    for (const type of pokemon.type) {
        types += `<span class="${type}">${type}</span>`;
    }

    const skills = {}

    for (const skillCategory of Object.keys(pokemon.skills)) {
        skills[skillCategory] = '';

        for (const skillDef of pokemon.skills[skillCategory]) {
            skills[skillCategory] += `
                <tr>
                    <td>${skillDef.ename}</td>
                    ${skillCategory === 'tm' ? `<td>${skillDef.tm}</td>` : ''}
                    <td>${skillDef.category.charAt(0).toUpperCase() + skillDef.category.slice(1)}</td>
                    <td>${skillDef.power ? skillDef.power : '-'}</td>
                    <td>${skillDef.accuracy ? skillDef.accuracy : '-'}</td>
                    <td>${skillDef.pp}</td>
                </tr>
            `
        }
    }

    const template = `
        <div class="identity"> 
            <img src="/img/${id}${pkmName}.png"/>
            <span>${pkmName}</span>
            <div class="types">${types}</div>
        </div>

        <div class="stats">
            <div class="section">
                <span>Attack: ${pokemon.base.Attack}</span>
                <span>Defense: ${pokemon.base.Defense}</span>
            </div>
            <div class="section">
                <span>Sp. Attack: ${pokemon.base["Sp.Atk"]}</span>
                <span>Sp. Defense: ${pokemon.base["Sp.Def"]}</span>
            </div>
            <div class="section">
                <span>Speed: ${pokemon.base.Speed}</span>
                <span>HP: ${pokemon.base.HP}</span>
            </div>
        </div>
        <div class="moves">
            ${pokemon.skills.tm ? `
                <div>
                    <span>TM</span>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>TM#</th>
                                <th>Category</th>
                                <th>Power</th>
                                <th>Accuracy</th>
                                <th>PP</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${skills.tm}
                        </tbody>
                    </table>
                </div>
            ` : ''}
            ${pokemon.skills.transfer ? `
                <div>
                    <span>Transfer</span>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Power</th>
                                <th>Accuracy</th>
                                <th>PP</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${skills.transfer}
                        </tbody>
                    </table>
                </div>
            ` : ''}
            ${pokemon.skills.level_up ? `
                <div>
                    <span>Level Up</span>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Power</th>
                                <th>Accuracy</th>
                                <th>PP</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${skills.level_up}
                        </tbody>
                    </table>
                </div>
            ` : ''}
            ${pokemon.skills.egg ? `
                <div>
                    <span>Egg</span>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Power</th>
                                <th>Accuracy</th>
                                <th>PP</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${skills.egg}
                        </tbody>
                    </table>
                </div>
            ` : ''}
        </div>
    `;

    document.getElementById("profile").innerHTML = template;
});

