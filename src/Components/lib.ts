export const l = <T>(data: T, variableName?: string): void => {
    console.log('=============');
    if (variableName) {
        console.log(`${variableName}:`, data);
    } else {
        console.log(data);
    }
    console.log('=============');
};


export const lc = <T, N>(data1: T, data2: N): void => {
    console.log('=============');

        console.log(data1, " << >> ", data2);

    console.log('=============');
};
