import { ConfigDAO } from '../models/DAO/ConfigDAO';
import { ApiResponse } from '../models/ApiResponse';
import { Config } from '../models/Config';

const template = (app: { [key: string]: any }): void => {
	app.get('/template', (req: { [key: string]: any }, res: { [key: string]: any }) => {
		const company = req.company;
		const configDAO = new ConfigDAO('company');

		const apiResponse = new ApiResponse();

		configDAO
			.getLastConfig()
			.then((config: Config) => {
				res.setHeader('Content-disposition', 'attachment; filename=template.csv');
				res.set('Content-Type', 'text/csv; charset=utf-8');
				apiResponse.statusCode = 200;
				apiResponse.responseText = config.toCsvTemplate();
			})
			.catch((err) => {
				apiResponse.responseText = 'Erro ao recuperar a configuração!';
				apiResponse.statusCode = 500;
				apiResponse.errorMessage = err.message;
			})
			.finally(() => {
				if (apiResponse.statusCode === 200) {
					res.status(apiResponse.statusCode).send(apiResponse.responseText);
				} else {
					res.status(apiResponse.statusCode).send(apiResponse.jsonResponse);
				}
			});
	});
};

export default template;
