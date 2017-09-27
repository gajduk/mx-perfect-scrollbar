define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",

    "mendix/lang",
    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/query",
    "dojo/_base/event",
    "PerfectScrollbar/widget/perfect-scrollbar.min"
], function (declare, _WidgetBase, mxlang, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml,
      dojoQuery, dojoEvent, Ps) {
    "use strict";

    return declare("PerfectScrollbar.widget.PerfectScrollbar", [ _WidgetBase ], {

        //widget parameters
        scrollToAttribute: "",

        // Internal variables.
        _handles: null,
        _contextObj: null,

        _container: null,

        constructor: function () {
            this._handles = [];
        },

        update: function (obj, callback) {
            this._contextObj = obj;
            this._updateRendering(callback);
        },

        uninitialize: function () {
        },

        _activateScrollBar: function() {
          var self = this;
          if ( self._container.classList.contains('ps') ) {
            Ps.update(self._container);
          }
          else {
            Ps.initialize(self._container);
          }
          if ( self._contextObj && self._contextObj.get(self.scrollToAttribute) )
             self._scrollToMe(self._container, + (self._contextObj.get(self.scrollToAttribute)+''));
        },

        _updateRendering: function (callback) {
            var self = this;
            self._container = self.domNode.parentNode;
            self._activateScrollBar();
            self._executeCallback(callback, "_updateRendering");
        },

        _scrollToMe: function(container, offset) {
          var self = this;
          if ( offset == 0 ) return;
          container.scrollTop = offset;
          Ps.update(container);
        },

        // Shorthand for executing a callback, adds logging to your inspector
        _executeCallback: function (cb, from) {
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["PerfectScrollbar/widget/PerfectScrollbar"]);
