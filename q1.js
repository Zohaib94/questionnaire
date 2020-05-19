class Expense { 
  constructor(typeString = undefined, amountString = undefined){
    this.type = typeString;
    this.amount = amountString;
  }
  
  setAmount(amountString) { 
    this.amount = amountString;
  }
  
  setType(typeString) {
    this.type = typeString;
  }
  
  getType() { return this.type; }
  getAmount() { return this.amount; }
}

let expense = new Expense('Business', '$50');
let type = expense.getType();
let amount = expense.getAmount();
