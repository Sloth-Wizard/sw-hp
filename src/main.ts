import { Projects } from './components/Projects/Projects'
import { SlothWizard } from './components/SlothWizard/SlothWizard'
import './scss/styles.scss'

async function start() {
    const app = document.querySelector<HTMLElement>('app')
    if (!app) {
        return console.error('Missing `app` container')
    }
    
    // Load the logo
    const slothWizard = new SlothWizard()
    const logo = slothWizard.create()
    
    // Load the projects
    const projects = new Projects()
    const projectsLoaded = await projects.load()

    // Add the elements to the app
    app.appendChild(await logo)
    
    // Add projects only if there are some loaded
    if (projectsLoaded) {
        const projectsList = projects.create(projectsLoaded)
        app.appendChild(await projectsList)
    }
}

window.addEventListener('load', async () => {
    start()
})
