src = "https://unpkg.com/@solana/web3.js@latest/lib/index.iife.min.js";
let publicKey;
let thanhtien;
window.onload = function () {
    (async () => {
        await window.phantom.solana.connect();
        publicKey = window.phantom.solana.publicKey.toBase58(); //[1,1,1,1]

    })();
}
function thanhToan() {


    //	1: Auto connect



    const SHYFT_API_KEY = "FvtQ-DsN9H3YDIYw";

    const toTransaction = (encodedTransaction) => solanaWeb3.Transaction.from(Uint8Array.from(atob(encodedTransaction), c => c.charCodeAt(0)));

    //https://api.shyft.to/sol/v1


    //MINT PRIV KEY
    const PRIV_KEY_WALLET = "4XMJ5M6wopsvVmBMC8jpShcVETUAAbF2aVKy4ZtqxXDmHUgDcywGhy817vVN2dwJqU6crhWpsoHVtcFAAPRtkGNc";


    //=========== [TRANSFER SOLANA] ==========

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", SHYFT_API_KEY);
    myHeaders.append("Content-Type", "application/json");
    console.log(publicKey);
    var raw = JSON.stringify({
        "network": "devnet",
        "from_address": publicKey, //Nguoi gui
        "to_address": "7Xwy3CktKLBf6oGnrkN33ct31P7nGwovGc76ZfGjRXeU", //Nguoi nhan
        "amount": 1,
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://api.shyft.to/sol/v1/wallet/send_sol", requestOptions)
        .then(async response => {
            let res = await response.json();
            let transaction = toTransaction(res.result.encoded_transaction);
            console.log(res);
            const signedTransaction = await window.phantom.solana.signTransaction(transaction);
            const connection = new solanaWeb3.Connection("https://api.devnet.solana.com");
            const signature = await connection.sendRawTransaction(signedTransaction.serialize());
            console.log("TRANSFER SUCCESSFULLY!!!");
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}