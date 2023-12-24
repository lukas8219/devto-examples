const redis = require('redis');
const { once } = require('events');

//PROS: No client responsibility - makes it easy for the client
//CONS: More complex and error prone
class ProxiedDistributedDataStructure {
	constructor(){
		this.client = redis.createClient();
		this.client.connect();
		return new Proxy(this, {
			get(target, property){
				const descriptor = target[property];
				if(!descriptor){
					return;
				}
				if(target.isReady){
					return descriptor;
				}
				return async function(){
						await once(target.client, 'ready');
						return descriptor.apply(target, arguments);
					}
			}
        })
    }

	async add(staffName){
		//Do some business here - idk,
		const accountName = await this.client.get(staffName);
		return this.client.sAdd(`v1:${accountName}:pending-reviews`, 'dopaskdoaskdoas');
	}
}

const client = new ProxiedDistributedDataStructure();
client.add('lucasss');