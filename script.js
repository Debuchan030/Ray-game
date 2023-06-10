var key = { "ArrowRight": 0, "ArrowLeft": 0, "ArrowUp": 0, "ArrowDown": 0 };
var move, x = -2140, y = -1150, speed = 10, movepos = 4, moveannimation, moveannimationclock = 0, keymoving = 0, Generate, entity = 0, attackdamage = 0, playerHP = 100, playerMaxHP = 100, playerMP = 80, playerMaxMP = 80, data, reply, playerXP = 0, playerMaxXP = 10, playerXPlevel = 1, coin = 0, wordsystem, wordbox, dialogboxappear = 0, HPrecoveryInterval = 0, playerSurvivalStatus = 1, pause = 0, attacking = 0, attackAnimationTimer, attackAnimationMove, dialogboxappearEnd = 0, wordtext;
function get(id) {
  return document.getElementById(id);
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function keydown(ev) {
  if (playerSurvivalStatus) {
    //ev.preventDefault();
    if (key[ev.key] == 0) {
      key[ev.key] = 1;
      keymoving = 1;
    }
    if (ev.key == " ") {
      if (playerMP - 2 > 0) {
        attack(2);
        playerMP -= 2;
        HPrecoveryInterval = 3;
      }
    }
    if (ev.key == "e") {
      backpack();
    }
  }
}
function keyup(ev) {
  if (key[ev.key] == 1) {
    key[ev.key] = 0;
    keymoving = 0;
  }
}
function move() {
  if (key["ArrowRight"]) {
    if (x - speed > -2140) {
      movepos = 1;
      x -= speed;
      keymoving = 1;
    } else {
      movepos = 1;
      x = -2140;
      keymoving = 1;
    }
  } else if (key["ArrowLeft"]) {
    if (x + speed < 706) {
      movepos = 2;
      x += speed;
      keymoving = 1;
    } else {
      movepos = 2;
      x = 706;
      keymoving = 1;
    }
  } else if (key["ArrowUp"]) {
    if (y + speed < 400) {
      movepos = 3;
      y += speed;
      keymoving = 1;
    } else {
      movepos = 3;
      y = 400;
      keymoving = 1;
    }
  } else if (key["ArrowDown"]) {
    if (y - speed > -2432) {
      movepos = 4;
      y -= speed;
      keymoving = 1;
    } else {
      movepos = 4;
      y = -2432;
      keymoving = 1;
    }

  }
  get("background").style.backgroundPositionX = x + "px";
  get("background").style.backgroundPositionY = y + "px";
}
function walk() {
  if (attacking == 0) {
    if (movepos == 1) {
      get("player").style.backgroundPositionY = "-96px";
    } else if (movepos == 2) {
      get("player").style.backgroundPositionY = "-48px";
    } else if (movepos == 3) {
      get("player").style.backgroundPositionY = "-144px";
    } else if (movepos == 4) {
      get("player").style.backgroundPositionY = "0px";
    }
    if (moveannimationclock < 96) {
      moveannimationclock += 48;
    } else if (moveannimationclock == 96) {
      moveannimationclock = 0;
    }
    if (keymoving) {
      get("player").style.backgroundPositionX = "-" + moveannimationclock + "px";
    }
  }
}
function data() {
  get("HPbar").innerHTML = "HP:" + playerHP + "/" + playerMaxHP;
  get("MPbar").innerHTML = "MP:" + playerMP + "/" + playerMaxMP;
  get("HPbar").style.width = ((playerHP / playerMaxHP) * 400) + "px";
  get("MPbar").style.width = ((playerMP / playerMaxMP) * 300) + "px";
  get("XPlevel").innerHTML = playerXPlevel;
  get("XPbar").innerHTML = "XP:" + playerXP + "/" + playerMaxXP;
  get("XPbar").style.width = ((playerXP / playerMaxXP) * 200) + "px";
  get("coin").innerHTML = coin;
  if (playerXP >= playerMaxXP) {
    playerXP -= playerMaxXP;
    playerXPlevel++;
    if (playerXPlevel <= 10) {
      playerMaxXP += 10;
    } else if (playerXPlevel <= 20) {
      playerMaxXP += 20;
    } else {
      playerMaxXP += 50;
    }
  }
  if (playerXPlevel >= 100) {
    get("XPlevel").style.fontSize = "20pt";
  }
}
function reply() {
  if (HPrecoveryInterval <= 0) {
    if (playerHP + 1 < playerMaxHP) {
      playerHP += 1;
    } else {
      playerHP = playerMaxHP;
    }
  }
  if (playerMP + 1 < playerMaxMP) {
    playerMP += 1;
  } else {
    playerMP = playerMaxMP;
  }
  attackdamage = 0;
  if (HPrecoveryInterval > 0) {
    HPrecoveryInterval -= 0.25;
  }
}
function init() {
  get("background").focus();
  get("loding").remove();
  move = setInterval(move, 20);
  moveannimation = setInterval(walk, 100);
  data = setInterval(data, 20);
  reply = setInterval(reply, 250);
  Generate = setInterval(monsterGenerate, 2000);
}
function attack(damage) {
  attackdamage = damage;
  get("player").style.backgroundImage = `url(${"player1attack.png"})`;
  attackAnimationMove = 0;
  get("player").style.backgroundPositionX = attackAnimationMove + "px";
  if (attacking == 0) {
    attacking = 1;
    attackAnimationTimer = setInterval(attackAnimation, 100);
  }
}
function attackAnimation() {
  get("player").style.backgroundPositionX = attackAnimationMove + "px";
  if (attackAnimationMove >= 384) {
    attacking = 0;
    get("player").style.backgroundImage = `url(${"player.png"})`;
    get("player").style.backgroundPositionX = 0 + "px";
    clearInterval(attackAnimationTimer);
  }
  attackAnimationMove += 48;
}
function monsterGenerate() {
  if (entity > 50) return;
  var GenerateX, GenerateY;
  if (random(0, 1)) {
    if (random(0, 1)) {
      if (x + 700 > 706) {
        GenerateX = random(x - 700, -2140);
      } else {
        GenerateX = random(x + 700, 706);
      }
    } else {
      if (x - 700 < -2140) {
        GenerateX = random(x + 700, 706);
      } else {
        GenerateX = random(x - 700, -2140);
      }
    }
    GenerateY = random(-2432, 400);
  } else {
    if (random(0, 1)) {
      if (y + 400 > 400) {
        GenerateY = random(y - 400, -2432);
      } else {
        GenerateY = random(y + 400, 400);
      }
    } else {
      if (y - 400 < -2432) {
        GenerateY = random(y + 400, 400);
      } else {
        GenerateY = random(y - 400, -2432);
      }
    }
    GenerateX = random(-2140, 706);
  }
  entity += 1;
  var mon = document.createElement("div");
  mon.className = "monster";
  mon.style.top = (400 - (GenerateY - y)) + "px";
  mon.style.left = (700 - (GenerateX - x)) + "px";
  mon.style.display = 'none';
  mon.monsterHP = 10;
  mon.GenX = GenerateX;
  mon.GenY = GenerateY;
  mon.tm = setInterval(monstermove, 50, mon);
  get("background").appendChild(mon);
}
function monstermove(mon) {
  if (400 - (mon.GenY - y) > 800 || 400 - (mon.GenY - y) < 0 || 700 - (mon.GenX - x) > 1400 || 700 - (mon.GenX - x) < 0) {
    mon.style.display = 'none';
    mon.GenX += random(-10, 10);
    mon.GenY += random(-10, 10);
  } else {
    mon.style.display = '';
    if (mon.GenX > x) {
      mon.GenX -= random(1, 10);
    } else if (mon.GenX < x) {
      mon.GenX += random(1, 10);
    }
    if (mon.GenY > y) {
      mon.GenY -= random(1, 10);
    } else if (mon.GenY < y) {
      mon.GenY += random(1, 10);
    }
    mon.style.top = (400 - (mon.GenY - y)) + "px";
    mon.style.left = (700 - (mon.GenX - x)) + "px";
  }
  if (Math.abs((400 - (mon.GenY - y)) - 400) < 30 && Math.abs((700 - (mon.GenX - x)) - 700) < 30) {
    if (playerHP > 0) {
      playerHP -= 1;
    }
  }
  if (Math.abs((400 - (mon.GenY - y)) - 400) < 35 && Math.abs((700 - (mon.GenX - x)) - 700) < 35) {
    if (attackdamage > 0) {
      mon.monsterHP -= attackdamage;
      if (mon.monsterHP <= 0) {
        clearInterval(mon.tm);
        entity -= 1;
        playerXP += 2;
        attackdamage = 0;
        coin += 5;
        mon.remove();
      }
    }
  }
}
function talk(word, time) {
  wordtext = word;
  if (dialogboxappear == 0) {
    var talkbox = document.createElement("div");
    talkbox.id = "dialogbox";
    talkbox.className = "overflow-auto";
    talkbox.addEventListener("click", talkfast);
    get("background").appendChild(talkbox);
  }
  if (dialogboxappear) {
    clearInterval(wordbox);
  }
  wordsystem = 1;
  if (dialogboxappearEnd) {
    dialogboxappearEnd = 0;
    get("dialogboxEnd").remove();
  }
  wordbox = setInterval(printword, time / word.length, word);
  dialogboxappear = 1;
}
function talkfast() {
  if (dialogboxappearEnd == 0) {
    get("dialogbox").innerHTML = wordtext;
    clearInterval(wordbox);
    var talkboxEnd = document.createElement("div");
    talkboxEnd.id = "dialogboxEnd";
    get("background").appendChild(talkboxEnd);
    talkboxEnd.addEventListener("click", talkboxover);
    dialogboxappearEnd = 1;
  }
}
function printword(word) {
  get("dialogbox").innerHTML = word.substr(0, wordsystem);
  if (wordsystem <= word.length - 1) {
    wordsystem++;
  } else {
    if (dialogboxappearEnd == 0) {
      var talkboxEnd = document.createElement("div");
      talkboxEnd.id = "dialogboxEnd";
      get("background").appendChild(talkboxEnd);
      talkboxEnd.addEventListener("click", talkboxover);
      dialogboxappearEnd = 1;
    }
    clearInterval(wordbox);
  }
}
function talkboxover() {
  dialogboxappear = 0;
  dialogboxappearEnd = 0;
  get("dialogbox").remove();
  get("dialogboxEnd").remove();
}
function backpack() {

}
function shop() {

}
function equipmentSystem() {

}