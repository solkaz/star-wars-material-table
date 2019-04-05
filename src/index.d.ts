/**
 * https://swapi.co/documentation#people
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
  gender: 'male' | 'female' | 'n/a' | 'unknown';
}

interface EnvironmentConfig {
  apiUrl: string;
  production: boolean;
}

interface APIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
}
