
rlp_encode = function(input){
  if( typeof input == 'string' || typeof input == 'number' ) {
    if( typeof input == 'number' ) input = n2h( input );
    if( input.length == 2 && c(input,0) < 128 ) return h2a(input); 
    else return encode_length(input.length/2, 128 ).concat( h2a(input) );
  // } else if( typeof input == 'number' ){
  //   input = n2h( input );
  //   var output = h2a(input);
  //   if( output.length == 1 && output[0] < 128 ) return output;
  //   else return encode_length(output.length, 128).concat( output );
  } else if( Object.prototype.toString.call( input ) == '[object Array]' ) {
    var output = [];
    for( var item in input ) {
      var tmp = rlp_encode(input[item]);
      output = output.concat( tmp );
    }
    return encode_length( output.length, 192 ).concat( output );
  }
}

encode_length = function(L, offset){
  if( L < 56 ) {
    return  [ L + offset ];
  } else {
    var BL = to_binary(L);
    return [ BL.length + offset + 55 ].concat( BL );
  }
}

to_binary = function(x){
  if( x == 0 ) return [];
  else return to_binary(Math.floor(x/256)).concat( [x % 256] )
} 

s2h = function( string ){
  return CryptoJS.enc.Hex.stringify( CryptoJS.enc.Utf8.parse( string ) );
}

// Number to hex
n2h = function( number ){
  var str = number.toString(16);
  if( str.length % 2 == 1 ) str = '0' + str;
  return str;
}

// @input: hex string
// @i position of byte in hex string
// 
// @returns: byte @i
c = function( input, i ){
  return parseInt(input.slice(i,i+2),16);
}

// HEX-STRING TO BYTE ARRAY
h2a = function( h ){
  var output = []
  for( var i = 0; i < h.length; i+=2 ) {
    output.push(c(h,i));
  }
  return output;
}
