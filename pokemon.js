const colors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
  };
  
  function getRandomPokemonId() {
    return Math.floor(Math.random() * 898) + 1; // Hay 898 Pokémon en la generación 8
  }
  
  function loadRandomPokemon() {
    const pokemonId = getRandomPokemonId();
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(response => response.json())
      .then(data => displayPokemon(data))
      .catch(error => console.error('Error fetching Pokémon:', error));
  }
  
  function displayPokemon(pokemon) {
    const nameElement = document.getElementById('name');
    const mainSpriteElement = document.getElementById('main-sprite');
    const typesElement = document.getElementById('types');
    const statsElement = document.getElementById('stats');
    const abilitiesElement = document.getElementById('abilities');
    const spriteGalleryElement = document.getElementById('sprite-gallery');
  
    nameElement.textContent = pokemon.name.toUpperCase();
  
    // Intentar usar el GIF animado, si no, usar el sprite normal
    const animatedSprite = pokemon.sprites.versions['generation-v']['black-white'].animated.front_default;
    const defaultSprite = pokemon.sprites.front_default;
    mainSpriteElement.src = animatedSprite || defaultSprite;
    mainSpriteElement.alt = pokemon.name;
  
    typesElement.innerHTML = '';
    pokemon.types.forEach(typeInfo => {
      const typeElement = document.createElement('p');
      typeElement.textContent = typeInfo.type.name;
      typeElement.style.color = colors[typeInfo.type.name];
      typesElement.appendChild(typeElement);
    });
  
    statsElement.innerHTML = '';
    pokemon.stats.forEach(statInfo => {
      const statElement = document.createElement('p');
      statElement.textContent = `${statInfo.stat.name}: ${statInfo.base_stat}`;
      statsElement.appendChild(statElement);
    });
  
    abilitiesElement.innerHTML = '';
    pokemon.abilities.forEach(abilityInfo => {
      const abilityElement = document.createElement('p');
      abilityElement.textContent = abilityInfo.ability.name;
      abilitiesElement.appendChild(abilityElement);
    });
  
    // Mostrar todas las imágenes del Pokémon
    spriteGalleryElement.innerHTML = '';
    const spriteKeys = [
      'front_default', 'back_default', 'front_shiny', 'back_shiny',
      'front_female', 'back_female', 'front_shiny_female', 'back_shiny_female'
    ];
    spriteKeys.forEach(key => {
      const spriteUrl = pokemon.sprites[key];
      if (spriteUrl) {
        const imgElement = document.createElement('img');
        imgElement.src = spriteUrl;
        imgElement.alt = `${pokemon.name} ${key}`;
        spriteGalleryElement.appendChild(imgElement);
      }
    });
  }
  
  // Cargar un Pokémon aleatorio al cargar la página
  document.addEventListener('DOMContentLoaded', loadRandomPokemon);
  