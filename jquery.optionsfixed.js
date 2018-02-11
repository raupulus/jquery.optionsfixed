(function($) {
    /**
     *
     */
    $.optionsfixed = function(opciones) {
        var conf = {
            menu: [],
            img: '',
            back: '',
            left: '5px',
            top: '5px',
            opacity: 0.6,
        };

        // Reemplaza los valores introducido por el usuario
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

        // Estilos para la caja "boxFixed"
        $('#boxFixed').css({
            'position' : 'fixed',
            'display' : 'block',
            'opacity' : 0.6,
            'width' : '50px',
            'height' : '50px',
            'cursor' : 'pointer',
            'background' : conf.back + 'url("' + conf.img + '") no-repeat',
            'background-size' : 'contain',
            'border-radius' : '10px',
        });

        $('#boxFixed').hover(
            function() {
                $(this).css({
                   'opacity' : 1,
                });
            },
            function() {
                $(this).css({
                    'opacity' : conf.opacity,
                });
            }
        );

        return $(this);
    };
})(jQuery);
