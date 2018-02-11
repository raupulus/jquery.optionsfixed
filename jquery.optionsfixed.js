(function($) {
    /**
     *
     */
    $.optionsfixed = function(opciones) {
        var conf = {
            imagen: '',
            menu: [],
            background: '',
            left: '5px',
            top: '5px'
        };

        // Reemplaza los valores introducido por el usuario en la
        // configuracion establecida por defecto.
        $.extend(conf, opciones);

        // Añadir al elemento "body" la caja con el lanzador
        $('body').append('<div id="boxFixedParent">' +
                            '<div id="boxFixed"></div>' +
                         '</div>');

        // Estilos para la caja "boxFixedParent"
        $('#boxFixedParent').css({
            'position' : 'absolute',
            'left' : conf.left,
            'top' : conf.top,
        });

        return $(this);
    };
})(jQuery);
