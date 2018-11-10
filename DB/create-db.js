const fs = require('fs');

const pokedex = JSON.parse(fs.readFileSync('../Pokemon-DB/pokedex.json', 'utf8'));
const types = JSON.parse(fs.readFileSync('../Pokemon-DB/types.json', 'utf8'));
const pokedexCombined = [];
for (const pokemon of pokedex) {
    let newDef = {...pokemon};
    newDef.type = [];
    for (const type of pokemon.type) {
        for (const typeDef of types) {
            if (typeDef.cname === type) {
                newDef.type.push(typeDef.ename);
            }
        }
    }

    pokedexCombined.push(newDef);
}

fs.writeFileSync('./db.json', JSON.stringify(pokedexCombined));