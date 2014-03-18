var ECKey = require('src/eckey.js').ECKey;
var Address = require('src/address.js');
var Message = require('src/message.js');
var CryptoJs = require('src/u8ext.js');
require('src/rlp.js');
var convert = require('src/convert.js')
var Transaction = require('src/transact.js');

var SHA256 = CryptoJs.SHA256;
var SHA3 = CryptoJs.SHA3;


var address = 'f36dd8604d7eac8d0bfa29a417d8e17ae3d6a358';
var priv = 'b6278852cf5ea552c66daf22ada11b9c41646d0da173c36eaeb518aea4f4dfa7';
// var msg = '\xe2\x83\x08\x15\xae\xb8\xcd\x87\x4e\x63\x0f\x4f\xc9\xc8\x24\xf2\xff\xbf\xb8\xaa\x10\xcf\x08\x4c\x16\xc6\xe0\x5a\x3f\x94\x61\xe8';
var msg = 'e2830815aeb8cd874e630f4fc9c824f2'
var key = new ECKey(priv); 
var sig = Message.signMessage(key, msg);
console.log(sig);

// var pub = key.getPub().toHex().slice(2);
var pub = key.getPub();

 
// console.log(pub.toBytes().slice(1));
// console.log(convert.bytesToWordArray(pub.toBytes()));
// console.log(new Crypto.lib.WordArray)
// console.log(convert.bytesToWordArray(pub));
// 
// var words = Crypto.enc.Hex.parse( pub );
// var address = SHA3(words,{outputLength:256}).toString().slice(24);
// console.log(words);
// console.log(address);
// console.log(sig);

// var transaction = ['','f36dd8604d7eac8d0bfa29a417d8e17ae3d6a358','2386f26fc10000',['6173640000000000000000000000000000000000000000000000000000000000']];
var transactionSig = 'e2830815aeb8cd874e630f4fc9c824f2ffbfb8aa10cf084c16c6e05a3f9461e8';
// var rlpe = rlp_encode(transaction);
// 
// 
// var w = CryptoJs.enc.u8array.parse(rlpe);
// console.log(CryptoJs.enc.Hex.stringify(w));
// var sha3 = SHA3(w,{outputLength:256}).toString();

var t = new Transaction();
t.receiveAddress = address;
t.value = '2386f26fc10000';
t.data = ['6173640000000000000000000000000000000000000000000000000000000000'];
t.fromAddress = address;

var sig = t.sign(key);

console.log( t.toString() );
console.log( sig );

  

// console.log(pub.getEthereumAddress());
