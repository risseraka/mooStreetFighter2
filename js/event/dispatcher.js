var EventDispatcher = new Class({
    listeners: {},
    events: {},

    removeListener: function (eventName, callback, target) {
        if (!callback)
            return removeAllListener(eventName);
        var i = -1;
        this.listeners[event].each(function (listener, index) {
            if (listener.callback == callback && listener.target == target) {
                i = index;
            }
        });
        if (i > -1)
            this.listeners.slice(i, 1);
    },

    removeAllListener: function (eventName) {
        this.listeners[eventName] = [];
    },

    addListener: function (eventName, callback, scope) {
        if (!this.listeners[eventName])
            this.listeners[eventName] = [];
        var dispatchEvent = {
            eventName: eventName,
            scope: scope,
            callback: callback
        }
        this.listeners[eventName].push(dispatchEvent);
    },

    fireEvent: function (event, data) {
        if (this.listeners[event]) {
            this.listeners[event].each(function (listener, index) {
                listener.callback.apply(listener.scope, data);
            })
        }
    }
})

var GlobalDispatcher = new EventDispatcher();

var sfEvent = {
    ANIMATION_START: 'sf2.animation.start',
    ANIMATION_RUNNING: 'sf2.animation.running',
    ANIMATION_END: 'sf2.animation.end',
    ON_ATTACK_START: 'sf2.attack.start',
    ON_ATTACK_END: 'sf2.attack.end',
    ON_INPUT_READY: 'sf2.input.ready',
    ON_INPUT_PUSHED: 'sf2.input.keypushed',
    ON_INPUT_PRESSED: 'sf2.input.keypressed',
    ON_INPUT_RELEASED: 'sf2.input.keyreleased'
}
