var expect = require("expect");

import Module from "../../app/js/module"

describe('Module', function() {

    let m;
    beforeEach(()=>{
        m = new Module();
    });

    it("Should load", ()=>{
        expect(1).toExist();
    });

    it("Getter should return the set phrase", ()=>{
        let testPhrase = "Test";
        m.setPhrase(testPhrase);
        expect(m.getPhrase()).toEqual(testPhrase);
    });

    it("Should concatenate the names", ()=>{
        m.setFirstName("Hello");
        m.setLastName("World");
        expect(m.getName()).toEqual("Hello World");
    });

});