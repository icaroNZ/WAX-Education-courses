import {ContractKit} from '@wharfkit/contract'

export const fetchToolsData = async(session, contractName) =>{
    try{
        const contractKit = new ContractKit({client: session.client});
        const contract = await contractKit.load(contractName);
        const table = contract('tools');
        const cursor = table.query({limit: 100});
        const rows = await cursor.all();
        const toolsDictionary = rows.reduce((acc, row) => {
            acc[row.template_id] = {
                templateId: row.template_id,
                name: row.name,
                img: row.img,
                energyConsumed: row.energy_consumed,
                durabilityConsumed: row.durability_consumed,
                reward: row.reward,
                chargeTime: row.charge_time,
                tokensMint: row.tokens_mint
            }
            return acc
        }, {});
        return toolsDictionary
    } catch(error){
        console.error('Error fetching tools data: ', error);
        throw error
    }
}