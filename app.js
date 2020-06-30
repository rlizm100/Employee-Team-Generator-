const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function startPrompt() {
    addManager()
}
startPrompt()

const employeeInfo = [];

function newTeamMember() {
    inquirer.prompt([
        {
            type: "list",
            name: "addTeamMember",
            message: "what type of team member would you like to add",
            choices: ["Engineer", "Intern", "I don't want to add anymore"]
        }
    ])
        .then(userInput => {
            if (userInput.addTeamMember === "Engineer") {
                addEngineer();
            }
            else if (userInput.addTeamMember === "Intern") {
                addIntern();
            }
            else if (userInput.addTeamMember === "I don't want to add anymore") {
                renderHTML();
                writeToFile(render(employeeInfo));
            }
        })
        .catch(error => {
            console.log("Was not able to create team-members.html")
            process.exit(1);
        });
}

function renderHTML() {
    render(employeeInfo);
}

function addManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "manager'",
            message: "What is your manager's name?"

        },
        {

            type: "input",
            name: "managerId",
            message: "What is your manager's id?"

        },
        {

            type: "input",
            name: "managerEmail",
            message: "What is your manager's email address?"


        },
        {

            type: "input",
            name: "managerOfficeNumber",
            message: "What is your manager's Office number?"


        }
    ])
        .then(userInput => {
            let manager = userInput.manager;
            let managerId = userInput.managerId;
            let managerEmail = userInput.managerEmail;
            let managerOfficeNumber = userInput.managerOfficeNumber;

            const managerInfo = new Manager(manager, managerId, managerEmail, managerOfficeNumber)
            employeeInfo.push(managerInfo)
            newTeamMember();
        })
        .catch(error => {
            console.log("couldn't add members, please try again")
            process.exit(1);
        })
}
function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "engineer'",
            message: "What is your engineer's name?"

        },
        {

            type: "input",
            name: "engineerId",
            message: "What is your engineer's id?"

        },
        {

            type: "input",
            name: "engineerEmail",
            message: "What is your engineer's email address?"


        },
        {

            type: "input",
            name: "engineerGithub",
            message: "What is your engineer's Github username?"


        }
    ])
        .then(userInput => {
            let engineer = userInput.engineer;
            let engineerId = userInput.engineerId;
            let engineerEmail = userInput.engineerEmail;
            let engineerGithub = userInput.engineerGithub;

            const engineerInfo = new Engineer(engineer, engineerId, engineerEmail, engineerGithub)
            employeeInfo.push(engineerInfo)
            newTeamMember();
        })
        .catch(error => {
            console.log("couldn't add members, please try again")
            process.exit(1);
        })
}
function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "intern",
            message: "What is your intern's name?"


        },
        {

            type: "input",
            name: "internId",
            message: "What is your intern's id?"


        },
        {

            type: "input",
            name: "internEmail",
            message: "What is your intern's email?"


        },
        {

            type: "input",
            name: "internSchool",
            message: "What school does your intern attend?"



        }
    ])
        .then(userInput => {
            let intern = userInput.intern;
            let internId = userInput.internId;
            let internEmail = userInput.internEmail;
            let internSchool = userInput.internSchool;

            const internInfo = new Intern(intern, internId, internEmail, internSchool)
            employeeInfo.push(internInfo)
            newTeamMember();
        })
        .catch(error => {
            console.log("couldn't add members, please try again")
            process.exit(1);
        })
}


function writeToFile(data) {
    return fs.writeFile(outputPath, data, function(error){
        if (error) {
            console.log(error)
            return;
        }
        
        console.log("Information completed!")
    });

       
};




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
