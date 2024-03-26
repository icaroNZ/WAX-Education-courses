#include <p2ewgamelogi.hpp>
#include <eosio/system.hpp>
#include <atomicassets/atomicassets-interface.hpp>
#include <atomicassets/atomicdata.hpp>

ACTION p2ewgamelogi::hi(name nm){
   /* fill in action body */
   print_f("Name : %", nm);
}

ACTION p2ewgamelogi::addaccount(name wallet){
   require_auth(wallet);
   auto newaccount = accounts.find(wallet.value);
   check(newaccount == accounts.end(), "Account already exist");
   accounts.emplace(get_self(), [&](auto &newacc){ 
      newacc.wallet = wallet; 
   });
}

void p2ewgamelogi::on_transfer(name from, name to, asset quantity, string memo){
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

   accounts.modify(user_account, get_self(), [&](auto &acc){
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

ACTION p2ewgamelogi::withdraw(name wallet, asset quantity){
   require_auth(wallet);
   check(quantity.amount > 0, "Invalid amount");
   symbol gold_symbol("GOLD", 4), wood_symbal("WOOD", 4), food_symbal("FOOD", 4);
   symbol asset_symbol = quantity.symbol;
   check(asset_symbol == gold_symbol || asset_symbol == wood_symbal || asset_symbol == food_symbal,
         "Unsupported token");
   auto acc = accounts.find(wallet.value);
   check(acc != accounts.end(), "Account not found");
   auto token = std::find_if(acc->balance.begin(), acc->balance.end(), [&](auto &b){ 
      return b.symbol == asset_symbol; 
   });
   check(token != acc->balance.end(), "Balance not found");
   check(token->amount >= quantity.amount, "Insufiente balance");
   accounts.modify(acc, get_self(), [&](auto &user_account){
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
      check(false, "Could not update token"); 
   });
}

void p2ewgamelogi::send_token(name to, asset quantity, string memo){
   action(
      permission_level{get_self(), "active"_n},
      "p2ewgametken"_n, "transfer"_n,
      std::make_tuple(get_self(), to, quantity, memo)
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
    vector<asset> tokens_mint){

   require_auth(get_self());

   auto tool_it = tools.find(template_id);
   check(tool_it == tools.end(), "Tool with this template id already exists");

   tools.emplace(get_self(), [&](auto &new_tool){
      new_tool.template_id = template_id;
      new_tool.name = name;
      new_tool.type = type;
      new_tool.img = img;
      new_tool.energy_consumed = energy_consumed;
      new_tool.durability_consumed = durability_consumed;
      new_tool.reward = reward;
      new_tool.charge_time = charge_time;
      new_tool.tokens_mint = tokens_mint; 
   });
}

ACTION p2ewgamelogi::claimtool( name wallet, uint64_t asset_id){
   require_auth(wallet);

   auto user_tool_it = user_tools.find(asset_id);
   check(user_tool_it != user_tools.end(),"Could not find the tool with the asset id");
   check(user_tool_it->wallet == wallet, "This is not your tool");

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
   change_next_avaliable(user_tool_it, tool_it->charge_time);
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
      if (tool.current_durability > tool.max_durability){
         tool.current_durability = tool.max_durability;
      }
   });
}

void p2ewgamelogi::change_balance(accounts_table::const_iterator user_account_it, asset amount){
   accounts.modify(user_account_it, get_self(), [&](auto& acc){
      auto it = std::find_if(acc.balance.begin(), acc.balance.end(), [&](const auto& balance){
         return balance.symbol == amount.symbol;
      });

      if(it != acc.balance.end()){
         it->amount += amount.amount;
         if(it->amount == 0){
            acc.balance.erase(it);
         }
      } else if (amount.amount > 0){
         acc.balance.push_back(amount);
      }
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

ACTION p2ewgamelogi::addenergy( name wallet, asset amount){
   require_auth(wallet);
   check(amount.amount > 0, "Invallid amount");
   symbol food_symbol("FOOD", 4);
   check(amount.symbol ==  food_symbol, "Invalid token");
   auto account_it = accounts.find(wallet.value);
   check(account_it != accounts.end(),"Account not found");
   auto food_it = std::find_if(account_it->balance.begin(), account_it->balance.end(), [&](auto& balance){
      return balance.symbol == food_symbol;
   });
   check(food_it != account_it->balance.end(), "Could not find the asset for this transaction");
   
   uint64_t max_energy = account_it->energy_max - account_it->energy;
   uint64_t required_food = max_energy / 5 * 10000; 
   uint64_t actual_food_use = std::min(static_cast<uint64_t>(required_food),static_cast<uint64_t>(amount.amount));
   check(food_it->amount >= actual_food_use, "Insuficient FOOD balance");
   auto food_index = distance(account_it->balance.begin(), food_it);
   accounts.modify(account_it, get_self(), [&](auto& acc){
      acc.energy += actual_food_use/10000 * 5; 
      if(acc.energy > acc.energy_max){
         acc.energy = acc.energy_max;
      };
      acc.balance[food_index].amount -= actual_food_use;
   });
}

ACTION p2ewgamelogi::mintnft( name wallet, int32_t template_id){
   require_auth(wallet);

   auto tool_it = tools.find(template_id);
   check(tool_it != tools.end(), "Template not found");

   auto account_it = accounts.find(wallet.value);
   check(account_it != accounts.end(), "Account not found");

   auto& tokens_mint = tool_it->tokens_mint;
   check(tokens_mint.size() > 0, "Mint cost is not defined for this template id");

   for(const auto& cost: tokens_mint){
      bool found_token = false;
      for(const auto& balance: account_it->balance){
         if(cost.symbol == balance.symbol && cost.amount <= balance.amount){
            found_token = true;
            break;
         }
      }
      check(found_token, "Insuficient balance for token: " + cost.symbol.code().to_string());
   }

   accounts.modify(account_it, get_self(), [&](auto& acc){
      for(const auto& cost: tokens_mint){
         asset subtract_cost(-cost.amount, cost.symbol);
         change_balance(account_it, subtract_cost);
      }
   });

   mint_nft(wallet, template_id, 1);
}

ACTION p2ewgamelogi::fixtool( name wallet, uint64_t asset_id){
   require_auth(wallet);
   auto account_it = accounts.find(wallet.value);
   check(account_it != accounts.end(), "Account not found");
   symbol gold_symbol("GOLD", 4);
   auto gold_it = std::find_if(account_it->balance.begin(), account_it->balance.end(), [&](const auto& balance){
      return balance.symbol == gold_symbol;
   });
   check(gold_it != account_it->balance.end(), "Account has no GOLD");

   auto user_tool_it = user_tools.find(asset_id);
   check(user_tool_it != user_tools.end(), "Could not find tool with the asset id");
   check(user_tool_it->wallet == wallet, "You don't own this tool");

   auto gap = user_tool_it->max_durability - user_tool_it->current_durability;
   auto gold_needed = gap/5.0;
   auto gold_needed_amount = gold_needed * 10000; //because 4 decimal places;
   check(gold_it->amount >= gold_needed_amount, "Insuficient balance");
   asset subtract_gold(-gold_needed_amount, gold_symbol);
   change_balance(account_it, subtract_gold);
   change_tool_durability(user_tool_it, gap);
}

ACTION p2ewgamelogi::removenft(name wallet, uint64_t asset_id){
   require_auth(wallet);
   auto user_tool_it = user_tools.find(asset_id);
   check(user_tool_it != user_tools.end(), "Tool with asset id not found");
   check(user_tool_it->wallet == wallet, "This is not your NFT");
   check(user_tool_it->current_durability == user_tool_it->max_durability, "Tool need to be fixed before remove");
   auto account_it = accounts.find(wallet.value);
   check(account_it != accounts.end(), "Account not found");
   check(account_it->energy >= 100, "Energy needs to be at least 100 to remove your tool");
   vector<uint64_t> assets_id;
   assets_id.push_back(asset_id);
   user_tools.erase(user_tool_it);

   transfer_nft(wallet, assets_id);
}

void p2ewgamelogi::on_nft_transfer(name from, name to, vector <uint64_t> asset_ids, string memo){
   if(to != get_self()){
      return;
   }
   check(memo == "Deposit NFT", "Wrong memo for deposit the NFT in account");
   auto account_it = accounts.find(from.value);
   check(account_it != accounts.end(), "Could not stake the NFT as account was not found");
   auto assets = atomicassets::get_assets(get_self());
   for(const uint64_t& asset_id: asset_ids){
      assets.require_find(asset_id, ("Could not find the asset id with id " + std::to_string(asset_id)).c_str());
      auto it = user_tools.find(asset_id);
      check(it == user_tools.end(), "Tool with asset id already exist " + std::to_string(asset_id));
   }
   for(const uint64_t& asset_id: asset_ids){
      auto add_asset = assets.find(asset_id);
      add_nft(asset_id, from, add_asset->template_id); 
   }
}

void p2ewgamelogi::add_nft(uint64_t asset_id, name wallet, int32_t template_id){
   user_tools.emplace(get_self(), [&](auto& new_tool){
      new_tool.asset_id = asset_id;
      new_tool.wallet = wallet;
      new_tool.template_id = template_id;
   });
}

void p2ewgamelogi::mint_nft(name wallet, int32_t template_id, uint8_t quantity){
   auto templates = atomicassets::get_templates(COLLETION_NAME);
   auto template_info = templates.find(static_cast<uint64_t>(template_id));
   auto empty_asset_data = std::map <std::string, atomicassets::ATOMIC_ATTRIBUTE> {};
   auto tokens_back = vector <asset>{};
   while(quantity > 0){
      action(permission_level{get_self(), "active"_n},
         atomicassets::ATOMICASSETS_ACCOUNT, "mintasset"_n,
         make_tuple(get_self(), COLLETION_NAME, template_info->schema_name, wallet,
            empty_asset_data, empty_asset_data
         )
      ).send();
      quantity--;
   }
}

void p2ewgamelogi::transfer_nft(name wallet, vector<uint64_t> assets_id){
   const string message = "Withdraw NFTs";
   action(permission_level{get_self(), "active"_n},
      atomicassets::ATOMICASSETS_ACCOUNT, "transfer"_n,
      make_tuple(get_self(), wallet, assets_id, message)
   ).send();
}

   //  ACTION transfer(
   //      name from,
   //      name to,
   //      vector <uint64_t> asset_ids,
   //      string memo
   //  );







