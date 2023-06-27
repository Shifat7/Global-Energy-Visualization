const PORT: number = parseInt(process.env["PORT"] as string) || 3000;
const NODE_ENV: string = process.env["NODE_ENV"] || "development";
const LOG_LEVEL: string = process.env["LOG_LEVEL"] || "debug";
const DOMAIN = process.env["DOMAIN"] || "localhost";

const MONGOOSE_USERNAME: string = process.env["MONGOOSE_USERNAME"] || "energy";
const MONGOOSER_PASSWORD: string = process.env["MONGOOSER_PASSWORD"] || "rhinos";
const MONGOOSE_HOST: string = process.env["MONGOOSE_HOST"] || "192.168.0.100";
const MONGOOSE_PORT: string = process.env["MONGOOSE_PORT"] || "27022";
const MONGOOSE_DATABASE: string = process.env["MONGOOSE_DATABASE"] || "energy";
const MONGOOSE_AUTH_SOURCE: string = process.env["MONGOOSE_AUTH_SOURCE"] || "energy";

export {
  PORT,
  NODE_ENV,
  LOG_LEVEL,
  DOMAIN,
  MONGOOSE_USERNAME,
  MONGOOSER_PASSWORD,
  MONGOOSE_HOST,
  MONGOOSE_PORT,
  MONGOOSE_DATABASE,
  MONGOOSE_AUTH_SOURCE
};
