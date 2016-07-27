// TODO: Work in progress; forget about this for now


import {Subject} from 'rxjs/Subject';

/**
 * @class SetReplaySubject<T>
 */
export class SetReplaySubject extends Subject {
	constructor() {
		super();
		this._set = new Set;
	}
	nextAdd(value) {
		this._set.add(value);
		super.next({ op: 'add', value });
	}
	nextDelete(value) {
		this._set.delete(value);
		super.next({ op: 'delete', value });
	}
	_subscribe(subscriber) {
		for (let val of this._set) {
			subscriber.next(val);
		}
		return super._subscribe(subscriber);
	}
}
class SetReplayEvent {
	constructor(time, value) {
		this.time    = time;
		this.value   = value;
		this.op      = value[0];
		this.element = value[1];
	}
}
