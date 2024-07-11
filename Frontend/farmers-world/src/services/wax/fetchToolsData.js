import {ContractKit} from '@wharfkit/contract'

export const fetchToolsData = async(session, contractName) =>{
    try{
        const contractKit = new ContractKit({client: session.client});
        const contract = await contractKit.load(contractName);
        const table = contract.table('tools');
        const cursor = table.query({limit: 100});
        const rows = await cursor.all();
        const toolsDictionary = rows.reduce((acc, row) => {
            const img = getCorrectHash(Number(row.template_id));
            acc[row.template_id] = {
                templateId: row.template_id,
                name: row.name,
                img: img,
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

function getCorrectHash(templateId){
    switch (templateId) {
        case 642288: //Axe
            return 'QmaKMWj6RsxMwjehE6XLiJyVoXauLdWfwHKuws4iVpTEMf'
        case 642290: //Saw
            return 'QmVwb24SajmF57ZMJcN8PGoEZUkR9iGCMviURVPnZE4MNv'
        case 642291: //Chainsaw
            return 'Qmc4mKaihNmXWHyHJnwHssicMhD6xYb3XqrTTjPtpaexH7'
        case 642292: //Fishing Rod
            return 'QmWHmgevW853WvQij3fw4yNyrrg8JFkzqjtQM22WXGiG9h'
        case 642293: //Fishing Net
            return 'QmRTN2UJFJbyEaQi8r3iPTnwWVwuBbZXyfF2irJg1kfzyK'
        case 642294: //Fishing Bot
            return 'QmUDxXb2hMGmVoD3rVcMdXXGazdNiHNsSfarUr99rzisB6'
        case 642295: //Mining Excavator
            return 'QmaNiGD2Ljdafk44FGdmd7jscunCoaXcew2pxZXcXrHFnu'
        default:
            console.log('Could not find the templateId: ', templateId)
            break;
    }
}