const Employee = require("./Employee");

module.exports = class Manager extends Employee {
    constructor(name, id, email, officeNumber){
        super(name,id,email);
        this._officeNumber = officeNumber;

    }


    getOfficeNumber(){
        return this._officeNumber
    }

    generateCards(){
        return `<div class="card" style="width: 18rem;">
        <div class="card-header">
          <h1>${this._name} 
          Manager</h1>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Id: ${this._id}</li>
          <li class="list-group-item">Email: ${this._email}</li>
          <li class="list-group-item">Office Number: ${this._officeNumber}</li>
        </ul>
      </div>
</div>`
    }


}

