let chai = require('chai');
let expect = chai.expect; 
let chaiHttp = require('chai-http');

chai.use(chaiHttp);


describe.skip('Api',function(){
    it('Should give response from server',function(done){
        chai.request('http://localhost:3000')
        .get('/')
        .then((res)=>{
            expect(res).to.have.status(200);
            done();
        })
        .catch((err)=>{
            done(err);
        })
        
    });
});
