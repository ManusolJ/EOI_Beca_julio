const imagenes = [
  "resources/Squirtle.jpg",
  "resources/Pikachu.jpg",
  "resources/Eevee.jpg",
  "resources/Togepi.jpg",
  "resources/Jigglypuff.jpg",
  "resources/Bulbasaur.jpg",
  "resources/Psyduck.jpg",
  "resources/Charmander.jpg",
];

const cards = Array.from(document.getElementsByClassName("card"));

const image_map = new Map();

const player_1 = {
  name: "",
  score: 0,
  iconContainerRow: 0,
  iconColumn: 0,
};

const player_2 = {
  name: "",
  score: 0,
  iconContainerRow: 0,
  iconColumn: 0,
};

let card_1 = null;

let card_2 = null;

let lock = false;

let player_turn = 2;

let card_count = 0;

function storeCardValue(idCard) {
  const card = document.getElementById(idCard);

  if (lock || card.classList.contains("rotateEffect")) {
    return;
  }

  card_1 == null ? card_1 = card : card_2 = card;

  flipCard(card);

  if (card_2 != null) {
    lock = true;
    checkCards();
  }
}

function checkCards() {
  if (card_1.value == card_2.value) {
    setIconOnHit(card_1.value);
    setScore();
  } else {
    setTimeout(flipBack, 1500);
    setTimeout(setTurn, 1600);
  }
  setTimeout(reset, 1600);
}

function setScore() {
  card_count++;

  let player_score = player_turn == 1 ? player_1 : player_2;

  let current_player_score_display = player_turn == 1 ? "score_display_player_1" : "score_display_player_2";

  player_score.score++;

  document.getElementById(current_player_score_display).value = player_score.score;

  if (card_count == 8) {
    lock = true;
    setTimeout(gameEnd, 1500);
  }
}

function resetScore() {
  player_1.iconColumn = 0;
  player_1.iconContainerRow = 0;
  player_2.iconColumn = 0;
  player_2.iconContainerRow = 0;
  document.getElementById("score_display_player_1").value = 0;
  document.getElementById("score_display_player_2").value = 0;
  Array.from(document.getElementsByClassName("board")).forEach((board) => {
    Array.from(board.children).forEach((row) => {
      Array.from(row.children).forEach((column) => {
        column.style.backgroundImage = "";
      });
    });
  });
}

function setIconOnHit(card_value) {
  let current_container = player_turn == 1 ? "icon_container_1" : "icon_container_2";
  console.log(current_container)

  let current_player = player_turn == 1 ? player_1 : player_2;
  console.log(current_player)

  document.getElementsByClassName(current_container)[0].children[current_player.iconContainerRow].children[current_player.iconColumn].style.backgroundImage = `url(${card_value})`;
  console.log(document.getElementsByClassName(current_container)[0].children[current_player.iconContainerRow].children[current_player.iconColumn])

  current_player.iconColumn++;

  if (current_player.iconColumn == 3 && current_player.iconContainerRow == 0) {
    current_player.iconContainerRow = 1;
    current_player.iconColumn = 0;
  } else if (current_player.iconColumn == 3 && current_player.iconContainerRow == 1) {
    current_player.iconContainerRow = 2;
    current_player.iconColumn = 0;
  }
}

function gameEnd() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.8 },
  });

  winner_name = player_1.score > player_2.score ? player_1.name : player_2.name;

  let winner = "Felicidades! Has ganado " + winner_name;

  if (player_1.score == player_2.score) {
    winner = "Empate! No ha ganado nadie! Tampoco ha perdido nadie!";
  }

  document.getElementById("victory_text").innerHTML = winner;

  showDialogue("modal_victory");
}

function setName() {
  player_1.name = document.getElementById("player_name_1_input").value;
  player_2.name = document.getElementById("player_name_2_input").value;
  if (player_1.name == "" || player_2.name == "") {
    return;
  }
  dismissDialogue("modal_prompt");
  document.getElementById("player_name_1").value = player_1.name;
  document.getElementById("player_name_2").value = player_2.name;
  setTurn();
}

function deleteInput() {
  document.getElementById("player_name_1_input").value = "";
  document.getElementById("player_name_2_input").value = "";
  document.getElementById("player_name_1_input").focus();
}

function setTurn() {
  player_turn = player_turn == 1 ? 2 : 1;
  current_player = player_turn == 1 ? player_1 : player_2;
  document.getElementById("turn_display").value = "Turno de " + current_player.name + "!";
  document.getElementById("turn_display").style.backgroundColor = current_player == player_1 ? "#A8DADC" : "#E76F51";
}

function assignImages() {
  for (let i = 0; i < imagenes.length; i++) {
    image_map.set(imagenes[i], 0);
  }

  cards.forEach((card) => {
    let index = randomGenerator();

    while (image_map.get(imagenes[index]) == 2) {
      index = randomGenerator();
    }

    card.children[0].style.backgroundImage = `url(${imagenes[index]})`;
    card.value = imagenes[index];

    let cont = image_map.get(imagenes[index]) + 1;

    image_map.set(imagenes[index], cont);
  });
}

function reset() {
  card_1 = null;
  card_2 = null;
  lock = false;
}

function newGame() {
  player_turn = 2;
  reset();
  flipAll();
  resetScore();
  image_map.clear();
  assignImages();
  showDialogue("modal_prompt");
}

function flipCard(card) {
  document.getElementById(card.id).classList.toggle("rotateEffect");
  document.getElementById(card.id).children[0].classList.toggle("opacity-100");
}

function flipBack() {
  card_1.classList.toggle("rotateEffect");
  card_1.children[0].classList.toggle("opacity-100");
  card_2.classList.toggle("rotateEffect");
  card_2.children[0].classList.toggle("opacity-100");
}

function flipAll() {
  cards.forEach((card) => {
    if (card.classList.contains("rotateEffect")) {
      card.classList.toggle("rotateEffect");
      card.children[0].classList.toggle("opacity-100");
    }
  });
}

function showDialogue(param) {
  document.getElementById(param).classList.add("show");
  document.getElementById(param).style.display = "block";
}

function dismissDialogue(param) {
  document.getElementById(param).classList.remove("show");
  document.getElementById(param).style.display = "none";
}

function randomGenerator() {
  return Math.floor(Math.random() * imagenes.length);
}