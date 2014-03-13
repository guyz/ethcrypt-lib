var assert = require('assert')
var ECKey = require('src/eckey.js').ECKey;

var secret = 'b6278852cf5ea552c66daf22ada11b9c41646d0da173c36eaeb518aea4f4dfa7'
var public = 'd309d44055367fe462287a09f952dc7e4599c54078e182e2bc7d4eac24c258076efe1e1263f34710e6acc81aa51f394dc5715d0bc4519090dba1c30fd09b809e';
var address = 'f36dd8604d7eac8d0bfa29a417d8e17ae3d6a358';

describe('Key Generation', function(){
  
  beforeEach( function(){
    
  });
  
  it('generates a random key', function(){
    var key = new ECKey().export();
    assert.equal(key.length, 64)
  });
  
  it('generates a key from given', function(){
    var key = new ECKey(secret).export();
  
    assert.equal(secret, key);
  });
  
  it('generates a valid public key', function(){
    var key = new ECKey(secret);
    var pub = key.getPub().toHex().slice(2);
    
    assert.equal(pub, public);
    
  });
  
})

describe('Address Generation', function(){
  
  	it('generates the right adress', function(){
  	  
      var key = new ECKey(secret);
      var address = key.getPub().getEthereumAddress();
      
      assert.equal(address, 'f36dd8604d7eac8d0bfa29a417d8e17ae3d6a358');
    
  	});
    
});

