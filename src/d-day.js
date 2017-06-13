(function(window, document, undefined) {
  var thatDoc = document;

  var thisDoc =  (thatDoc._currentScript || thatDoc.currentScript).ownerDocument;

  var Day = Object.create(HTMLElement.prototype);

  Day.createdCallback = function() {

  };

  window.CalendarDay = thatDoc.registerElement('d-day', {
    prototype: Day
  });
})(window, document);
