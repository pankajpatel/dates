const moment = require('moment');

(function(window, document, undefined) {
  // Refers to the "importer", which is index.html
  var thatDoc = document;

  // Refers to the "importee", which is src/dates-component.html
  var thisDoc =  (thatDoc._currentScript || thatDoc.currentScript).ownerDocument;

  // Gets content from <template>
  var template = thisDoc.querySelector('template#init').content;
  var month = thisDoc.querySelector('template#month').content;

  // Creates an object based in the HTML Element prototype
  var MyElementProto = Object.create(HTMLElement.prototype);

  // Creates the "who" attribute and sets a default value
  MyElementProto.who = 'World';

  // Fires when an instance of the element is created
  MyElementProto.createdCallback = function() {
    // Creates the shadow root
    var shadowRoot = this.createShadowRoot();

    // Adds a template clone into shadow root
    var clone = thatDoc.importNode(template, true);
    var clone1 = thatDoc.importNode(month, true);
    shadowRoot.appendChild(clone);
    shadowRoot.appendChild(clone1);

    // Caches <strong> DOM query
    this.strong = shadowRoot.querySelector('strong');

    // Checks if the "who" attribute has been overwritten
    if (this.hasAttribute('who')) {
      var who = this.getAttribute('who');
      this.setWho(who);
    }
    else {
      this.setWho(this.who);
    }
  };

  // Fires when an attribute was added, removed, or updated
  MyElementProto.attributeChangedCallback = function(attr, oldVal, newVal) {
    if (attr === 'who') {
      this.setWho(newVal);
    }
  };

  // Sets new value to "who" attribute
  MyElementProto.setWho = function(val) {
    this.who = val;

    // Sets "who" value into <strong>
    this.strong.textContent = this.who;
  };

  // Registers <dates-component> in the main document
  window.MyElement = thatDoc.registerElement('dates-component', {
    prototype: MyElementProto
  });
})(window, document);
