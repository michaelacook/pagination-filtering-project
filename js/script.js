/*
Full Stack JavaScript project 2 - pagination and filtering 
Michael Cook

I am aiming for "Exceeds Expectations" but will accept "Meets Expectations"
*/

// Globals - all student list items and number of items to display per page
const listItems = document.querySelector('.student-list').getElementsByTagName('li');
const itemsPerPage = 10;


/**
 * Dynamically divide student list items into pages and set display value of items not on current page to 'none' 
 * @param {Collection} list - list items to be paginated
 * @param {Number} page - page number
 */
const showPage = (list, page) => {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = (page * itemsPerPage) + itemsPerPage;;
   for (let i = 0; i < listItems.length; i++) {
      if (i >= startIndex && i < endIndex) {
         listItems[i].style.display = 'block';
      } else {
         listItems[i].style.display = 'none';
      }
   }
}


/**
 * Generate and append pagination nav buttons to the page
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
}


// Show page 1 by default
showPage(listItems, 1);


// Add pagination nav links
appendPageLinks(listItems);


// Listen for click of a pagination nav link, make clicked link active and call showPage()
const nav = document.querySelector('.pagination');
nav.addEventListener('click', e => {
   if (e.target.tagName == 'A') {
      const navLinks = nav.getElementsByTagName('a');

      // get page from data-page attribute of clicked link, convert to number
      const page = parseInt(e.target.getAttribute('data-page'));
      for (let i = 0; i < navLinks.length; i++) {
         navLinks[i].classList.remove('active');
      }
      e.target.className = 'active';
      showPage(listItems, page);
   }
});

