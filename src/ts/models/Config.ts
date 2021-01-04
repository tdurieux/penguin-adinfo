import { JsonUtils } from '../utils/JsonUtils';

export class Config {
	private _separator: string;
	private _spaceSeparator: string;
	private _insertTime: string;
	private _version: number;
	private _analyticsTool: { [key: string]: { [key: string]: string[] } };
	private _medias: { [key: string]: JSON };

	constructor(jsonConfig: { [key: string]: any }) {
		this._separator = jsonConfig.separator;
		delete jsonConfig.separator;
		this._spaceSeparator = jsonConfig.spaceSeparator;
		delete jsonConfig.spaceSeparator;
		this._insertTime = jsonConfig.insertTime;
		delete jsonConfig.insertTime;
		this._version = jsonConfig.version;
		delete jsonConfig.version;
		this._analyticsTool = jsonConfig.ga || jsonConfig.adobe;
		delete jsonConfig.ga;
		delete jsonConfig.adobe;
		this._medias = jsonConfig;
	}

	/**
	 * Checa se a configuração é válida
	 */
	public validateConfig(): boolean {
		return !(
			!this._separator ||
			!this._spaceSeparator ||
			!this._insertTime ||
			!this._version ||
			!this._analyticsTool
		);
	}

	public toString(): string {
		let jsonConfig: { [key: string]: any } = {};
		Object.keys(this).forEach((key: string, index: number) => {
			if (key === '_analyticsTool' || key === '_medias') {
				jsonConfig = JsonUtils.addParametersAt(
					jsonConfig,
					Object.values(this)[index] || {}
				);
			} else {
				jsonConfig[key.replace('_', '')] = Object.values(this)[index];
			}
		});
		return JSON.stringify(jsonConfig);
	}

	public toJson(): { [key: string]: any } {
		let jsonConfig: { [key: string]: any } = {};
		Object.keys(this).forEach((key: string, index: number) => {
			if (key === '_analyticsTool' || key === '_medias') {
				jsonConfig = JsonUtils.addParametersAt(
					jsonConfig,
					Object.values(this)[index]
				);
			} else {
				jsonConfig[key.replace('_', '')] = Object.values(this)[index];
			}
		});
		return jsonConfig;
	}

	get separator(): string {
		return this._separator;
	}

	get spaceSeparator(): string {
		return this._spaceSeparator;
	}

	get insertTime(): string {
		return this._insertTime;
	}

	set insertTime(insertTime: string) {
		this._insertTime = insertTime;
	}

	get version(): number {
		return this._version;
	}

	set version(version: number) {
		this._version = version;
	}

	get analyticsTool(): { [key: string]: { [key: string]: string[] } } {
		return this._analyticsTool;
	}

	get medias(): { [key: string]: JSON } {
		return this._medias;
	}
}
