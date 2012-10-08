(function($) {
  $.fn.toMacAddress = function(opts) {
    var config = $.extend({}, {
      joiner: '',      // How to join the MAC Address, default is NO joiner
                       // Available options include colon(:), dot(.), and dash(-)

      casing: 'lower', // Default casing for MACs

      splitOn: ',',    // If there are multiple MACs to format, they are split upon what character?

      abortOn: /[\/ ]/ // If this is the first character, don't try to convert it
    }, opts);

    /* Internal: A utility function fo upcas-/downcasing a string.
     *  Could potentially be expanded upon for additional cases,
     *  though in this context that may not make a whole lot of sense.
     */
    function toSomeCase(str, casing) {
      switch(casing) {
        case 'lower': return str.toLowerCase();
        case 'upper': return str.toUpperCase();
      }
    }
  
    this.each(function() {
      var $this = $(this);

      // Need this so we can set the correct value back.
      if(text = $this.val())
        usedVal = true;
      else {
        text = $this.text();
        usedVal = false;
      }

      macs = text.split(config.splitOn);
      text = macs.map(function(mac) {
        // Allows for adding in regular expressions, as this plugin was originally built for a search engine
        if((typeof(mac[0]) == 'undefined') || mac[0].match(config.abortOn)) return mac;

	// An unformatted MAC address should be 12 characters, padded with '0's
        pieces = mac.split(/[:\-\.]/);
        pieces = pieces.map(function(piece) { while(piece.length < 2) { piece = '0' + piece; }; return piece;});
        mac = pieces.join('');
        while(mac.length < 12) { mac = '0' + mac; }

        switch(config.joiner) {
          case ':':
            mac = mac.match(/\w\w/g).join(config.joiner);
            break;
          case '-':
            mac = mac.match(/\w\w/g).join(config.joiner);
            break;
          case '.':
            mac = mac.match(/\w{4}/g).join(config.joiner);
            break;
          default:
            break; 
        }

        // Put it in the correct case
        return toSomeCase(mac, config.casing);
      });
      // Make it all one string
      text = text.join(config.splitOn);
      // Set the value back in the correct fashion
      usedVal ? $this.val(text) : $this.text(text);      
    });
    return this;
  };
})(jQuery);
