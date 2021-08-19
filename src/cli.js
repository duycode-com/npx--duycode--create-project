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
        const url = await prompt()

        const gitCloneCommand = `git clone ${url} ${repository}`
        const installCommand = `cd ${repository} && npm install`
        const startCommand = `cd ${repository} && npm start`
        const openWebCommand = `start http://localhost:8888`

        console.log('-- Start: Git Clone--')
        execSync(gitCloneCommand)
        console.log('-- Complete: Git Clone--')
        console.log('-- Start: Install Dependencies Package--')
        execSync(installCommand)
        console.log('-- Complete: Install Dependencies Package--')
        exec(startCommand)
        console.log('Congratulation ! Server listening at: http://localhost:8889')
        execSync(openWebCommand)
    } catch (error) {
        process.exit(-1)
    }
}

cli()