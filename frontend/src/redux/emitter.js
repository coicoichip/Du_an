import EventEmitter from 'events';

// eslint-disable-next-line no-underscore-dangle
const _emitter = new EventEmitter();
_emitter.setMaxListeners(0); // unlimit listener

export const emitter = _emitter;
