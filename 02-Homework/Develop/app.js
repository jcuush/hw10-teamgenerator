const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const { create } = require("domain");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let team = [];
// this function is ran after the initial inquirer to decide if additional questions need to be asked through the inquirer based on the employees role
const questions = [
    {
        type: "input",
        message: "What is your name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your employee ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email"
    },
    {
        type: "list",
        message:"What is your role?",
        choices: [
            "Employee",
            "Manager",
            "Engineer",
            "Intern"
        ],
        name: "role"
    },
]

const employeeInfo = (role) => {
    if(role === "Manager") {
    inquirer
    .prompt([
    {
        type: "input",
        message: "What is your office number?",
        name: "officeNumber"
    }
    ])
}
    else if(role === "Engineer"){
        inquirer
        .prompt([
        {
        type: "input",
        message: "What is your github username?",
        name: "github"
        }

    ])
    }
    else if(role === "Intern"){
        inquirer
        .prompt([
        {
        type: "input",
        message: "Where did you go to school?",
        name: "school"
        }
    ]).then(function(roleData) {
        console.log(roleData);
    //     createEmployee(data.role)
    //     console.log(newEmployee);
    })
    }
}



const createEmployee = (data, roleData) => {
    if(role === "Employee") {
        var newEmployee = new Employee(data.name, data.id, data.email)
        team.push(newEmployee);
    }
    else if(role === "Manager") {
        var newEmployee = new Manager(data.name, data.id, data.email, roleData)
        team.push(newEmployee);
    }
    else if(role === "Engineer") {
        var newEmployee = new Engineer(data.name, data.id, data.email, roleData)
        team.push(newEmployee);
    }
    else if(role === "Intern") {
        var newEmployee = new Intern(data.name, data.id, data.email, roleData)
        team.push(newEmployee);
    
        
    }
    
    

}

function init() {
    inquirer
    .prompt(questions)
    .then(function(data) {
        employeeInfo(data.role);
        createEmployee(data, roleData);
    })
console.log(newEmployee);
}

// function renderHTML () {

// }
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
init();
