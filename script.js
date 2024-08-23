document.addEventListener('DOMContentLoaded', function() {
    // Exibir alerta de boas-vindas
    alert('Seja bem-vindo, treinador Pokémon!');

    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', function() {
        const pokemonName = document.getElementById('search-input').value.toLowerCase();
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokémon não encontrado.');
                }
                return response.json();
            })
            .then(data => {
                const pokemonInfo = document.getElementById('pokemon-info');
                pokemonInfo.innerHTML = `
                    <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                    <p><strong>ID:</strong> ${data.id}</p>
                    <p><strong>Altura:</strong> ${data.height} decímetros</p>
                    <p><strong>Peso:</strong> ${data.weight} hectogramas</p>
                    <p><strong>Experiência Base:</strong> ${data.base_experience}</p>
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                `;
            })
            .catch(error => {
                const pokemonInfo = document.getElementById('pokemon-info');
                pokemonInfo.innerHTML = `<p>${error.message}</p>`;
                console.error('Erro ao buscar os dados do Pokémon:', error);
            });
    });
});
