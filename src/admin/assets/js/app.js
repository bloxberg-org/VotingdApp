var accounts
var account
var balance
var numTotalProposals
var oldContractProposals
var newContractProposals
var totalEndedProposals
var chairpersonAddress
var htmlstr = ''
//var proposalNumber;
var canUserVote
var myContractInstance
var WAD = 1000000000000000000
var modalShow = false
//var contract_address = "0xEea584517644eb0B82eAba9B33CFA0ceF7A3F7B2";
// var contract_address = "0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5";
var contract_address = '0x19e51afd3efa98a6e4b82d3834de174d7a33f9b5'
var new_contract_address = '0x8b0Ba3C029FC12ba1FBeED4A6F7510cB3401885e'

var contract_abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'old',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'current',
        type: 'address',
      },
    ],
    name: 'NewOwner',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'proposal',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'winningProposalOption',
        type: 'uint256',
      },
    ],
    name: 'ProposalEnded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'proposal',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'proposalOption',
        type: 'uint256',
      },
    ],
    name: 'Voted',
    type: 'event',
  },
  {
    inputs: [],
    name: 'chairperson',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newAddress',
        type: 'address',
      },
    ],
    name: 'changeChairman',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'proposalName',
        type: 'string',
      },
      {
        internalType: 'bytes32[]',
        name: 'optionNames',
        type: 'bytes32[]',
      },
      {
        internalType: 'uint256',
        name: 'votingTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'proposalBatchNumber',
        type: 'uint256',
      },
    ],
    name: 'createProposal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposal',
        type: 'uint256',
      },
    ],
    name: 'finalizeProposal',
    outputs: [
      {
        internalType: 'string',
        name: 'proposalName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'winningProposalOption',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'winningProposalOptionName',
        type: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposal',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getProposalDetailsForVoter',
    outputs: [
      {
        internalType: 'string',
        name: 'proposalName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'numOptions',
        type: 'uint256',
      },
      {
        internalType: 'bytes32[]',
        name: 'optionNames',
        type: 'bytes32[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposal',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'proposalOptionNum',
        type: 'uint256',
      },
    ],
    name: 'getProposalOptionName',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'proposalOptionName',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposal',
        type: 'uint256',
      },
    ],
    name: 'getProposalResult',
    outputs: [
      {
        internalType: 'string',
        name: 'proposalName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'winningProposalOption',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'winningProposalOptionName',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'proposalBatchNumber',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'votingTime',
        type: 'uint256',
      },
    ],
    name: 'getRemaingTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getVoterDetail',
    outputs: [
      {
        internalType: 'bool',
        name: 'result',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'weight',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'voterAddress',
        type: 'address',
      },
    ],
    name: 'giveRightToVoteFounder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'voterAddress',
        type: 'address',
      },
    ],
    name: 'giveRightToVoteMember',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposal',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'hasUserVoted',
    outputs: [
      {
        internalType: 'bool',
        name: 'result',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'numEndedProposals',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'numProposals',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'numVoters',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'proposals',
    outputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'votingStart',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'votingTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'proposalBatch',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'numOptions',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'numCastedVotes',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isEnded',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'winningProposalOption',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'winningProposalOptionName',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'voterAddress',
        type: 'address',
      },
    ],
    name: 'revokeRightToVote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_new',
        type: 'address',
      },
    ],
    name: 'setOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'totalvoters',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposal',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'proposalOption',
        type: 'uint256',
      },
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'voters',
    outputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'rightToVote',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'weight',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

