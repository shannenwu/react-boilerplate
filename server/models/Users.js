const { v4: uuidv4 } = require("uuid");
let data = [];

/**
 * @typedef User
 * @prop {string} id - some unique id
 * @prop {string} username - some unique string
 * @prop {string} password - some string
 */

/**
 * @class Users
 * Stores all Users.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Users {
  /**
   * Add a User.
   * @param {string} username - Unique user name
   * @param {string} password - User password
   * @return {User | undefined} - created user
   */
  static addOne(username, password) {
    const user = Users.findOneByUsername(username);
    if (!user) {
      const id = uuidv4();
      const newUser = { id, username, password };
      data.push(newUser);
      return newUser;
    }
  }

  /**
   * Find a User by Username.
   * @param {string} username - username to find
   * @return {User | undefined} - found User
   */
  static findOneByUsername(username) {
    return data.filter((user) => user.username === username)[0];
  }

  /**
   * Find a User by id.
   * @param {string} id - id to find
   * @return {User | undefined} - found User
   */
  static findOneById(id) {
    return data.filter((user) => user.id === id)[0];
  }

  /**
   * Return an array of all of the Users.
   * @return {User[]}
   */
  static findAll() {
    return data;
  }

  /**
   * Update a User.
   * @param {string} id - id of User to update
   * @param {string} newUsername - new unique username
   * @return {User | undefined} - updated User
   */
  static updateOneUsername(id, newUsername) {
    const user = Users.findOneById(id);

    if (user) {
      user.username = newUsername;
      return user;
    }
  }

  /**
   * Update a User.
   * @param {string} id - id of User to update
   * @param {string} newPassword - new password
   * @return {User | undefined} - updated User
   */
  static updateOnePassword(id, newPassword) {
    const user = Users.findOneById(id);

    if (user) {
      user.password = newPassword;
      return user;
    }
  }

  /**
   * Delete a User
   * @param {string} id - id of User to delete
   * @return {User | undefined} - deleted User
   */
  static deleteOne(id) {
    const user = Users.findOneById(id);
    data = data.filter((s) => s.id !== id);
    return user;
  }
}

module.exports = Users;
