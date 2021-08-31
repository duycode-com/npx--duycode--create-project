const { execSync } = require('child_process')
const { Select } = require('enquirer');

const prompt = async () => {
    try {
        const prompt = new Select({
            name: 'color',
            message: 'Please choose which Project template to use ?',
            choices: ['Create ReactJS', 'MERN-Stack', 'Fake API']
        });
        const template = await prompt.run()

        switch (template) {
            case 'Create ReactJS': return 'https://github.com/duycode-com/create-reactjs.git'
            case 'MERN-Stack': return 'https://github.com/duycode-com/mern-stack.git'
            case 'Fake API': return 'https://github.com/duycode-com/fake-api.git'
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

        console.log('\x1b[33m' + '...Please wait ! Git is getting reading to clone.' + '\x1b[0m');
        execSync(gitCloneCommand, { stdio: 'inherit' })
        console.log('\x1b[32m' + '...Complete: Git just clone !!! \n' + '\x1b[0m');

        console.log('\x1b[33m' + '...Please wait ! Dependencies Package is preparing to install.' + '\x1b[0m')
        execSync(installCommand, { stdio: 'inherit' })
        console.log('\x1b[32m' + '...Congratulation: Dependencies Package has been installed !!!' + '\x1b[0m')

        execSync(openWebCommand, { stdio: 'inherit' })
        console.log('\x1b[32m' + `...Welcome ! Server listening at: ${url_localhost}` + '\x1b[0m')
        execSync(startCommand, { stdio: 'inherit' })
    } catch (error) {
        process.exit(-1)
    }
}

cli()