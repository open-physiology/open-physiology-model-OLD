import {xdescribe, describe, it, expect} from './test.helper';
import moduleFactory from '../src/index';

describe("Entity classes", () => {
	
	let module;
	beforeEach(() => { module = moduleFactory() });
	
	
	it("can be superseded by custom subclasses", async () => {

		const {Lyph} = module.classes;

		let MyLyphType = Lyph.Type.supersede((SuperClass) => class MyLyphType extends SuperClass {

			constructor(...args) {
				super(...args);
				this.answer = 42;
			}

			getAnswer() { return this.answer }

			get name() { return '(' + super.name + ')' }

			set name(val) { super.name = val }

		});

		expect(MyLyphType).to.have.property('name', 'MyLyphType');
		expect(Lyph.Type.hasSubclass(MyLyphType)).to.be.true;

		/* We create a new 'LyphType' */
		let lyph = Lyph.Type.new({ name: 'heart' });
		await lyph.commit();

		/* and this should actually result in a 'MyLyphType' instance */
		expect(lyph).to.be.instanceof(Lyph.Type, MyLyphType);
		expect(lyph.answer).to.equal(42);
		expect(lyph.getAnswer()).to.equal(42);

		expect(lyph.name).to.equal('(heart)');

		lyph.name = 'lungs';

		expect(lyph.name).to.equal('(lungs)');

	});
	
});
