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

// team is an empty array as members that members will be pushed into after prompts are answerd
let team = [];
// managerpresent value is set to false and will change to true as soon as a manager team member is selected

let managerPresent = false;

// questions to be asked on initial prompt that apply to all employees
const questions = [
    {
        type: "input",
        message: "What is the team member's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the team member's employee ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the team member's email?",
        name: "email"
    },
    {
        type: "list",
        message:"What is the team member's role?",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ],
        name: "role"
    },
]
// this function will ask the user if they wish to add more members to their team following the prompts, if yes is selected the prompt is ran again, if no an html file for the team is created
const newMember = () => {
    inquirer
    .prompt([
        {
            type: "confirm",
            message: "Are there more team members?",
            name: "newMember"
        }
    ]).then(function(teamData) {
        if(teamData.newMember === true) {
            init();
        }
        else{ 
            renderHTML();
        }

    })
     
}
// this function takes in data from initial inquirer and will prompt an additional question respective to the role selected and calls creates the create employee function at the end
const employeeInfo = (data) => {
    if(data.role === "Manager") {
        managerPresent = true;
    inquirer
    .prompt([
    {
        type: "input",
        message: "What is the team manager's office number?",
        name: "officeNumber"
    }
    ]).then(function(roleData) {
        createEmployee(data, roleData);
    })
}
    else if(data.role === "Engineer"){
        inquirer
        .prompt([
        {
        type: "input",
        message: "What is the team engineer's github username?",
        name: "github"
        }

    ]).then(function(roleData) {
        createEmployee(data, roleData);
    })
    }
    else if(data.role === "Intern"){
        inquirer
        .prompt([
        {
        type: "input",
        message: "Where does the intern go to school?",
        name: "school"
        }
    ]).then(function(roleData) {
        createEmployee(data, roleData);
    })
    }
}


// this function takes in data from the initial prompt and the prompt relative to the role and based on the role uses the respective classes to add a new employee, calls newMember function at end to ask user if they want to add more members
const createEmployee = (data, roleData) => {
    if(data.role === "Manager") {
        var newEmployee = new Manager(data.name, data.id, data.email, roleData.officeNumber)
        team.push(newEmployee);
        newMember();
    }
    else if(data.role === "Engineer") {
        var newEmployee = new Engineer(data.name, data.id, data.email, roleData.github)
        team.push(newEmployee);
        newMember();
    }
    else if(data.role === "Intern") {
        var newEmployee = new Intern(data.name, data.id, data.email, roleData.school)
        team.push(newEmployee);
        newMember();
    }
    
    
    

}
// function init prompts the questions array and then based off of the data.role value will prompt the question designated for each role.  The if statement is there so only one manager can be added to the team.  If a user tries to add more than one manager it will not be allowed and then the user will be prompted if they still want to add more members or not once again.
function init() {
    inquirer
    .prompt(questions)
    .then(function(data) {
        if (managerPresent === true) {
            console.log("Only one manager is allowed")
            newMember();
        }
        else {
        employeeInfo(data);
    }
    })
}
// creates the html file where the team member information is displayed.
function renderHTML () {
    var html = render(team)
    fs.writeFile(outputPath, html, function(error) {
        if(error) {
            return console.log(error);
        }
        console.log("New team member file created!");
        })
}

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


