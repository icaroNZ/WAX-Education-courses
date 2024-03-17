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