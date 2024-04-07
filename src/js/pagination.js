// Import the Pagination library and its CSS
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

// Select the pagination element
export const paginationEl = document.querySelector('.tui-pagination');

// Define pagination options
const options = {
  totalItems: 500,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  usageStatistics: false,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton: '<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></a>',
    disabledMoveButton: '<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></span>',
    moreButton: '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>',
  },
};

// Hide pagination initially until data is loaded
paginationEl.classList.add('visually-hidden');

// Initialize pagination
export const pagination = new Pagination('pagination', options);

// Get the current page and render corresponding gallery
export const page = pagination.getCurrentPage();
pagination.on('beforeMove', onPage);

// Function to render gallery based on page change
function onPage(event) {
  const currentPage = event.page;
  // Placeholder code to simulate gallery rendering
  console.log(`Rendering gallery for page ${currentPage}`);
}