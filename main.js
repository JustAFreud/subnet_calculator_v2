import network from './easynetwork.js'
import { calculateSubnet } from './easynetwork.js';

/*
var address_arr = ['0.0.0.0','1.0.0.0','254.0.0.0','10.10.0.0','192.168.0.0','172.16.0.0','230.15.21.0','51.26.34.128','68.41.21.70']
var cidr_arr = ['0','1','4','8','16','20','24','31','32']
var mask_arr = ['0.0.0.0','128.0.0.0','240.0.0.0','255.0.0.0','255.255.0.0','255.255.240.0','255.255.255.0','255.255.255.254','255.255.255.255']

for (let x = 0; x < address_arr.length; x++) {
  for (let y = 0; y < cidr_arr.length; y++) {
    console.log('--------------------------------')
    var en = new network();
    en.address = address_arr[x]
    en.cidr = cidr_arr[y]
    console.log(calculateSubnet(en))
    var en = new network();
    en.address = address_arr[x]
    en.mask = mask_arr[y]
    console.log (calculateSubnet(en))
  }
}
*/

var en = new network();
en.address = '10.0.0.1000'
en.cidr = '32'
console.log(calculateSubnet(en))
var en = new network();
en.address = '10.0.0.1'
en.mask = '255.255.255.255'
console.log(calculateSubnet(en))