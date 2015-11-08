var Utils = (function () {
  var instance;

  function createInstance() {
    var object = {
      getDistance: function(x1, y1, x2, y2) {
        var deltaX = x1 - x2,
        deltaY = y1 - y2;

        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      },

      getAngle: function(y1, y2, x1, x2) {
        return Math.atan2(y1 - y2, x1 - x2) * (180/Math.PI);
      },

      getRandom: function(max) {
        return  Math.floor(Math.random() * max) + 1
      },

      getRandomDestination: function(maxX, maxY) {
        return {
          x: this.getRandom(maxX),
          y: this.getRandom(maxY)
        }
      },

      getRandomSpawn: function(maxX, maxY, offsetXMin, offsetXMax, offsetYMin, offsetYMax) {
        var coords = {
          x: this.generateRandomExcluding(maxX, offsetXMin, offsetXMax),
          y: this.generateRandomExcluding(maxY, offsetYMin, offsetYMax)
        }
        return coords;
      },

      generateRandomExcluding: function(max, excludeMin, excludeMax) {
        var num = this.getRandom(max);
        return (num >= excludeMin && num <= excludeMax) ? this.generateRandomExcluding(max, excludeMin, excludeMax) : num;
      },

      rightClick: function() {
        var isRightclick;
        var e = window.event;
        if (e.which)  {
          isRightclick = (e.which == 3)
        } else if (e.button)  {
          isRightclick = (e.button == 2)
        };
        return isRightclick;
      }
    }
  return object;
}

return {
  getInstance: function () {
    if (!instance) {
      instance = createInstance();
    }
    return instance;
  }
};
})();
