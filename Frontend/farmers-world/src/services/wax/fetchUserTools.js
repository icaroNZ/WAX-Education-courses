import {ContractKit} from '@wharfkit/contract'

export const fetchUserTools = async (session, contractName) => {
    try{
        const contractKit = new ContractKit({client: session.client});
        const contract = await contractKit.load(contractName);
        console.log('Contract: ', contract)
        const table = await contract.table('usertools', contractName);
        const cursor = table.query({
            limit: 1000,
            lower_bound: session.permissionLevel.actor.toString(),
            upper_bound: session.permissionLevel.actor.toString(),
        });
        const rows = await cursor.all();
        const userTools = rows.reduce((acc, row) => {
            acc[row.asset_id] = {
                assetId: row.asset_id,
                templateId: row.template_id,
                currentDurability: row.current_durability,
                maxDurability: row.max_durability,
                nextAvailable: row.next_avaliable
            }
            return acc;
        }, {});
        return userTools;
    } catch (error){
        console.error('Error fetching tools: ', error)
        throw error;
    }
}