const AddonsApi = require('ascesis-storybook/addons');


customElements.define('readme-manager', class extends HTMLElement {
  connectedCallback(){
    AddonsApi.getChannel().on('plugin-readme', (data) => {
      this.innerHTML = data;
    });
    AddonsApi.onStory((story, storyKind) => {
      this.innerHTML = '';
    });
  }
});

AddonsApi.addPanel('README', () => `<readme-manager></readme-manager>`);

function withReadme(readme, render){
  return (story) => {
    AddonsApi.getChannel().emit('plugin-readme', readme);
    return (render || story)();
  }
}

module.exports = {
  withReadme
}
