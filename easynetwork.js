class network {
  constructor(address,cidr,mask){
    this.address = address;
    this.cidr = cidr;
    this.mask = mask;
  }
}

// generate subnet information
function calculateSubnet(network) {
  network = validateObject(network);
  network = maskAdjacencies(network);

  return network;
}

// convert a four octet address to an array of binary strings
function addressToBinaryArray(address) {
  return address.split('.').map(octet => ('00000000' + (+octet).toString(2)).slice(-8));
}

// convert an array of binary strings to an address
function binArrToAddress(array) {
  return array.map(octet => parseInt(octet,2)).join('.')
}

// convert subnet mask to cidr
function maskToCidr(mask) {
  return (addressToBinaryArray(mask).join('')).indexOf('0');
}

// convert cidr to subnet mask
function cidrToMask(cidr) {
  var fullOctets = Math.floor(cidr / 8)
  var partialOctet = cidr % 8
  var maskArr = []
  for (var x = 0; x < 4; x++) {
    if (x < fullOctets) {
      maskArr.push('11111111')
    } else if (x == fullOctets) {
      maskArr.push(('11111111' + '0'.repeat(8 - partialOctet)).slice(-8))
    } else {
      maskArr.push('00000000')
    }
  }
  return binArrToAddress(maskArr)
}

// validate ip address, and cidr or mask 
function validateObject(network) {
  const addressRegex = /^(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;
  const maskRegex = /^(?:1+)?(?:0+)?$|^(?:1+0?){0,4}1+0+$/
  const binMask = network.mask ? addressToBinaryArray(network.mask).join('') : ''
  network = cleanObject(network)
  if (!addressRegex.test(network.address)) {
    return defaultError('Not a valid IP Address.')
  } 
  if (network.cidr && (+network.cidr < 0 || +network.cidr > 32)) {
    return defaultError('Not a valid CIDR.')
  } 
  if (network.mask && !maskRegex.test(binMask)) {
    return defaultError('Not a valid Mask.')
  } 
  if (network.cidr && network.mask) {
    if (network.cidr != binMask.indexOf('0')) {
      return defaultError('CIDR and Mask do not match')
    }
  }
  return network
}

function maskAdjacencies(network) {
  if (network.cidr && !network.mask) {
    network.mask = cidrToMask(network.cidr)
  } else if (!network.cidr && network.mask) {
    network.cidr = maskToCidr(network.mask)
  }
  return network
}

// trim leading and trailing whitespace
function cleanObject(network) {
  if (network.address) {network.address = network.address.trim()}
  if (network.cidr) {network.cidr = network.cidr.trim()}
  if (network.mask) {network.mask = network.mask.trim()}
  return network
}

// create error object
function defaultError(string) {
  return {'Error' : string}
}

export default network;

export { calculateSubnet }