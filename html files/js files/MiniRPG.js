let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let fireBall = 0;
let answer = 0; // for the two functions that needed them. 


const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
goldText.innerText = gold; // Wanted both texts to show at all times really
healthText.innerText = health;
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 },
  { name: 'great sword', power: 200},
  { name: 'great war hammer', power: 300} // add more weapons to fight the big dragon
];
const monsters = [
  {
    name: "Slime",
    level: 2,
    health: 30
  },
  {
    name: "Goblin", //Added a goblin to fight in the middle of the slime and fanged beast //
    level: 5,
    health: 50
  },
  {
    name: "Fanged Beast",
    level: 10,
    health: 80
  },
  {
    name: "Baby Dragon",
    level: 20,
    health: 500
  },
  {
    name: "Mother Dragon", //Added a harder dragon and upped the health and level //
    level: 40,
    health: 2000
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight baby dragon", "Fight Mother Dragon", "Pay to win"], //ADDED
    "button functions": [goStore, goCave, fightDragon, fightMotherDragon, payToWin],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (20 gold)", "Buy weapon (50 gold)", "Buy fireball(100 gold)", "Go to town square", "Pay to win"], // add more items to the store to do better things (1 special item)
    "button functions": [buyHealth, buyWeapon, buyFireball, goTown, payToWin],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight Slime", "Fight Goblin", "Fight Fanged Beast", "Go to town square", "Pay to win"], // Finish functions for the locations and pay to win
    "button functions": [fightSlime, fightGoblin, fightBeast, goTown, payToWin],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run", "Use Fireball", "Pay to Win"],
    "button functions": [attack, dodge, goTown, castFireball, payToWin], // add some more fighting features like fireball spell? Drink a healing pot or so
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square", "Go back to the town now!", "Hurry up!"],
    "button functions": [goTown, goTown, easterEgg, goTown, goTown], // need some more time to think about this 
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?" ,"You suck", "By the way"],
    "button functions": [restart, restart, restart, restart, restart], // Added some quotes
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?", "You're a legend", "All hail the dragon Killer!"], 
    "button functions": [restart, restart, restart, restart, restart], // Added some hurrays
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?", "Double or nothing? (2)", "Double or nothing? (8)"],
    "button functions": [pickTwo, pickEight, goTown, pickTwoDouble, pickEightDouble], //Added some extra modes to chose 
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
button4.onclick = fightMotherDragon;
button5.onclick = payToWin; //ADDED

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button4.innerText = location["button text"][3];
  button5.innerText = location["button text"][4];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1]; // ADDED buttons and text that was needed 
  button3.onclick = location["button functions"][2];
  button4.onclick = location["button functions"][3];
  button5.onclick = location["button functions"][4];
  text.innerHTML = location.text;
}

//IMAGES FOR EACH LOCATION//
function setImage(imageSrc) {
const imgBackDiv = document.querySelector('.imgBack');

imgBackDiv.innerHTML = " "; 

const img = document.createElement('img');
img.src = imageSrc;
imgBackDiv.appendChild(img);
}
function updateImg(imageSrc) {
  setImage(imageSrc);
}

function updateAndSetImage(location, imageSrc) {
  update(location);
  setImage(imageSrc);
}

function goTown() {
  updateAndSetImage(locations[0], 'TownImg.png');
}

function goStore() {
  updateAndSetImage(locations[1], 'StoreImg.png');
}

function goCave() {
  updateAndSetImage(locations[2], 'CaveImg.png');
}

function buyHealth() {
  if (gold >= 20) {
    gold -= 20;
    health += 25;
    goldText.innerText = gold; //changed a few variables 
    healthText.innerText = health;
    updateImg('HealthImg.png')
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }

}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 50) {
      gold -= 50;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
      updateImg('WeaponImg.png');
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    } // added some text changed also 
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 25 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 25;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function buyFireball() {
  if (fireBall < 3) {
    if (gold >= 100) {
      gold -= 100;
      goldText.innerText = gold;
      fireBall ++; //for the firescolls limit. 
      console.log(fireBall)
      updateImg('FireballImg.png');
    }

  } else {
    text.innerText = "You do not have enough gold to purchase this scroll!";
    text.innerText = "You can only hold " + fireBall + " scrolls."
  }
}

function fightSlime() { 
  fighting = 0;
  goFight();
  updateImg('SlimeImg.png');
}

function fightGoblin() {
  fighting = 1;
  goFight();
  updateImg('GoblinImg.png');
}

function fightBeast() {
  fighting = 2;
  goFight();
  updateImg('BeastImg.png');
}   //assigned to the right monsters and text and functions 

function fightDragon() {
  fighting = 3;
  goFight();
  updateImg('BabyDragonImg.png');
}

function fightMotherDragon() {
  fighting = 4;
  goFight();
  updateImg('MotherDragon.png');
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
    updateImg('AttackImg.png');
  } else {
    text.innerText += " You miss.";
    updateImg('MissImg.png');
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 4) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function castFireball() {
  if (fireBall > 0) {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack using your fire spell dealing massive damage!"
  fireBall --; 
  health -= getMonsterAttackValue(monsters[fighting].level);

  if (isMonsterHit()) {
    monsterHealth -= 100;
    monsterHealthText.innerText = monsterHealth;
    updateImg('FireBallImg.png');
  } else {
    text.innerText = "You missed."
    updateImg('MissImg.png');
  }                                                                           //Made a whole new fucntion just to do 100dmg flat, nice. 
  
  if (health <= 0) {
    lose();

  } else if (monsterHealth <= 0) {

    if (fighting === 4) {
      winGame();
    } 
    else {
    defeatMonster();
    }
  }

  } else {
  text.innerText = "You do not have any Fireball scrolls!"
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 3);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
  imgCreatureDead;
}

function lose() {
  updateAndSetImage(locations[5], 'LoseImg.png');
}

function winGame() {
  updateAndSetImage(locations[6], 'WinImg.png');
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function payToWin() {
 if (gold >= 5000) {
  update(locations[6]);
 } else {
  text.innerText = "You do not have enough gold!"; //Works for those losersssss
 }
  console.log(payToWin)
}

function easterEgg() {
  updateAndSetImage(locations[7], 'EasterEggImg.png');
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 50 gold!";
    gold += 50;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 20 health!"; //applied my answer solution here also 
    health -= 20;
    healthText.innerText = health;
    if (answer > 2) {
      goTown();}
    if (health <= 0) {
      lose();
    }
  }
}

function pickTwoDouble() {
pickTwo(2);
}
function pickEightDouble() {
  pickTwo(8);
}
function pickTwo(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 100 gold!";
    gold += 100;
    goldText.innerText = gold;
    answer++;
  } else {
    answer++;
    text.innerText += "Wrong! You lose 40 health!";
    health -= 40;
    healthText.innerText = health;
    if (answer > 2) {
      goTown();} 

      else if (health <= 0) { //added issue with answer being able to be spammed so I now just let them do it twice no biggie. 
      lose();
    }
  }
}
