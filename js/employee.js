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
/**
 * @function - Renders HTML structure for employee object.
 * @param {Object} employee - Current employee object.
 * @param {Number} index - Position of array.
 */
const renderEmployeeHTML = (employee, index) => {
  return `<div class="card" data-index="${index}">
    <div class="card-img-container">
        <img class="card-img" src="${employee.picture.large}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
        <p class="card-text">${employee.email}</p>
        <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
    </div>
</div>`;
};

/**
 * @function - Renders employees to @const {galleryCont}.
 * @param {Array} arr - Array of employees objects.
 * @function {renderEmployeeHTML} - Renders HTML for every employee.
 */
const displayEmployees = (arr) => {
  const galleryCont = document.getElementById("gallery");
  galleryCont.innerHTML = ``;
  arr.forEach((employee, index) => {
    galleryCont.innerHTML += renderEmployeeHTML(employee, index);
  });
};

fetchEmployees()
  .then((res) => {
    employees = res.results;
    displayEmployees(employees);
  })
  .catch((err) => console.log(err));
