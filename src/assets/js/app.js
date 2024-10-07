var accounts;
var account;
var balance;
var numTotalProposals;
var oldContractProposals;
var newContractProposals;
var totalEndedProposals;
var htmlstr = "";
var closedhtmlstr = "";
//var proposalNumber;
var canUserVote;
var myContractInstance;
var newContractInstance;
var WAD = 1000000000000000000;
var modalShow = false;
// var contract_address = "0xEea584517644eb0B82eAba9B33CFA0ceF7A3F7B2";
// var contract_address = "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5";
var contract_address = "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5";
var new_contract_address = "0x8b0Ba3C029FC12ba1FBeED4A6F7510cB3401885e";

var contract_abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "old",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "current",
        type: "address",
      },
    ],
    name: "NewOwner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposal",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "winningProposalOption",
        type: "uint256",
      },
    ],
    name: "ProposalEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "proposal",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalOption",
        type: "uint256",
      },
    ],
    name: "Voted",
    type: "event",
  },
  {
    inputs: [],
    name: "chairperson",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "changeChairman",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "proposalName",
        type: "string",
      },
      {
        internalType: "bytes32[]",
        name: "optionNames",
        type: "bytes32[]",
      },
      {
        internalType: "uint256",
        name: "votingTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "proposalBatchNumber",
        type: "uint256",
      },
    ],
    name: "createProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposal",
        type: "uint256",
      },
    ],
    name: "finalizeProposal",
    outputs: [
      {
        internalType: "string",
        name: "proposalName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "winningProposalOption",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "winningProposalOptionName",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposal",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getProposalDetailsForVoter",
    outputs: [
      {
        internalType: "string",
        name: "proposalName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "numOptions",
        type: "uint256",
      },
      {
        internalType: "bytes32[]",
        name: "optionNames",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "proposalOptionNum",
        type: "uint256",
      },
    ],
    name: "getProposalOptionName",
    outputs: [
      {
        internalType: "bytes32",
        name: "proposalOptionName",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposal",
        type: "uint256",
      },
    ],
    name: "getProposalResult",
    outputs: [
      {
        internalType: "string",
        name: "proposalName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "winningProposalOption",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "winningProposalOptionName",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "proposalBatchNumber",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "votingTime",
        type: "uint256",
      },
    ],
    name: "getRemaingTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getVoterDetail",
    outputs: [
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "voterAddress",
        type: "address",
      },
    ],
    name: "giveRightToVoteFounder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "voterAddress",
        type: "address",
      },
    ],
    name: "giveRightToVoteMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposal",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "hasUserVoted",
    outputs: [
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numEndedProposals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numProposals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numVoters",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposals",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "votingStart",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "votingTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "proposalBatch",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numOptions",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numCastedVotes",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isEnded",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "winningProposalOption",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "winningProposalOptionName",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "voterAddress",
        type: "address",
      },
    ],
    name: "revokeRightToVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_new",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "totalvoters",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "proposalOption",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "voters",
    outputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "bool",
        name: "rightToVote",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

