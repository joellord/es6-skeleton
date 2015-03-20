class Module {
    constructor() {
        this.phrase = "This is a ES6 class in a module"
    }

    speak() {
        console.log(this.phrase);
        return true;
    }

    getPhrase() {
        return this.phrase;
    }

    setPhrase(phrase) {
        this.phrase = phrase;
    }
}

export default Module