const $find = (selector, context = document) => Array.prototype.slice.apply( context.querySelectorAll(selector) );
const $append = (markup, parent) => {
  let temp_container = document.createElement('div');
  temp_container.innerHTML = markup;
  while(temp_container.firstChild){
    parent.appendChild(temp_container.firstChild);
  }
};
const $prepend = (markup, parent) => {
  let temp_container = document.createElement('div');
  temp_container.innerHTML = markup;
  while(temp_container.firstChild){
    parent.insertBefore(temp_container.firstChild, parent.firstElementChild);
  }
};
module.exports = {
  $find, $append, $prepend
}