var new_contract_abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "old",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "current",
        type: "address",
      },
    ],
    name: "NewOwner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposal",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "winningProposalOption",
        type: "uint256",
      },
    ],
    name: "ProposalEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "proposal",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalOption",
        type: "uint256",
      },
    ],
    name: "Voted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "changeChairman",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "voterAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "newWeight",
        type: "uint256",
      },
    ],
    name: "changeVoterWeight",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "proposalName",
        type: "string",
      },
      {
        internalType: "bytes32[]",
        name: "optionNames",
        type: "bytes32[]",
      },
      {
        internalType: "uint256",
        name: "votingTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "proposalBatchNumber",
        type: "uint256",
      },
    ],
    name: "createProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposal",
        type: "uint256",
      },
    ],
    name: "finalizeProposal",
    outputs: [
      {
        internalType: "string",
        name: "proposalName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "winningProposalOption",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "winningProposalOptionName",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "voterAddress",
        type: "address",
      },
    ],
    name: "giveRightToVoteFounder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "voterAddress",
        type: "address",
      },
    ],
    name: "giveRightToVoteMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "voterAddress",
        type: "address",
      },
    ],
    name: "revokeRightToVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_new",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "proposalOption",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "chairperson",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposal",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getProposalDetailsForVoter",
    outputs: [
      {
        internalType: "string",
        name: "proposalName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "numOptions",
        type: "uint256",
      },
      {
        internalType: "bytes32[]",
        name: "optionNames",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "proposalOptionNum",
        type: "uint256",
      },
    ],
    name: "getProposalOptionName",
    outputs: [
      {
        internalType: "bytes32",
        name: "proposalOptionName",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposal",
        type: "uint256",
      },
    ],
    name: "getProposalResult",
    outputs: [
      {
        internalType: "string",
        name: "proposalName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "winningProposalOption",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "winningProposalOptionName",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "proposalBatchNumber",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getVoterDetail",
    outputs: [
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposal",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "hasUserVoted",
    outputs: [
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numEndedProposals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numProposals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numVoters",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposals",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "votingStart",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "votingTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "proposalBatch",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numOptions",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numCastedVotes",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isEnded",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "winningProposalOption",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "winningProposalOptionName",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "totalvoters",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "voters",
    outputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "bool",
        name: "rightToVote",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// Initialize
function initializeContract() {
  myContractInstance = new window.web3.eth.Contract(
    contract_abi,
    contract_address
  );
  newContractInstance = new window.web3.eth.Contract(
    new_contract_abi,
    new_contract_address
  );
  $("#cf_address").html(new_contract_address);
  $("#cb_address").html(account);
  refreshDataNew();
  getContractDetails();
}

async function getContractDetails() {
  const [
    oldProposals,
    newProposals,
    oldContractNumEndedProposals,
    newContractNumEndedProposals,
  ] = await Promise.all([
    getDataPromise(myContractInstance.methods.numProposals),
    getDataPromise(newContractInstance.methods.numProposals),
    getDataPromise(myContractInstance.methods.numEndedProposals),
    getDataPromise(newContractInstance.methods.numEndedProposals),
  ]);
  oldContractProposals = oldProposals;
  newContractProposals = newProposals;
  var allProposals =
    parseInt(oldContractProposals) + parseInt(newContractProposals);

  $("#numOpenProposals").html(
    parseInt(newContractProposals) - parseInt(newContractNumEndedProposals)
  );
}

function refreshDataNew() {
  console.log("Refreshing data");
  getDataPromise(newContractInstance.methods.numVoters)
    .then(function (numVoters) {
      console.log("numVoters = " + parseInt(numVoters));
      $("#numVoters").html(parseInt(numVoters));
      return getDataPromiseWithArgs(
        newContractInstance.methods.getVoterDetail,
        account
      );
    })
    .then(function (result) {
      console.log("canUserVote = " + result[0]);
      console.log("Voting weight: " + result[1]);
      canUserVote = result[0];
      if (canUserVote) {
        $("#canUserVote").html("Yes");
      } else {
        $("#canUserVote").html("No");
      }
      $("#votingWeight").html(result[1]);

      return getDataPromise(newContractInstance.methods.chairperson);
    })
    .then(function (chairperson) {
      console.log("chairperson = " + chairperson);
      $("#chairperson").html(chairperson);
      if (canUserVote) {
        updateProposalsList();
        updateClosedProposalsList();
        $("#footercontainer").html(
          '<footer class="footer"><div class="container"><p class="rights"><br>' +
            new Date().getFullYear() +
            ' Bloxberg Network. All rights reserved.</p><a class="logo" href=\'/\'></a><div class="socials"></div></div></footer>'
        );
      } else {
        $("#openPropsalsContainer").html(
          "<h4>You are not authorized to vote</h4>"
        );
        $("#footercontainer").html(
          '<footer class="footer" style="position:absolute;"><div class="container"><p class="rights"><br>' +
            new Date().getFullYear() +
            ' Bloxberg Network. All rights reserved.</p><a class="logo" href=\'/\'></a><div class="socials"></div></div></footer>'
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateProposalsList() {
  for (i = 1; i <= newContractProposals; i++) {
    getOpenProposalDetailForNewContract(i);
  }
}

async function getOpenProposalDetailForNewContract(proposalNumber) {
  let proposalDetails = await getDataPromiseWithArgs(
    newContractInstance.methods.proposals,
    proposalNumber
  );
  let {
    isEnded,
    name,
    numCastedVotes,
    numOptions,
    proposalBatch,
    votingStart,
    votingTime,
    winningProposalOption,
    winningProposalOptionName,
  } = proposalDetails;

  let proposalDetailsForVoter = await getDataPromiseWithTwoArgs(
    newContractInstance.methods.getProposalDetailsForVoter,
    proposalNumber,
    account
  );
  let {
    proposalName,
    numOptions: numOptionsForVoter,
    optionNames,
  } = proposalDetailsForVoter;

  let votingEndStr = timeConverter(
    parseInt(votingStart) + parseInt(votingTime)
  );

  if (isEnded === true) {
    htmlstr += "";
  } else if (numOptionsForVoter === "0") {
    htmlstr +=
      '<h4 style="padding-top: 20px;">Proposal #' +
      proposalNumber +
      ": Already voted</h4><br>";
    // $("#openPropsalsContainer").html(htmlstr);
  } else {
    htmlstr +=
      '<h4 style="padding-top: 20px;">Proposal #' +
      proposalNumber +
      ": " +
      name +
      "</h4><br>";
    for (j = 0; j < parseInt(numOptions); j++) {
      if (j == 0) {
        htmlstr =
          htmlstr +
          "<div>" +
          '<input type="radio" name="proposal' +
          proposalNumber +
          '" value="' +
          j +
          '" checked>' +
          '<label style ="color: white">' +
          web3.utils.hexToAscii(optionNames[j]) +
          "</label>" +
          "</div>";
      } else {
        htmlstr =
          htmlstr +
          "<div>" +
          '<input type="radio" name="proposal' +
          proposalNumber +
          '" value="' +
          j +
          '">' +
          '<label style ="color: white">' +
          web3.utils.hexToAscii(optionNames[j]) +
          "</label>" +
          "</div>";
      }
    }
    htmlstr =
      htmlstr +
      '<br><button class="btn btn-primary btn-lg" onclick="vote(' +
      proposalNumber +
      ');">VOTE</button><br><hr>';
    htmlstr =
      htmlstr +
      '<strong style="color: #fff">Time Voting Ends: ' +
      votingEndStr +
      "<br></strong>";
    $("#openPropsalsContainer").html(htmlstr);
  }
}

async function updateClosedProposalsList() {
  for (var i = newContractProposals; i >= 1; i--) {
    await getClosedProposalDetailForNewContrac(i);
  }
  for (i = 1; i <= oldContractProposals; i++) {
    await getClosedProposalDetailForOldContrac(i);
  }
}

async function getClosedProposalDetailForOldContrac(proposalNumber) {
  let result = await getDataPromiseWithArgs(
    myContractInstance.methods.proposals,
    proposalNumber
  );
  let {
    isEnded,
    name,
    numCastedVotes,
    numOptions,
    proposalBatch,
    votingStart,
    votingTime,
    winningProposalOption,
    winningProposalOptionName,
  } = result;
  let votingStartStr = timeConverter(parseInt(votingStart));
  let votingEndStr = timeConverter(
    parseInt(votingStart) + parseInt(votingTime)
  );
  winningOptionStr = window.web3.utils.hexToAscii(winningProposalOptionName);
  if (!isEnded) {
    closedhtmlstr +=
      '<h4 style="padding-top: 20px;">Proposal #' +
      proposalNumber +
      ' "' +
      name +
      '" ' +
      ": Voting has not finished</h4><br>";
    $("#closedPropsalsContainer").html(closedhtmlstr);
  } else {
    closedhtmlstr +=
      '<h4 style="padding-top: 20px;">Proposal #' +
      proposalNumber +
      ": " +
      name +
      "</h4><br>";
    closedhtmlstr =
      closedhtmlstr + "Winning Option: " + winningOptionStr + "<br>";
    closedhtmlstr =
      closedhtmlstr + "Total Votes Casted: " + numCastedVotes + "<br>";
    closedhtmlstr = closedhtmlstr + "Time Started: " + votingStartStr + "<br>";
    closedhtmlstr = closedhtmlstr + "Time Ended: " + votingEndStr + "<br>";
    closedhtmlstr = closedhtmlstr + "Proposal Batch: " + proposalBatch + "<br>";
    $("#closedPropsalsContainer").html(closedhtmlstr);
  }
}

async function getClosedProposalDetailForNewContrac(proposalNumber) {
  let result = await getDataPromiseWithArgs(
    newContractInstance.methods.proposals,
    proposalNumber
  );
  let {
    isEnded,
    name,
    numCastedVotes,
    numOptions,
    proposalBatch,
    votingStart,
    votingTime,
    winningProposalOption,
    winningProposalOptionName,
  } = result;
  let votingStartStr = timeConverter(parseInt(votingStart));
  let votingEndStr = timeConverter(
    parseInt(votingStart) + parseInt(votingTime)
  );
  winningOptionStr = window.web3.utils.hexToAscii(winningProposalOptionName);
  if (!isEnded) {
    closedhtmlstr +=
      '<h4 style="padding-top: 20px;">Proposal #' +
      proposalNumber +
      ' "' +
      name +
      '" ' +
      ": Voting has not finished</h4><br>";
    $("#closedPropsalsContainer").html(closedhtmlstr);
  } else {
    closedhtmlstr +=
      '<h4 style="padding-top: 20px;">Proposal #' +
      proposalNumber +
      ": " +
      name +
      "</h4><br>";
    closedhtmlstr =
      closedhtmlstr + "Winning Option: " + winningOptionStr + "<br>";
    closedhtmlstr =
      closedhtmlstr + "Total Votes Casted: " + numCastedVotes + "<br>";
    closedhtmlstr = closedhtmlstr + "Time Started: " + votingStartStr + "<br>";
    closedhtmlstr = closedhtmlstr + "Time Ended: " + votingEndStr + "<br>";
    closedhtmlstr = closedhtmlstr + "Proposal Batch: " + proposalBatch + "<br>";
    $("#closedPropsalsContainer").html(closedhtmlstr);
  }
}

function getDataPromise(method) {
  return new Promise(function (resolve, reject) {
    method().call({ from: account }, function (error, result) {
      console.log("Returned!");
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
}

async function getDataPromiseWithArgs(method, args) {
  return await new Promise(function (resolve, reject) {
    method(args).call({ from: account }, function (error, result) {
      console.log("Called method with 1 arg");
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
}

function getDataPromiseWithTwoArgs(method, arg1, arg2) {
  return new Promise(function (resolve, reject) {
    method(arg1, arg2).call({ from: account }, function (error, result) {
      console.log("Called method with 2 args");
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
}

function getBalancePromise(addr) {
  return new Promise(function (resolve, reject) {
    window.web3.eth.getBalance(addr, function (error, result) {
      if (!error) {
        resolve(result);
      }
    });
  });
}

function getDataNum(method, divtag) {
  method().call({ from: account }, function (error, result) {
    if (!error) {
      $(divtag).html(result.toNumber());
    } else {
      console.log(error);
    }
  });
}

function getDataStr(method, divtag) {
  method().call({ from: account }, function (error, result) {
    if (!error) {
      $(divtag).html(result);
    } else {
      console.log(error);
    }
  });
}

function setStatus(message) {
  $("#status").html(message);
}

function vote(proposal) {
  var proposalID = "proposal" + proposal;
  var proposalOption = parseInt(
    $("input:radio[name=" + proposalID + "]:checked").val()
  );

  console.log("Selected proposal");
  console.log(proposal);
  console.log("Selected proposal option");
  console.log(proposalOption);

  //setStatus("Initiating transaction... (please wait)");
  console.log("Account");
  console.log(account);
  newContractInstance.methods
    .vote(proposal, proposalOption)
    .send({ from: account })
    .then((tx) => {
      console.log("Tx going!");
      console.log(tx);
      getTransactionReceiptMined(tx.transactionHash).then(function (receipt) {
        console.log("receiptreceiptreceipt", receipt);
        $("#manuscriptSuccessModal").modal();
        $("#modeltext").html(
          "Your transaction to vote has been processed successfully. Transaction hash:" +
            receipt.transactionHash
        );
      });
    })
    .catch((err) => {
      console.log("Error voting");
      console.error(err);
    });
}

var loadPage = async () => {
  setTimeout(async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (!accounts[0]) {
      setErrorMessage();
    } else {
      //initializeContract();
      account = accounts[0];
      console.log(account);
      initializeContract();

      window.web3.eth.getBalance(account, function (error, result) {
        if (!error) {
          console.log(result);
          $("#cb_balance").html(
            Number(window.web3.utils.fromWei(result, "ether")).toFixed(5)
          );
        } else {
          console.error(error);
        }
      });
    }
  }, 500);
};

// Inital loading of the page
if (document.readyState !== "complete") {
  // Document has not finished loaded yet, load the page when it is complete
  window.addEventListener("load", async () => {
    console.log("Page loaded");
    if (window.ethereum) {
      console.log("window.ethereum");
      await ethereum.enable();
      window.web3 = new Web3(window.ethereum);
      loadPage();
    } else {
      console.log("none");
      // Document has finished loaded, load the page
      setErrorMessage();
    }
  });
}

function getTransactionReceiptMined(txHash, interval) {
  var transactionReceiptAsync;
  interval = interval ? interval : 500;
  transactionReceiptAsync = function (txHash, resolve, reject) {
    window.web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
      if (error) {
        reject(error);
      } else {
        if (receipt == null) {
          setTimeout(function () {
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
    txHash.forEach(function (oneTxHash) {
      promises.push(
        window.web3.eth.getTransactionReceiptMined(oneTxHash, interval)
      );
    });
    return Promise.all(promises);
  } else {
    return new Promise(function (resolve, reject) {
      transactionReceiptAsync(txHash, resolve, reject);
    });
  }
}

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    month + " " + date + ", " + year + " at " + hour + ":" + min + ":" + sec;
  return time;
}

function setErrorMessage() {
  $("#votingcontractcontainer").hide();
  $("#votingproposalcontainer").hide();
  $("#closedvotingproposalcontainer").hide();
  $("#footercontainer").html(
    '<footer class="footer" style="position:absolute;"><div class="container"><p class="rights"><br>' +
      new Date().getFullYear() +
      ' Bloxberg Network. All rights reserved.</p><a class="logo" href=\'/\'></a><div class="socials"></div></div></footer>'
  );
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
}
