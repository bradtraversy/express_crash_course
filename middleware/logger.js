import moment from 'moment';

const logger = (req, res, next) => {
	console.log(
		`${req.protocol}://${req.get('host')}${
			req.originalUrl
		}: ${moment().format()}`
	);
	next();
};

export default logger;
