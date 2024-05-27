
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
    const isTitular = confirm("¿Es titular?")

    let players = getPlayers();
    
    const existentPlayer = players.find(p => p.name === name);
    if (existentPlayer) {
      throw new Error('El jugador está en el equipo');
    }

    players.push({ name, age, position, isTitular});
    
    savePlayers(players);

    await new Promise(resolve => setTimeout(resolve, 1000));

    alert('Jugador agregado correctamente.');

  } catch (error) {
    console.error('Error:', error.message);
  }
};

const listPlayers = async() => {
  let players = getPlayers();
  
  const playersTable = document.getElementById('players-table');

  players.forEach(player => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${player.name}</td>
        <td>${player.age}</td>
        <td>${player.position}</td>
        <td>${player.isTitular ? 'Si' : 'No'}</td>
        <td>
        <button class="btn btn-primary" onclick="assignPosition('${player.name}')"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></button>
        <button class="btn btn-success" onclick="changePlayer('${player.name}')"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m482-200 114-113-114-113-42 42 43 43q-28 1-54.5-9T381-381q-20-20-30.5-46T340-479q0-17 4.5-34t12.5-33l-44-44q-17 25-25 53t-8 57q0 38 15 75t44 66q29 29 65 43.5t74 15.5l-38 38 42 42Zm165-170q17-25 25-53t8-57q0-38-14.5-75.5T622-622q-29-29-65.5-43T482-679l38-39-42-42-114 113 114 113 42-42-44-44q27 0 55 10.5t48 30.5q20 20 30.5 46t10.5 52q0 17-4.5 34T603-414l44 44ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
        </button>
        </td>
    `;
    playersTable.appendChild(row);
});
};

const assignPosition = async(name) => {
  let players = getPlayers();
  let player = players.find(p => p.name === name);

  if (player) {
    const newPosition = prompt("¿En que posicion quiere poner al jugador?")
    player.position = newPosition;
    savePlayers(players);
    alert(`Posicion de ${player.name} actualizada a ${newPosition}`);
  } else {
    alert("Jugador no encontrado.");
  }
};

const changePlayer = async(name) => {
  let players = getPlayers();
  let player = players.find(p => p.name === name);

  if (player) {
    const otherPlayerName = prompt("Ingrese el nombre del jugador con el que desea intercambiar:");
    let otherPlayer = players.find(p => p.name === otherPlayerName);

    if (otherPlayer) {
      if (player.isTitular !== otherPlayer.isTitular) {
        
        let tempIsTitular = player.isTitular;
        player.isTitular = otherPlayer.isTitular;
        otherPlayer.isTitular = tempIsTitular;

        savePlayers(players);
        alert(`Titularidad intercambiada entre ${player.name} y ${otherPlayer.name}`);
        listPlayers(); 
      } else {
        alert("Ambos jugadores deben tener estados de titularidad opuestos para poder intercambiar.");
      }
    } else {
      alert("El segundo jugador no se encuentra en el equipo.");
    }
  } else {
    alert("Jugador no encontrado.");
  }
};

const main = async() => {
  try {
    await listPlayers()
  } catch (error) {
    console.error('Error', error);
  }
};

document.addEventListener('DOMContentLoaded', main);