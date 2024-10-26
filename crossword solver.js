function display(crossword) {
    crossword.forEach(row => {
        row.forEach(cell => {
            if (cell === "+" || cell === "-") {
                process.stdout.write("  ");
            } else {
                process.stdout.write(`${cell} `);
            }
        });
        console.log();
    });
}

function solve(crossword, words, idx) {
    if (idx === words.length) {
        display(crossword);
        process.exit();
    }
    const word = words[idx];
    for (let i = 0; i < crossword.length; i++) {
        for (let k = 0; k < crossword[i].length; k++) {
            const cell = crossword[i][k];
            if (cell === "-" || cell === word[0]) {
                if (canPlaceHorizontally(crossword, word, i, k)) {
                    const wePlaced = placeHorizontally(crossword, word, i, k);
                    solve(crossword, words, idx + 1);
                    unplaceHorizontally(crossword, wePlaced, i, k);
                }
                if (canPlaceVertically(crossword, word, i, k)) {
                    const wePlaced = placeVertically(crossword, word, i, k);
                    solve(crossword, words, idx + 1);
                    unplaceVertically(crossword, wePlaced, i, k);
                }
            }
        }
    }
}

function canPlaceHorizontally(crossword, word, i, j) {
    if (j > 0 && crossword[i][j - 1] !== "+") {
        return false;
    } else if (j + word.length < crossword[0].length && crossword[i][j + word.length] !== "+") {
        return false;
    }
    for (let jj = 0; jj < word.length; jj++) {
        if (j + jj >= crossword[0].length) {
            return false;
        }
        if (crossword[i][j + jj] === "-" || crossword[i][j + jj] === word[jj]) {
            continue;
        } else {
            return false;
        }
    }
    return true;
}

function canPlaceVertically(crossword, word, i, j) {
    if (i > 0 && crossword[i - 1][j] !== "+") {
        return false;
    } else if (i + word.length < crossword.length && crossword[i + word.length][j] !== "+") {
        return false;
    }
    for (let ii = 0; ii < word.length; ii++) {
        if (i + ii >= crossword.length) {
            return false;
        }
        if (crossword[i + ii][j] === "-" || crossword[i + ii][j] === word[ii]) {
            continue;
        } else {
            return false;
        }
    }
    return true;
}

function placeHorizontally(crossword, word, i, j) {
    const wePlaced = [];
    for (let jj = 0; jj < word.length; jj++) {
        if (crossword[i][j + jj] === "-") {
            crossword[i][j + jj] = word[jj];
            wePlaced.push(true);
        } else {
            wePlaced.push(false);
        }
    }
    return wePlaced;
}

function unplaceHorizontally(crossword, wePlaced, i, j) {
    for (let jj = 0; jj < wePlaced.length; jj++) {
        if (wePlaced[jj]) {
            crossword[i][j + jj] = "-";
        }
    }
}

function placeVertically(crossword, word, i, j) {
    const wePlaced = [];
    for (let ii = 0; ii < word.length; ii++) {
        if (crossword[i + ii][j] === "-") {
            crossword[i + ii][j] = word[ii];
            wePlaced.push(true);
        } else {
            wePlaced.push(false);
        }
    }
    return wePlaced;
}

function unplaceVertically(crossword, wePlaced, i, j) {
    for (let ii = 0; ii < wePlaced.length; ii++) {
        if (wePlaced[ii]) {
            crossword[i + ii][j] = "-";
        }
    }
}

// Main function to set up and solve the crossword
function main() {
    const emptyCrossword = [
        ["+", "-", "+", "+", "+", "+", "+", "+", "+", "+"],
        ["+", "-", "+", "+", "+", "+", "+", "+", "+", "+"],
        ["+", "-", "-", "-", "-", "-", "-", "-", "+", "+"],
        ["+", "-", "+", "+", "+", "+", "+", "+", "+", "+"],
        ["+", "-", "+", "+", "+", "+", "+", "+", "+", "+"],
        ["+", "-", "-", "-", "-", "-", "-", "+", "+", "+"],
        ["+", "-", "+", "+", "+", "-", "+", "+", "+", "+"],
        ["+", "+", "+", "+", "+", "-", "+", "+", "+", "+"],
        ["+", "+", "+", "+", "+", "-", "+", "+", "+", "+"],
        ["+", "+", "+", "+", "+", "+", "+", "+", "+", "+"]
    ];
    const words = ["agra", "norway", "england", "gwalior"];
    solve(emptyCrossword, words, 0);
}

main();
