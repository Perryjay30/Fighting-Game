
// ** Grabs elements from the DOM and stores them into variables **
let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')

const updateGame = (p1, p2, gameState) => {
    p2NameDiv.innerText = p2.name
    p1NameDiv.innerText = p1.name
    p1HealthDiv.innerText = p1.health
    p2HealthDiv.innerText = p2.health
    if(p1.health <= 0) {
      fightingGame.isOver = true
      gameState = fightingGame.isOver
      resultDiv.innerText = fightingGame.declareWinner(fightingGame.isOver, p1, p2)
      return gameState
    }
    else if (p2.health <= 0)  { 
      fightingGame.isOver = true
      gameState = fightingGame.isOver
      resultDiv.innerText = fightingGame.declareWinner(fightingGame.isOver, p1, p2)
      return gameState
    }  
  
}

class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }

  strike (player, enemy, attackDmg) {
    let damageAmount = Math.floor(Math.random() * 10)
    enemy.health -= damageAmount                                                                               
    updateGame(p1, p2, gameState)
    return `${player} attacks ${enemy} for ${attackDmg}`

  }

  heal (player) {
    const healAmount = Math.floor(Math.random() * 6)
    player.health += healAmount
    updateGame(p1, p2, gameState)
    return `${player.name} heals for ${healAmount} HP`  
    

  }
}

class Game {
  constructor() {
    this.isOver = false;
  }

  declareWinner(isOver,p1, p2)  {
    let message = "TIE";
    if(isOver == true && p1.health <= 0) {
      message = `${p2.name} WINS!!` 
    }
    else if(isOver == true && p2.health <= 0) {
      message = `${p1.name} WINS!!`
    }
    return message

  }

  reset(p1,p2) {
    p1.health = 100
    p2.health = 100
    this.isOver = false
    resultDiv.innerText = ""
    updateGame(p1, p2, this.isOver)

  }
  
  play(p1, p2) {
    this.reset(p1, p2)
    while (!this.isOver) {
      p1.strike(p1, p2, p1.attackDmg)
      p2.heal(p2)
      p2.strike(p2, p1, p2.attackDmg)
      p1.heal(p1)

    }
    if(isOver == true)
      return this.declareWinner(this.isOver, p1, p2)
    
  }

}


let Player1 = new Player("Perry", 100, 5)
let Player2 = new Player("Tyler", 100, 5)
let p1 = Player1
let p2 = Player2

let fightingGame = new Game()
updateGame(p1, p2, fightingGame.isOver)


let gameState = fightingGame;

document.addEventListener('keydown', function(e) {
    if(e.key == "q" && p2.health > 0 && fightingGame.isOver == false) {
      p1.strike(p1, p2, p1.attackDmg)
  }

});

document.addEventListener('keydown', function(e) {
  if(e.key == "a" && p2.health > 0 && fightingGame.isOver == false) {
    p1.heal(p1)
  }

});

document.addEventListener('keydown', function(e) {
  if(e.key == "p" && p1.health > 0 && fightingGame.isOver == false) {
    p2.strike(p2, p1, p2.attackDmg)
  }

});

document.addEventListener('keydown', function(e) {
  if(e.key == "l" && p1.health > 0 && fightingGame.isOver == false) {
    p2.heal(p2)
  }
});