function sudokuValidator(x) {
    var status = true;
    for (var number = 1; number < 10; number++) {
        var rows = [];
        var columns = [];
        for (var row = 0; row < 9; row++) {
            for (var column = 0; column < 9; column++) {
                if (x[row][column] == number) {
                    rows.push(row);
                    columns.push(column);
                }
            }
            // console.log(rows);
            if (rows.length != columns.length) {
                status = false;
            }
        }
        rows = [];
        columns = [];
    }
    return status;
}

console.log(sudokuValidator(
    [
        [1, 5, 2, 4, 8, 9, 3, 7, 6],
        [7, 3, 9, 2, 5, 6, 8, 4, 1],
        [4, 6, 5, 3, 7, 1, 2, 9, 8],
        [3, 8, 7, 1, 2, 4, 6, 5, 9],
        [8, 9, 1, 7, 6, 3, 4, 2, 5],
        [2, 4, 6, 5, 9, 8, 7, 1, 3],
        [9, 1, 4, 6, 3, 7, 5, 8, 2],
        [6, 2, 8, 9, 4, 5, 1, 3, 7],
        [5, 7, 3, 8, 1, 2, 9, 6, 4]
    ]));


    // 00 01 02  03 04 05
    // 10 11 12  13 14 15
    // 20 21 22  23 24 25