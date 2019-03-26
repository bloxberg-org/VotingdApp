var accounts;
var account;
var balance;
var numTotalProposals;
var totalEndedProposals;
var chairpersonAddress;
var htmlstr = "";
//var proposalNumber;
var canUserVote;
var myContractInstance;
var WAD = 1000000000000000000;
var modalShow = false;
var contract_address = "0x2dfbafe223d9ab442b7af35ac580642ec3a26917";
var contract_abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "newAddress",
        "type": "address"
      }
    ],
    "name": "changeChairman",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "proposalName",
        "type": "string"
      },
      {
        "name": "optionNames",
        "type": "bytes32[]"
      },
      {
        "name": "votingTime",
        "type": "uint256"
      },
      {
        "name": "proposalBatch",
        "type": "uint256"
      }
    ],
    "name": "createProposal",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "proposal",
        "type": "uint256"
      }
    ],
    "name": "finalizeProposal",
    "outputs": [
      {
        "name": "proposalName",
        "type": "string"
      },
      {
        "name": "winningProposalOption",
        "type": "uint256"
      },
      {
        "name": "winningProposalOptionName",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "voterAddress",
        "type": "address"
      }
    ],
    "name": "giveRightToVoteFounder",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "voterAddress",
        "type": "address"
      }
    ],
    "name": "giveRightToVoteMember",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "voterAddress",
        "type": "address"
      }
    ],
    "name": "revokeRightToVote",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_new",
        "type": "address"
      }
    ],
    "name": "setOwner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "proposal",
        "type": "uint256"
      },
      {
        "name": "proposalOption",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "proposal",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "proposalOption",
        "type": "uint256"
      }
    ],
    "name": "Voted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "proposal",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "winningProposalOption",
        "type": "uint256"
      }
    ],
    "name": "ProposalEnded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "old",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "current",
        "type": "address"
      }
    ],
    "name": "NewOwner",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "chairperson",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "proposal",
        "type": "uint256"
      },
      {
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getProposalDetailsForVoter",
    "outputs": [
      {
        "name": "proposalName",
        "type": "string"
      },
      {
        "name": "numOptions",
        "type": "uint256"
      },
      {
        "name": "optionNames",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "proposal",
        "type": "uint256"
      },
      {
        "name": "proposalOptionNum",
        "type": "uint256"
      }
    ],
    "name": "getProposalOptionName",
    "outputs": [
      {
        "name": "proposalOptionName",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "proposal",
        "type": "uint256"
      }
    ],
    "name": "getProposalResult",
    "outputs": [
      {
        "name": "proposalName",
        "type": "string"
      },
      {
        "name": "winningProposalOption",
        "type": "uint256"
      },
      {
        "name": "winningProposalOptionName",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getVoterDetail",
    "outputs": [
      {
        "name": "result",
        "type": "bool"
      },
      {
        "name": "weight",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "proposal",
        "type": "uint256"
      },
      {
        "name": "user",
        "type": "address"
      }
    ],
    "name": "hasUserVoted",
    "outputs": [
      {
        "name": "result",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "numEndedProposals",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "numProposals",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "numVoters",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "proposals",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "votingStart",
        "type": "uint256"
      },
      {
        "name": "votingTime",
        "type": "uint256"
      },
      {
        "name": "proposalBatch",
        "type": "uint256"
      },
      {
        "name": "numOptions",
        "type": "uint256"
      },
      {
        "name": "numCastedVotes",
        "type": "uint256"
      },
      {
        "name": "isEnded",
        "type": "bool"
      },
      {
        "name": "winningProposalOption",
        "type": "uint256"
      },
      {
        "name": "winningProposalOptionName",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "voters",
    "outputs": [
      {
        "name": "addr",
        "type": "address"
      },
      {
        "name": "rightToVote",
        "type": "bool"
      },
      {
        "name": "weight",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];


// Initialize
function initializeContract() {
  console.log(contract_address);
  myContractInstance = web3.eth.contract(contract_abi).at(contract_address);
  $("#cf_address").html(contract_address);
  $("#cb_address").html(account);
  refreshDataNew();
}


function refreshDataNew() {
  getDataPromise(myContractInstance.numProposals).then(
    function(numProposals) {
      numTotalProposals = numProposals.toNumber();
      console.log("numProposals = " + numProposals.toNumber());
      //$("#numProposals").html(numProposals.toNumber());
      return getDataPromise(myContractInstance.numEndedProposals);
    }).then(
    function(numEndedProposals) {
      console.log("numEndedProposals = " + numEndedProposals.toNumber());
      //$("#numEndedProposals").html(numEndedProposals.toNumber());
      totalEndedProposals = numEndedProposals.toNumber();
      $("#numOpenProposals").html(numTotalProposals - totalEndedProposals);
      return getDataPromise(myContractInstance.numVoters);
    }).then(
    function(numVoters) {
      console.log("numVoters = " + numVoters.toNumber());
      $("#numVoters").html(numVoters.toNumber());
      return getDataPromiseWithArgs(myContractInstance.getVoterDetail, account);
    }).then(
    function(result) {
      console.log("canUserVote = " + result[0]);
      canUserVote=result[0];
      if (canUserVote) {
        $("#canUserVote").html("Yes");
      } else {
        $("#canUserVote").html("No");
      }
      $("#votingWeight").html(result[1].toNumber());

      return getDataPromise(myContractInstance.chairperson);
    }).then(
    function(chairperson) {
      console.log("chairperson = " + chairperson);
      chairpersonAddress = chairperson;
      $("#chairperson").html(chairperson);
      if(chairpersonAddress==account){
      $("#footercontainer").html("<footer class=\"footer\"><div class=\"container\"><p class=\"rights\"><br>2019 Bloxberg Network. All rights reserved.</p><a class=\"logo\" href='/'></a><div class=\"socials\"></div></div></footer>");  
      }else{
        $("#admincontainer").hide();
        $("#statuscontainer").html("<h4>You are not authorized to perform admin actions</h4>");
        $("#footercontainer").html("<footer class=\"footer\" style=\"position:absolute;\"><div class=\"container\"><p class=\"rights\"><br>2019 Bloxberg Network. All rights reserved.</p><a class=\"logo\" href='/'></a><div class=\"socials\"></div></div></footer>");
      }
      
    });
}



function getDataPromise(varname) {
  return new Promise(function(resolve, reject) {
    varname.call(function(error, result) {
      if (!error) {
        resolve(result);
      }
    })
  })
}

function getDataPromiseWithArgs(varname, args) {
  return new Promise(function(resolve, reject) {
    varname.call(args, function(error, result) {
      if (!error) {
        resolve(result);
      }
    })
  })
}

function getDataPromiseWithTwoArgs(varname, arg1, arg2) {
  return new Promise(function(resolve, reject) {
    varname.call(arg1, arg2, function(error, result) {
      if (!error) {
        resolve(result);
      }
    })
  })
}

function getBalancePromise(addr) {
  return new Promise(function(resolve, reject) {

    web3.eth.getBalance(addr, function(error, result) {
      if (!error) {
        resolve(result);
      }
    })

  })
}

function getDataNum(varname, divtag) {
  varname.call(function(error, result) {
    if (!error) {
      $(divtag).html(result.toNumber());
    } else {
      console.log(error);
    }
  })
}

function getDataStr(varname, divtag) {
  varname.call(function(error, result) {
    if (!error) {
      $(divtag).html(result);
    } else {
      console.log(error);
    }
  })
}

function setStatus(message) {
  $("#status").html(message);
}


function giveRightToVote() {  
  var address = $("#giveRightToVoteAddress").val();
  myContractInstance.giveRightToVote(address, function(error, result) {
    if (!error) {
      getTransactionReceiptMined(result).then(
        function(receipt) {
          console.log(receipt.transactionHash);
          $("#myModal").modal();
          $("#myModalTitle").html("Transaction Successful");
          $("#myModalText").html("Your transaction to give rights to vote to address " + address + " has been processed successfully. Transaction hash: " + receipt.transactionHash);
        });
    }
  });
}

function revokeRightToVote() {  
  var address = $("#revokeRightToVoteAddress").val();
  myContractInstance.revokeRightToVote(address, function(error, result) {
    if (!error) {
      getTransactionReceiptMined(result).then(
        function(receipt) {
          console.log(receipt.transactionHash);
          $("#myModal").modal();
          $("#myModalTitle").html("Transaction Successful");
          $("#myModalText").html("Your transaction to revoke rights to vote to address " + address + " has been processed successfully. Transaction hash: " + receipt.transactionHash);
        });
    }
  });
}

function finalizeProposal() {  
  var proposalNumber = $("#proposalNumber").val();
  myContractInstance.finalizeProposal(proposalNumber, function(error, result) {
    if (!error) {
      getTransactionReceiptMined(result).then(
        function(receipt) {
          console.log(receipt.transactionHash);
          $("#myModal").modal();
          $("#myModalTitle").html("Transaction Successful");
          $("#myModalText").html("Your transaction to finalize Proposal #" + proposalNumber + " has been processed successfully. Transaction hash: " + receipt.transactionHash);
        });
    }
  });
}

function createProposal() {  
  var proposalName = $("#proposalName").val();
  var optionName1 = $("#optionName1").val();
  var optionName2 = $("#optionName2").val();
  var optionName3 = $("#optionName3").val();
  var optionName4 = $("#optionName4").val();
  var optionName5 = $("#optionName5").val();
  var votingTime = $("#votingTime").val();
  var error=false;

  if(proposalName.length>32 || optionName1.length>32 || optionName2.length>32 || optionName3.length>32 || optionName4.length>32 || optionName5.length>32 ){
    error=true;
    $("#myModalNoRefresh").modal();
    $("#myModalTitle1").html("Proposal Title or Options Too Long");
    $("#myModalText1").html("Please provide shorter proposal title or option names (less than 32 characters)");
  }

  if(votingTime<=0){
    error=true;
    $("#myModalNoRefresh").modal();
    $("#myModalTitle1").html("Invalid Voting Time");
    $("#myModalText1").html("Please enter a valid voting time in seconds");
  }

  // var proposalNameHex = web3.fromAscii(proposalName);

  var optionNamesHex = [web3.fromAscii(optionName1),web3.fromAscii(optionName2)];
  if (optionName3.length>0){
    optionNamesHex.push(web3.fromAscii(optionName3));
  }
  if (optionName4.length>0){
    optionNamesHex.push(web3.fromAscii(optionName4));
  }
  if (optionName5.length>0){
    optionNamesHex.push(web3.fromAscii(optionName5));
  }

  // console.log("proposalNameHex = " + proposalNameHex);
  console.log("optionNamesHex = " + optionNamesHex);
  console.log("votingTime = " + votingTime);

  if(!error){
    myContractInstance.createProposal(proposalName, optionNamesHex, votingTime, function(error, result) {
      if (!error) {
        getTransactionReceiptMined(result).then(
          function(receipt) {
            console.log(receipt.transactionHash);
            $("#myModal").modal();
            $("#myModalTitle").html("Transaction Successful");
            $("#myModalText").html("Your transaction to create a new proposal titled \"" + proposalName + "\" has been processed successfully. Transaction hash: " + receipt.transactionHash);
          });
      }
    });
  }
}

var loadPage = () => {
  setTimeout(() => {
    if (!window.web3 || !window.web3.eth.accounts[0]) {
      $("#votingcontractcontainer").hide();
      $("#admincontainer").hide();
      $("#footercontainer").html("<footer class=\"footer\" style=\"position:absolute;\"><div class=\"container\"><p class=\"rights\"><br>2019 Bloxberg Network. All rights reserved.</p><a class=\"logo\" href='/'></a><div class=\"socials\"></div></div></footer>");
      $("#status").html(`
       <div>
         <div class="pane before-error">
           <h2>Could not connect to Bloxberg</h2>
           <p>

             Consider installing <a href=https://metamask.io>MetaMask</a> or another Ethereum client.

             If you are using MetaMask, you may need to unlock your account and connect to the Bloxberg network using custom RPC endpoint https://bloxberg.org/eth/. You can also try disabling and re-enabling
             the MetaMask plugin by going to <a href=chrome://extensions>chrome://extensions</a>.
           </p>

           <p>Please reload this page and try again.</p>
         </div>
       </div>
     `);
    } else {
      //initializeContract();
      account = web3.eth.accounts[0];
      console.log(account);
      initializeContract();

      web3.eth.getBalance(account, function(error, result) {
        if (!error) {
          console.log(result);
          $("#cb_balance").html(web3.fromWei(result, "ether").toFixed(5));

        } else {
          console.error(error);
        }
      });

    }
  }, 500)
}

// Inital loading of the page
if (document.readyState !== 'complete') {
  // Document has not finished loaded yet, load the page when it is complete
  window.addEventListener('load', function() {
    loadPage();
  })
} else {
  // Document has finished loaded, load the page
  loadPage();
}

function getTransactionReceiptMined(txHash, interval) {
  var transactionReceiptAsync;
  interval = interval ? interval : 500;
  transactionReceiptAsync = function(txHash, resolve, reject) {
    web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
      if (error) {
        reject(error);
      } else {
        if (receipt == null) {
          setTimeout(function() {
            transactionReceiptAsync(txHash, resolve, reject);
          }, interval);
        } else {
          resolve(receipt);
        }
      }
    });
  };

  if (Array.isArray(txHash)) {
    var promises = [];
    txHash.forEach(function(oneTxHash) {
      promises.push(web3.eth.getTransactionReceiptMined(oneTxHash, interval));
    });
    return Promise.all(promises);
  } else {
    return new Promise(function(resolve, reject) {
      transactionReceiptAsync(txHash, resolve, reject);
    });
  }
};

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = month + ' ' + date + ', ' + year + ' at ' + hour + ':' + min + ':' + sec;
  return time;
}