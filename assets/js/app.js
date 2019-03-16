var accounts;
var account;
var balance;
var numTotalProposals;
var totalEndedProposals;
var htmlstr = "";
//var proposalNumber;
var canUserVote;
var myContractInstance;
var WAD = 1000000000000000000;
var modalShow = false;
var contract_address = "0x80b52f8ac0190297a7cf6596146d007f111aa618";
var contract_abi = [
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
    "constant": false,
    "inputs": [
      {
        "name": "proposalName",
        "type": "bytes32"
      },
      {
        "name": "optionNames",
        "type": "bytes32[]"
      },
      {
        "name": "votingTime",
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
        "type": "bytes32"
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
    "name": "giveRightToVote",
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
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
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
        "type": "bytes32"
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
        "type": "bytes32"
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
        "type": "bytes32"
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
      $("#chairperson").html(chairperson);
      if(canUserVote){
        updateProposalsList();
        $("#footercontainer").html("<footer class=\"footer\"><div class=\"container\"><p class=\"rights\"><br>2019 Bloxberg Network. All rights reserved.</p><a class=\"logo\" href='/'></a><div class=\"socials\"></div></div></footer>");
      }else{
        $("#openPropsalsContainer").html("<h4>You are not authorized to vote</h4>");
        $("#footercontainer").html("<footer class=\"footer\" style=\"position:absolute;\"><div class=\"container\"><p class=\"rights\"><br>2019 Bloxberg Network. All rights reserved.</p><a class=\"logo\" href='/'></a><div class=\"socials\"></div></div></footer>");
      }      
    });
}

function updateProposalsList() {
  console.log("numTotalProposals = " + numTotalProposals);
  for (i = 1; i <= numTotalProposals; i++) {
    getProposalDetail(i);
  }
}

function getProposalDetail(proposalNumber) {
  getDataPromiseWithTwoArgs(myContractInstance.getProposalDetailsForVoter, proposalNumber, account).then(
    function(result) {
      proposalName = result[0];
      numOptions = result[1];
      //console.log("account = "+account);
      //console.log("resultnew = "+result);
      console.log("proposalName = " + proposalName);
      console.log("numOptions = " + numOptions);
      //console.log("option-1 = "+result[2][0]);
      //console.log("option-2 = "+result[2][1]);
      //console.log("option-3 = "+result[2][2]);
      if (numOptions == 0) {
        //htmlstr+="<h4 style=\"padding-top: 20px; color:#000\">Proposal #"+proposalNumber+": Already voted</h4><br>";
      } else {
        htmlstr += "<h4 style=\"padding-top: 20px; color:#000\">Proposal #" + proposalNumber + ": " + web3.toAscii(proposalName) + "</h4><br>";

        for (j = 0; j < numOptions; j++) {
          if (j == 0) {
            htmlstr = htmlstr + "<input type=\"radio\" name=\"proposal" + proposalNumber + "\" value=\"" + j + "\" checked>" + web3.toAscii(result[2][j]) + "<br>";
          } else {
            htmlstr = htmlstr + "<input type=\"radio\" name=\"proposal" + proposalNumber + "\" value=\"" + j + "\">" + web3.toAscii(result[2][j]) + "<br>";
          }
        }
        htmlstr = htmlstr + "<br><button class=\"btn btn-primary btn-lg\" onclick=\"vote(" + proposalNumber + ");\">VOTE</button><br><hr>";
        $("#openPropsalsContainer").html(htmlstr);
      }
    }).then(function() {
    //htmlstr=htmlstr+"<button class=\"btn btn-primary btn-lg\" onclick=\"vote("+proposalNumber+");\">VOTE</button><br><hr>";
    //$("#openPropsalsContainer").html(htmlstr);
    //console.log(htmlstr);
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
};



function vote(proposal) {
  var proposalID = "proposal" + proposal;
  var proposalOption = $('input:radio[name=' + proposalID + ']:checked').val();

  console.log("Selected proposal =" + proposal);
  console.log("Selected proposal option =" + proposalOption);

  //setStatus("Initiating transaction... (please wait)");
  myContractInstance.vote(proposal, proposalOption, function(error, result) {
    if (!error) {
      getTransactionReceiptMined(result).then(
        function(receipt) {
          console.log(receipt.transactionHash);
          //setStatus(receipt.transactionHash);
          //location.reload();
          $("#manuscriptSuccessModal").modal();
          $("#modeltext").html("Your vote for Proposal #" + proposal + " (selected Option #" + proposalOption + ") has been recorded successfully. Transaction hash: " + receipt.transactionHash);

          //setTimeout(function() {
          //    loadPage();
          //   }, 4000);
        });
    }
  });
}


var loadPage = () => {
  setTimeout(() => {
    if (!window.web3 || !window.web3.eth.accounts[0]) {
      $("#votingcontractcontainer").hide();
      $("#votingproposalcontainer").hide();
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