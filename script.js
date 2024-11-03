const leftGrid = document.querySelector('.left-grid');
const rightGrid = document.querySelector('.right-grid');
const message = document.querySelector('.message');

const GRID_SIZE = 3;
let currentRow = 0;
let currentCol = 0;
let startTime; // Thời gian bắt đầu

// Tạo hình ngẫu nhiên
function createRandomPattern() {
    const pattern = [];
    for (let i = 0; i < GRID_SIZE; i++) {
        const row = [];
        for (let j = 0; j < GRID_SIZE; j++) {
            row.push(Math.random() < 0.5); // 50% xác suất
        }
        pattern.push(row);
    }
    return pattern;
}

// Vẽ lưới
function drawGrid(grid, container) {
    container.innerHTML = '';
    grid.forEach(row => {
        row.forEach(cell => {
            const div = document.createElement('div');
            div.style.backgroundColor = cell ? 'black' : 'green';
            container.appendChild(div);
        });
    });
}

// Kiểm tra hoàn thành
function checkCompletion() {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (rightPattern[i][j] !== leftPattern[i][j]) {
                return false;
            }
        }
    }
    return true;
}

// Bắt đầu trò chơi
function startGame() {
    leftPattern = createRandomPattern();
    rightPattern = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(true));
    currentRow = 0;
    currentCol = 0;
    startTime = Date.now(); // Lưu thời gian bắt đầu

    drawGrid(leftPattern, leftGrid);
    drawGrid(rightPattern, rightGrid);
    highlightCurrentCell();
    message.textContent = ''; // Reset thông báo
}

// Nổi bật ô hiện tại
function highlightCurrentCell() {
    const cells = rightGrid.children;
    Array.from(cells).forEach(cell => cell.style.borderColor = 'green');
    const currentCell = cells[currentRow * GRID_SIZE + currentCol];
    if (currentCell) {
        currentCell.style.borderColor = 'yellow'; // Nổi bật ô hiện tại
    }
}

// Di chuyển con sâu
function moveSnake(direction) {
    if (direction === 'ArrowUp' && currentRow > 0) {
        currentRow--;
    } else if (direction === 'ArrowDown' && currentRow < GRID_SIZE - 1) {
        currentRow++;
    } else if (direction === 'ArrowLeft' && currentCol > 0) {
        currentCol--;
    } else if (direction === 'ArrowRight' && currentCol < GRID_SIZE - 1) {
        currentCol++;
    }
    highlightCurrentCell();
}

// Xử lý phím bấm
document.addEventListener('keydown', (event) => {
    if (event.key === ' ') { // Phím cách
        // Nếu ô đã chọn là true (chưa bị biến mất)
        if (rightPattern[currentRow][currentCol]) {
            rightPattern[currentRow][currentCol] = false; // Biến mất ô
        } else {
            rightPattern[currentRow][currentCol] = true; // Hủy ô
        }
        drawGrid(rightPattern, rightGrid);
        
        if (checkCompletion()) {
            const endTime = Date.now(); // Thời gian kết thúc
            const elapsedTime = ((endTime - startTime) / 1000).toFixed(2); // Tính thời gian hoàn thành (giây)
            message.textContent = `Bạn đã hoàn thành màn chơi trong ${elapsedTime} giây!`;
            setTimeout(() => {
                startGame(); // Chuyển sang màn chơi tiếp theo
            }, 1500); // Đợi 1.5 giây trước khi bắt đầu màn mới
        }
    } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        moveSnake(event.key);
    }
});

let leftPattern = [];
let rightPattern = [];

startGame();
