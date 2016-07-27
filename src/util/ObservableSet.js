import ValueTracker, {event} from "./ValueTracker";

const $$set = Symbol('$$set');

export default class ObservableSet extends ValueTracker {
	
	@event() addEvent;
	@event() deleteEvent;
	
	constructor() {
		super();
		this[$$set] = new Set();
		this.e('add')   .subscribe(::this.add   );
		this.e('delete').subscribe(::this.delete);
	}
	
	get [Symbol.toStringTag]() { return 'set' }
	
	s(op: 'add' | 'delete') {
		switch (op) {
			case 'add':    return this.e('add');
			case 'delete': return this.e('delete');
		}
	}
	
	get size() { return this[$$set].size }
	
	add(obj) {
		if (!this[$$set].has(obj)) {
			this[$$set].add(obj);
			this.e('add').next(obj);
		}
		return this;
	}
	delete(obj) {
		if (this[$$set].has(obj)) {
			this[$$set].delete(obj);
			this.e('delete').next(obj);
			return true;
		} else {
			return false;
		}
	}
	clear            ()    { this[$$set].clear(); return this;         }
	has              (obj) { return this[$$set].has(obj)               }
	entries          ()    { return this[$$set].entries()              }
	keys             ()    { return this[$$set].keys   ()              }
	values           ()    { return this[$$set].values ()              }
	forEach          (fn)  { for (let x of this[$$set]) fn(x, x, this) }
	[Symbol.iterator]()    { return this.values()                      }
	
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
