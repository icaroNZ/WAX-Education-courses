#include <eosio/eosio.hpp>
#include <eosio/asset.hpp>
using namespace eosio;
using namespace std;

CONTRACT p2ewgamelogi : public contract {
   public:
      using contract::contract;
 
      p2ewgamelogi(name receiver, name code, datastream<const char*> ds)
      :  contract (receiver, code, ds),
         accounts(receiver, receiver.value),
         user_tools(receiver, receiver.value),
         tools(receiver, receiver.value)
      {}
      ACTION hi(name nm );
      ACTION addaccount(name wallet);
      ACTION withdraw (name wallet, asset quantity );
      ACTION addtool(         
         int32_t template_id, 
         string name,
         string type,
         string img,
         uint8_t energy_consumed,
         uint8_t durability_consumed,
         asset reward,
         uint16_t charge_time,
         vector<asset> tokens_mint);
      ACTION claimtool(name wallet, uint64_t asset_id);
      ACTION addenergy(name wallet, asset amount);
      ACTION mintnft(name wallet, int32_t template_id);
      ACTION fixtool(name wallet, uint64_t asset_id);
      ACTION removenft(name wallet, uint64_t asset_id);
      
      [[eosio::on_notify("p2ewgametken::transfer")]]
      void on_transfer(name from, name to, asset quantity, string memo);
      [[eosio::on_notify("atomicassets::transfer")]]
      void on_nft_transfer(name from, name to, vector <uint64_t> asset_ids, string memo);
      
      using hi_action = action_wrapper<"hi"_n, &p2ewgamelogi::hi>;
   
   private:
      static constexpr name COLLETION_NAME = "p2efarmerswd"_n;

      TABLE account {
         name wallet;
         uint16_t energy = 100;
         uint16_t energy_max = 300;
         vector<asset> balance;

         uint64_t primary_key() const { return wallet.value; }
      };
      typedef multi_index<"accounts"_n, account> accounts_table;

      TABLE tool {
         int32_t template_id;
         string name;
         string type;
         string img;
         uint8_t energy_consumed;
         uint8_t durability_consumed;
         asset reward; 
         uint16_t charge_time;
         vector<asset> tokens_mint;

         uint64_t primary_key() const { return static_cast<uint64_t>(template_id); }
      };
      typedef multi_index<"tools"_n, tool> tools_table;

      TABLE user_tool {
         uint64_t asset_id;
         name wallet;
         int32_t template_id;
         uint16_t current_durability = 100;
         uint16_t max_durability = 100;
         time_point_sec next_avaliable = time_point_sec(0);

         uint64_t primary_key() const { return asset_id; }
         uint64_t by_wallet() const { return wallet.value; }          
      };
      typedef multi_index <"usertools"_n, user_tool,
         indexed_by<"bywallet"_n, const_mem_fun<user_tool, uint64_t, &user_tool::by_wallet>>
      > user_tool_table;

      accounts_table accounts;
      tools_table tools;
      user_tool_table user_tools;
      
      void send_token(name to, asset quantity, string memo);
      void change_energy(accounts_table::const_iterator user_account_it, int16_t amount);
      void change_tool_durability(user_tool_table::const_iterator user_tool_it, int16_t amount);
      void change_balance(accounts_table::const_iterator user_account_it, asset amount);
      void change_next_avaliable(user_tool_table::const_iterator user_tool_it, int16_t amount);
      void add_nft(uint64_t asset_id, name wallet, int32_t template_id);
      void mint_nft(name wallet, int32_t template_id, uint8_t quantity);
      void transfer_nft(name wallet, vector<uint64_t> assets_id);
};