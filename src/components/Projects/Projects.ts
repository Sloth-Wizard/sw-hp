import './Projects.scss'
import './tools/vhsEffect.scss'
import ProjectsData from '.'
import { CoreComponent } from '../Core/Core'
import { vhsEffect } from './tools/vhsEffect'

const lineBreakRegex = /(\r\n|\n|\r)/gm

export class Projects extends CoreComponent {
    /**
     * ### Loads our project from the db
     * 
     * @returns An array of projects objects or false
     */
    async load(): Promise<ProjectsData.Project[]|false> {
        // Get the most recent uuid from index
        const uuidResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/projectDb/__sw_foff`)
        if (uuidResponse.status !== 200) {
            // No index found, probably that the scanner did not run
            return false;
        }
        const uuid = await uuidResponse.text()
        if (uuid.length <= 0) {
            // Nothing in the index file
            return false;
        }

        // Get the most recent projects data
        const projectsResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/projectDb/${uuid}`)
        if (projectsResponse.status !== 200) {
            // No projects uuid db found
            return false;
        }
        const projects = await projectsResponse.text()
        if (projects.length <= 0) {
            // No projects in the db
            return false;
        }

        let response: ProjectsData.Project[] = []
        for (const project of projects.replace(lineBreakRegex, '').split('::')) {
            // Get the image if there is one
            const projectAndImage = project.split('XX')
            response.push({
                title: projectAndImage[0],
                url: `${import.meta.env.VITE_BASE_URL}/${projectAndImage[0]}/`,
                image: (projectAndImage[1]) ? `${import.meta.env.VITE_BASE_URL}/${projectAndImage[1]}` : false
            })
        }

        return response
    }

    /**
     * ### Create the list of projects
     * 
     * @param projects - An array of projects objects
     * 
     * @returns An html template of all the projects
     */
    async create(projects: ProjectsData.Project[]): Promise<HTMLDivElement> {
        const container = document.createElement('div')
        container.classList.add('projects--container')

        for (const project of projects) {
            const item = document.createElement('a')
            item.classList.add('project')
            item.href = project.url
            item.dataset.text = `${project.title}_`

            const itemData = document.createElement('div')
            itemData.dataset.text = project.title
            if (project.image) {
                itemData.style.backgroundImage = `url(${project.image})`
            }

            // Add vhs lines to the item
            vhsEffect(itemData)

            item.appendChild(itemData)
            container.appendChild(item)
        }

        return container
    }
}
