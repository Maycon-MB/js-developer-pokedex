// main.js
import Pokemon from './pokemon-model.js';
import pokeApi from './poke-api.js';

const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const MAX_RECORDS = 151;
const LIMIT = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    // ... (seu código existente)
}

async function loadPokemonItems(offset, limit) {
    try {
        const pokemons = await pokeApi.getPokemons(offset, limit);
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    } catch (error) {
        console.error('Erro ao carregar os Pokémon:', error);
    }
}

loadPokemonItems(offset, LIMIT);

loadMoreButton.addEventListener('click', handleLoadMore);

function handleLoadMore() {
    loadMoreButton.removeEventListener('click', handleLoadMore);
    offset += LIMIT;
    const qtdRecordsWithNextPage = offset + LIMIT;

    if (qtdRecordsWithNextPage >= MAX_RECORDS) {
        const newLimit = MAX_RECORDS - offset;
        loadPokemonItems(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItems(offset, LIMIT);
    }
}
