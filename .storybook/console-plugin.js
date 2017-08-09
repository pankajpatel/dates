require('inspector-component/lib');
const AddonsApi = require('ascesis-storybook/addons.js');
const {createMockedConsole} = require('./mockedConsole');

const mockedConsole = createMockedConsole((data) => {
  AddonsApi.getChannel().emit('plugin-console', data);
});

customElements.define('console-manager', class extends HTMLElement {
  connectedCallback(){
    this.history = [];
    this.inspector = this.querySelector('inspector-component');
    AddonsApi.getChannel().on('plugin-console', (data) => {
      if(data && data.LOG) {
        this.history.unshift(data['LOG'][0])
        this.inspector.log(this.history[0])
        window._console.log(this.history[0])
      }
    })
  }
});

AddonsApi.addPanel('CONSOLE', () => `<console-manager>
  <div id="console"><inspector-component></inspector-component></div>
</console-manager>`);

function withConsole(render){
  window._console = window.console;
  window.console = mockedConsole;
  return (story) => {
    AddonsApi.getChannel().emit('plugin-console');
    return (render || story)();
  }
}

module.exports = {
  withConsole
}
