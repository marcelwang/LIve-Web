const emojies = "🥞 👞 🐽 🧶 💍 🦶🏽 🦧 🦔 🐜 🧇 🥓 🥩 🍗 🍖 🦴 🌭 🍔 🍟 🍕 🥪 ✂️ 🥙 🧆 🌮 🌯 🥗 🥘 🥫 🍝 🍜 🍲 🍛 🍣 🍱 🥟 🦪 🍤 🍙 🍚 🍘 🍥 🥠 🥮 🍢 🍡 🍧 🍨 🍦 🥧 🧁 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🍩".split(
    " "
  );
  
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.speedX = Math.random() * 8 - 4;
      this.speedY = Math.random() * 20 - 15;
      this.gravity = 0.5;
  
      this.element = document.createElement("p");
      this.element.innerText = emojies[Math.floor(Math.random() * emojies.length)];
      this.element.style.fontSize = '40px';
      this.element.style.zIndex = 100;
      this.element.style.position = 'absolute';
      this.element.style.animation = 'rotate '+ (Math.random() * 4 + 1) +'s infinite linear';
      this.element.style.transform = 'translate(-50%, -50%)'
      document.body.appendChild(this.element);
    }
  
    draw() {
      this.element.style.left = this.x + "px";
      this.element.style.top = this.y + "px";
      this.moveX();
      this.moveY();
      this.updateSpeed();
    }
  
    updateSpeed() {
      this.speedY += this.gravity;
    }
  
    moveX() {
      // setting the boundary
      if (this.x < 0 && this.speedX < 0) {
        this.speedX *= -0.8;
      }
      if (this.x > window.innerWidth && this.speedX > 0) {
        this.speedX *= -0.8;
      }
      // move
      this.x += this.speedX;
    }
  
    moveY() {
      // setting the boundary
      if (this.y < 0 && this.speedY < 0) {
        this.speedY *= -0.8;
      }
      if (this.y > window.innerHeight - this.element.offsetHeight - 30 && this.speedY > 0) {
        this.speedY *= -0.8;
      }
      // move
      this.y += this.speedY;
    }
  }
  