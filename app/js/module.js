var a = Symbol();

class Module {
    constructor() {
        this.phrase = "This is a ES6 class in a module";
        this[a] = "Private";
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

    setFirstName(name) {
        this.firstName = name;
    }

    setLastName(name) {
        this.lastName = name;
    }

    getName() {
        return `${this.firstName} ${this.lastName}`;
    }

    getA() {
        return this[a];
    }
}

export default Module