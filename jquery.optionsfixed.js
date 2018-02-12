(function($) {
    /**
     * ----
     * menu → nombre, url
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

        // Evento Hover sobre el menú
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

        // Evento Click sobre el menú
        $('#boxFixed').on('click', mostrarmenu);

        /**
         * Esta función muestra el menú al pulsar click
         */
        function mostrarmenu() {

        }

        /**
         * Esta función crea todos los elementos del menú
         */
        function createElements() {
            var ele = '<div id="boxMenuAlt">';

            for (let elemento of conf.menu) {
                var nombre = elemento[0];
                var enlace = elemento[1];

                ele += '<p class="eleMenu">' +
                    '<a href="' + enlace + '">' +
                    nombre +
                    '</a>';
                '</p>'
            }

            ele += '</div>';
            // Creo la caja para mostrar el menú
            $('body').append(ele);
        }
        createElements();

        return $(this);
    };
})(jQuery);
