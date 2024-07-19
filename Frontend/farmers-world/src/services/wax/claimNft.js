import {ContractKit} from '@wharfkit/contract'

export const claimNft = async (session, assetId) => {
    const CONTRACT_ADDRESS = 'p2ewgamelogi'
    try{
        const contractKit = new ContractKit({ client: session.client });
        const contract = await contractKit.load(CONTRACT_ADDRESS);
        const action = contract.action("claimtool", {
            wallet: session.permissionLevel.actor.toString(),
            asset_id: assetId
        });
        const result = await session.transact({ action });
        console.log('Claim transaction result: ', result);
        return result;
    }catch(error){
        console.log('Error claming nft: ', error);
        throw error;
    }
}