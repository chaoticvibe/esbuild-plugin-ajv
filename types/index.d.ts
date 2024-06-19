import { Plugin } from "esbuild";
import { CodeKeywordDefinition, Options as Options$1 } from "ajv";

interface Options {
  extraKeywords?: CodeKeywordDefinition[];
  ajvOptions?: Options$1;
}
declare const AjvPlugin: ({ extraKeywords, ajvOptions }?: Options) => Plugin;

export { Options as AjvPluginOptions, AjvPlugin as default };
