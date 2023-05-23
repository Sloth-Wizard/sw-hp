export const vhsEffect = async (el: HTMLElement) => {
    // Get all the existing lines
    const lines = el.querySelectorAll('line')
    if (lines.length) {
        for (let i = 0; i < lines.length; i++) {
            el.removeChild(lines[i])
        }
    }

    // Create the line from the height
    for (let i = 0; i < 10; i++) {
        const line = document.createElement('line')
        line.classList.add(`--${i}`)
        line.style.top = `${i * 10}px`

        const someTime = Math.random() * 5
        line.style.animation = `lines ${someTime}s infinite`

        el.appendChild(line)
    }
}
