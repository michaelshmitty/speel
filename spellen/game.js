class Game {
  constructor(words) {
    this.words = words;
    this.currentWordIndex = 0;
    this.currentWord = this.words[this.currentWordIndex];
    this.currentLetterIndex = 0;
    this.answer = "";
    this.won = false;
    this.mistake = false;
    this.image = loadImage(this.currentWord.image);
    this.timer = 0;
  }

  draw() {
    clear();
    this.drawImage();
    this.drawPlaceholder();
    this.drawWord();
    this.drawAnswer();
    if (this.won) {
      this.timer += deltaTime;
      background("rgba(0,255,0,0.8)");
      if (this.timer >= 1000) {
        this.timer = 0;
        this.won = false;
        this.nextWord();
      }
    } else if (this.mistake) {
      this.timer += deltaTime;
      background("rgba(255,0,0,0.8)");
      if (this.timer >= 200) {
        this.timer = 0;
        this.mistake = false;
      }
    }
  }

  drawImage() {
    image(this.image, width / 2 - 100, 10, 200, 200);
  }

  drawPlaceholder() {
    for (let i = 0; i < this.currentWord.word.length; i++) {
      line(50 + 100 * i, 400, 50 + 100 * i + 50, 400);
    }
  }

  drawWord() {
    for (let i = 0; i < this.currentWord.word.length; i++) {
      fill("rgba(100,100,100,0.2)");
      text(this.currentWord.word[i].toUpperCase(), 59 + 100 * i, 390);
      fill("black");
    }
  }

  drawAnswer() {
    for (let i = 0; i < this.answer.length; i++) {
      text(this.answer[i].toUpperCase(), 59 + 100 * i, 390);
    }
  }

  checkLetter(letter) {
    if (letter === this.currentWord.word[this.currentLetterIndex]) {
      this.mistake = false;
      this.answer += letter;
      if (this.currentLetterIndex === this.currentWord.word.length - 1) {
        this.won = true;
      } else {
        this.currentLetterIndex += 1;
      }
    } else {
      this.mistake = true;
    }
  }

  nextWord() {
    if (this.currentWordIndex < this.words.length - 1) {
      this.currentWordIndex += 1;
    } else {
      this.currentWordIndex = 0;
    }
    this.reset();
  }

  hint() {
    if (!this.won) {
      this.mistake = false;
      this.answer += this.currentWord.word[this.currentLetterIndex];
      this.currentLetterIndex += 1;
      if (this.currentLetterIndex === this.currentWord.word.length) {
        this.won = true;
      }
    }
  }

  reset() {
    this.won = false;
    this.mistake = false;
    this.currentLetterIndex = 0;
    this.answer = "";
    this.currentWord = this.words[this.currentWordIndex];
    this.image = loadImage(this.currentWord.image);
  }
}
