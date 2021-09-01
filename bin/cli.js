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
    let repository = process.argv[2] || './'
    let title = await promptGit()
    let gitCloneCmd = `git clone ${projects[title]} ${repository}`
    let installCmd = `cd ${repository} && npm install`
    let a, b;

    // try {
    //     execSync('npm list -g yarn')
    //     installCmd = `cd ${repository} && yarn install`
    // } catch (error) {
    //     installCmd = `cd ${repository} && npm install`
    // }

    try {
        console.log('\x1b[33m...Please wait ! Git is getting reading to clone. \x1b[0m');
        a = new Date().getTime();
        execSync(gitCloneCmd, { stdio: 'inherit' })
        b = new Date().getTime();
        console.log(`\x1b[32m...Complete: Git just clone !!! \x1b[34m- Timer: ${(b-a)/1000}s \n\x1b[0m`);

        console.log('\x1b[33m...Please wait ! Dependencies Package is preparing to install. \x1b[0m')
        a = new Date().getTime();
        execSync(installCmd, { stdio: 'inherit' })
        b = new Date().getTime();
        console.log(`\x1b[32m...Congratulation: Dependencies Package has been installed !!! \x1b[34m- Timer: ${(b-a)/1000}s \x1b[0m`)

        if (title == "MERN-Stack" || title == "Fake API") {
            const url_localhost = 'http://localhost:8888'
            const openWebCmd = `start ${url_localhost}`
            const startCmd = `cd ${repository} && npm start`
            execSync(openWebCmd, { stdio: 'inherit' })
            console.log('\x1b[32m' + `...Welcome ! Server listening at: ${url_localhost}` + '\x1b[0m')
            execSync(startCmd, { stdio: 'inherit' })
        }
    } catch (error) {
        process.exit(-1)
    }
}

cli()