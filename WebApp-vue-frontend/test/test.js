// var assert = require('assert');
let chai = require('chai');
let expect = chai.expect; 
let sinon = require('sinon');

let badFn = function () { throw new TypeError('Illegal salmon!'); };
let goodFn = function(){   console.log("");};
let fn = (n)=>{
    if (n>10)
    {
        return;
    }
    else
    {
        throw new Error("num is less then 10");
    }
}
let myObj = {dots:'.'};
let noOperation = function () {};


describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      expect([1,2,3].indexOf(4)).to.equal(-1);
    });
    it('checking members of array', function() {
        expect([1, 2, 3]).to.have.members([2, 1, 3]);
    });
    it('checking ordered members of array', function() {
        expect([1, 2, 3]).to.have.ordered.members([1, 2, 3]);
    });
    it('checking array has not given elements', function() {
        expect([1, 2]).to.not.include(3).and.not.include(4);        
    });

  });
});

describe('Object', function() {
    describe('deep', function() {
      it('should check deep members of obj', function() {
        expect([{a: 1}]).to.have.deep.members([{a: 1}]);
      });
      it('checking property of obj', function() {
        expect(myObj).to.have.property('dots', '.');
      });
      it('noOperation should not change property of obj', function() {
        expect(noOperation).to.not.change(myObj,'dots');
        expect(noOperation).to.not.change(myObj,'dots').by('');
      });
      
    });
  });

describe('Functions',function(){
    describe('badFn()',function(){
        it('should throw an error ',function(){        
            expect(badFn).to.throw();
        });
        
    });
    describe('GoodFn()',function(){
        it('should not throw an error ',function(){        
            expect(goodFn).to.not.throw();
        });
        
    });
    describe('Fn() with args',function(){
        it('should not throw an error ',function(){        
            expect(()=>{fn(42);}).to.not.throw();
        });
        it('should throw an error ',function(){        
            expect(()=>{fn(9);}).to.throw();
        });
    });
    // expect(<CLASSNAME>).to.be.an('object').that.respondTo('<method>');

});

describe('testing Sinon ', function(){
    it('test 1 checking stub callbacks',()=>{
        let callback = sinon.stub();
        callback.withArgs(42).returns(1);
        callback.withArgs(1).throws("TypeError");
        callback.onCall(2).returns("on third call");

        callback(42);// should return 1;
        expect(()=>{callback(1)}).to.throw(); // should throw an error TRUE
        console.log(callback());
       
    });
});