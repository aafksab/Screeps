var pixels = {

    generatePixel: function() {
        if (Game.cpu.bucket >= PIXEL_CPU_COST) {
            console.log('PixelBucket: ' + Game.cpu.bucket+ ' PixelCost:' + PIXEL_CPU_COST)
            Game.cpu.generatePixel();
        }       
    },

    tradePixels: function() {
        const orders = Game.market
        .getAllOrders({
            type: ORDER_SELL,
            resourceType: PIXEL,
        })
        .sort((a, b) => a.price - b.price);
        if (orders.length > 0) {
            const order = orders[0];
            Memory.bestPixelPrice = order.price;
            let amount = Math.floor(Game.market.credits / order.price);
            amount = amount > order.remainingAmount ? order.remainingAmount : amount;
            const deal = Game.market.deal(order.id, amount);
            if (deal == OK || deal == ERR_TIRED || deal == ERR_FULL) {
                return;
            }
        }
    }
};

module.exports = pixels;