import { runStatus } from '../../../../../utils/pipeline-augment';
import { createStepStatus } from '../pipeline-step-utils';

describe('Pipeline step utils', () => {
  it('Uses given status if not in progress', () => {
    const stepStatus = createStepStatus({ name: 'testing util' }, { reason: runStatus.Idle });
    expect(stepStatus.runStatus).toEqual(runStatus.Idle);
    expect(stepStatus.name).toEqual('testing util');
  });

  it('Returns pending for in progress without matching step', () => {
    const stepStatus = createStepStatus(
      { name: 'testing util' },
      { reason: runStatus['In Progress'] },
    );
    expect(stepStatus.runStatus).toEqual(runStatus.Pending);
    expect(stepStatus.name).toEqual('testing util');
  });
});
