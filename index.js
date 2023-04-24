// Include packages needed for this application
const inquirer = require("inquirer");

const fs = require("fs");

const generateMarkdown = require("./utils/generateMarkdown");

// Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
  },
  {
    type: "input",
    name: "description",
    message: "Provide a brief description of the project.",
  },
  {
    type: "list",
    name: "license",
    message: "Select the license type for your project.",
    choices: [
      "Apache License 2.0",
      "GNU General Public License v3.0",
      "MIT License",
      "ISC License",
      "Mozilla Public License 2.0",
      "Boost Software License 1.0",
      "The Unlicense",
      "I don’t want a license.",
    ],
  },
  {
    type: "editor",
    name: "instalation",
    message: "Instruct your audience on installing and setting up your app.",
  },
  {
    type: "editor",
    name: "usage",
    message: "Describe how the project can be used.",
  },
  {
    type: "editor",
    name: "contributing",
    message: "Describe how the contributions to the project can be made.",
  },
  {
    type: "editor",
    name: "tests",
    message:
      "Provide tests for your application and give examples on how to run them.",
  },
  {
    type: "editor",
    name: "credits",
    message: "List resources or co-authors you would like to give credit to.",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email address?",
  },
  {
    type: "input",
    name: "github",
    message: "What is the link to your github?",
  },
];

// Create a function to write README file
function writeToFile(fileName, data) {
  // Call generateMarkdown to create content
  const readmeContent = generateMarkdown(data);
  fs.writeFile(fileName, readmeContent, (err) =>
    err
      ? console.error(err)
      : console.log(
          "\x1b[36m%s\x1b[0m",
          `Your README is saved in generatedREADMEs folder under the name: ${fileName}!`
        )
  );
}

// Create a function to initialize app
function init(questions) {
  // Collect the user input with inquirer
  inquirer.prompt(questions).then((data) => {
    console.log(data);
    // Turn the title of the project into the file name with no special characters, no uppercase and no spaces.
    let projectTitle = data.title.trim().toLowerCase();
    let noSpecialChars = projectTitle.replace(/[^a-zA-Z0-9 ]/g, "");
    let noSpacesString = noSpecialChars.replace(/ /g, "-");
    // Locate the file in the folder generatedREADMEs
    let fileName = `./generatedREADMEs/${noSpacesString}.md`;
    // Call the function to write the file
    writeToFile(fileName, data);
  });
}

// Function call to initialize app with questions array as the parameter
init(questions);
