#include <p2ewgamelogi.hpp>

ACTION p2ewgamelogi::hi(name nm)
{
   /* fill in action body */
   print_f("Name : %\n", nm);
}

ACTION p2ewgamelogi::addaccount(name wallet)
{
   require_auth(wallet);

   accounts_table accounts(get_self(), get_self().value);

   auto newaccount = accounts.find(wallet.value);

   check(newaccount == accounts.end(), "Account already exist");

   accounts.emplace(get_self(), [&](auto &newacc)
                    { newacc.wallet = wallet; });
}

void p2ewgamelogi::on_transfer(name from, name to, asset quantity, string memo)
{
   if (to != get_self() || from == get_self())
   {
      return;
   }
   check(quantity.amount > 0, "Invalid amount");
   symbol gold_symbol("GOLD", 4), wood_symbal("WOOD", 4), food_symbal("FOOD", 4);
   symbol asset_symbol = quantity.symbol;
   check(asset_symbol == gold_symbol || asset_symbol == wood_symbal || asset_symbol == food_symbal,
         "Unsupported token");
   accounts_table accounts(get_self(), get_self().value);
   auto user_account = accounts.find(from.value);
   check(user_account != accounts.end(), "User does not exist");

   accounts.modify(user_account, get_self(), [&](auto &acc)
                   {
      auto token = std::find_if(acc.balance.begin(), acc.balance.end(), [&](const asset& a){
         return a.symbol == asset_symbol;
      });

      if (token != acc.balance.end()){
         *token += quantity;
      } else {
         acc.balance.push_back(quantity);
      } });
}

ACTION p2ewgamelogi::withdraw(name wallet, asset quantity)
{
   require_auth(wallet);
   check(quantity.amount > 0, "Invalid amount");
   symbol gold_symbol("GOLD", 4), wood_symbal("WOOD", 4), food_symbal("FOOD", 4);
   symbol asset_symbol = quantity.symbol;
   check(asset_symbol == gold_symbol || asset_symbol == wood_symbal || asset_symbol == food_symbal,
         "Unsupported token");
   accounts_table accounts(get_self(), get_self().value);
   auto acc = accounts.find(wallet.value);
   check(acc != accounts.end(), "Account not found");
   auto token = std::find_if(acc->balance.begin(), acc->balance.end(), [&](auto &b)
                             { return b.symbol == asset_symbol; });
   check(token != acc->balance.end(), "Balance not found");
   check(token->amount >= quantity.amount, "Insufiente balance");
   accounts.modify(acc, get_self(), [&](auto &user_account)
                   {
      for(size_t i = 0; i < user_account.balance.size(); i++){
         if(user_account.balance[i].symbol == quantity.symbol){
            user_account.balance[i].amount -= quantity.amount;
            if(user_account.balance[i].amount == 0){
               user_account.balance.erase(user_account.balance.begin() + i);
            }
            send_token(wallet, quantity, "Token withdraw!");
            return;
         }
      }
      check(false, "Could not update token"); });
}

void p2ewgamelogi::send_token(name to, asset quantity, string memo)
{
   action(
       // -p acc@active
       permission_level{get_self(), "active"_n},
       // contract and function name
       "p2ewgametken"_n, "transfer"_n,
       std::make_tuple(get_self(), to, quantity, memo)
       // '["from", "to", "1.0000 GOLD", "Memo"]'
       )
       .send();
}

ACTION p2ewgamelogi::addtool(
    int32_t template_id,
    string name,
    string type,
    string img,
    uint8_t energy_consumed,
    uint8_t durability_consumed,
    asset reward,
    uint16_t charge_time,
    vector<asset> tokens_mint)
{
   require_auth(get_self());

   tools_table tools(get_self(), get_self().value);
   auto tool_it = tools.find(template_id);
   check(tool_it == tools.end(), "Tool with this template id already exists");

   tools.emplace(get_self(), [&](auto &new_tool)
                 {
               new_tool.template_id = template_id;
               new_tool.name = name;
               new_tool.type = type;
               new_tool.img = img;
               new_tool.energy_consumed = energy_consumed;
               new_tool.durability_consumed = durability_consumed;
               new_tool.reward = reward;
               new_tool.charge_time = charge_time;
               new_tool.tokens_mint = tokens_mint; });
}