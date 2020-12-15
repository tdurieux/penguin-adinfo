import { JsonUtils } from '../utils/JsonUtils';

export abstract class AnalyticsTool {
	private _csvLine: { [key: string]: string };
	private _config: { [key: string]: string[] };
	private _separator: string;
	private _spaceSeparator: string;
	private _url: string;
	private _validationRules: { [key: string]: string[] };
	protected _buildedFiels: { [key: string]: string };

	/**
	 * Recebe os parametros e configurações do csv preenchido e preenche os atributos
	 * @param csvLine Json contendo as colunas preenchidas no csv e seus valores
	 * @param config Json contendo os utms e seus campos de preenchimento
	 * @param separators Json contendo o separator e o spaceSeparator
	 * @param validationRules Json contendo o nome dos campos e um array com as regras aceitas de preenchimento
	 */
	constructor(
		csvLine: { [key: string]: string },
		config: { [key: string]: string[] },
		separators: { [key: string]: string },
		validationRules: { [key: string]: string[] }
	) {
		this._csvLine = JsonUtils.normalizeKeys(csvLine);
		this._config = config;
		this._separator = separators.separator;
		this._spaceSeparator = separators.spaceSeparator;
		this._validationRules = JsonUtils.normalizeKeys(validationRules);
	}

	get csvLine(): { [key: string]: string } {
		return this._csvLine;
	}

	get config(): { [key: string]: string[] } {
		return this._config;
	}

	get separator(): string {
		return this._separator;
	}

	get spaceSeparator(): string {
		return this._spaceSeparator;
	}

	get validationRules(): { [key: string]: string[] } {
		return this._validationRules;
	}

	get url(): string {
		return this._url;
	}

	set url(url: string) {
		this._url = url;
	}

	/**
	 * Método para construção de URLs
	 */
	abstract _buildUrl(): void;

	//TODO passar para o Stringutils
	/**
	 * Verifica se a string está vazia
	 * @param parameter string para checar se está vazia
	 */
	protected _isEmpty(parameter: string): boolean {
		return !parameter;
	}
}
