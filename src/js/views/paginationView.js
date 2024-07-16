import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline'); //closest method looks for the parent
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateButton(buttonVariant) {
    const currPage = this._data.page;
    const buttonClass = buttonVariant === 'prev' ? 'prev' : 'next';
    const buttonData = buttonVariant === 'prev' ? currPage - 1 : currPage + 1;
    const buttonIcon = buttonVariant === 'prev' ? 'left' : 'right';
    const flexDirection = buttonVariant === 'prev' ? 'rev' : '';

    return `
    <button class="btn--inline pagination__btn--${buttonClass} ${flexDirection}" data-goto="${buttonData}">
              <span>Page ${buttonData}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-${buttonIcon}"></use>
              </svg>
            </button>
    `;
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    // at page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateButton('next');
    }
    // at last page
    if (curPage === numPages && numPages > 1) {
      return this._generateButton('prev');
    }
    //other page
    if (curPage < numPages) {
      return `${this._generateButton('prev')} ${this._generateButton('next')}`;
    }
    // at page 1 and there are no other pages
    return '';
  }
}

export default new PaginationView();
