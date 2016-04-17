/**
 * Created by knut on 2016-04-16.
 */
var cribMq = require('./api');
console.log('Starting Crib Message Queue');
cribMq.create(8900);