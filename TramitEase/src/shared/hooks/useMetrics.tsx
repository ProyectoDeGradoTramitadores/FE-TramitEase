export const generateColors = (length: number) => {
    const backgroundColors = [];
    const borderColors = [];

    for (let i = 0; i < length; i++) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);

        backgroundColors.push(`rgba(${r}, ${g}, ${b}, 0.2)`);
        borderColors.push(`rgba(${r}, ${g}, ${b}, 1)`);
    }

    return { backgroundColors, borderColors };
};