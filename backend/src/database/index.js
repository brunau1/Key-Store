const uuid = require('uuid');
const fs = require('fs');

class Storage {
	static find(collection, prop = null, value = null) {
		const data = require(`${collection}.json`);
		return prop ? data.filter((item) => item[prop] == value)[0] : data;
	}
	static create(collection, newData) {
		const data = require(`${collection}.json`);
		newData.id = uuid.v4();
		data.push(newData);
		fs.writeFileSync(`./public/${collection}.json`, data);
	}
	static update(collection, newData) {
		const data = require(`${collection}.json`);
		const pos = data.map((x) => x.id).indexOf(newData.id);
		if (pos != -1) data[pos] = newData;
		fs.writeFileSync(`./public/${collection}.json`, data);
	}
	static delete(collection, id) {
		const data = require(`${collection}.json`);
		data = data.filter((item) => item.id != id);
		fs.writeFileSync(`./public/${collection}.json`, data);
	}
	static createCollection(collection) {
		fs.writeFileSync(`./public/${collection}.json`, []);
	}
}

module.exports = Storage;
