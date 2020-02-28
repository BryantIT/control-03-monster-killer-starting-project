const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK'
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'

const enteredValue = prompt('Max life for you and the monster', '100');

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0){
  chosenMaxLife = 100;
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset(){
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound(){
  const initialPlayerHealth = currentPlayerHealth
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && hasBonusLife){
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('Bonus life saved you!')
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0){
    alert('You Won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0){
    alert('You Lost!');
  } else if (currentPlayerHealth <= 0 && currentPlayerHealth <= 0){
    alert('You have a draw!');
  }

  if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0){
    reset()
  }
}


function attackMonster(mode){
  let maxDamage;
  if (mode === MODE_ATTACK){
    maxDamage = ATTACK_VALUE;
  } else if (mode === MODE_STRONG_ATTACK){
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
}

function attackHandler(){
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler(){
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler(){
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE){
    alert('You can not heal for more than your max health');
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }

  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  endRound();
}



attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler)
healBtn.addEventListener('click', healPlayerHandler)
