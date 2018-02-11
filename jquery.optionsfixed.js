(function($) {
    /**
     *
     */
    $.fn.menuDesplegable = function(opciones) {
        var conf = {
            a: 'a'
        };

        // Reemplaza los valores introducido por el usuario en la
        // configuracion establecida por defecto.
        $.extend(conf, opciones);



        return $(this);
    };
})(jQuery);
