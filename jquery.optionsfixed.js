/**
 * @author Raúl Caro Pastorino
 * @copyright Copyright © 2017 Raúl Caro Pastorino
 * @license https://wwww.gnu.org/licenses/gpl.txt
 */

(function($) {
    /**
     * Plugin que genera un icono sobre el que pulsar para abrir un menú
     * desplegable al que se le pueden pasar parámetros para adaptarlo a
     * distintos entornos.
     *
     * Parámetros mínimos de configuración:
     * @var {Array} menu Un array que recibe dos parámetros, primero el nombre
     *                   que le asignaremos a este menú y en segundo lugar la
     *                   URL a la que dirigirá su enlace.
     *
     * @var {String} img Ruta de la imagen que quedará flotando para que al
     *                   pulsar sobre ella sea desplegado el menú.
     *
     * Parámetros Opcionales:
     * @var {String} back Color del fondo aplicado a la imagen (Por defecto no)
     * @var {String} left Separación desde el borde izquierdo.
     * @var {String} top  Separación desde el borde superior.
     * @var {Float} opacity Transparencia que tendrá la imagen del menú
     *                       mientras el ratón no pasa sobre ella.
     * @var {Boolean} animations Define si se habilitan las animaciones, por
     *                          defecto se encuentra habilitado (true)
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

        /**
         * Comprueba los requisitos para el plugin y muestra por consola
         * aquellos que no se cumplan.
         */
        function testRequisitos() {
            // Muestra error por la consola si no le pasamos elementos al menú
            if (conf.menu.length === 0) {
                console.log('ERROR → El plugin jquery.optionsfixed.js necesita como mínimo 1 array para 1 entrada en el menú como mínimo.');
                return false;
            }

            if (conf.img === '') {
                console.log('ERROR → Se necesita una imagen para tener un objetivo sobre el cual pulsar para abrir el menú');
                return false;
            }

            return true
        }

        /**
         * Agrega eventos a la estructura del plugin
         */
        function agregarEventos() {
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

// TODO → Comprobar rendimiento de esta función para cerrar menú
            // Evento Click sobre el menú
            $('#boxFixed').on('click', function() {
                $('body').off('click.hide');
                $('#boxMenuAlt').fadeIn(500);

                setTimeout(function() {
                    $('body').one('click.hide', function() {
                        $('#boxMenuAlt').fadeOut();
                    });
                }, 100);

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

            function generarHTML() {
                // Añadir al elemento "body" la caja con el lanzador
                $('body').append('<div id="boxFixedParent">' +
                    '<div id="boxFixed"></div>' +
                    '</div>');

            }
            generarHTML();
        }


        /**
         * Añade animaciones al icono del menú
         */
        function animarIcono() {

        }

        /**
         * Añade animaciones al menú interior
         */
        function animarInterior() {

        }

        /**
         * Aplica los estilos CSS a los componentes del Plugin
         */
        function aplicarEstilos() {
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

            // Estilos para "boxMenuAlt"
            $('#boxMenuAlt').css({
                'position' : 'fixed',
                'top' : '55px',
                'left' : 0,
                'min-width' : '150px',
                'max-width' : '300px',
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
                'color' : '#ff0000',
                'font-size' : '1.2em',
                'font-weight' : 'bold',
                'text-decoration' : 'none',
            });
        }

        // Crea la estructura HTML.
        createElements();

        // Añade eventos al menú.
        agregarEventos();

        // Aplica los estilos CSS a la estructura generada por el plugin.
        aplicarEstilos();

        // Comprobar que se cumplen los requisitos.
        testRequisitos();

        // Si la configuración admite animaciones se aplican.
        if (conf.animations) {
            animarIcono();
            animarInterior();
        }

        // Oculta el menú al iniciar.
        $('#boxMenuAlt').hide();

        return $(this);
    };
})(jQuery);
