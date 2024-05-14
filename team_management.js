
// Obtener a los jugadores del local storage
const getPlayers = () => {
  const players = localStorage.getItem('players');
  return players ? JSON.parse(players) : [];
};

// Guardar a los jugadores del local storage
const savePlayers = (players) => {
  localStorage.setItem('players', JSON.stringify(players));
};

// Agregar jugador
const addPlayer = async() => {
  try {
    const name = prompt("Ingrese el nombre del jugador:");
    const age = parseInt(prompt("Ingrese la edad del jugador:"));
    const position = prompt("Ingrese la posición del jugador:");

    let players = getPlayers();
    
    const existentPlayer = players.find(p => p.name === name);
    if (existentPlayer) {
      throw new Error('El jugador está en el equipo');
    }

    players.push({ name, age, position});
    
    savePlayers(players);

    await new Promise(resolve => setTimeout(resolve, 1000));

    alert('Jugador agregado correctamente.');

  } catch (error) {
    console.error('Error:', error.message);
  }
};

const listPlayers = async() => {
  
};

const asignPosition = async() => {
  
};

const changePlayer = async() => {

};

const main = async() => {
  try {

  } catch (error) {
    console.error('Error', error);
  }
};

main();