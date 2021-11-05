#!/mnt/d/КСЮ/Учеба/GB/Node.js/Project
const fs = require('fs/promises');
const yargs = require("yargs");
const path = require('path');
const inquirer = require('inquirer');
const { lstatSync } = require('fs');

let currentDirectory = process.cwd();
const options = yargs
    .positional('s', {
        describe: 'search',
        default: '',
    }).argv;

const fileRead = async () => {
    const list = await fs.readdir(currentDirectory);
    const items = list.map(f => {
        return { path: path.join(currentDirectory, f), fileName: f }
    });

    const item = await inquirer
        .prompt([
            {
                name: 'listItem',
                type: 'list',
                message: `Choose: ${currentDirectory}`,
                choices: items.map(item => ({ name: item.fileName, value: item })),
            }
        ])
        .then(answer => answer.listItem);

    if (lstatSync(item.path).isDirectory()) {
        currentDirectory = item.path;
        return await fileRead();
    } else {
        const data = await fs.readFile(item.path, 'utf-8');

        if (options.s == null) console.log(data);
        else {
            const regExp = new RegExp(options.s, 'igm');
            console.log(data.match(regExp));
        }
    }
}
fileRead();