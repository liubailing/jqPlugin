(function(factory) {
  /* global define */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(window.jQuery);
  }
}(function($) {
  // Extends plugins for adding imageSelector.
  //  - plugin is external module for customizing.
  $.extend($.summernote.plugins, {
    /**
     * @param {Object} context - context object has status of editor.
     */
    'imageSelector': function(context) {
      var self = this;

      // ui has renders to build ui elements.
      //  - you can create a button with `ui.button`
      var ui = $.summernote.ui;

      // add imageSelector button
      context.memo('button.imageSelector', function() {
        // create button
        var button = ui.button({
          contents: '<i class="note-icon-picture"/>',
          tooltip: 'image selector',
          click: function() {
            //self.$panel.show();
            //self.$panel.hide(500);
            // invoke insertText method with 'imageSelector' on editor module.
          
            if(context.options.buttons!=null &&  typeof context.options.buttons.imageSelector === "function"){
              context.options.buttons.imageSelector(context);
            }else{
              console.log("imageSelector 回调函数未实现")
            }
            
          }
        });

        // create jQuery object from button instance.
        var $imageSelector = button.render();
        return $imageSelector;
      });

      // This events will be attached when editor is initialized.
      this.events = {
        // This will be called after modules are initialized.
        'summernote.init': function(we, e) {
          console.log('summernote initialized', we, e);
        },
        // This will be called when user releases a key on editable.
        'summernote.keyup': function(we, e) {
          console.log('summernote keyup', we, e);
        }
      };

      // This method will be called when editor is initialized by $('..').summernote();
      // You can create elements for plugin
      this.initialize = function() {
        this.$panel = $('<div class="imageSelector-panel"/>').css({
          position: 'absolute',
          width: 100,
          height: 100,
          left: '50%',
          top: '50%',
          background: 'red'
        }).hide();

        this.$panel.appendTo('body');
      };

      // This methods will be called when editor is destroyed by $('..').summernote('destroy');
      // You should remove elements on `initialize`.
      this.destroy = function() {
        this.$panel.remove();
        this.$panel = null;
      };
    }
  });
}));
