var {expect} = require('chai');

var {Shop, Item} = require('../src/gilded_rose.js');

function makeShopAndUpdate(testName, testSellIn, testQuality){
  const gildedRose = new Shop([ new Item(testName, testSellIn, testQuality) ]);
  return gildedRose.updateQuality();
};

function checkResultedName(testName, testSellIn, testQuality, expectedResult){
  const items = makeShopAndUpdate(testName, testSellIn, testQuality);
  expect(items[0].name).to.equal(expectedResult);
};

function checkResultedSellIn(testName, testSellIn, testQuality, expectedResult){
  const items = makeShopAndUpdate(testName, testSellIn, testQuality);
  expect(items[0].sellIn).to.equal(expectedResult);
};

function checkResultedQuality(testName, testSellIn, testQuality, expectedResult){
  const items = makeShopAndUpdate(testName, testSellIn, testQuality);
  expect(items[0].quality).to.equal(expectedResult);
};

describe('Gilded Rose', function() {

  it('should foo', function() {
    checkResultedName('foo', 0, 0, 'foo');
  });

  it('should sell in 0', function() {
    checkResultedSellIn('foo', 1, 0, 0);
  });

  it('quality is 0', function() {
    checkResultedQuality('foo', 1, 1, 0);
  });

  it('quality is not negative', function() {
    checkResultedQuality('foo', 1, 0, 0);
  });

  it('quality diminishes by two if sellIn gets negative', function() {
    checkResultedQuality('foo', 0, 3, 1);
  });
  
  it('Aged Brie increases in quality', function() {
    checkResultedQuality('Aged Brie', 1, 0, 1);
  });

  it('Backstage passes increase in quality', function() {
    checkResultedQuality('Backstage passes to a TAFKAL80ETC concert', 20, 0, 1);
  });

  it('Backstage passes increase in quality by 2 when there are 10 days', function() {
    checkResultedQuality('Backstage passes to a TAFKAL80ETC concert', 10, 0, 2);
  });

  it('Backstage passes increase in quality by 2 when there are 10 days or less', function() {
    checkResultedQuality('Backstage passes to a TAFKAL80ETC concert', 9, 0, 2);
  });

  it('Backstage passes increase in quality by 3 when there are 5 days', function() {
    checkResultedQuality('Backstage passes to a TAFKAL80ETC concert', 5, 0, 3);
  });

  it('Backstage passes increase in quality by 3 when there are 5 days or less', function() {
    checkResultedQuality('Backstage passes to a TAFKAL80ETC concert', 4, 0, 3);
  });

  it('Backstage passes quality drops to 0 after the concert', function() {
    checkResultedQuality('Backstage passes to a TAFKAL80ETC concert', 0, 10, 0);
  });

  it('quality is never increased to more than 50', function() {
    checkResultedQuality('Aged Brie', 1, 50, 50);
  });

  it('Sulfuras doesnt need a date', function() {
    checkResultedSellIn('Sulfuras, Hand of Ragnaros', '', 0, '');
  });

  it('Sulfuras doesnt change date', function() {
    checkResultedSellIn('Sulfuras, Hand of Ragnaros', 0, 0, 0);
  });

  it('Sulfuras doesnt change quality', function() {
    checkResultedQuality('Sulfuras, Hand of Ragnaros', 0, 0, 0);
  });

  it('Sulfuras can have a quality above 50, because it doesnt changes', function() {
    checkResultedQuality('Sulfuras, Hand of Ragnaros', 0, 51, 51);
  });

  it('an item with the adjective conjured in the name, degrades quality at double speed', function() {
    checkResultedQuality('Conjured foo', 1, 3, 1);
  });

  it('an item with the adjective conjured in the name, does not increases in quality at double speed', function() {
    checkResultedQuality('Conjured Aged Brie', 1, 1, 2);
  });

});
