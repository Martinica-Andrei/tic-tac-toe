export function shuffleArray<T,>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function isArraySameValue<T,>(array: T[]): boolean {
    if (array.length <= 1) {
        return true;
    }
    let firstVal = array[0];
    for (let i = 1; i < array.length; i++) {
        if (firstVal !== array[i]) {
            return false;
        }
    }
    return true;
}

export function isMatrixColSameValue<T,>(array: T[][], col: number): boolean {
    if (array.length <= 1) {
        return true;
    }
    let firstVal = array[0][col];
    for (let i = 1; i < array.length; i++) {
        if (firstVal !== array[i][col]) {
            return false;
        }
    }
    return true;
}

export function isMatrixLeftToRightDiagonalSameValue<T,>(array: T[][]): boolean {
    if (array.length <= 1) {
        return true;
    }
    let firstVal = array[0][0];
    for (let i = 1; i < array.length; i++) {
        if (firstVal !== array[i][i]) {
            return false;
        }
    }
    return true;

}

export function isMatrixRightToLeftDiagonalSameValue<T,>(array: T[][]): boolean {
    if (array.length <= 1) {
        return true;
    }
    let col = array.length - 1;
    let firstVal = array[0][col];
    col--;
    for (let row = 1; row < array.length; row++, col--) {
        if (firstVal !== array[row][col]) {
            return false;
        }
    }
    return true;
}

export function doesMatrixHaveValue<T>(array: T[][], val: T): boolean {
    for (let r = 0; r < array.length; r++) {
        for (let c = 0; c < array[r].length; c++) {
            if (array[r][c] === val) {
                return true;
            }
        }
    }
    return false;
}

export function getRandomInt(minInclusive : number, maxExclusive: number) {
    return Math.floor(minInclusive + Math.random() * (maxExclusive - minInclusive));
}

export const getStorageValue = <T,>(key: string, initialValue: T) => {
    const saved = localStorage.getItem(key);
    let data = initialValue;
    if (saved !== null) {
        data = JSON.parse(saved);
    }
    else{
        localStorage.setItem(key, JSON.stringify(initialValue));
    }
    return data;
}