const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(require('cors'));

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
