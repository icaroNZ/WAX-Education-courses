import {ContractKit} from'@wharfkit/contract'

export const fetchUserDetails = async(session, contractName, tokens) => {
    try{
        const contractKit = new ContractKit({client: session.client});
        const contract = await contractKit.load(contractName);
        const table = contract.table('accounts', contractName);
        const account = session.permissionLevel.actor.toString();
        const userDetails = await table.get(account)
        if (!userDetails){
            throw new Error('No user found');
        }
        const finalBalance = tokens.reduce((acc, token)=> {
            const balance = Array.isArray(userDetails.balance)
                ? userDetails.balance.find(t => t.symbol.name === token)
                : null;
            acc[token] = balance ? balance.value : '0.0000'
            return acc
        }, {});
        console.log(userDetails)
        const energy = userDetails.energy ? userDetails.energy.toString() : '0';
        const maxEnergy = userDetails.energy_max ? userDetails.energy_max.toString() : '0';
        return {
            energy,
            maxEnergy,
            balances: finalBalance
        }
    } catch (error){
        console.error('Error fecthing user details: ', error)
    }
}