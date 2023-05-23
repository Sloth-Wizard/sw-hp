import { guidGenerator } from "../../tools/guid"

/**
 * This is the core component
 * 
 * It contains data that each component should
 * have to handle them.
 */
export class CoreComponent {
    protected guid: string
    protected dateCreated: Date
    protected timeCreated: number
    constructor() {
        this.guid = guidGenerator()
        this.dateCreated = new Date()
        this.timeCreated = this.dateCreated.getTime()
    }
}
