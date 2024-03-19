#include <eosio/eosio.hpp>
#include <eosio/asset.hpp>
using namespace eosio;
using namespace std;

CONTRACT p2ewgamelogi : public contract {
   public:
      using contract::contract;

      ACTION hi( name nm );
      ACTION addaccount( name wallet);
      ACTION withdraw ( name wallet, asset quantity );
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
         
      [[eosio::on_notify("p2ewgametken::transfer")]]
      void on_transfer(name from, name to, asset quantity, string memo);

      using hi_action = action_wrapper<"hi"_n, &p2ewgamelogi::hi>;
   
   private:
      void send_token(name to, asset quantity, string memo);
      // Define the struct of the table
      TABLE account {
         name wallet; // primary key
         uint16_t energy = 100;
         uint16_t energy_max = 300;
         vector<asset> balance;

         // Define the primary key
         uint64_t primary_key() const { return wallet.value; }
      };

      // Define the multi_index table of raccount
      typedef multi_index<"accounts"_n, account> accounts_table;

      TABLE tool {
         int32_t template_id; //primary key
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


};