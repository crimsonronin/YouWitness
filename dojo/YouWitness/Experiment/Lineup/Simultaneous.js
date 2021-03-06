define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/query',
    'dojo/dom-construct',
    './SimultaneousSuspect',
    'dojo/store/JsonRest',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/Evented',
    'dojo/text!./Template/Simultaneous.html',
    'dojo/NodeList-dom'
], function(
        declare,
        lang,
        array,
        query,
        domConstruct,
        SimultaneousSuspect,
        JsonRest,
        Widget,
        TemplatedMixin,
        WidgetsInTemplateMixin,
        Evented,
        template
        ) {
    return declare(
            [Widget, TemplatedMixin, WidgetsInTemplateMixin, Evented],
            {
                suspects: new Array(),
                current: 0,
                lineupId: 0,
                templateString: template,
                constructor: function() {
                    this.store = JsonRest({target: '/experiment/lineup'});
                },
                _setSuspectsAttr: function(suspects) {
                    this.suspects = suspects;
                },
                show: function() {
                    this.showSuspects(this.suspects);
                },
                showSuspects: function(suspects) {
                    var cont;
                    var total = suspects.length;
                    array.forEach(suspects, lang.hitch(this, function(suspect, i) {
                        if (i % 3 == 0) {
                            cont = domConstruct.create('div', {'class': 'row-fluid'});
                        }
                        var s = new SimultaneousSuspect(suspect);
                        s.startup();
                        s.on('selected', lang.hitch(this, function() {
                            this.set('current', s);
                            this.removeAllActive();
                            s.setActive();
                        }));
                        cont.appendChild(s.domNode);

                        if (i == (total - 1) || ((i + 1) % 3)) {
                            this.suspectsContainerNode.appendChild(cont);
                        }
                    }));
                },
                onNoPerpetrator: function() {
                    this.removeAllActive();
                    query(this.btnNode).addClass('active');
                    this.set('current', {isPerpetrator: 'false'});
                },
                removeAllActive: function() {
                    query('.btn.active', this.domNode).removeClass('active');
                },
                onNext: function() {
                    var current = this.get('current');
                    if (current.isPerpetrator == 'false') {
                        var data = {
                            lineup: 'Simultaneous',
                            lineupId: this.get('lineupId'),
                            suspectId: 0,
                            isPerpetrator: 'false'
                        };
                    } else {
                        var data = {
                            lineup: 'Simultaneous',
                            lineupId: this.get('lineupId'),
                            suspectId: current.get('suspectId'),
                            isPerpetrator: 'true'
                        };
                    }
                    this.store.put(data);
                    this.emit('finished', {});
                }
            }
    );
});