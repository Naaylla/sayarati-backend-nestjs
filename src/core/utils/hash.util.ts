import * as argon2 from 'argon2';

export class HashUtil {
  /**
   * Hash a plain password using Argon2
   * @param password - The plain text password
   * @returns The hashed password
   */
  static async hash(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  /**
   * Verify if a plain password matches a hashed one
   * @param hashed - The hashed password from the DB
   * @param plain - The plain text password from the user
   * @returns True if match, else false
   */
  static async verify(hashed: string, plain: string): Promise<boolean> {
    return await argon2.verify(hashed, plain);
  }
}
