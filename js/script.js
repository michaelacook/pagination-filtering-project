/*
Full Stack JavaScript project 2 - pagination and filtering 

by Michael Cook

I am aiming for "Exceeds Expectations" but will accept "Meets Expectations"
*/


/* GLOBAL VARIABLES - all student list items and number of items to display per page.
listItems is defined with 'var' because it is reassigned when the user filters the list items,
and it needs to be globally available, making 'var' appropriate
*/
var listItems = document.querySelector('.student-list').getElementsByTagName('li');
const itemsPerPage = 10;



/* ------------------------------------------------- FUNCTIONS ------------------------------------------------- */


/**
 * Dynamically divide student list items into pages and set display value of items not on current page to 'none' 
 * @param {Collection} list - list items to be paginated
 * @param {Number} page - page number
 */
const showPage = (list, page) => {
   console.log(page)
   const startIndex = (page * itemsPerPage) - itemsPerPage; 
   const endIndex = startIndex + 10;
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         listItems[i].style.display = 'block';
      } else {
         listItems[i].style.display = 'none';
      }
   }
}


/**
 * Generate and append pagination nav links to the page
 * @param {Collection} list - list items being paginated
 */
const appendPageLinks = (list) => {
   const navDiv = document.createElement('DIV');
   navDiv.className = 'pagination';
   const ul = document.createElement('UL');
   const numberOfLinks = Math.ceil(list.length / itemsPerPage);
   for (let i = 0; i < numberOfLinks; i++) {
      const li = document.createElement('LI');
      const a = document.createElement('A');
      a.setAttribute('href', '#');

      /* The 'data-page` attribute on each link will contain the 
      page number associated with the link, making it easy to pass 
      the page number for a link into the showPage function dynamically */
      a.setAttribute('data-page', i + 1);
      a.textContent = i + 1;
      if (i === 0) a.className = 'active';
      li.appendChild(a);
      ul.appendChild(li);
   }
   navDiv.appendChild(ul);
   document.querySelector('.page').appendChild(navDiv);
   addNavEventListeners();
}


/**
 * Loop over pagination nav links and add the click event listener 
 * Function definition is used so the function is hoisted and available inside appendPageLinks
 * This is necessary because the function otherwise would not have access to the pagination nav if defined before appendPageLinks
 * I did this because I wanted to be able to call this function inside appendPageLinks instead of calling them separately
 */
function addNavEventListeners() {
   const links = document.querySelector('.pagination').children[0].querySelectorAll('a');
   for (let i = 0; i < links.length; i++) {
      let a = links[i];
      a.addEventListener('click', e => {
         for (let j = 0; j < links.length; j++) {
            links[j].classList.remove('active');
         }
         a.className = 'active';
         const page = parseInt(a.getAttribute('data-page'));
         showPage(listItems, page);
      });
   }
}


/**
 * Generate and append a search bar to the page header
 */
const appendSearchBar = () => {
   const div = document.createElement('DIV');
   div.innerHTML = `<input placeholder="Search for students...">
                    <button>Search</button>`;
   div.className = 'student-search';
   const header = document.querySelector('.page-header');
   header.appendChild(div);
}


/**
 * Remove pagination nav links. Needed to prevent extra pagination navs from being added when filtering 
 * Without this function, each time the user filters or unfilters list items a new pagination nav would be appended to the page
 */
const removePageLinks = () => document.querySelector('.pagination').remove();


/**
 * Set listItems variable to subset of filtered items
 * @param {Collection} list - list of students to be filtered 
 * @param {String} searchKey - the search value entered by the user 
 */
const setFilteredList = (searchKey) => {
   const results = [];
   for (let i = 0; i < listItems.length; i++) {
      const name = listItems[i].querySelector('h3').textContent;
      if (name.includes(searchKey)) {
         results.push(listItems[i]);
      } else {
         listItems[i].style.display = 'none';
      }
   }
   listItems = results;
}


/**
 * Sets the listItems variable to all list items in the ul
 * Needed because the filter method resets the listItems variable to a subset of filtered items
 */
const setDefaultList = () => listItems = document.querySelector('.student-list').getElementsByTagName('li');


/**
 * Calls a series of functions in sequence to correctly make the filtering feature work
 * If no searchKey value given or searchKey is an empty string, show page defaults
 * @param {String} searchKey - search term entered by user in search field
 */
const filter = (searchKey) => {

   // calling setDefaultList each time prevents filtering of already filtered data, which would prevent some search results from displaying
   setDefaultList();
   if (searchKey) {
      setFilteredList(searchKey);
   } else {
      setDefaultList();
   }
   removePageLinks();
   showPage(listItems, 1);
   appendPageLinks(listItems);
}




/* ------------------------------------------------- FUNCTION CALLS ------------------------------------------------- */


// Append search bar 
appendSearchBar();


// Show page 1 by default
showPage(listItems, 1);


// Add pagination nav links
appendPageLinks(listItems);





/* ------------------------------------------------- EVENT LISTENERS ------------------------------------------------- */


// Listen for search button click, filter results on click if search term entered
const searchBtn = document.querySelector('.student-search')
   .querySelector('button');
searchBtn.addEventListener('click', e => {
   const searchKey = searchBtn.previousElementSibling.value;
   filter(searchKey);
});


// Listen for keyup events on search input, use input value to filter list items
const input = document.querySelector('input');
input.addEventListener('keyup', e => {
   const searchKey = input.value;
   filter(searchKey);
});
