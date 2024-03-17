#include <eosio/eosio.hpp>
#include <eosio/asset.hpp>
using namespace eosio;
using namespace std;

CONTRACT p2ewgamelogi : public contract {
   public:
      using contract::contract;

      ACTION hi( name nm );
      ACTION addaccount( name wallet);
      using hi_action = action_wrapper<"hi"_n, &p2ewgamelogi::hi>;
   
   private:
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
};