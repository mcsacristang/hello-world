import { TokenType } from "powerbi-models";
export const Validators = require('./validators/core/validator').Validators;

export interface embedConfiguration {
	id: string,
    embedUrl: string,
    embedToken: string,
	tokenType?: TokenType,
}