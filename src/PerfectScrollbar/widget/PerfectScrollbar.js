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
    "PerfectScrollbar/widget/perfect-scrollbar"
], function (declare, _WidgetBase, mxlang, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml,
      dojoQuery, dojoEvent,PerfectScrollbarKlass) {
    "use strict";

    return declare("PerfectScrollbar.widget.PerfectScrollbar", [ _WidgetBase ], {

        //widget parameters
        customOptions: "{}",
        customOptionsJSON: "",
        scrollTopAttribute: "",
        scrollLeftAttribute: "",
        Ps: "",

        // Internal variables.
        _handles: null,
        _contextObj: null,

        _container: null,

        constructor: function () {
            this._handles = [];
        },

        update: function (obj, callback) {
            this._contextObj = obj;
            try {
                this.customOptionsJSON = JSON.parse(this.customOptions);
            } catch(e) {
                this.customOptionsJSON = {};
                console.log("ERROR - CustomOptions could not be parsed to JSON, therefore they will be ignored: "+e); // error in the above string (in this case, yes)!
            }
            this._updateRendering(callback);
        },

        uninitialize: function () {
        },

        _activateScrollBar: function() {
          var self = this;
          if ( self._container.classList.contains('ps') ) {
            self.Ps.update(self._container);
          }
          else {
            self.Ps = new PerfectScrollbarKlass(self._container,self.customOptionsJSON);
          }
          if ( self._contextObj && self._contextObj.get(self.scrollTopAttribute) )
             self._setElementAttribute(self._container,"scrollTop", + (self._contextObj.get(self.scrollTopAttribute)+""));
          if ( self._contextObj && self._contextObj.get(self.scrollLeftAttribute) )
             self._setElementAttribute(self._container,"scrollLeft", + (self._contextObj.get(self.scrollLeftAttribute)+""));
        },

        _updateRendering: function (callback) {
            var self = this;
            self._container = self.domNode.parentNode;
            self._activateScrollBar();
            self._executeCallback(callback, "_updateRendering");
        },

        _setElementAttribute: function(container, attribute, desiredValue) {
          var self = this;
          if ( desiredValue == 0 ) return;
          var numTries = 0;
          !function f(self,numTries) {
            if ( numTries++ > 35 ) return;
            self.Ps.update(container);
            container[attribute] = desiredValue;
            if ( Math.abs((container[attribute]-desiredValue)/desiredValue)>0.2)
              setTimeout(function() { f(self,numTries+1); },50);
          }(self,0);
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
