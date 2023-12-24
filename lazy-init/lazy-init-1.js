const redis = require('redis');
const crypto = require('crypto');
//PROS: Damn easy, simple and straight-forward

//CONS: This leaves the entire responsibility to the client
class DistributedDataStructure {
	constructor(){
		this.client = redis.createClient();
	}

	async connect(){
		return this.client.connect();
	}

	async add(staffName, reviewId){
		//Do some business here - idk,
		const accountName = await this.client.get(key);
		return this.client.sAdd(`v1:${accountName}:pending-reviews`, reviewId);
	}
}

(async () => {
	const ds = new DistributedDataStructure();
	await ds.connect();
	ds.add('Jerome', crypto.randomBytes(12).toString('hex'));
})()