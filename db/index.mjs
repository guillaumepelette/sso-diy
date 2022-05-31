export default {
  "admin@example.com": {
    password: "motdepassedelespace",
    firstName: "Toto",
    lastName: "Deschamps",
  }
}


/**
 * Find a record by key in a database
 * @param {*} db 
 * @param {*} key 
 * @returns Object or false
 */
export const findKeyInDb = (db, key) => {
  if (Object.keys(db).includes(key)) {
    return db[key];
  } else {
    return false;
  }
}