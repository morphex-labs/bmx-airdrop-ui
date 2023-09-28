import { BaseProvider } from '@ethersproject/providers';
import { BigNumber, ethers } from 'ethers';
import { useNetworkProvider } from '~/hooks';
import { useQuery } from 'react-query';
import { AIRDROP_CONTRACT } from '~/lib/contracts';
import { bonderABI } from '~/lib/abis/bonder';

async function fetchAmount(id: string, provider: BaseProvider | null) {
  if (!provider) return null;
  try {
    const contract = new ethers.Contract(AIRDROP_CONTRACT, bonderABI, provider);
    const airdropAmount = await contract.viewAirdropAmount(id);

    return BigNumber.from(airdropAmount);
  } catch (error) {
    return null;
  }
}

export function useGetAirdropAmount(id: string) {
  const { provider, network } = useNetworkProvider();

  return useQuery<BigNumber | null>(['airdropAmount', network, id], () => fetchAmount(id, provider));
}