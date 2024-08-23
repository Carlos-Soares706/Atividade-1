document.addEventListener('DOMContentLoaded', () => {
    alert('Seja bem-vindo, Treinador Pokémon!');

    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const pokemonInfo = document.getElementById('pokemon-info');
    const pokemonList = document.getElementById('pokemon-list');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Função para buscar um Pokémon específico
    searchButton.addEventListener('click', () => {
        const pokemonName = searchInput.value.toLowerCase();
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(response => response.json())
            .then(data => {
                pokemonInfo.innerHTML = `
                    <h2>${data.name}</h2>
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <p>ID: ${data.id}</p>
                    <p>Tipo: ${data.types.map(type => type.type.name).join(', ')}</p>
                `;
            })
            .catch(error => {
                pokemonInfo.innerHTML = `<p>Pokémon não encontrado. Tente novamente.</p>`;
            });
    });

    // Função para buscar Pokémon por tipo
    function fetchPokemonByType(type) {
        pokemonList.innerHTML = ''; // Limpar lista anterior
        fetch(`https://pokeapi.co/api/v2/type/${type}`)
            .then(response => response.json())
            .then(data => {
                data.pokemon.forEach(pokemonEntry => {
                    const pokemonName = pokemonEntry.pokemon.name;

                    // Buscar informações detalhadas sobre cada Pokémon
                    fetch(pokemonEntry.pokemon.url)
                        .then(response => response.json())
                        .then(pokemonData => {
                            const pokemonElement = document.createElement('div');
                            pokemonElement.classList.add('pokemon-card');
                            pokemonElement.innerHTML = `
                                <h3>${pokemonData.name}</h3>
                                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                                <p>ID: ${pokemonData.id}</p>
                                <p>Altura: ${pokemonData.height / 10} m</p>
                                <p>Peso: ${pokemonData.weight / 10} kg</p>
                            `;
                            pokemonList.appendChild(pokemonElement);
                        });
                });
            })
            .catch(error => console.error('Erro ao buscar Pokémon do tipo:', error));
    }

    // Adicionar eventos de clique aos links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const type = link.getAttribute('data-type');
            fetchPokemonByType(type);
        });
    });
});
