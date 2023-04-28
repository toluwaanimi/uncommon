// This interface defines the shape of an environment object
export interface IEnvironmentInterface {
  getPort(): number; // Method to retrieve the port number
  getEnvironment(): string; // Method to retrieve the environment name
  getPostgresURL(): string; // Method to retrieve the Postgres URL
  getRedisURL(): string; // Method to retrieve the Redis URL
  getRedisPort(): number; // Method to retrieve the Redis port number
  getRedisPassword(): string; // Method to retrieve the Redis password
}
