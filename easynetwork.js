class network {
  constructor(network,cidr,mask){
    this.network = network;
    this.cidr = cidr;
    this.mask = mask;
  }
}

function maskToCidr(mask) {

}

function addressToBinaryArray(address) {
  var octetArr = address.split('.').map(octet => (+octet).toString(2));
	var binArr = octetArr.map(octet => '0'.repeat(8 - octet.length) + octet);
	return binArr;
}

export default subnet;