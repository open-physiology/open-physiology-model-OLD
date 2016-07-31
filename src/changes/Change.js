import Graph from "graph.js/dist/graph";


const $$changes = Symbol('$$changes');

const $$class   = Symbol('$$class');
const $$props   = Symbol('$$props');
const $$revDeps = Symbol('$$revDeps');
const $$causes  = Symbol('$$causes');
const $$Change  = Symbol('$$Change');

const $$commitUpToHere = Symbol('$$commitUpToHere');
const $$commitForcedFromHere  = Symbol('$$commitForcedFromHere' );

const ChangeT = (tracker) => class Change {
	
	constructor({ changeDependencies = [], changeCauses = [] } = {}) {
		const g = tracker[$$changes];
		g.addVertex(this, this);
		for (let dep of changeDependencies) { g.addEdge(this, dep, {})               }
		for (let dep of changeCauses)       { g.addEdge(this, dep, { forced: true }) }
	}
	
	run() { assert(false, `Change subclass must override 'run'`) }
	
	async commit() {
		this.committed = true;
	}
	
	rollback() { assert(false, `Change subclass must override 'rollback'`) }
	
	async commitUpToHere() {
		if (!this.committed) {
			await this[$$commitUpToHere]();
			await this.commit();
		}
		await this[$$commitForcedFromHere]();
	}
	
	async [$$commitUpToHere]() {
		for (let [dep] of tracker[$$changes].verticesTo(this)) {
			if (!dep.committed) {
				await dep[$$commitUpToHere]();
				await dep.commit();
			}
		}
		
	}
	
	async [$$commitForcedFromHere]() {
		for (let [rdep,, {forced}] of tracker[$$changes].verticesFrom(this)) {
			if (forced) {
				if (!rdep.committed) {
					await rdep.commit();
				}
				await rdep[$$commitForcedFromHere]();
			}
		}
	}
	
	rollbackToHere() {
		
	}
};

class ChangeTracker {
	
	get Change() {
		if (!this[$$Change]) {
			this[$$Change] = ChangeT(this);
		}
		return this[$$Change];
	}
	
	constructor() {
		this[$$changes] = new Graph();
	}
	
}

export const tracker = new ChangeTracker();


// export class CreateEntity extends Change {
//
// 	constructor(cls, props = {}, options = {}) {
// 		super(options);
// 		this[$$class] = cls;
// 		this[$$props] = props;
// 	}
//
// 	run() {
//
// 	}
//
// 	commit() {
//
// 	}
//
// 	rollback() {
//
// 	}
//
// }
//
// export class DeleteEntity extends Change {}
//
// export class SetPropertyField extends Change {}
//
// export class SetSideField extends Change {}
//
// export class SetRel1Field extends Change {}
//
// export class SetRel1ShortcutField extends Change {}
//
// export class SetRel$Field extends Change {}
//
// export class SetRel$ShortcutField extends Change {}

