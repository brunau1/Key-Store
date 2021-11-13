const uuid = require('uuid');
const fs = require('fs');

class Database {
	static find(collection, option = {}, idList = []) {
		const data = require(`./public/${collection}.json`);
		const [key] = Object.keys(option) || '';
		if (key) return data.filter((item) => item[key] == option[key]);
		if (idList.length) return data.filter((item) => idList.includes(item.id));
		return data;
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

module.exports = Database;
