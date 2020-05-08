
import StatusCommand from '../../commands/status';

describe('status command tests', () => {
    it('does return', async () => {
        let spy = jest.spyOn(process.stdout, 'write');

		await StatusCommand.run([]);
        expect(spy).toHaveBeenCalled(); //Update this to toHaveBeenCalledWith(expected print out)
        
        // find a way to test he condition and fake the dataservice as well as check only one output instead of all output.
    })
})