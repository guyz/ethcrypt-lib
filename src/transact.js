var CryptoJs = require('./u8ext.js');
var ECKey = require('./eckey.js').ECKey;
require('./rlp.js');
var SHA3 = CryptoJs.SHA3;
var Message = require('./message.js');



var Transaction = function(){
  this.nonce = '';
  this.fromAddress = '';
  this.receiveAddress = '';
  this.value = '';
  this.data = [];
  this.vrs = {
    v:'',
    r:'',
    s:''
  }
}

Transaction.prototype.sign = function( priv ){
  var transaction = [];
  
  transaction.push(this.nonce);
  transaction.push(this.receiveAddress);
  transaction.push(this.value);
  transaction.push(this.data);
  
  var rlpe = rlp_encode(transaction);
  var msg = SHA3(CryptoJs.enc.u8array.parse(rlpe),{outputLength:256}).toString();
  
  console.log('msg',msg);
  
  
  var key = new ECKey(priv); 
  var sig = Message.signMessage(key, msg);
  this.vrs.v = sig.slice(0,2);
  this.vrs.r = sig.slice(2,66);
  this.vrs.s = sig.slice(66);
  
  
  
  return sig.slice(2);
}

Transaction.prototype.toString = function(){
  return JSON.stringify(this);
  
}


module.exports = Transaction;
