const fs = require('fs');

const pokedex = JSON.parse(fs.readFileSync('../Pokemon-DB/pokedex.json', 'utf8'));
const types = JSON.parse(fs.readFileSync('../Pokemon-DB/types.json', 'utf8'));
const skills = JSON.parse(fs.readFileSync('../Pokemon-DB/skills.json', 'utf8'));

const pokedexCombined = [];
for (const pokemon of pokedex) {
    let newDef = {...pokemon};
    newDef.idInt = parseInt(newDef.id);
    newDef.type = [];
    newDef.skills = {};

    for (const type of pokemon.type) {
        for (const typeDef of types) {
            if (typeDef.cname === type) {
                newDef.type.push(typeDef.ename);
            }
        }
    }

    for (const skillCategory of Object.keys(pokemon.skills)) {
        newDef.skills[skillCategory] = [];

        for (const skill of pokemon.skills[skillCategory]) {
            for (const skillDef of skills) {
                if (skill == skillDef.id) {
                    newSkillDef = {...skillDef};
                    if (newSkillDef.category == '\u7269\u7406') {
                        newSkillDef.category = 'physical';
                    } else if (newSkillDef.category == '\u7279\u6b8a') {
                        newSkillDef.category = 'special';
                    } else if (newSkillDef.category == '\u53d8\u5316') {
                        newSkillDef.category = 'status';
                    }

                    for (const typeDef of types) {
                        if (typeDef.cname === newSkillDef.type) {
                            newSkillDef.type = typeDef.ename;
                        }
                    }

                    newDef.skills[skillCategory].push(newSkillDef);
                }
            }
        }
    }

    pokedexCombined.push(newDef);
}

fs.writeFileSync('./db.json', JSON.stringify(pokedexCombined));