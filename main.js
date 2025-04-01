const prompt = require('prompt-sync')({ sigint: true });

// Constants for the field elements
const PLAYER = '*';
const HAT = '^';
const HOLE = 'O';
const FIELD = '░';

class Field {
    constructor(field) {
        this.field = field;
        this.playerX = 0;
        this.playerY = 0;
        this.gameOver = false;
    }

    // Print the current state of the field
    print() {
        console.clear();
        this.field.forEach(row => console.log(row.join('')));
    }

    // Move the player based on user input
    move(direction) {
        let newX = this.playerX;
        let newY = this.playerY;

        switch (direction) {
            case 'w': newY--; break; // Up
            case 's': newY++; break; // Down
            case 'a': newX--; break; // Left
            case 'd': newX++; break; // Right
            default:
                console.log('Invalid input! Use W (up), S (down), A (left), D (right).');
                return;
        }

        // Check if out of bounds
        if (newX < 0 || newX >= this.field[0].length || newY < 0 || newY >= this.field.length) {
            console.log('You moved outside the field! Game over.');
            this.gameOver = true;
            return;
        }

        // Check what the player stepped on
        switch (this.field[newY][newX]) {
            case HAT:
                console.log('You found your hat! You win!');
                this.gameOver = true;
                break;
            case HOLE:
                console.log('You fell into a hole! Game over.');
                this.gameOver = true;
                break;
            default:
                this.field[this.playerY][this.playerX] = FIELD; // Replace old position
                this.playerX = newX;
                this.playerY = newY;
                this.field[this.playerY][this.playerX] = PLAYER; // Set new position
                break;
        }
    }

    // Start the game loop
    play() {
        while (!this.gameOver) {
            this.print();
            let move = prompt('Enter move (WASD): ').toLowerCase();
            this.move(move);
        }
    }

    // Static method to generate a random field
    static generateField(height, width, holePercentage = 0.2) {
        let field = Array.from({ length: height }, () => Array(width).fill(FIELD));

        // Place the hat at a random position (not top-left)
        let hatX, hatY;
        do {
            hatX = Math.floor(Math.random() * width);
            hatY = Math.floor(Math.random() * height);
        } while (hatX === 0 && hatY === 0);
        field[hatY][hatX] = HAT;

        // Place holes randomly based on percentage
        let totalCells = height * width;
        let holeCount = Math.floor(totalCells * holePercentage);

        let placedHoles = 0;
        while (placedHoles < holeCount) {
            let holeX = Math.floor(Math.random() * width);
            let holeY = Math.floor(Math.random() * height);

            if (field[holeY][holeX] === FIELD && !(holeX === 0 && holeY === 0)) {
                field[holeY][holeX] = HOLE;
                placedHoles++;
            }
        }

        // Set player starting position
        field[0][0] = PLAYER;
        return field;
    }
}

// Create and start the game
const myField = new Field(Field.generateField(5, 5, 0.2));
myField.play();
