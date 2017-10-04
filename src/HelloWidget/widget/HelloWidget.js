define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
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
    "dojo/_base/event",
    "HelloWidget/lib/jquery-1.11.2",

    // Add External Libraries
    "HelloWidget/lib/picker",
    "HelloWidget/lib/picker.date",

    "dojo/text!HelloWidget/widget/template/HelloWidget.html"
], function(declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent, _jQuery, _picker, _datepicker, widgetTemplate) {
    "use strict";

    var $ = _jQuery.noConflict(true);

    return declare("HelloWidget.widget.HelloWidget", [_WidgetBase, _TemplatedMixin], {

        templateString: widgetTemplate,


        widgetBase: null,

        // Modeler 
        dateFormat: "",
        onCloseMicroflow: "",

        // Internal variables.
        _handles: null,
        _contextObj: null,

        constructor: function() {
            this._handles = [];
        },

        postCreate: function() {
            logger.debug(this.id + ".postCreate");
        },

        update: function(obj, callback) {
            logger.debug(this.id + ".update");
            console.debug("received microflow " + this.onCloseMicroflow + " to call.");
            var $element = $(".date", this.domNode.firstElementChild),
                options = {
                    format: this.dateFormat
                };
            this._initDatepicker($element, options);

            this._contextObj = obj;
            mx.data.action({
                params: {
                    applyto: "selection",
                    actionname: this.onCloseMicroflow,
                    guids: [this._contextObj.getGuid()]
                },
                origin: this.mxform,
                callback: function(res) {
                    console.log(res);
                },
                error: function(error) {
                    alert(error.message);
                }
            });
            this._updateRendering(callback);
        },

        resize: function(box) {
            logger.debug(this.id + ".resize");
        },

        uninitialize: function() {
            logger.debug(this.id + ".uninitialize");
        },

        /**
         * Initialize the Datepicker
         * @param {Object} $el - jquery object on which to init the datepicker
         * @param {Object} options - options to set for the datepicker
         */
        _initDatepicker: function($el, options) {
            console.debug("initializing datepicker on the following node: ");
            console.debug($el);
            var $input = $el.pickadate(options);
            return $input.pickadate("picker");
        },

        _updateRendering: function(callback) {
            logger.debug(this.id + "._updateRendering");

            if (this._contextObj !== null) {
                dojoStyle.set(this.domNode, "display", "block");
            } else {
                dojoStyle.set(this.domNode, "display", "none");
            }

            this._executeCallback(callback);
        },

        _executeCallback: function(cb) {
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["HelloWidget/widget/HelloWidget"]);