import network from './easynetwork.js'
import { calculateSubnet } from './easynetwork.js';

const en = new network();


en.address = '10.0.0.30';
//en.cidr = '17'
en.mask = '255.255.0.0';

var res = calculateSubnet(en)

console.log(res);