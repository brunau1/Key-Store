const uuid = require('uuid');
const fs = require('fs');
const DatabaseService = require('../services/database.service');

class Database {
	static async find(collection, option = {}, idList = []) {
		const data = require(`./public/${collection}.json`);
		const [key] = Object.keys(option) || '';
		return DatabaseService.handler([
			{
				method: { condition: !!key, type: 'key_value' },
				props: { array: data, key: key, option: option },
			},
			{
				method: { condition: idList.length, type: 'list' },
				props: { array: data, idList },
			},
		]);
	}
	static async create(collection, newData) {
		const data = require(`${collection}.json`);
		newData.id = uuid.v4();
		data.push(newData);
		await fs.writeFile(`./public/${collection}.json`, data);
	}
	static async update(collection, newData) {
		const data = require(`${collection}.json`);
		const pos = data.map((x) => x.id).indexOf(newData.id);
		if (pos != -1) data[pos] = newData;
		await fs.writeFile(`./public/${collection}.json`, data);
	}
	static async delete(collection, id) {
		const data = require(`${collection}.json`);
		data = data.filter((item) => item.id != id);
		await fs.writeFile(`./public/${collection}.json`, data);
	}
	static async createCollection(collection) {
		await fs.writeFile(`./public/${collection}.json`, []);
	}
}

module.exports = Database;
