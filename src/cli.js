const { Select } = require('enquirer');

const { execSync, exec } = require('child_process')

const prompt = async () => {
    try {
        const prompt = new Select({
            name: 'color',
            message: 'Please choose which Project template to use ?',
            choices: ['ExpressJS', 'Firebase', 'Fake API']
        });
        const template = await prompt.run()

        switch (template) {
            case 'ExpressJS': return 'https://github.com/duycode-com/create-expressjs.git'
            case 'Firebase': return 'https://github.com/duycode-com/create-firebase.git'
            case 'Fake API': return 'https://github.com/duycode-com/create-fakeapi.git'
            default: return '';
        }
    } catch (error) {
        process.exit(-1)
    }
}

const cli = async () => {
    try {
        const repository = process.argv[2] || './'
        const url_git = await prompt()
        const url_localhost = 'http://localhost:8888'

        const gitCloneCommand = `git clone ${url_git} ${repository}`
        const installCommand = `cd ${repository} && npm install`
        const startCommand = `cd ${repository} && npm start`
        const openWebCommand = `start ${url_localhost}`

        console.log('-- Please wait ! Git is getting reading to clone--')
        execSync(gitCloneCommand)
        console.log('-- Complete: Git just Clone !!!--')
        console.log('-- Please wait ! Dependencies Package is preparing to install --')
        execSync(installCommand)
        console.log('-- Congratulation: Dependencies Package has been installed !!! --')
        exec(startCommand)
        console.log(`Welcome ! Server listening at: ${url_localhost}`)
        execSync(openWebCommand)
    } catch (error) {
        process.exit(-1)
    }
}

cli()