import Principal "mo:base/Principal";
import Error "mo:base/Error";

actor class CustodialWallet() {
  type IC = actor {
    ecdsa_public_key : ({
      canister_id : ?Principal;
      derivation_path : [Blob];
      key_id : { curve: { #secp256k1; } ; name: Text };
    }) -> async ({ public_key : Blob; chain_code : Blob; });
    sign_with_ecdsa : ({
      message_hash : Blob;
      derivation_path : [Blob];
      key_id : { curve: { #secp256k1; } ; name: Text };
    }) -> async ({ signature : Blob });
  };
  

  let ic : IC = actor "aaaaa-aa" : IC;

  public shared (msg) func public_key() : async { #Ok : { public_key: Blob }; #Err : Text } {
      let caller = Principal.toBlob(msg.caller);
      
      try {
        let { public_key } = await ic.ecdsa_public_key({
            canister_id = null;
            derivation_path = [ caller ];
            // TODO: Change name to test_key_1 on mainnet (https://forum.dfinity.org/t/trying-out-the-ic-web3-library/20618/3)
            // TODO: Ask discord for help regarding this
            key_id = { curve = #secp256k1; name = "dfx_test_key" };
        });
        
        #Ok({ public_key })
      
      } catch (err) {
        #Err(Error.message(err))
      }
  };

};