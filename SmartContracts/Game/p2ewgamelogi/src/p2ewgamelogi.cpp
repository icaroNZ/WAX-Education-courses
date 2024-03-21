#include <p2ewgamelogi.hpp>
#include <eosio/system.hpp>

ACTION p2ewgamelogi::hi(name nm)
{
   /* fill in action body */
   print_f("Name : %\n", nm);
}

ACTION p2ewgamelogi::addaccount(name wallet)
{
   require_auth(wallet);

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

ACTION p2ewgamelogi::addnft(uint64_t asset_id, name wallet, int32_t template_id){
   auto it = user_tools.find(asset_id);
   check(it == user_tools.end(), "Tool with asset id already exist");

   auto acc_it = accounts.find(wallet.value);
   check(acc_it != accounts.end(),"This wallet is not registered in the game");
   
   user_tools.emplace(get_self(), [&](auto& new_tool){
      new_tool.asset_id = asset_id;
      new_tool.wallet = wallet;
      new_tool.template_id = template_id;
   });
}

ACTION p2ewgamelogi::claimtool( name wallet, uint64_t asset_id){
   require_auth(wallet);

   auto user_tool_it = user_tools.find(asset_id);
   check(user_tool_it != user_tools.end(),"Could not find the tool with the asset id");

   auto tool_it = tools.find(user_tool_it->template_id);
   check (tool_it != tools.end(),"Could not find the template for the asset id");

   check(user_tool_it->current_durability >= tool_it->durability_consumed, 
      "Tool has not enough durability");
   auto time_now = current_time_point().sec_since_epoch();
   check(time_now >= user_tool_it->next_avaliable.sec_since_epoch(), "Tool not avaliable for use");
   
   auto user_account_it = accounts.find(wallet.value);
   check(user_account_it != accounts.end(), "User not found");

   check(user_account_it->energy >= tool_it->energy_consumed, "Not enough energy for this action");
   int16_t energy_consumed = -static_cast<int16_t>(tool_it->energy_consumed);
   change_energy(user_account_it, energy_consumed);
   int16_t durability_consumed = -static_cast<int16_t>(tool_it->durability_consumed);
   change_tool_durability(user_tool_it, durability_consumed);
   change_balance(user_account_it, tool_it->reward);
}

void p2ewgamelogi::change_energy(accounts_table::const_iterator user_account_it, int16_t amount){
   
   accounts.modify(user_account_it, get_self(), [&](auto& account){
      account.energy += amount;
   });
}

void p2ewgamelogi::change_tool_durability(user_tool_table::const_iterator user_tool_it, int16_t amount){
   user_tools.modify(user_tool_it, get_self(), [&](auto& tool){
      tool.current_durability += amount;
   });
}

void p2ewgamelogi::change_balance(accounts_table::const_iterator user_account_it, asset amount){
   accounts.modify(user_account_it, get_self(), [&](auto& acc){
      for(auto& balance : acc.balance){
         if(balance.symbol == amount.symbol){
            balance.amount += amount.amount;
            return;
         }
      };
      acc.balance.push_back(amount);
   });
}

void p2ewgamelogi::change_next_avaliable(user_tool_table::const_iterator user_tool_it, int16_t amount){
   user_tools.modify(user_tool_it, get_self(), [&](auto& tool){
      auto time_now = current_time_point().sec_since_epoch();
      auto next_use = time_now + amount;
      auto next_avalialbe = time_point_sec(next_use);
      tool.next_avaliable = next_avalialbe;
   });
}










































