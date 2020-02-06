const Employee = require("./Employee");


module.exports = class Engineer extends Employee {
    constructor(name, id, email, github){
        super(name,id,email);
        this._github = github;

    }


    getGithub(){
        return this._github
    }
    generateCards(){
        return `<div class="card" style="width: 18rem;">
        <div class="card-header">
          <h1>${this._name} 
          Engineer</h1>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Id: ${this._id}</li>
          <li class="list-group-item">Email: ${this._email}</li>
          <li class="list-group-item">Github: ${this._github}</li>
        </ul>
      </div>
</div>`
    }

}
