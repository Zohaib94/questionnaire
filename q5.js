// Bug in Code:
// Issue of Scope, 'this' in 'this.teamName' inside the 'map' function refers to the scope of the function,
// instead of referring to the scope of the 'team' object which had the 'teamName' attribute.

// Corrected Code:
const team = {
  members:['Superman','Batman','Wonder Woman'],
  teamName: 'Justice league',
  teamSummary: function(){
    let teamName = this.teamName;
    return this.members.map(function(member) {
      return `${member} is on team ${teamName}`;
    });
  }
};
team.teamSummary();
