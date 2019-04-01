/**
 * https://swapi.co/documentation#people
 */
interface Person {
  /**
   * Name of the person
   */
  name: string;
  /**
   * Height of the person in centimeters
   */
  height: string;
  /**
   * Birth year of the person
   * Correlates to `birth_year` member of response
   */
  birthYear: number;
  /**
   * The gender of this person.
   * "n/a" denotes that a person does not have a gender
   */
  gender: 'Male' | 'Female' | 'n/a' | 'unknown';
}
