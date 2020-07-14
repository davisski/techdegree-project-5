let employees;
let currentIndex;
let searchResults = [];

/**
 * @function - Fetch data from public API.
 *
 */
const fetchEmployees = async () => {
  const response = await fetch(
    `https://randomuser.me/api/1.3/?nat=us,gb&results=12`
  );
  return await response.json();
};
