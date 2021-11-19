class DatabaseService {
	static async handler(handleList) {
		for (let index = 0; index < handleList.length; index++) {
			const { method, props } = handleList[index];
			const types = {
				key_value: () =>
					props.array.filter(
						(item) => item[props.key] == props.option[props.key]
					),
				list: () =>
					props.array.filter((item) => props.idList.includes(item.id)),
			};
			if (method.condition) return await types[method.type]();
			if (index == handleList.length - 1) return props.array;
		}
	}
}

module.exports = DatabaseService;
