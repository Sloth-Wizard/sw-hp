/**
 * ### Generate a GUID for the component
 * 
 * @returns a GUID
 */
export const guidGenerator = () => {
    let _ = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }

    return `${_()}${_()}-${_()}-${_()}-${_()}-${_()}${_()}${_()}`
}
