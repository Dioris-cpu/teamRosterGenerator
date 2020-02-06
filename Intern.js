const Employee = require("./Employee");
 
module.exports = class Intern extends Employee {
    constructor(name, id, email,school){
        super(name,id,email);
        this._school = school;

    }


    getSchool(){
        return this._school
    }

    generateCards(){
        return `<div class="card" style="width: 18rem;">
        <div class="card-header">
          <h1>${this._name} 
          Intern</h1>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Id: ${this._id}</li>
          <li class="list-group-item">Email: ${this._email}</li>
          <li class="list-group-item">School: ${this._school}</li>
        </ul>
      </div>
</div>`
    }

}

