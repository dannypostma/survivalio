export class Inventory {
    constructor(player, items, gameState) {
        this.items = items;
        this.player = player;
        this.gameState = gameState;
        this.selectedSlot = 0; // Track currently selected slot
        this.initialize();
    }

    initialize() {
        window.addEventListener('keydown', (e) => {
            // Check if key is between 1-5 and we have items
            if (e.key >= 1 && e.key <= 5 && this.items.length > 0) {
                const slotIndex = e.key - 1;
                
                // Only swap if there's a gun in that slot
                if (this.items[slotIndex]) {
                    this.selectSlot(slotIndex);
                }
            }
        });

        this.gameState.registerDrawable(this)
    }

    selectSlot(slotIndex) {
        this.player.gun = this.items[slotIndex];
        this.selectedSlot = slotIndex;
    }

    addItem(item) {
        if (this.items.length < 5) { // Limit to 5 slots
            this.items.push(item);
        }
    }

    draw(ctx) {
        const squareSize = 32;
        const padding = 10;
        const totalSquares = 5;
        const totalWidth = (totalSquares * squareSize) + ((totalSquares - 1) * padding);
        
        // Center horizontally
        const startX = (ctx.canvas.width - totalWidth) / 2;
        const startY = 10; // Keep fixed distance from top

        // Draw slots
        for (let i = 0; i < totalSquares; i++) {
            const x = startX + (i * (squareSize + padding));
            
            // Draw selected slot highlight
            if (i === this.selectedSlot) {
                ctx.fillStyle = 'green';
                ctx.globalAlpha = 0.5;
                ctx.fillRect(x, startY, squareSize, squareSize);
                ctx.globalAlpha = 1;
            }

            // Draw slot border
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, startY, squareSize, squareSize);

            // Draw item if it exists
            if (this.items[i]) {
                this.items[i].sprite.setPosition(x, startY);
                this.items[i].sprite.draw(ctx);
            }

            // Draw ammo count
            ctx.fillStyle = 'white';
            ctx.font = '12px Arial';
            if(this.items[i]) {
                if(this.items[i].ammo !== Infinity) {
                    ctx.fillText(this.items[i].ammo, x + 16, startY + 30);
                }else{
                    // Draw infinity symbol
                    ctx.fillText('∞', x + 16, startY + 30);
                }
            }
        }
    }
}



