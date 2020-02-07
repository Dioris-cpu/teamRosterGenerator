const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const util = require("util")
const Engineer = require("./Engineer");
const Manager = require("./Manager");
const Intern = require("./Intern");

const writeFileAsync = util.promisify(fs.writeFile);


// class Main is the main application which I call a new class on the newMain.js
// file. class Main has only one function which is run() and I call it In the
// newMain.js file. 
class Main {
  constructor() {
    this._teamArray = [];
  }
  async generateCards(){
    let htmlCards = "";
    for (let teamMember of this._teamArray) {
      htmlCards += teamMember.generateCards();
    }
    const roster = Main._templateStart + htmlCards + Main._templateEnd;
    await writeFileAsync(path.resolve(__dirname, "teamRoster", "roster.html"),roster);
  }
  async run() {
    const { teamSize } = await inquirer.prompt([
      {
        type: "input",
        name: "teamSize",
        message: "Please input your teams size",
        default: 3
      }
    ]);
    for (let i = 0; i < teamSize; i++) {
      const response = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Please input your name"
        },
        {
          type: "input",
          name: "email",
          message: "Please input your email"
        },
        {
          type: "input",
          name: "id",
          message: "Please input your id"
        },
        {
          type: "list",
          name: "role",
          message: "Please input your role",
          choices: [Main._MANAGER , Main._ENGINEER, Main._INTERN]
        },
        {
          type: "input",
          name: "github",
          message: "Please input your github",
          when: (answers) => { return answers.role === Main._ENGINEER }
        },
        {
          type: "input",
          name: "school",
          message: "Please input your school",
          when: (answers) => { return answers.role === Main._INTERN }
        },
        {
          type: "input",
          name: "office number",
          message: "Please input your office number",
          when: (answers) => { return answers.role === Main._MANAGER }
        },
      ]);
      //deconstucted the reponse object.
      const {
          name,
          id,
          email,
          role,
          github,
          officeNumber,
          school,
      } = response;
      // checked weather the role was an Engineer, Mananger or Intern.
      // created a new obj depending on the role and then pushed it to the teamArray.
      if (role === Main._ENGINEER) {
          this._teamArray.push(new Engineer(name, id, email, github));
      }
      if (role === Main._MANAGER ) {
        this._teamArray.push(new Manager(name, id, email, officeNumber));
    }
    if (role === Main._INTERN) {
        this._teamArray.push(new Intern(name, id, email, school));
    }


    }
    await this.generateCards();
  }
};
Main._ENGINEER = "Engineer";
Main._MANAGER = "Manager";
Main._INTERN = "Intern";


    Main._templateStart = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <link rel="stylesheet" href="style.css">
      <title>Team Roster</title>
    </head>
    <body>
      <style>
      .page-header {
      background: red;
      padding: 30px;
      font-size: xx-large;
      text-align: center;
      font-weight: bold;
    }
    .team-roster-container {
      display: flex;
      padding: 50px;
    }
    .card:not(:last-child) {
      background-color: aqua;
      margin-right: 20px;
    }
          </style>
      <div class="page-header">My Team</div>
      <div class="team-roster-container">
      `;
      Main._templateEnd = 
      `
      </div>

      <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    </body>
    </html>`



module.exports = Main;
