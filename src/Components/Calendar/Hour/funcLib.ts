    export const getHoursLine =() => {
        const hoursLine = [];
        for (let i = 8; i <= 21; i++) {
            hoursLine.push(i);
        }
        return hoursLine;
    }