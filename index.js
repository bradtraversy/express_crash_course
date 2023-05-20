import express from 'express';
import path from 'path';
import url from 'url';
import { engine } from 'express-handlebars';
import router from './routes/api/members.js';
import members from './Members.js';

//get the current directory name
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const app = express();

// Init middleware
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get('/', (req, res) =>
	res.render('index', {
		title: 'Member App',
		members,
	})
);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
