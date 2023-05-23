import './SlothWizard.scss'
import { CoreComponent } from '../Core/Core'

export class SlothWizard extends CoreComponent {
    /**
     * ### Create the sloth logo from an ascii text string
     * 
     * @returns An html element containing the ascii logo
     */
    async create(): Promise<HTMLElement> {
        /*
        const response = fetch('/ascii/slothwizz.txt')
        const data = (await response).text()
        */

        const wrapper = document.createElement('div')
        wrapper.classList.add('sw--wrapper')
        
        const title = document.createElement('h1')
        title.innerText = 'Sloth-Wizard'

        const container = document.createElement('div')
        container.classList.add('sw--container')

        /*
        const pre = document.createElement('pre')
        pre.textContent = await data
        */

        //container.insertAdjacentElement('afterbegin', pre)
        wrapper.insertAdjacentElement('afterbegin', title)
        wrapper.insertAdjacentElement('beforeend', container)

        return wrapper
    }
}
