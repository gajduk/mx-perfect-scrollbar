define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",

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
    "PerfectScrollbar/widget/perfect-scrollbar.min",
    "dojo/text!PerfectScrollbar/widget/ui/perfect-scrollbar.min.css"
], function (declare, _WidgetBase, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml,
      dojoQuery, dojoEvent, Ps) {
    "use strict";

    return declare("PerfectScrollbar.widget.PerfectScrollbar", [ _WidgetBase ], {

        //widget parameters
        targetClass: "",
        scrollToAttribute: "",

        // Internal variables.
        _handles: null,
        _contextObj: null,

        constructor: function () {
            this._handles = [];
        },

        postCreate: function () {
            logger.debug(this.id + ".postCreate");
        },

        update: function (obj, callback) {
            logger.debug(this.id + ".update");

            this._contextObj = obj;
            this._updateRendering(callback);
        },

        resize: function (box) {
          logger.debug(this.id + ".resize");
        },

        uninitialize: function () {
          logger.debug(this.id + ".uninitialize");
        },

        _updateRendering: function (callback) {
            logger.debug(this.id + "._updateRendering");


            var container = dojoQuery("."+this.targetClass)[0];
            if ( container ) {
              Ps.initialize(container);
              if ( this._contextObj && this._contextObj.get(this.scrollToAttribute) )
                this._scrollToMe(container, + (this._contextObj.get(this.scrollToAttribute)+''));
            }
            this._executeCallback(callback, "_updateRendering");
        },

        _scrollToMe: function(container, offset) {
          var self = this;
          if ( offset == 0 ) return;
          container.scrollTop = offset;
          if ( container.scrollTop == 0 )
            setTimeout(function () { self._scrollToMe(container, offset); } ,50)
          Ps.update(container);
        },

        // Shorthand for running a microflow
        _execMf: function (mf, guid, cb) {
            logger.debug(this.id + "._execMf");
            if (mf && guid) {
                mx.ui.action(mf, {
                    params: {
                        applyto: "selection",
                        guids: [guid]
                    },
                    callback: lang.hitch(this, function (objs) {
                        if (cb && typeof cb === "function") {
                            cb(objs);
                        }
                    }),
                    error: function (error) {
                        console.debug(error.description);
                    }
                }, this);
            }
        },

        // Shorthand for executing a callback, adds logging to your inspector
        _executeCallback: function (cb, from) {
            logger.debug(this.id + "._executeCallback" + (from ? " from " + from : ""));
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["PerfectScrollbar/widget/PerfectScrollbar"]);
