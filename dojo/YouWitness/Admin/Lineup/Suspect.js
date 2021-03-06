define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'Sds/Form/_FormMixin',
    'dojo/Evented',
    'dojo/text!./Template/Suspect.html',
    'Sds/Form/Select'
], function(
        declare,
        lang,
        domConstruct,
        Widget,
        TemplatedMixin,
        WidgetsInTemplateMixin,
        FormMixin,
        Evented,
        template
        ) {
    return declare(
            [Widget, TemplatedMixin, WidgetsInTemplateMixin, FormMixin, Evented],
            {
                templateString: template,
                suspectId: 0,
                suspectImage: null,
                isPerpetrator: false,
                constructor: function(props) {
                    lang.mixin(this, props);
                },
                onRemove: function()
                {
                    this.emit('remove',{});
                },
                _setSuspectIdAttr: {
                    node: "idNode",
                    type: "innerHTML"
                },
                _setSuspectImageAttr: function(image) {
                    domConstruct.empty(this.imageNode);
                    if (image && image.length > 0) {
                        domConstruct.create('img', {
                            src: image,
                            width: 100
                        }, this.imageNode);
                    }
                },
                _getValueAttr: function() {
                    var val = this.inherited(arguments);
                    val.suspectId = this.get('suspectId');
                    val.suspectImage = this.get('suspectImage');
                    return val;
                }
            }
    );
});