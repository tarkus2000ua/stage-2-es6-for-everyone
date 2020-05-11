import {
  controls
} from '../../constants/controls';

let playerOneAttackPressed = false;
let playerTwoAttackPressed = false;
let playerOneBlockPressed = false;
let playerTwoBlockPressed = false;
let playerOneCriticalHitKeys = [false, false, false];
let playerTwoCriticalHitKeys = [false, false, false];
let isCriticalHitPlayerOneDisabled = false;
let isCriticalHitPlayerTwoDisabled = false;

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    const leftHealthIndicator = document.getElementById('left-fighter-indicator');
    const rightHealthIndicator = document.getElementById('right-fighter-indicator');
    const leftIndicatorRate = 100 / firstFighter.health;
    const rightIndicatorRate = 100 / secondFighter.health;
    const playerOneCriticalHitDamage = 2 * firstFighter.attack;
    const playerTwoCriticalHitDamage = 2 * secondFighter.attack;

    window.addEventListener('keydown', (event) => {
      if (event.code == controls.PlayerOneAttack) {
        if (!playerOneBlockPressed && !playerTwoBlockPressed && !playerOneAttackPressed) {
          playerOneAttackPressed = true;
          let damage = getDamage(firstFighter, secondFighter);
          dealDamage(secondFighter, damage);
          redrawHealthIndicator(secondFighter, rightHealthIndicator, rightIndicatorRate);

          if (secondFighter.health <= 0) {
            resolve(firstFighter);
          }
        }
      }
      if (event.code == controls.PlayerTwoAttack) {
        if (!playerOneBlockPressed && !playerTwoBlockPressed && !playerTwoAttackPressed) {
          playerTwoAttackPressed = true;
          let damage = getDamage(secondFighter, firstFighter);
          dealDamage(firstFighter, damage);
          redrawHealthIndicator(firstFighter, leftHealthIndicator, leftIndicatorRate);

          if (firstFighter.health <= 0) {
            resolve(secondFighter);
          }
        }
      }
      if (event.code == controls.PlayerOneBlock) {
        playerOneBlockPressed = true;
      }
      if (event.code == controls.PlayerTwoBlock) {
        playerTwoBlockPressed = true;
      }

      refreshCriticalHitKeysStatus(event, controls.PlayerOneCriticalHitCombination, playerOneCriticalHitKeys);
      refreshCriticalHitKeysStatus(event, controls.PlayerTwoCriticalHitCombination, playerTwoCriticalHitKeys);

      if (isCriticalHit(playerOneCriticalHitKeys) && !isCriticalHitPlayerOneDisabled) {
        isCriticalHitPlayerOneDisabled = true;
        dealDamage(secondFighter, playerOneCriticalHitDamage);
        redrawHealthIndicator(secondFighter, rightHealthIndicator, rightIndicatorRate);
        if (secondFighter.health <= 0) {
          resolve(firstFighter);
        }
        setTimeout(() => (isCriticalHitPlayerOneDisabled = false), 10000);
      }

      if (isCriticalHit(playerTwoCriticalHitKeys) && !isCriticalHitPlayerTwoDisabled) {
        isCriticalHitPlayerTwoDisabled = true;
        dealDamage(firstFighter, playerTwoCriticalHitDamage);
        redrawHealthIndicator(firstFighter, leftHealthIndicator, leftIndicatorRate);
        if (firstFighter.health <= 0) {
          resolve(secondFighter);
        }
        setTimeout(() => (isCriticalHitPlayerTwoDisabled = false), 10000);
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

      refreshCriticalHitKeysStatus(event, controls.PlayerOneCriticalHitCombination, playerOneCriticalHitKeys);
      refreshCriticalHitKeysStatus(event, controls.PlayerTwoCriticalHitCombination, playerTwoCriticalHitKeys);
    })
  });
}

export function getDamage(attacker, defender) {
  const hitPower = getHitPower(attacker);
  const blockPower = getBlockPower(defender);
  const damage = hitPower > blockPower ? hitPower - blockPower : 0;
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

function dealDamage(fighter, damage) {
  fighter.health -= damage;
}

function isCriticalHit(hitKeys) {
  return hitKeys.every(x => x) ? true : false;
}

function redrawHealthIndicator(fighter, indicator, indicatorRate) {
  let fighterHealthPercents = Math.round(fighter.health * indicatorRate);
  fighterHealthPercents = fighterHealthPercents > 0 ? fighterHealthPercents : 0;
  indicator.style.width = fighterHealthPercents + '%';
}

function refreshCriticalHitKeysStatus(event, combinationCodes, combinationKeysStatus) {
  for (let [index, item] of combinationCodes.entries()) {
    if (event.code == item) {
      if (combinationKeysStatus[index]) {
        combinationKeysStatus[index] = false;
      } else {
        combinationKeysStatus[index] = true;
      }
    }
  }
};