var new_contract_abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'old',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'current',
        type: 'address',
      },
    ],
    name: 'NewOwner',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'proposal',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'winningProposalOption',
        type: 'uint256',
      },
    ],
    name: 'ProposalEnded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'proposal',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'proposalOption',
        type: 'uint256',
      },
    ],
    name: 'Voted',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newAddress',
        type: 'address',
      },
    ],
    name: 'changeChairman',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'voterAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'newWeight',
        type: 'uint256',
      },
    ],
    name: 'changeVoterWeight',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'proposalName',
        type: 'string',
      },
      {
        internalType: 'bytes32[]',
        name: 'optionNames',
        type: 'bytes32[]',
      },
      {
        internalType: 'uint256',
        name: 'votingTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'proposalBatchNumber',
        type: 'uint256',
      },
    ],
    name: 'createProposal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposal',
        type: 'uint256',
      },
    ],
    name: 'finalizeProposal',
    outputs: [
      {
        internalType: 'string',
        name: 'proposalName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'winningProposalOption',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'winningProposalOptionName',
        type: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'voterAddress',
        type: 'address',
      },
    ],
    name: 'giveRightToVoteFounder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'voterAddress',
        type: 'address',
      },
    ],
    name: 'giveRightToVoteMember',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'voterAddress',
        type: 'address',
      },
    ],
    name: 'revokeRightToVote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_new',
        type: 'address',
      },
    ],
    name: 'setOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposal',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'proposalOption',
        type: 'uint256',
      },
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'chairperson',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposal',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getProposalDetailsForVoter',
    outputs: [
      {
        internalType: 'string',
        name: 'proposalName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'numOptions',
        type: 'uint256',
      },
      {
        internalType: 'bytes32[]',
        name: 'optionNames',
        type: 'bytes32[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposal',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'proposalOptionNum',
        type: 'uint256',
      },
    ],
    name: 'getProposalOptionName',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'proposalOptionName',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposal',
        type: 'uint256',
      },
    ],
    name: 'getProposalResult',
    outputs: [
      {
        internalType: 'string',
        name: 'proposalName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'winningProposalOption',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'winningProposalOptionName',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'proposalBatchNumber',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getVoterDetail',
    outputs: [
      {
        internalType: 'bool',
        name: 'result',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'weight',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'proposal',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'hasUserVoted',
    outputs: [
      {
        internalType: 'bool',
        name: 'result',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'numEndedProposals',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'numProposals',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'numVoters',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'proposals',
    outputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'votingStart',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'votingTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'proposalBatch',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'numOptions',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'numCastedVotes',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isEnded',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'winningProposalOption',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'winningProposalOptionName',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'totalvoters',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'voters',
    outputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'rightToVote',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'weight',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

// Initialize
function initializeContract() {
  console.log(contract_address)
  myContractInstance = new window.web3.eth.Contract(
    contract_abi,
    contract_address,
  )
  newContractInstance = new window.web3.eth.Contract(
    new_contract_abi,
    new_contract_address,
  )
  $('#cf_address').html(new_contract_address)
  $('#cb_address').html(account)
  refreshDataNew()
  getContractDetails()
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
  ])
  oldContractProposals = oldProposals
  newContractProposals = newProposals
  var allProposals =
    parseInt(oldContractProposals) + parseInt(newContractProposals)

  $('#numOpenProposals').html(
    parseInt(newContractProposals) - parseInt(newContractNumEndedProposals),
  )
}

function refreshDataNew() {
  console.log('Refreshing data')
  getDataPromise(newContractInstance.methods.numVoters)
    .then(function (numVoters) {
      console.log('numVoters = ' + parseInt(numVoters))
      $('#numVoters').html(parseInt(numVoters))
      return getDataPromiseWithArgs(
        newContractInstance.methods.getVoterDetail,
        account,
      )
    })
    .then(function (result) {
      console.log('canUserVote = ' + result[0])
      console.log('Voting weight: ' + result[1])
      canUserVote = result[0]
      if (canUserVote) {
        $('#canUserVote').html('Yes')
      } else {
        $('#canUserVote').html('No')
      }
      $('#votingWeight').html(result[1])

      return getDataPromise(newContractInstance.methods.chairperson)
    })
    .then(function (chairperson) {
      console.log('chairperson = ' + chairperson)
      $('#chairperson').html(chairperson)
      if (canUserVote) {
        updateProposalsList()
        updateClosedProposalsList()
        $('#footercontainer').html(
          '<footer class="footer"><div class="container"><p class="rights"><br>' +
            new Date().getFullYear() +
            ' Bloxberg Network. All rights reserved.</p><a class="logo" href=\'/\'></a><div class="socials"></div></div></footer>',
        )
      } else {
        $('#openPropsalsContainer').html(
          '<h4>You are not authorized to vote</h4>',
        )
        $('#footercontainer').html(
          '<footer class="footer" style="position:absolute;"><div class="container"><p class="rights"><br>' +
            new Date().getFullYear() +
            ' Bloxberg Network. All rights reserved.</p><a class="logo" href=\'/\'></a><div class="socials"></div></div></footer>',
        )
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

function getDataPromise(method) {
  return new Promise(function (resolve, reject) {
    method().call({ from: account }, function (error, result) {
      console.log('Returned!')
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

async function getDataPromiseWithArgs(method, args) {
  return await new Promise(function (resolve, reject) {
    method(args).call({ from: account }, function (error, result) {
      console.log('Called method with 1 arg')
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

function getDataPromiseWithTwoArgs(method, arg1, arg2) {
  return new Promise(function (resolve, reject) {
    method(arg1, arg2).call({ from: account }, function (error, result) {
      console.log('Called method with 2 args')
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

function getBalancePromise(addr) {
  return new Promise(function (resolve, reject) {
    window.web3.eth.getBalance(addr, function (error, result) {
      if (!error) {
        resolve(result)
      }
    })
  })
}

function getDataNum(method, divtag) {
  method().call({ from: account }, function (error, result) {
    if (!error) {
      $(divtag).html(result.toNumber())
    } else {
      console.log(error)
    }
  })
}

function getDataStr(method, divtag) {
  method().call({ from: account }, function (error, result) {
    if (!error) {
      $(divtag).html(result)
    } else {
      console.log(error)
    }
  })
}

function setStatus(message) {
  $('#status').html(message)
}

function giveRightToVoteMember() {
  var address = $('#giveRightToVoteAddress').val()
  newContractInstance.methods
    .giveRightToVoteMember(address)
    .send({ from: account })
    .then((tx) => {
      getTransactionReceiptMined(tx.transactionHash).then(function (receipt) {
        console.log(receipt.transactionHash)
        $('#myModal').modal()
        $('#myModalTitle').html('Transaction Successful')
        $('#myModalText').html(
          'Your transaction to give rights to vote to address ' +
            address +
            ' has been processed successfully. Transaction hash: ' +
            receipt.transactionHash,
        )
      })
    })
    .catch(console.error)
}

function changeVotingWeight() {
  var address = $('#voterAddress').val()
  var weight = $('#newVotingWeight').val()
  newContractInstance.methods
    .changeVoterWeight(address, weight)
    .send({ from: account })
    .then((tx) => {
      getTransactionReceiptMined(tx.transactionHash).then(function (receipt) {
        console.log(receipt.transactionHash)
        $('#myModal').modal()
        $('#myModalTitle').html('Transaction Successful')
        $('#myModalText').html(
          'Your transaction to change voting weight to address ' +
            address +
            ' has been processed successfully. Transaction hash: ' +
            receipt.transactionHash,
        )
      })
    })
    .catch(console.error)
}

function revokeRightToVote() {
  var address = $('#revokeRightToVoteAddress').val()
  newContractInstance.methods
    .revokeRightToVote(address)
    .send({ from: account })
    .then((tx) => {
      getTransactionReceiptMined(tx.transactionHash).then(function (receipt) {
        console.log(receipt.transactionHash)
        $('#myModal').modal()
        $('#myModalTitle').html('Transaction Successful')
        $('#myModalText').html(
          'Your transaction to revoke rights to vote to address ' +
            address +
            ' has been processed successfully. Transaction hash: ' +
            receipt.transactionHash,
        )
      })
    })
    .catch(console.error)
}

function finalizeProposal() {
  var proposalNumber = $('#proposalNumber').val()
  newContractInstance.methods
    .finalizeProposal(proposalNumber)
    .send({ from: account })
    .then((tx) => {
      getTransactionReceiptMined(tx.transactionHash).then(function (receipt) {
        console.log(receipt.transactionHash)
        $('#myModal').modal()
        $('#myModalTitle').html('Transaction Successful')
        $('#myModalText').html(
          'Your transaction to finalize Proposal #' +
            proposalNumber +
            ' has been processed successfully. Transaction hash: ' +
            receipt.transactionHash,
        )
      })
    })
    .catch(console.error)
}

function createProposal() {
  var proposalName = $('#proposalName').val()
  var batchNumber = $('#batchNumber').val()
  var optionName1 = $('#optionName1').val()
  var optionName2 = $('#optionName2').val()
  var optionName3 = $('#optionName3').val()
  var optionName4 = $('#optionName4').val()
  var optionName5 = $('#optionName5').val()
  var votingTime = $('#votingTime').val()
  var error = false

  if (!proposalName) {
    error = true
    $('#myModalNoRefresh').modal()
    $('#myModalTitle1').html('No proposal name')
    $('#myModalText1').html('Please provide a name for your proposal')
  }
  if (!batchNumber) {
    error = true
    $('#myModalNoRefresh').modal()
    $('#myModalTitle1').html('No batch number')
    $('#myModalText1').html('Please a batch number')
  }
  if (
    optionName1.length > 32 ||
    optionName2.length > 32 ||
    optionName3.length > 32 ||
    optionName4.length > 32 ||
    optionName5.length > 32
  ) {
    error = true
    $('#myModalNoRefresh').modal()
    $('#myModalTitle1').html('Proposal Title or Options Too Long')
    $('#myModalText1').html(
      'Please provide shorter proposal title or option names (less than 32 characters)',
    )
  }

  if (votingTime <= 0) {
    error = true
    $('#myModalNoRefresh').modal()
    $('#myModalTitle1').html('Invalid Voting Time')
    $('#myModalText1').html('Please enter a valid voting time in seconds')
  }

  // var proposalNameHex = web3.fromAscii(proposalName);

  var optionNamesHex = [
    window.web3.utils.asciiToHex(optionName1),
    window.web3.utils.asciiToHex(optionName2),
  ]
  if (optionName3.length > 0) {
    optionNamesHex.push(window.web3.utils.asciiToHex(optionName3))
  }
  if (optionName4.length > 0) {
    optionNamesHex.push(window.web3.utils.asciiToHex(optionName4))
  }
  if (optionName5.length > 0) {
    optionNamesHex.push(window.web3.utils.asciiToHex(optionName5))
  }

  // console.log("proposalNameHex = " + proposalNameHex);
  console.log('optionNamesHex')
  console.log(optionNamesHex)
  console.log('votingTime = ' + votingTime)

  if (!error) {
    newContractInstance.methods
      .createProposal(proposalName, optionNamesHex, votingTime, batchNumber)
      .send({ from: account })
      .then((tx) => {
        console.log(tx)
        getTransactionReceiptMined(tx.transactionHash).then(function (receipt) {
          console.log(receipt.transactionHash)
          $('#myModal').modal()
          $('#myModalTitle').html('Transaction Successful')
          $('#myModalText').html(
            'Your transaction to create a new proposal titled "' +
              proposalName +
              '" has been processed successfully. Transaction hash: ' +
              receipt.transactionHash,
          )
        })
      })
      .catch(console.error)
  }
}

var loadPage = async () => {
  setTimeout(async () => {
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    if (!accounts[0]) {
      setErrorMessage()
    } else {
      //initializeContract();
      account = window.web3.utils.toChecksumAddress(accounts[0])
      console.log(account)
      initializeContract()

      window.web3.eth.getBalance(account, function (error, result) {
        if (!error) {
          console.log(result)
          $('#cb_balance').html(
            Number(window.web3.utils.fromWei(result, 'ether')).toFixed(5),
          )
        } else {
          console.error(error)
        }
      })
    }
  }, 500)
}

// Inital loading of the page
if (document.readyState !== 'complete') {
  // Document has not finished loaded yet, load the page when it is complete
  window.addEventListener('load', async () => {
    console.log('Page loaded')
    if (window.ethereum) {
      console.log('window.ethereum')
      await ethereum.enable()
      window.web3 = new Web3(window.ethereum)
      loadPage()
    } else {
      console.log('none')
      // Document has finished loaded, load the page
      setErrorMessage()
    }
  })
}

function getTransactionReceiptMined(txHash, interval) {
  var transactionReceiptAsync
  interval = interval ? interval : 500
  transactionReceiptAsync = function (txHash, resolve, reject) {
    window.web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
      if (error) {
        reject(error)
      } else {
        if (receipt == null) {
          setTimeout(function () {
            transactionReceiptAsync(txHash, resolve, reject)
          }, interval)
        } else {
          resolve(receipt)
        }
      }
    })
  }

  if (Array.isArray(txHash)) {
    var promises = []
    txHash.forEach(function (oneTxHash) {
      promises.push(
        window.web3.eth.getTransactionReceiptMined(oneTxHash, interval),
      )
    })
    return Promise.all(promises)
  } else {
    return new Promise(function (resolve, reject) {
      transactionReceiptAsync(txHash, resolve, reject)
    })
  }
}

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000)
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  var year = a.getFullYear()
  var month = months[a.getMonth()]
  var date = a.getDate()
  var hour = a.getHours()
  var min = a.getMinutes()
  var sec = a.getSeconds()
  var time =
    month + ' ' + date + ', ' + year + ' at ' + hour + ':' + min + ':' + sec
  return time
}

function setErrorMessage() {
  $('#votingcontractcontainer').hide()
  $('#votingproposalcontainer').hide()
  $('#closedvotingproposalcontainer').hide()
  $('#footercontainer').html(
    '<footer class="footer" style="position:absolute;"><div class="container"><p class="rights"><br>' +
      new Date().getFullYear() +
      ' Bloxberg Network. All rights reserved.</p><a class="logo" href=\'/\'></a><div class="socials"></div></div></footer>',
  )
  $('#status').html(`
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
`)
}
