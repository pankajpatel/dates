const AddonsApi = require('ascesis-storybook/js/addons');
const InspectorJSON = require('Inspector-JSON');
const {createMockedConsole, inspectorStyles} = require('./mockedConsole');

const mockedConsole = createMockedConsole((data) => {
  AddonsApi.getChannel().emit('plugin-console', data);
});

customElements.define('console-manager', class extends HTMLElement {
  connectedCallback(){
    this.inspector = new InspectorJSON({
      element: 'console',
      json: JSON.stringify(mockedConsole.history()),
      collapsed: false
    });
    this.history = [];
    AddonsApi.getChannel().on('plugin-console', (data) => {
      this.history.unshift(data['LOG'][0])
      this.inspector.view(JSON.stringify(this.history))
    })
  }
});

AddonsApi.addPanel('CONSOLE', () => `<console-manager>
  <style>${inspectorStyles}</style>
  <div id="console"></div>
</console-manager>`);

function withConsole(render){
  console = mockedConsole;
  return (story) => {
    AddonsApi.getChannel().emit('plugin-console');
    return (render || story)();
  }
}

module.exports = {
  withConsole
}
