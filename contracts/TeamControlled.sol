pragma solidity ^0.4.18;

contract TeamControlled {
    mapping (address => bool) public teamMembers;

    event TeamMemberAdded(address indexed user);
    event TeamMemberRemoved(address indexed member);

    function TeamControlled() public {
        teamMembers[msg.sender] = true;
    }

    modifier onlyTeam() {
        require(teamMembers[msg.sender]);
        _;
    }

    function addMember(address _usr) public onlyTeam {
        if (!teamMembers[_usr]) {
            TeamMemberAdded(_usr);
            teamMembers[_usr] = true;
        }
    }

    function removeMember(address _mmbr) public onlyTeam {
        if (teamMembers[_mmbr]) {
            TeamMemberRemoved(_mmbr);
            teamMembers[_mmbr] = false;
        }
    }
}
