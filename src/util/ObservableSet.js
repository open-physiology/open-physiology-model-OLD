import {Subject} from 'rxjs/Subject';
import assert    from 'power-assert';

const $$set               = Symbol('$$set');
const $$addSubject        = Symbol('$$addSubject');
const $$deleteSubject     = Symbol('$$deleteSubject');
const $$disableNextReplay = Symbol('$$disableNextReplay');

class AddReplaySubject extends Subject {
	constructor(initialSet) {
		super();
		assert(initialSet[Symbol.iterator]);
		this._setReference = initialSet;
	}
	normalSubscribe(...args) {
		this[$$disableNextReplay] = true;
		return this.subscribe(...args);
	}
	// noinspection JSDuplicatedDeclaration
	_subscribe(subscriber) {
		const subscription = super._subscribe(subscriber);
		if (subscription && !subscription.isUnsubscribed && !this[$$disableNextReplay]) {
			for (let v of this._setReference) { subscriber.next(v) }
		}
		this[$$disableNextReplay] = false;
		return subscription;
	}
}


export default class ObservableSet extends Set {
	
	constructor() {
		super();
		// this[$$set]           = new Set();
		this[$$deleteSubject] = new Subject();
		this[$$addSubject]    = new AddReplaySubject(this);
		this[$$deleteSubject].subscribe      (::this.delete);
		this[$$addSubject]   .normalSubscribe(::this.add   );
	}
	
	e(op) {
		switch (op) {
			case 'add':    { return this[$$addSubject]    }
			case 'delete': { return this[$$deleteSubject] }
		}
	}
	
	get [Symbol.toStringTag]() { return 'set' }
	
	// get size() { return this[$$set].size }
	
	add(obj) {
		if (!super.has(obj)) {
			super.add(obj);
			this.e('add').next(obj);
		}
		return this;
	}
	delete(obj) {
		if (super.has(obj)) {
			super.delete(obj);
			this.e('delete').next(obj);
			return true;
		} else {
			return false;
		}
	}
	// clear            ()    { this[$$set].clear(); return this;         }
	// has              (obj) { return this[$$set].has(obj)               }
	// entries          ()    { return this[$$set].entries()              }
	// keys             ()    { return this[$$set].keys   ()              }
	// values           ()    { return this[$$set].values ()              }
	// forEach          (fn)  { for (let x of this[$$set]) fn(x, x, this) }
	// [Symbol.iterator]()    { return this.values()                      }
	
}

export function setEquals(setA, setB) {
	setA = new Set(setA);
	setB = new Set(setB);
	if (setA.size !== setB.size) return false;
	for (var a of setA) if (!setB.has(a)) return false;
	return true;
}

export function transformSet(reference, newContent) {
	newContent = new Set(newContent);
	for (let e of reference) {
		if (!newContent.has(e)) {
			reference.delete(e);
		}
	}
	for (let e of newContent) {
		if (!reference.has(e)) {
			reference.add(e);
		}
	}
}
