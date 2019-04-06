/**
 * Represents a Person whose data comes from the Star Wars API.
 * This is based on the [Person object from the API](https://swapi.co/documentation#people)
 */
interface Person {
  /**
   * Name of the person.
   */
  name: string;
  /**
   * Height of the person in centimeters.
   * If unknown, value is "unknown".
   */
  height: string;
  /**
   * Birth year of the person. This is suffixed with the birth era, either
   * "BBY" (Before the Battle of Yavin) or "ABY" (After the Battle of Yavin).
   * If unknown, value is "unknown".
   */
  birth_year: string;
  /**
   * The gender of this person.
   * "n/a" denotes that a person does not have a gender.
   * If unknown, value is "unknown".
   */
  gender: string;
}

/**
 * Shape of the exported object from "environment.ts" and "environment.prod.ts"
 */
interface EnvironmentConfig {
  /**
   * URL of the API that we will query. This is expected to _not_ have a trailing slash.
   */
  apiUrl: string;
  /**
   * Whether we are running in production mode or not
   * (setting to true enables optimizations and disables debug capabilities)
   */
  production: boolean;
}

/**
 * Shape of the response object returned from requesting /people.
 */
interface APIResponse {
  /**
   * Number of people stored in the Star Wars APIm
   */
  count: number;
  /**
   * URL to the next page of people. If there is no next page, this will be nullm
   */
  next: string | null;
  /**
   * URL to the previous page of people. If there is no previous page, this will be null.
   */
  previous: string | null;
  /**
   * People displayed in this page.
   */
  results: any[];
}
