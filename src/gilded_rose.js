class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    
    // method to lower the quality:
    const lowerQualityBy = number => {
      // double the change if it is a conjured item
      if (/[Cc]onjured/.test(this.items[i].name)) number = number * 2;
      // double the change if the sell-date has past
      if (this.items[i].sellIn < 0) number = number * 2;
      // lower de quality, but do not go below 0
      if ((this.items[i].quality - number) >= 0) {
        this.items[i].quality = this.items[i].quality - number;
      } else {
        this.items[i].quality = 0;
      }
    };
    
    // method to increase the quality:
    const increaseQualityBy = number => {
      // increase de quality, but do not go over 50
      if ((this.items[i].quality + number) <= 50) {
        this.items[i].quality = this.items[i].quality + number;
      } else {
        this.items[i].quality = 50;
      }
    };
    
    // decide witch quality-change is needed and execute
    const executeQualityChange = () => {
      switch(true) {
        case /[Aa]ged Brie/.test(this.items[i].name):
          increaseQualityBy(1);
          break;
        case /[Bb]ackstage passes/.test(this.items[i].name):
          switch(true) {
            case (this.items[i].sellIn <= 0):
              this.items[i].quality = 0;
              break;
            case (this.items[i].sellIn <= 5):
              increaseQualityBy(3);
              break;
            case (this.items[i].sellIn <= 10):
              increaseQualityBy(2);
              break;
            default:
              increaseQualityBy(1);
          }
          break;
        default:
          lowerQualityBy(1);
      }
    };

    // look at each item in the shop:
    for (var i = 0; i < this.items.length; i++) {
      switch(this.items[i].name) {
        case 'Sulfuras, Hand of Ragnaros':
          break;
        default:
          // decrease sellIn
          this.items[i].sellIn = this.items[i].sellIn - 1;
          // change quality
          executeQualityChange();
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
