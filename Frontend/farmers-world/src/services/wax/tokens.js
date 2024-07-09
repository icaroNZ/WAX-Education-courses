export const fetchTokensBalance = async(session, contract, tokens) => {
    const account = session.permissionLevel.actor;
    const balances = {}

        try{
            const result = await session.client.v1.chain.get_table_rows({
                code: contract,
                scope: account,
                table: 'accounts',
            });
            console.log(result)
            if(result.rows && result.rows.length > 0){
                result.rows.forEach(row => {
                    const [amount, symbol] = row.balance.split(" "); //3.0000 GOLD
                    if(tokens.includes(symbol)){
                        balances[symbol] = amount;
                    }
                })
            }
            tokens.forEach(token => {
                if(!balances[token]){
                    balances[token] = 0;
                }
            })
        }catch(error){
            console.error(`Error fetching token:`, error);
            tokens.forEach(token => {
                balances[token] = 0;
            })
        }
    return balances
}