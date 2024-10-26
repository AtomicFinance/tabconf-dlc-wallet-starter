import Provider from '@atomicfinance/provider';
import {
  Input
} from '@atomicfinance/types';
import { InputsForDualAmountResponse } from '@atomicfinance/bitcoin-dlc-provider';

export default class ExtendedDlcProvider extends Provider {
  constructor() {
    super();
  }

  async GetInputsForAmount(
    amounts: bigint[],
    feeRatePerVb: bigint,
    fixedInputs: Input[] = [],
  ): Promise<Input[]> {
    console.log('test5 everyone');
    if (amounts.length === 0) return [];

    const fixedUtxos = fixedInputs.map((input) => input.toUtxo());

    if (fixedInputs.length > 0) {
      return fixedInputs;
    }

    let inputs: Input[];
    try {
      const inputsForAmount: InputsForDualAmountResponse = await this.getMethod(
        'getInputsForDualFunding',
      )(amounts, feeRatePerVb, fixedUtxos);

      inputs = inputsForAmount.inputs;
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      if (fixedInputs.length === 0) {
        throw Error(
          `Not enough balance getInputsForAmount. Error: ${errorMessage}`,
        );
      } else {
        inputs = fixedInputs;
      }
    }

    return inputs;
  }
}
