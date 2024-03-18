#include <p2ewgamelogi.hpp>

ACTION p2ewgamelogi::hi( name nm ) {
   /* fill in action body */
   print_f("Name : %\n",nm);
}

ACTION p2ewgamelogi::addaccount( name wallet ){
   require_auth(wallet);

   accounts_table accounts(get_self(), get_self().value);

   auto newaccount = accounts.find(wallet.value);

   check(newaccount == accounts.end(), "Account already exist");

   accounts.emplace(get_self(), [&](auto& newacc) {
      newacc.wallet = wallet;
   });
}

void p2ewgamelogi::on_transfer(name from, name to, asset quantity, string memo){
   if(to != get_self() || from == get_self()){
      return;
   }
   check(quantity.amount > 0, "Invalid amount");
   symbol gold_symbol("GOLD", 4), wood_symbal("WOOD", 4), food_symbal("FOOD", 4);
   symbol asset_symbol = quantity.symbol;
   check(asset_symbol == gold_symbol || asset_symbol == wood_symbal || asset_symbol == food_symbal, 
         "Unsupported token"
   );
   accounts_table accounts(get_self(), get_self().value);
   auto user_account = accounts.find(from.value);
   check(user_account != accounts.end(), "User does not exist");

   accounts.modify(user_account, get_self(), [&](auto& acc){
      auto token = std::find_if(acc.balance.begin(), acc.balance.end(), [&](const asset& a){
         return a.symbol == asset_symbol;
      });

      if (token != acc.balance.end()){
         *token += quantity;
      } else {
         acc.balance.push_back(quantity);
      }
   });
}

ACTION p2ewgamelogi::withdraw ( name wallet, asset quantity ){
   require_auth(wallet);
   check(quantity.amount > 0, "Invalid amount");
   symbol gold_symbol("GOLD", 4), wood_symbal("WOOD", 4), food_symbal("FOOD", 4);
   symbol asset_symbol = quantity.symbol;
   check(asset_symbol == gold_symbol || asset_symbol == wood_symbal || asset_symbol == food_symbal, 
         "Unsupported token"       
   );
   accounts_table accounts(get_self(), get_self().value);
   auto acc = accounts.find(wallet.value);
   check(acc != accounts.end(), "Account not found");
   auto token = std::find_if(acc->balance.begin(), acc->balance.end(), [&]( auto& b){
      return b.symbol == asset_symbol;
   });
   check(token != acc->balance.end(), "Balance not found");
   check(token->amount >= quantity.amount, "Insufiente balance");
   accounts.modify(acc, get_self(), [&](auto& user_account){
      for(size_t i = 0; i < user_account.balance.size(); i++){
         if(user_account.balance[i].symbol == quantity.symbol){
            user_account.balance[i].amount -= quantity.amount;
            if(user_account.balance[i].amount == 0){
               user_account.balance.erase(user_account.balance.begin() + i);
            }
            return;
         }
      }
      check(false, "Could not update token");
   });
}c