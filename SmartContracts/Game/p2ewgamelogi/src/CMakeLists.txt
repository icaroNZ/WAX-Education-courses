project(p2ewgamelogi)

set(EOSIO_WASM_OLD_BEHAVIOR "Off")
find_package(eosio.cdt)

add_contract( p2ewgamelogi p2ewgamelogi p2ewgamelogi.cpp )
target_include_directories( p2ewgamelogi PUBLIC ${CMAKE_SOURCE_DIR}/../include )
target_ricardian_directory( p2ewgamelogi ${CMAKE_SOURCE_DIR}/../ricardian )