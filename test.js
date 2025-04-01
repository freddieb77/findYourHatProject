class Dog {
    constructor(name) {
        this._name = name;
    }

    introduce() {
        console.log('This is ' + this._name + ' !');
    }

    // A Static Method
    static bark() {
        console.log('Woof!');
    }

}

const myDog = new Dog('Buster');
myDog.introduce();

//Calling the static method
Dog.bark();

class Song {
    constructor() {
      this.title;
      this.author;
    }
    
    play() {
      console.log('Song playing!');
    }
  }
  
  const mySong = new Song();
  mySong.play();