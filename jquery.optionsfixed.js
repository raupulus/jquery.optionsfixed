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
            animations: true,
        };

        // Reemplaza los valores introducido por el usuario
        $.extend(conf, opciones);

        // TODO → Comprobar si conf.menu[0] está definido (es obligatorio 1)

        // TODO → Implementar animaciones al hacer hover sobre menú
        //        permitiendo que se pueda deshabilitar desde configuración


        /**
         * @var visible Esta varible contiene el estado de visibilidad del
         *              menú, de forma que con valor true estará visible.
         */
        var visible = false;


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
            //$('#boxMenuAlt').slideToggle(); → No es útil si quiero borrar
                                             // al hacer click en la web
            if (visible) {
                visible = false;
                $('#boxMenuAlt').slideUp();
            } else {
                visible = true;
                $('#boxMenuAlt').slideDown();
            }
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

        // Estilos para "boxMenuAlt"
        $('#boxMenuAlt').css({
            'position' : 'fixed',
            'top' : '55px',
            'left' : 0,
            'width' : '300px',
            'background-color' : '#000000',
            'border-radius' : '0 6px 6px 0',
            'box-shadow' : '3px 3px 3px #000000',
        });

        // Estilos para cada párrafo del menú
        $('#boxMenuAlt > .eleMenu').css({
            'padding' : '3px 4px 3px 8px',
            'background-color' : '#647e7e',
            'cursor' : 'pointer',
        });

        // Estilos para cada enlace del menú
        $('#boxMenuAlt > .eleMenu > a').css({
            'width' : '100%',
            'font-size' : '1.2em',
            'font-weight' : 'bold',
            'text-decoration' : 'none',
        });

        // Evento Hover sobre cada elemento del menú
        $('#boxMenuAlt > .eleMenu').hover(
            function() {
                $(this).css({
                    'background-color' : '#ffffff',
                });
            },
            function() {
                $(this).css({
                    'background-color' : '#647e7e',
                });
            }
        );

        // Oculta el menú al iniciar
        $('#boxMenuAlt').hide();

        /**
         * Genera enlaces para los párrafos a partir de los enlaces <a>
         */
        function crearEnlaces() {
            var enlaces = $('#boxMenuAlt > .eleMenu > a');
            for (let enl of enlaces) {
                $(enl).parent().on('click', function() {
                    window.location = enl.href;
                });
            }
        }
        crearEnlaces();

        // Añade animaciones al icono del menú
        function animarIcono() {

        }

        // Añade animaciones al menú interior
        function animarInterior() {

        }
        // Si la configuración admite animaciones se aplican
        if (animations) {
            animarIcono();
            animarInterior();
        }


        return $(this);
    };
})(jQuery);
