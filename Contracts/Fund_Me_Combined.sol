// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Fund {
    address payable private owner;
    uint private totalDonated;

    constructor(address _truOwner) {
        owner = payable(_truOwner);
    }

    function sendMoney() public payable {
        require(msg.value >= 0.1 ether, "You need to send at least 0.1 ether");
        totalDonated += msg.value;
    }

    function withdraw(address payable to) public {
        require(to == owner, "You are not the owner of this contract");
        to.transfer(address(this).balance);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getOwner() public view returns (address payable) {
        return owner;
    }

    function getTotalDonated() public view returns (uint) {
        return totalDonated;
    }

   
}

contract FundDeployer {
    mapping(string => address) public deployedContractsByName;
    uint private totalDonated;

    function deployContract(string memory name) public {
        require(
            deployedContractsByName[name] == address(0),
            "Contract name already exists"
        );
        Fund newContract = new Fund(msg.sender);
        deployedContractsByName[name] = address(newContract);
    }

    function fundContract(string memory name) public payable {
        require(msg.value > 0, "You need to send some ether");
        require(
            deployedContractsByName[name] != address(0),
            "Contract does not exist"
        );
        Fund currentContract = Fund(deployedContractsByName[name]);
        currentContract.sendMoney{value: msg.value}();
        totalDonated += msg.value;
    }

    function withdrawFromContract(string memory name) public {
        require(
            deployedContractsByName[name] != address(0),
            "Contract does not exist"
        );
        Fund currentContract = Fund(deployedContractsByName[name]);

        address owner = address(currentContract.getOwner());
        require(owner == msg.sender, "You are not the owner of this contract");
        currentContract.withdraw(payable(msg.sender));
    }

    function getBalanceFromContract(
        string memory name
    ) public view returns (uint) {
        require(
            deployedContractsByName[name] != address(0),
            "Contract does not exist"
        );
        Fund currentContract = Fund(deployedContractsByName[name]);
        return currentContract.getBalance();
    }

    function getOwnerByContractName(
        string memory name
    ) public view returns (address) {
        require(
            deployedContractsByName[name] != address(0),
            "Contract does not exist"
        );
        Fund currentContract = Fund(deployedContractsByName[name]);
        return currentContract.getOwner();
    }

    function getTotalDonated(string memory _name) public view returns (uint) {
        require(
            deployedContractsByName[_name] != address(0),
            "Contract does not exist"
        );
        Fund currentContract = Fund(deployedContractsByName[_name]);
        return currentContract.getTotalDonated();
    }

   
    fallback() external payable {}

    receive() external payable {}
}
