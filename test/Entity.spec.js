import {xdescribe, describe, it, expect} from './test.helper';
import {LyphType, BorderTemplate} from '../src/index';

describe("Entity classes", () => {
	
	it("can be superseded by custom subclasses", async () => {
		
		let MyLyphType = LyphType.supersede((SuperClass) => class MyLyphType extends SuperClass {
			
			constructor(...args) {
				super(...args);
				this.answer = 42;
			}
			
			getAnswer() { return this.answer }
			
			get name() { return '(' + super.name + ')' }
			
			set name(val) { super.name = val }
			
		});
		
		expect(MyLyphType).to.have.property('name', 'MyLyphType');
		expect(LyphType.hasSubclass(MyLyphType)).to.be.true;
		
		/* We create a new 'LyphType' */
		let lyph = LyphType.new({ name: 'heart' });
		await lyph.commit();
		
		/* and this should actually result in a 'MyLyphType' instance */
		expect(lyph).to.be.instanceof(LyphType, MyLyphType);
		expect(lyph.answer).to.equal(42);
		expect(lyph.getAnswer()).to.equal(42);
		
		expect(lyph.name).to.equal('(heart)');
		
		lyph.name = 'lungs';
		
		expect(lyph.name).to.equal('(lungs)');
		
	});
	
});
