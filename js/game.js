//criando o canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas); //imagem de fundo

let bgReady = false;
const bgImage = new Image();

bgImage.onload = function () {
  bgReady = true;
};

bgImage.src = './imgs/bg.jpg'; //criar o herio

let heroReady = false;
const heroImage = new Image();

heroImage.onload = function () {
  heroReady = true;
};

heroImage.src = './imgs/dragon.png'; //criando o dragao

let dragonReady = false;
const dragonImage = new Image();

dragonImage.onload = function () {
  dragonReady = true;
};

dragonImage.src = './imgs/heroi.png'; //objetos do jogo
//herio

const hero = {
  speed: 256 //movimentos em pixels por segundo

}; //dragao o inimigo

const dragon = {}; //dragoes pegos

let dragonsCaught = 0;
/**
 *  controle do teclado
 */

const keysDown = {}; //quando pressionar a tecla

window.addEventListener('keydown', function (e) {
  console.log(e);
  keysDown[e.keyCode] = true;
}, false); //quando soltar a tecla

window.addEventListener('keyup', function (e) {
  delete keysDown[e.keyCode];
}, false);
/**
 * Reseta o jogo quando o jogador pegar  o dragao
 */

const reset = function () {
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2; //posiciona o dragao aleiatoriamente na tela

  dragon.x = 32 + Math.random() * (canvas.width - 64);
  dragon.y = 32 + Math.random() * (canvas.height - 64);
}; //atualiza os objetos do jogo


const update = function (modifier) {
  if (38 in keysDown) {
    //pressionando seta pra cima
    hero.y -= hero.speed * modifier;
  }

  if (40 in keysDown) {
    //pressionando seta para baixo
    hero.y += hero.speed * modifier;
  }

  if (37 in keysDown) {
    //pressionando seta pra esquerda
    hero.x -= hero.speed * modifier;
  }

  if (39 in keysDown) {
    //pressionando seta para direita
    hero.x += hero.speed * modifier;
  } // quando os pesonagens se encontram


  if (hero.x <= dragon.x + 32 && dragon.x <= hero.x + 32 && hero.y <= dragon.y + 32 && dragon.y <= hero.y + 32) {
    ++dragonsCaught;
    reset();
  }
}; //renderiza tudo


const render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }

  if (dragonReady) {
    ctx.drawImage(dragonImage, dragon.x, dragon.y);
  }

  ctx.fillStyle = 'rgb(250, 250, 250)';
  ctx.font = '24px Helvetica';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('Dragões pegos: ' + dragonsCaught, 32, 32);
}; //controla o loop do jogo


const main = function () {
  const now = Date.now();
  const delta = now - then;
  update(delta / 1000);
  render();
  then = now;
  requestAnimationFrame(main);
};

const w = window;
const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame;
let then = Date.now();
reset();
main();
