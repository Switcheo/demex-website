import { BN_ZERO, parseNumber } from "@demex-info/utils";
import BigNumber from "bignumber.js";
import { CarbonSDK, WSModels } from "carbon-js-sdk";
import { TokenClient } from "carbon-js-sdk/lib/clients";

export interface Collateral {
    amount: BigNumber;
    denom: string;
    cibt_denom: string;
  }
  
  export interface WSCollateral {
    [key: number]: WSModels.CDPCollateral;
  }

  export const parseCollateral = (data: WSCollateral, tokenClient: TokenClient): Collateral[] => {
    const collateralArr = (Object.values(data) ?? []) as WSModels.Collateral[];
    if (!collateralArr || collateralArr.length <= 0 || !tokenClient) return [];
    return collateralArr.map((collateral: WSModels.Collateral) => {
      const { cibt_denom, denom, collateral_amount } = collateral;
      return {
        denom: denom ?? "",
        amount: parseNumber(collateral_amount, BN_ZERO)!,
        cibt_denom: cibt_denom ?? "",
      };
    });
  };

  export async function getCollateral(sdk: CarbonSDK): Promise<BigNumber> {

    const totalCollateral = await sdk.cdp.getModuleTotalCollateralUsdVal();
  
    return totalCollateral;
  }