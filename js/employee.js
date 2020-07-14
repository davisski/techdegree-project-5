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
/**
 * @function - Creates modal, and navigates through all fetched employees or search result employees - to show  each employee data.
 * @param {Array} employees - Array of employess objects.
 * @param {Number} currentIndex - Number of clicked employee card.
 *
 */
const modal = (employees, currentIndex) => {
  let index = currentIndex;
  const body = document.querySelector("body");

  const createModal = (obj) => {
    const date = obj.dob.date
      .slice(0, 10)
      .replace(/^(\d{4})-(\d{2})-(\d{2})/, "$2/$3/$1");
    const adress = `${obj.location.street.number} ${obj.location.street.name}.,${obj.location.state}, ${obj.location.postcode}`;

    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-container";
    modalContainer.innerHTML = `<div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${obj.picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${obj.name.first}</h3>
          <p class="modal-text">${obj.email}</p>
          <p class="modal-text cap">${obj.location.city}</p>
          <hr>
          <p class="modal-text">${obj.phone}</p>
          <p class="modal-text">${adress}</p>
          <p class="modal-text">Birthday: ${date}</p>
      </div>
    </div>
    <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>`;
    body.appendChild(modalContainer);
  };
  createModal(employees[index]);

  const openModal = () => {
    body.removeChild(body.lastElementChild);
    modal(employees, index);
  };

  document
    .querySelector("#modal-close-btn")
    .addEventListener("click", function () {
      this.parentNode.parentNode.remove();
    });

  document.querySelector("#modal-prev").addEventListener("click", (e) => {
    if (index > 0) {
      index--;
      openModal();
    } else {
      e.preventDefault();
    }
  });
  document.querySelector("#modal-next").addEventListener("click", (e) => {
    if (index < employees.length - 1) {
      index++;
      openModal();
    } else {
      e.preventDefault();
    }
  });
};

/**
 * @param {Array} employees - Array of employees objects.
 */
const handleCardClick = (employees) => {
  [...document.querySelectorAll(".card")].forEach((card) =>
    card.addEventListener("click", (e) => {
      currentIndex = e.currentTarget.dataset.index++;
      modal(employees, currentIndex);
    })
  );
};

/**
 * @function - Creates seach form, then @listens on @event {'submit'}. Checks if search query includes in full name.
 * store matched employees to @global @var {searchResults}. Displays searched employees.
 * @function {displayEmployees} - Call to display employees of search results array.
 * @function {handleCardClick} - Call to handle every searched employee card click.
 */
const search = () => {
  document.querySelector(".search-container").insertAdjacentHTML(
    "beforeend",
    ` <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>`
  );
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const query = document.querySelector("#search-input").value;

    employees.forEach((employee) => {
      const fullName = `${employee.name.first} ${employee.name.last}`;

      if (fullName.toLowerCase().includes(query.toLowerCase())) {
        searchResults.push(employee);
      }
      if (searchResults.length > 0) {
        displayEmployees(searchResults);
      } else {
        document.getElementById(
          "gallery"
        ).innerHTML = `<h1>Sorry! 🙄 no results!</h1>`;
      }
    });
    handleCardClick(searchResults);
    searchResults = [];
  });
};
// Fetch employees
fetchEmployees()
  .then((res) => {
    employees = res.results;
    displayEmployees(employees);
    handleCardClick(employees);
    search();
  })
  .catch((err) => console.log(err));
