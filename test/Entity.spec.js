import {xdescribe, describe, it, expect} from './test.helper';
import moduleFactory from '../src/index';

describe("Entity classes", () => {
	
	let module;
	beforeEach(() => { module = moduleFactory() });
	
	
	it("can be superseded by custom subclasses", async () => {

		const {Lyph} = module.classes;

		let MyLyph = Lyph.supersede((SuperClass) => class MyLyph extends SuperClass {

			constructor(...args) {
				super(...args);
				this.answer = 42;
			}

			getAnswer() { return this.answer }

			get name() { return '(' + super.name + ')' }

			set name(val) { super.name = val }

		});

		expect(MyLyph).to.have.property('name', 'MyLyph');
		expect(Lyph.hasSubclass(MyLyph)).to.be.true;

		/* We create a new 'LyphType' */
		let lyph = Lyph.new({ name: 'heart' });
		await lyph.commit();

		/* and this should actually result in a 'MyLyphType' instance */
		expect(lyph).to.be.instanceOf(Lyph, MyLyph);
		expect(lyph.answer)     .to.equal(42);
		expect(lyph.getAnswer()).to.equal(42);

		expect(lyph.name).to.equal('(heart)');

		lyph.name = 'lungs';

		expect(lyph.name).to.equal('(lungs)');

	});
	
});
