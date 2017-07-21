const AddonsApi = require('ascesis-storybook/js/addons');
const InspectorJSON = require('Inspector-JSON');
const {createMockedConsole, inspectorStyles} = require('./mockedConsole');

const mockedConsole = createMockedConsole();

customElements.define('console-manager', class extends HTMLElement {
  connectedCallback(){
    this.inspector = new InspectorJSON({
      element: 'console',
      json: JSON.stringify({hello: 'world'}),
      collapsed: true
    });

    AddonsApi.getChannel().on('plugin-console', (data) => {
      this.inspector.view(JSON.stringify(mockedConsole.history()))
    })
  }
});

AddonsApi.addPanel('CONSOLE', () => `<console-manager>
  <style>${inspectorStyles}</style>
  <div id="console"></div>
</console-manager>`);

function withConsole(render){
  window.console = mockedConsole;
  return (story) => {
    AddonsApi.getChannel().emit('plugin-console');
    return (render || story)();
  }
}

module.exports = {
  withConsole
}
