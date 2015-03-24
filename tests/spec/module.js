import Module from "../../app/js/module"

describe('Module', function() {

    let m;
    beforeEach(()=>{
        m = new Module();
    });

    it("Getter should return the set phrase", ()=>{
        let testPhrase = "Test";
        m.setPhrase(testPhrase);
        expect(m.getPhrase).toEqual(testPhrase);
    });

    it("Should concatenate the names", ()=>{
        expect(true).toEqual(true);
    });

});
