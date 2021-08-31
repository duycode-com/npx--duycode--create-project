const { execSync } = require('child_process')
const { Select } = require('enquirer');

const projects = {
    'Create ReactJS': 'https://github.com/duycode-com/create-reactjs.git',
    'MERN-Stack': 'https://github.com/duycode-com/mern-stack.git',
    'Fake API': 'https://github.com/duycode-com/fake-api.git',
}

const promptGit = async () => {
    try {
        const prompt = new Select({
            name: 'color',
            message: 'Please choose which Project template to use ?',
            choices: Object.keys(projects)
        });
        return await prompt.run()
    } catch (error) {
        process.exit(-1)
    }
}

const cli = async () => {
    try {
        const repository = process.argv[2] || './'
        const title = await promptGit()

        const gitCloneCommand = `git clone ${projects[title]} ${repository}`
        const installCommand = `cd ${repository} && npm install`

        console.log('\x1b[33m' + '...Please wait ! Git is getting reading to clone.' + '\x1b[0m');
        execSync(gitCloneCommand, { stdio: 'inherit' })
        console.log('\x1b[32m' + '...Complete: Git just clone !!! \n' + '\x1b[0m');

        console.log('\x1b[33m' + '...Please wait ! Dependencies Package is preparing to install.' + '\x1b[0m')
        execSync(installCommand, { stdio: 'inherit' })
        console.log('\x1b[32m' + '...Congratulation: Dependencies Package has been installed !!!' + '\x1b[0m')

        if (title == "MERN-Stack" || title == "Fake API") {
            const url_localhost = 'http://localhost:8888'
            const openWebCommand = `start ${url_localhost}`
            const startCommand = `cd ${repository} && npm start`
            execSync(openWebCommand, { stdio: 'inherit' })
            console.log('\x1b[32m' + `...Welcome ! Server listening at: ${url_localhost}` + '\x1b[0m')
            execSync(startCommand, { stdio: 'inherit' })
        }
    } catch (error) {
        process.exit(-1)
    }
}

cli()