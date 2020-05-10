import {
  controls
} from '../../constants/controls';

let playerOneAttackPressed = false;
let playerTwoAttackPressed = false;
let playerOneBlockPressed= false;
let playerTwoBlockPressed = false;

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    const leftHealthIndicator = document.getElementById('left-fighter-indicator');
    const rightHealthIndicator = document.getElementById('right-fighter-indicator');
    let firstFighterHealthPercents = 100;
    let secondFighterHealthPercents = 100;
    const leftIndicatorRate = 100 / firstFighter.health;
    const rightIndicatorRate = 100 / secondFighter.health;
    window.addEventListener('keydown', (event) => {
      if (event.code == controls.PlayerOneAttack) {
        if (!playerOneBlockPressed && !playerTwoBlockPressed && !playerOneAttackPressed) {
          playerOneAttackPressed = true;
          let damage = getDamage(firstFighter, secondFighter);
          secondFighter.health -= damage;
          // secondFighterHealthPercents = Math.round(secondFighter.health*rightIndicatorRate)>0?Math.round(secondFighter.health*rightIndicatorRate):0;
          secondFighterHealthPercents = Math.round(secondFighter.health*rightIndicatorRate);
          secondFighterHealthPercents = secondFighterHealthPercents>0?secondFighterHealthPercents:0;
          rightHealthIndicator.style.width = secondFighterHealthPercents + '%';
          if (secondFighter.health <= 0){
            resolve(firstFighter);
          }
          console.log('First fighter makes damage ' + damage);
          console.log('Second fighter health ' + secondFighter.health);
        }
      }
      if (event.code == controls.PlayerTwoAttack) {
        if (!playerOneBlockPressed && !playerTwoBlockPressed && !playerTwoAttackPressed) {
          playerTwoAttackPressed = true;
          let damage = getDamage(secondFighter, firstFighter);
          firstFighter.health -= damage;
          firstFighterHealthPercents = Math.round(firstFighter.health*leftIndicatorRate);
          firstFighterHealthPercents = firstFighterHealthPercents>0?firstFighterHealthPercents:0;
          leftHealthIndicator.style.width = firstFighterHealthPercents + '%';
          if (firstFighter.health <= 0){
            resolve(secondFighter);
          }
          console.log('Second fighter makes damage ' + damage);
          console.log('First fighter health ' + firstFighter.health);
        }
      }
      if (event.code == controls.PlayerOneBlock) {
        playerOneBlockPressed = true;
      }
      if (event.code == controls.PlayerTwoBlock) {
        playerTwoBlockPressed = true;
      }
    })
    window.addEventListener('keyup', (event) => {
      if (event.code == controls.PlayerOneAttack) {
        playerOneAttackPressed = false;
      }
      if (event.code == controls.PlayerTwoAttack) {
        playerTwoAttackPressed = false;
      }
      if (event.code == controls.PlayerOneBlock) {
        playerOneBlockPressed = false;
      }
      if (event.code == controls.PlayerTwoBlock) {
        playerTwoBlockPressed = false;
      }
    })

  });
}

export function getDamage(attacker, defender) {
  const hitPower = getHitPower(attacker);
  const blockPower = getBlockPower(defender);
  const damage = hitPower > blockPower ? hitPower - blockPower : 0;
  // debugger;
  return damage;
}

export function getHitPower(fighter) {
  const max = 2;
  const min = 1;
  const criticalHitChance = Math.random() * (max - min) + min;
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  const max = 2;
  const min = 1;
  const dodgeChance = Math.random() * (max - min) + min;
  return fighter.defense * dodgeChance;
}