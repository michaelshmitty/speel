class Game {
  constructor(words) {
    this.words = words;
    this.currentWordIndex = 0;
    this.currentWord = this.words[this.currentWordIndex];
    this.currentLetterIndex = 0;
    this.answer = "";
    this.won = false;
    this.mistake = false;
    this.image = loadImage("assets/" + this.currentWord + ".png");
    this.timer = 0;
    this.talking = false;
    this.speech = new p5.Speech();
    this.speech.setLang("nl-NL");
    this.speech.setRate(0.7);
    this.speech.interrupt = false;
    this.speech.onStart = () => {
      this.talking = true;
    };
    this.speech.onEnd = () => {
      this.talking = false;
    };
    this.sayWord();
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
      if (this.timer >= 3000) {
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
    image(this.image, width / 2 - 100, 10);
  }

  drawPlaceholder() {
    for (let i = 0; i < this.currentWord.length; i++) {
      line(50 + 100 * i, 400, 50 + 100 * i + 50, 400);
    }
  }

  drawWord() {
    for (let i = 0; i < this.currentWord.length; i++) {
      fill("rgba(100,100,100,0.2)");
      text(this.currentWord[i].toUpperCase(), 59 + 100 * i, 390);
      fill("black");
    }
  }

  drawAnswer() {
    for (let i = 0; i < this.answer.length; i++) {
      text(this.answer[i].toUpperCase(), 59 + 100 * i, 390);
    }
  }

  checkLetter(letter) {
    this.speech.speak(letter);
    if (letter === this.currentWord[this.currentLetterIndex]) {
      this.mistake = false;
      this.answer += letter;
      if (this.currentLetterIndex === this.currentWord.length - 1) {
        this.speech.speak(this.currentWord);
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
      this.answer += this.currentWord[this.currentLetterIndex];
      this.currentLetterIndex += 1;
      if (this.currentLetterIndex === this.currentWord.length) {
        this.won = true;
      }
    }
  }

  sayWord() {
    this.speech.speak(this.currentWord);
    let spelledOutWord = "";
    for (const letter of this.currentWord) {
      spelledOutWord += letter;
      spelledOutWord += "...";
    }
    this.speech.speak(spelledOutWord);
  }

  reset() {
    this.won = false;
    this.mistake = false;
    this.currentLetterIndex = 0;
    this.answer = "";
    this.currentWord = this.words[this.currentWordIndex];
    this.image = loadImage("assets/" + this.currentWord + ".png");
    this.sayWord();
  }
}
