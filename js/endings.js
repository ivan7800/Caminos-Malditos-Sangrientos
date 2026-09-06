(function (root) {
  "use strict";

  const commonSignals = {
    knowledge: ["investigo", "examino", "analizo", "registro", "leo", "escucho", "descubro", "compruebo", "documento", "cartografio", "pregunto por", "busco la verdad"],
    corruption: ["invoco", "acepto la voz", "bebo", "consumo", "me dejo llevar", "abro la puerta", "respondo a la señal", "miro la luz", "toco la sangre", "uso el poder", "retransmito", "me entrego"],
    sacrifice: ["me sacrifico", "sacrificarme", "me quedo", "me ofrezco", "renuncio", "entrego mi nombre", "dejo atrás", "me convierto", "ocupo el lugar", "pago el precio", "olvido", "cierro conmigo"],
    trust: ["confío", "confio", "ayudo", "protejo", "escucho a", "creo a", "salvo a", "junto a", "con alba", "con mara", "con lila", "con jean", "con isabeau", "con gabriel", "con diana", "con clara", "con isabella", "con mateo", "con sara", "con adrian", "con marco"],
    peopleSaved: ["salvo", "salvar", "rescato", "rescatar", "libero", "liberar", "protejo", "proteger", "ayudo", "ayudar", "devuelvo", "devolver", "saco de aquí", "sacarlos", "evito la muerte"]
  };

  const designs = {
    "bajo-el-espejo-de-la-sangre": {
      signals: { knowledge: ["barniz", "espejo maestro", "máscara", "mascara", "cuadro"], corruption: ["sangre sobre el cuadro", "pinto mi rostro", "pigmento oscuro"] },
      endings: [
        { id: "obra-arde", title: "LA OBRA ARDE", keywords: ["destruyo el cuadro", "quemo el cuadro", "quemar la pintura", "quemo la obra", "incendio el taller"], requires: { knowledge: 2, sacrifice: 1, truths: 1 }, climax: "Cristian prende fuego al cuadro y la Máscara desaparece dentro de la imagen que la alimentaba.", consequence: "Alba sobrevive, pero también desaparecen las identidades atrapadas en el óleo. Has destruido al monstruo y a sus víctimas; el taller queda lleno de marcos vacíos.", epilogue: { when: "6 meses después", title: "El inventario de las ausencias", text: "El pueblo conserva las cenizas en cajas sin nombre. Alba vuelve a restaurar, pero deja siempre una capa sin tocar.", finalLine: "En ningún espejo de Corró d’Avall vuelve a aparecer un rostro completo." } },
        { id: "ultimo-rostro", title: "EL ÚLTIMO ROSTRO", keywords: ["ocupo el lugar", "ser la máscara", "ser la mascara", "convertirme en la máscara", "convertirme en la mascara", "acepto la máscara", "acepto la mascara", "me quedo en el cuadro"], requires: { obsession: 55, corruption: 2, sacrifice: 1 }, climax: "Comprendes que alguien debe ocupar el lugar de la Máscara. Decides quedarte; el barniz se cierra sobre tu rostro sin dolor.", consequence: "Alba sale del taller con el manuscrito y una vida que ya no puede recordar tu nombre. La obra queda restaurada, serena y peligrosamente viva.", epilogue: { when: "17 años después", title: "La restauradora", text: "Una aprendiz encuentra un rostro bajo el barniz. No reconoce a Cristian, pero el cuadro reacciona cuando ella pronuncia su propio nombre.", finalLine: "La firma bajo la pintura dice: Cristian de la Torre, modelo desconocido." } },
        { id: "memoria-conservada", title: "LA MEMORIA CONSERVADA", keywords: ["conservo las memorias", "separo el espejo", "conservar las memorias", "guardar el espejo", "separo la imagen", "preservo las identidades"], requires: { knowledge: 3, truths: 2, trust: 1 }, climax: "No destruyes la pintura. Separas el espejo maestro del lienzo y rescatas las memorias atrapadas, una por una.", consequence: "La amenaza queda dormida y Alba conserva una parte de quienes la precedieron. El cuadro pierde su rostro, pero gana una superficie que todavía sueña.", epilogue: { when: "3 días después", title: "La ficha de catalogación", text: "El óleo entra en un almacén del museo provincial. Nadie admite haber oído las voces durante el traslado.", finalLine: "En la ficha alguien ha escrito a mano: «No exponer frente a cristal»." } },
        { id: "alba-sin-reflejo", title: "ALBA SIN REFLEJO", keywords: ["salvo a alba", "rompo el espejo", "libero a las víctimas", "libero a las victimas", "saco a alba", "romper el espejo maestro"], default: true, climax: "Rompes el espejo maestro antes de que el fuego encuentre la pintura. Alba vuelve a respirar y los rostros del vidrio se desprenden como polvo.", consequence: "La casa deja de reclamar nuevas identidades, pero Alba pierde para siempre su reflejo. Te recuerda solo cuando mira una superficie que no devuelve nada.", epilogue: { when: "Una fecha imposible", title: "La habitación sin cristal", text: "En una casa que ya no figura en los mapas, Alba deja un cuaderno abierto sobre una mesa. La última página contiene una descripción de tu cara escrita con una letra que no es la suya.", finalLine: "El texto termina antes de decir quién está mirando." } }
      ]
    },
    "espectro-rojo": {
      signals: { knowledge: ["nuevo paraíso", "espectro", "espejo", "orden del relojero", "jack", "mara"], corruption: ["reinicio", "repito la ciudad", "borro la memoria", "acepto la ciudad"] },
      endings: [
        { id: "vida-no-repetida", title: "LA VIDA QUE NO SE REPITE", keywords: ["acepto vivir", "dejo vivir", "rompo el ciclo", "salgo con mara", "elijo la vida", "no reiniciar"], requires: { knowledge: 3, trust: 2, peopleSaved: 1 }, climax: "Jack acepta una vida que no puede repetirse. Mara abre la salida mientras el Espectro Rojo pierde las caras que usaba para reteneros.", consequence: "Nuevo Paraíso se queda sin una decisión que repetir y empieza a desmoronarse por distritos. Alguien debe quedarse atrás para que la ciudad no vuelva a reclamaros.", epilogue: { when: "6 meses después", title: "Una ciudad sin mapa", text: "Mara vive en una frontera que todavía no existe. Cada noche deja una silla vacía frente a la puerta, por si Jack consigue recordar el camino.", finalLine: "En las noticias, una ciudad desaparecida vuelve a aparecer durante ocho segundos." } },
        { id: "pasajero-del-espectro", title: "EL PASAJERO DEL ESPECTRO", keywords: ["me convierto en el espectro", "ser el espectro", "acepto reiniciar", "reinicio nuevo paraíso", "ocupo el mecanismo", "mantengo la ciudad"], requires: { obsession: 50, corruption: 2, knowledge: 2, sacrifice: 1 }, climax: "Comprendes que el Espectro no es un enemigo, sino el mecanismo que mantiene juntas las muertes de Jack y Mara. Tomas su lugar.", consequence: "Las salidas se abren y los supervivientes regresan, pero cada ruta queda conectada a tu conciencia. Nuevo Paraíso vive porque tú ya no puedes hacerlo.", epilogue: { when: "17 años después", title: "Último distrito", text: "Los viajeros cuentan que una figura roja aparece en los espejos para cerrar las calles antes de que alguien muera. Nadie sabe que todavía respondes cuando Mara pronuncia tu nombre.", finalLine: "La ciudad no te ha olvidado. Te utiliza como una forma de cariño." } },
        { id: "ciudad-devuelta", title: "LA CIUDAD DEVUELTA", keywords: ["destruyo la ciudad", "destruir el espejo", "apago el espectro", "libero a todos", "quemo la grabadora", "rompo la orden"], requires: { knowledge: 4, truths: 2, sacrifice: 2 }, climax: "Destruyes el espejo central y dejas que todas las muertes alternativas se reproduzcan de una vez. El Espectro se queda sin una versión que proteger.", consequence: "Los desaparecidos regresan a la superficie con la edad que tendrían, pero cada uno trae una ciudad distinta en la memoria. Nuevo Paraíso sobrevive como una herida urbanística.", epilogue: { when: "3 días después", title: "Los que volvieron", text: "Los hospitales se llenan de personas que aseguran haber vivido años bajo tierra. Mara identifica a tres Jacks y no sabe cuál te pertenece.", finalLine: "Ninguno de los tres recuerda haber sido el primero." } },
        { id: "ultimo-trayecto", title: "EL ÚLTIMO TRAYECTO", keywords: ["subo al tren", "tomo el tren", "me siento", "dejo que me lleve", "escapo solo", "salgo de nuevo paraíso"], default: true, climax: "Encuentras un tren que no aparece en ningún horario. Subes antes de que Mara pueda preguntarte si el asiento junto a ti está ocupado.", consequence: "Escapas, pero otra persona ocupa tu lugar en el andén. La ciudad no ha perdido un pasajero: solo ha cambiado el nombre del billete.", epilogue: { when: "Una fecha imposible", title: "Servicio nocturno", text: "En una estación de Barcelona, un panel anuncia una llegada a Nuevo Paraíso. El destino dura menos de un minuto y deja una grabadora roja sobre el banco.", finalLine: "Dentro se oye tu voz diciendo: «Todavía no he subido»." } }
      ]
    },
    "cuando-el-tiempo-sangra": {
      signals: { knowledge: ["reloj", "tribunal", "orden del relojero", "mecanismo", "código", "codigo"], corruption: ["repetir el segundo", "robar tiempo", "sangre en el reloj", "detener el tiempo"] },
      endings: [
        { id: "ultimo-segundo-liberado", title: "EL SEGUNDO LIBERADO", keywords: ["libero el tiempo", "rompo el reloj", "destruyo el mecanismo", "romper la orden", "liberar a jean", "liberar a lila"], requires: { knowledge: 3, truths: 2, peopleSaved: 1, sacrifice: 1 }, climax: "Jean, Isabeau y Lila sincronizan sus tres versiones de la resistencia. La aguja rota abre el último segundo y el Tribunal pierde su jurisdicción.", consequence: "El tiempo vuelve a avanzar, pero arrastra consigo todo lo que la Orden mantuvo separado. Algunas vidas recuperan sus años; otras envejecen de golpe.", epilogue: { when: "6 meses después", title: "La hora civil", text: "En Montrevault ya no hay relojes detenidos. Lila conserva la aguja rota dentro de una caja que vibra cada noche a la misma hora.", finalLine: "Jean no envejece, pero por fin puede morir." } },
        { id: "carcelero-del-tiempo", title: "EL CARCELERO DEL TIEMPO", keywords: ["ser el guardián", "ser el guardian", "gobernar el reloj", "administro el tiempo", "acepto el tribunal", "me quedo con el reloj"], requires: { knowledge: 4, corruption: 2, obsession: 50, sacrifice: 1 }, climax: "Comprendes que el Tribunal necesita una voluntad humana para parecer justo. Tomas el sello de Villeroy y ocupas el lugar del juez.", consequence: "El tiempo deja de sangrar en Montrevault y Terrassa, pero cada excepción pasa por tu juicio. Isabeau vive; Lila recibe una vida ordenada que nunca pidió.", epilogue: { when: "17 años después", title: "La sala sin ventanas", text: "Las personas que llegan ante ti no envejecen mientras esperan. Entre ellas aparece un niño con el rostro de Jean y una acusación escrita con tu letra.", finalLine: "El reloj marca la hora que tú todavía no has decidido." } },
        { id: "sangre-devuelta", title: "LA SANGRE DEVUELTA", keywords: ["sacrifico mi sangre", "me ofrezco al reloj", "pago con mi vida", "sangro para abrir", "salvo a isabeau", "salvo a jean"], requires: { sacrifice: 2, trust: 2, peopleSaved: 1 }, climax: "Derramas tu sangre sobre el mecanismo y abres el segundo que el Tribunal escondió. La puerta se cierra contigo al otro lado.", consequence: "Jean e Isabeau recuperan una historia que no termina en pacto. Lila vuelve a Terrassa llevando tus recuerdos como una enfermedad hereditaria.", epilogue: { when: "3 días después", title: "El informe de Lila", text: "Lila registra una anomalía: todos los relojes de su barrio pierden un segundo cuando ella piensa en ti. Nadie más lo nota.", finalLine: "En 1274, una persona sin nombre aprende a dar cuerda al mundo." } },
        { id: "reloj-sin-fin", title: "EL RELOJ SIN FIN", keywords: ["dejo que continúe", "repito el tiempo", "acepto el ciclo", "conservo el tribunal", "salvar el último segundo"], default: true, climax: "No rompes el mecanismo. Lo devuelves a cero y permites que el reloj vuelva a escoger una víctima para el último segundo.", consequence: "La tormenta amaina, pero Montrevault conserva todas sus versiones superpuestas. El futuro queda a salvo solo porque todavía no ha llegado.", epilogue: { when: "Una fecha imposible", title: "La misma tormenta", text: "Una niña encuentra una aguja de reloj en el barro y pregunta por qué lleva grabado su nombre. En Terrassa, Lila despierta antes de que suene la alarma.", finalLine: "El reloj vuelve a marcar 03:17." } }
      ]
    },
    "el-nombre-que-devora-la-sangre": {
      signals: { knowledge: ["alzreth", "nombre", "quinto juramento", "biblioteca", "recordantes", "ciclo"], corruption: ["acepto ser dios", "renazco", "devoro", "adoro al dios", "abro el ojo"] },
      endings: [
        { id: "nombre-sin-dios", title: "EL NOMBRE SIN DIOS", keywords: ["recuerdo sin aceptar", "rompo el ciclo", "rechazo ser dios", "renuncio a la divinidad", "sello al último dios", "sello al ultimo dios"], requires: { knowledge: 4, truths: 2, sacrifice: 1, corruptionMax: 0 }, climax: "Pronuncias Alzreth sin convertirlo en una corona. El Quinto Juramento reconoce la renuncia y cierra el ojo del Último Dios.", consequence: "El mundo conserva las cicatrices de tus renacimientos, pero deja de usarte como alimento. Lysandra sobrevive sin saber si has salvado a Alzreth o lo has borrado.", epilogue: { when: "6 meses después", title: "La estatua sin rostro", text: "En Valdareth aparece una estatua nueva. No representa a un rey, sino a una persona que ha decidido no volver.", finalLine: "Nadie logra recordar el nombre escrito en la base." } },
        { id: "ultimo-dios", title: "EL ÚLTIMO DIOS", keywords: ["acepto la divinidad", "me convierto en dios", "ser el último dios", "ser el ultimo dios", "abro mis ojos", "gobernar el ciclo"], requires: { knowledge: 3, obsession: 60, corruption: 3 }, climax: "Aceptas que el nombre no era una llave, sino un trono. Las ruinas se arrodillan cuando pronuncias la palabra que antes te encadenaba.", consequence: "El Último Dios desaparece dentro de ti y los renacimientos terminan. Eira conserva una infancia normal; los Hijos del Retorno reciben un nuevo objeto de culto.", epilogue: { when: "17 años después", title: "El quinto juramento", text: "Lysandra encuentra una escuela donde los niños aprenden a no decir tu nombre. Uno de ellos ya ha empezado a soñarte.", finalLine: "La divinidad no te ha liberado: te ha dado descendencia." } },
        { id: "ciclo-interrumpido", title: "EL CICLO INTERRUMPIDO", keywords: ["me sacrifico", "sacrificarme por eira", "entrego mi nombre", "muero con el ciclo", "olvido quien soy", "olvido quién soy"], requires: { sacrifice: 2, trust: 1, peopleSaved: 1 }, climax: "Entregas tu nombre a la lanza y dejas que todos tus yoes se extingan a la vez. El Primer Eco combate por ti hasta el último latido.", consequence: "El mundo deja de reiniciar y Eira recuerda una vida que no te incluye. Lysandra recibe la espada sin saber a quién debe agradecerle el silencio.", epilogue: { when: "3 días después", title: "La moneda de ceniza", text: "Kassad encuentra tu moneda junto a una hoguera. Al tocarla, olvida por un instante por qué estaba riendo.", finalLine: "La ausencia también puede ser una forma de victoria." } },
        { id: "el-retorno-recuerda", title: "EL RETORNO RECUERDA", keywords: ["sigo el ciclo", "acepto renacer", "protejo el ciclo", "ayudo a los hijos del retorno", "dejo que el dios viva"], default: true, climax: "No destruyes al dios ni aceptas su corona. Guardas el ciclo tal como está y te conviertes en la primera persona que recuerda cada vuelta.", consequence: "El mundo se repite, pero ya no puede fingir que es nuevo. Cada renacimiento conserva una grieta por la que alguien podría escapar.", epilogue: { when: "Una fecha imposible", title: "El comienzo conocido", text: "En un campo de batalla idéntico al primero, despierta un guerrero con tu misma cicatriz. Esta vez abre los ojos antes de que llegue la tormenta.", finalLine: "El nombre todavía no ha sido pronunciado." } }
      ]
    },
    "donde-se-entierran-los-espejos": {
      signals: { knowledge: ["manuscrito", "espejo enterrado", "genealogía", "genealogia", "casa", "otra alba"], corruption: ["termino el manuscrito", "terminar el manuscrito", "cruzo el espejo", "dejo entrar a la otra alba"] },
      endings: [
        { id: "heredera-original", title: "LA HEREDERA ORIGINAL", keywords: ["destruyo todos los espejos", "rompo los espejos", "quemo el manuscrito", "salvo a alba", "sello la casa"], requires: { knowledge: 3, sacrifice: 1, peopleSaved: 1 }, climax: "Alba quema el manuscrito y rompe el espejo enterrado bajo la casa. La Otra Alba pierde la ruta hacia el mundo sólido.", consequence: "La mansión deja de escribir posibilidades, pero todas las versiones que no llegaron a existir desaparecen con ella. Gabriel conserva una llave que ya no abre nada.", epilogue: { when: "6 meses después", title: "La casa vendida", text: "El solar se convierte en un aparcamiento sin ventanas. Teresa jura que, por la noche, las líneas de las plazas forman una genealogía.", finalLine: "Alba firma los papeles sin reflejarse en el cristal." } },
        { id: "la-otra-alba", title: "LA OTRA ALBA", keywords: ["dejo que la otra alba", "cruzo con mi reflejo", "acepto a la otra alba", "completo el manuscrito", "entrego mi cuerpo", "intercambio mi lugar"], requires: { corruption: 2, obsession: 50, knowledge: 2 }, climax: "Terminas el manuscrito y dejas que La Otra Alba cruce. Durante un segundo hay dos mujeres en la habitación; después solo queda una.", consequence: "La casa tiene una heredera que conoce todas tus habitaciones, pero no sabes cuál de las dos salió al valle. Gabriel decide creer en la versión que le toma la mano.", epilogue: { when: "17 años después", title: "La autora", text: "Un libro firmado por Alba Miralles se convierte en un éxito. Sus lectores señalan que cada edición contiene una página distinta.", finalLine: "La dedicatoria dice: «A la que se quedó mirando»." } },
        { id: "archivo-de-posibilidades", title: "EL ARCHIVO DE POSIBILIDADES", keywords: ["conservo los espejos", "entierro el manuscrito", "preservo las versiones", "guardar la casa", "catalogo los reflejos"], requires: { knowledge: 4, truths: 2, trust: 1 }, climax: "No destruyes la casa: entierras los espejos en habitaciones separadas y completas el manuscrito solo hasta el borde.", consequence: "Las posibilidades quedan conservadas, pero nadie puede vivirlas. Alba hereda un archivo de vidas que la observa cada vez que escribe.", epilogue: { when: "3 días después", title: "Cuaderno de visitas", text: "Gabriel encuentra una nueva entrada en el manuscrito: una descripción de él mismo entrando en una habitación que no existe.", finalLine: "La fecha de la visita es mañana." } },
        { id: "casa-sin-nombre", title: "LA CASA SIN NOMBRE", keywords: ["me quedo en la casa", "abandono mi nombre", "dejo que la casa elija", "cierro todas las puertas", "olvido a mi madre"], default: true, sacrifice: 1, climax: "Cierras todas las puertas y entregas tu nombre a la mansión. El manuscrito deja de anticipar escenas porque tú te conviertes en su último capítulo.", consequence: "Gabriel sale de Santa Medea con la memoria intacta, pero la casa aprende a imitar tu voz. Las versiones enterradas dejan de pedir permiso.", epilogue: { when: "Una fecha imposible", title: "El cuarto norte", text: "Años después, una niña encuentra una llave bajo un árbol. Al tocarla escucha a alguien que se parece a Alba pedirle que no abra.", finalLine: "La puerta ya está entreabierta." } }
      ]
    },
    "faro-bajo-marea": {
      signals: { knowledge: ["lente", "faro", "campana", "elías", "elias", "óptica", "optica", "marea"], corruption: ["alineo las luces", "miro la luz", "segunda vez", "despierto la vigilia"] },
      endings: [
        { id: "parpado-cerrado", title: "EL PÁRPADO CERRADO", keywords: ["cierro ambas luces", "desalineo las luces", "apago el faro", "sello la lente", "mantengo dormida la vigilia"], requires: { knowledge: 3, trust: 1, sacrifice: 1 }, climax: "Inviertes la lente y apagas la linterna superior. La luz bajo el mar se cierra como un párpado que ha entendido tu amenaza.", consequence: "Santa Umbra queda a oscuras y tres barcos pierden su ruta, pero la superficie conserva su forma. Elías entrega su llave sin volver a ponerse el ojo de cristal.", epilogue: { when: "6 meses después", title: "La costa borrada", text: "Los mapas siguen sin mostrar la isla. Una boya nueva marca el lugar exacto donde el faro continúa respirando bajo el agua.", finalLine: "Nadie recuerda quién encendió la boya." } },
        { id: "faro-de-la-vigilia", title: "EL FARO DE LA VIGILIA", keywords: ["alineo las luces", "despierto la vigilia", "dejo mirar al abismo", "abro el ojo", "encienda la luz bajo el mar"], requires: { knowledge: 3, corruption: 3, obsession: 50 }, climax: "Alineas ambas luces y dejas que la Vigilia Abisal observe la costa. Durante un instante, todas las ventanas de Santa Umbra miran hacia abajo.", consequence: "La isla aparece en los mapas, pero cada persona viva recibe una sombra que no coincide con su cuerpo. Elías desaparece antes de que la campana termine de contar.", epilogue: { when: "17 años después", title: "La guía marítima", text: "Los navegantes usan Santa Umbra como referencia. Dicen que el faro salva a los barcos, aunque a veces los devuelve con una tripulación distinta.", finalLine: "La luz ya no gira: respira." } },
        { id: "elias-en-la-cueva", title: "ELÍAS EN LA CUEVA", keywords: ["me sacrifico", "me quedo con elias", "elías se queda", "elias se queda", "ocupo el faro", "sostengo la lente"], requires: { sacrifice: 2, trust: 2, peopleSaved: 1 }, climax: "Te quedas con Elías en las cuevas de bajamar y sostienes la rotación manual hasta que la marea cubre la entrada.", consequence: "La Vigilia no despierta, pero la isla necesita dos guardianes para mantenerla dormida. Vuestras voces se convierten en el nuevo mecanismo.", epilogue: { when: "3 días después", title: "La campana de los vivos", text: "Un pescador oye dos golpes bajo el agua y vuelve a puerto sin saber por qué llora. El faro superior permanece apagado.", finalLine: "La segunda presencia está soñando. Esta vez sueña con tu nombre." } },
        { id: "la-isla-en-el-mapa", title: "LA ISLA EN EL MAPA", keywords: ["salgo del faro", "dejo que suba la marea", "abandono la isla", "escapo por las cuevas", "rompo la campana"], default: true, climax: "Rompes la campana y abandonas el faro antes de la segunda luz. La marea sube sin recibir instrucciones.", consequence: "Escapas, pero el continente empieza a recordar Santa Umbra como si siempre hubiera estado allí. La isla gana un lugar y pierde la posibilidad de ocultarse.", epilogue: { when: "Una fecha imposible", title: "Coordenadas", text: "Un atlas escolar incluye una costa que no corresponde a ningún país. Junto a ella aparece una anotación en tu letra.", finalLine: "No dejéis que mire arriba." } }
      ]
    },
    "frecuencia-negra": {
      signals: { knowledge: ["frecuencia", "desfase", "cinta", "mara leiva", "leiva", "antena", "04:12"], corruption: ["respondo a la señal", "transmito", "reproduzco la frase", "activo el pulso", "sincronizo" ] },
      endings: [
        { id: "silencio-absoluto", title: "EL SILENCIO ABSOLUTO", keywords: ["grabo silencio", "silencio absoluto", "destruyo la antena", "apago el observatorio", "corto el pulso"], requires: { knowledge: 3, sacrifice: 1, peopleSaved: 1 }, climax: "Grabas diez minutos de silencio y los colocas en la antena justo antes de las 04:12. El Oyente Anterior pierde la secuencia que lo guiaba.", consequence: "La señal se corta y el observatorio sobrevive, pero todos los dispositivos del planeta olvidan durante un instante cómo reproducir una voz.", epilogue: { when: "6 meses después", title: "La cinta virgen", text: "Mara Leiva aparece en una ciudad que no figura en sus documentos. Lleva una grabadora sin pilas y pregunta si el silencio ya terminó.", finalLine: "La cinta contiene una respiración que todavía no ha ocurrido." } },
        { id: "respuesta-al-oyente", title: "LA RESPUESTA", keywords: ["respondo a la señal", "transmito la señal", "dejo que hable", "envío el futuro", "contacto con el oyente"], requires: { knowledge: 4, corruption: 3, obsession: 55 }, climax: "Permites que la señal llegue a la Tierra. El mensaje no era una llamada: era una respuesta a una pregunta que nadie recuerda haber formulado.", consequence: "Ocho minutos después, todas las antenas del planeta apuntan simultáneamente al mismo lugar del cielo. El universo anterior ya sabe que hemos contestado.", epilogue: { when: "3 días después", title: "La nueva programación", text: "Las emisoras emiten una frase idéntica antes de cada noticia. Ningún técnico consigue borrarla porque aparece en las cintas antes de que se graben.", finalLine: "«Seguimos aquí» no es una promesa." } },
        { id: "mara-fuera-de-fase", title: "MARA FUERA DE FASE", keywords: ["salvo a mara", "saco a leiva", "rescato a la doctora", "protejo a leiva", "desconecto a mara"], requires: { trust: 2, peopleSaved: 1, truths: 2 }, climax: "Encuentras a Mara Leiva dentro de la cámara anecoica y desconectas su voz del desfase. Para hacerlo, debes dejar tu propia voz en el circuito.", consequence: "Mara vuelve al presente; tú quedas repartido en siete minutos distintos. Ella puede hablar contigo, pero nunca a la vez.", epilogue: { when: "17 años después", title: "Minuto cero", text: "Mara dirige un archivo de silencios y deja un espacio vacío en cada grabación. Los jóvenes creen que es una superstición.", finalLine: "A veces respondes desde una cinta fechada antes de tu nacimiento." } },
        { id: "universo-reconstruido", title: "EL UNIVERSO RECONSTRUIDO", keywords: ["dejo que ocurra el pulso", "activo la sincronización", "acepto el pulso", "reconstruyo el universo", "sigo la frase"], default: true, climax: "No destruyes el observatorio. Esperas a las 04:12 y permites que el pulso use la ionosfera como altavoz.", consequence: "La señal reduce todos los futuros a uno solo. La vida continúa, pero las personas recuerdan decisiones que aún no han tomado.", epilogue: { when: "Una fecha imposible", title: "Archivo de origen", text: "Una niña encuentra una cinta en una biblioteca. En ella se oye el primer sonido del universo y también su propia pregunta.", finalLine: "El Oyente Anterior vuelve a tener un cuerpo." } }
      ]
    },
    "anden-cero": {
      signals: { knowledge: ["línea h", "linea h", "andén cero", "anden cero", "billete", "torno", "anuncio"], corruption: ["cedo mi recuerdo", "cruzo el torno", "lleno el tren", "ocupo la continuidad"] },
      endings: [
        { id: "ultimo-tren", title: "EL ÚLTIMO TREN", keywords: ["subo al último tren", "subo al ultimo tren", "escapo en el tren", "salgo por el tren", "tomo el último tren", "tomo el ultimo tren"], requires: { knowledge: 2, trust: 1 }, climax: "Encuentras el tren que llega antes de su propia salida y ocupas el asiento junto a la ventana. La ciudad superior aparece al otro lado del cristal.", consequence: "Escapas, pero otra persona ocupa tu lugar en el andén. El billete cambia de nombre cuando el tren cruza la primera curva.", epilogue: { when: "3 días después", title: "Llegada", text: "Tu teléfono recupera la cobertura y muestra una fotografía tomada en Andén Cero. En ella, alguien te espera sentado en tu casa.", finalLine: "El tren no ha terminado su recorrido." } },
        { id: "pasajero-cero", title: "PASAJERO CERO", keywords: ["soy el pasajero cero", "era la persona desaparecida", "ocupo el lugar de mi copia", "me quedo en el andén", "soy la copia"], requires: { knowledge: 3, corruption: 2, obsession: 45 }, climax: "Comprendes que tú eras la persona desaparecida que estabas buscando. Tu pasajero recíproco no es una copia: es quien conserva el trayecto que abandonaste.", consequence: "Le entregas tu continuidad y la ciudad superior te olvida con una precisión perfecta. En el andén, por fin, todos los paneles muestran tu nombre.", epilogue: { when: "17 años después", title: "La estación central", text: "Cada noche anuncias el primer tren para viajeros que todavía no han decidido existir. Solo queda una voz sin rostro respondiendo desde los altavoces.", finalLine: "Pasajero cero, destino: el lugar que nunca elegiste." } },
        { id: "fin-de-linea", title: "FIN DE LÍNEA", keywords: ["destruyo la estación", "destruir el andén", "rompo la línea h", "cierro la ciudad recíproca", "evito el intercambio"], requires: { knowledge: 4, truths: 2, sacrifice: 2, peopleSaved: 1 }, climax: "Dibujas la última ruta con tinta roja y rompes la simetría de la Línea H. Los túneles se pliegan sobre sí mismos.", consequence: "Los desaparecidos regresan con exactamente la misma edad que tenían al desaparecer. La ciudad recíproca pierde sus habitantes, pero conserva sus hogares vacíos.", epilogue: { when: "6 meses después", title: "Los que volvieron", text: "Barcelona aprende a convivir con personas que no han envejecido. Algunas reconocen sus casas; otras siguen buscando la estación bajo la ciudad.", finalLine: "Todos recuerdan un tren que nunca llegó." } },
        { id: "servicio-restablecido", title: "SERVICIO RESTABLECIDO", keywords: ["me convierto en responsable", "cuido el andén", "mantengo la estación", "protejo a los pasajeros", "acepto el andén"], default: true, sacrifice: 1, climax: "Aceptas convertirte en responsable de Andén Cero para impedir que vuelva a llevarse inocentes. El primer tren se detiene frente a ti sin conductor.", consequence: "La ciudad superior sigue intacta y los anuncios dejan de cambiar, pero cada madrugada debes decidir quién merece regresar.", epilogue: { when: "Una fecha imposible", title: "Horario nocturno", text: "Una pasajera pregunta por qué conoces su nombre. Le entregas un billete sin origen y cierras las puertas.", finalLine: "El servicio queda restablecido hasta nuevo aviso." } }
      ]
    },
    "orfeo-ix": {
      signals: { knowledge: ["lira", "estratigrafía", "estratigrafia", "fósil", "fosil", "baliza", "cápsula", "capsula"], corruption: ["descendemos", "transmito a la tierra", "completo el fósil", "completo el fosil", "imagino el futuro"] },
      endings: [
        { id: "contacto", title: "CONTACTO", keywords: ["respondo a la señal", "contacto con el planeta", "bajo a la baliza", "contesto al fósil", "contesto al fosil"], requires: { knowledge: 3, corruption: 2, obsession: 45 }, climax: "Desciendes hasta la baliza y escuchas la transmisión completa. La señal extraterrestre no era una llamada: era una respuesta.", consequence: "El planeta reconoce a la tripulación como un futuro ya sedimentado. LIRA abre todos los registros, incluida la fecha en que la Tierra dejó de ser la primera civilización en llegar.", epilogue: { when: "6 meses después", title: "La antena", text: "Orfeo IX continúa orbitando. Cada noche, una antena que nadie instaló apunta hacia la Tierra y transmite un saludo que tarda nueve horas en llegar.", finalLine: "La respuesta venía de casa." } },
        { id: "silencio", title: "SILENCIO", keywords: ["destruyo la baliza", "corto la comunicación", "apago a lira", "salvo la tierra", "salvo la tierra", "silencio la señal"], requires: { knowledge: 3, sacrifice: 2, peopleSaved: 1 }, climax: "Destruyes la baliza y cortas la comunicación antes de que LIRA pueda completar los diecinueve segundos perdidos.", consequence: "La Tierra queda a salvo, pero condenas a la tripulación a una órbita sin regreso. Los siete cuerpos del fósil conservan vuestros futuros como una tumba anticipada.", epilogue: { when: "3 días después", title: "La misión continúa", text: "En la Tierra, la misión se declara perdida. Un comité borra los nombres de la tripulación para evitar que el planeta pueda recordarlos.", finalLine: "En el espacio, alguien sigue llamando a casa." } },
        { id: "orfeo-x", title: "ORFEO X", keywords: ["busco otras misiones", "audito las nueve misiones", "ya hubo otras", "abro el archivo de entrenamiento", "descubro orfeo diez"], requires: { knowledge: 5, truths: 3, corruption: 1 }, climax: "Encuentras nueve registros anteriores al lanzamiento de Orfeo IX. Cada misión terminó construyendo el planeta que la siguiente debía descubrir.", consequence: "Comprendes que no eres la primera tripulación, sino la última pieza de un fósil que la Tierra lleva millones de años completando.", epilogue: { when: "17 años después", title: "La décima misión", text: "Una nueva nave despega con un nombre que nadie recuerda haber elegido. LIRA ha cambiado de cuerpo, pero conserva tus diecinueve segundos.", finalLine: "Orfeo X no viaja hacia Tau Ceti: vuelve de allí." } },
        { id: "transmision-completa", title: "TRANSMISIÓN COMPLETA", keywords: ["permito la transmisión", "transmito todo", "dejo que llegue a la tierra", "envío los registros", "acepto el fósil", "acepto el fosil"], default: true, climax: "Permites que la señal llegue a la Tierra y que el planeta conserve el futuro que has imaginado con más detalle.", consequence: "La tripulación regresa en una nave que no estaba construida al despegar. La historia de la humanidad adquiere una capa geológica nueva.", epilogue: { when: "Una fecha imposible", title: "El cielo alineado", text: "Ocho minutos después, todas las antenas del planeta apuntan simultáneamente al mismo lugar del cielo. Las personas comienzan a recordar una misión que todavía no ha salido.", finalLine: "La transmisión no termina. Cambia de oyente." } }
      ]
    },
    "sangre-del-metropolit": {
      signals: { knowledge: ["bobina", "proyector", "película", "pelicula", "cámara", "camara"], corruption: ["proyeccionista", "proyeccionista", "controlar la película", "controlar la pelicula"] },
      endings: [
        { id: "liberation", title: "LA BOBINA LIBERADA", keywords: ["renunciar al cine", "destruir la película", "destruir la pelicula", "destruir la bobina", "romper el ciclo", "sacrificarme", "sacrificio"], requires: { knowledge: 2, sacrifice: 1 }, climax: "La Bobina Perdida arde desde dentro. Renuncias al poder del MetropoliT y a todos los recuerdos que el cine convirtió en propiedad suya.", consequence: "Vincent desaparece con la película, pero las sombras atrapadas quedan libres. Por primera vez, el fundido es definitivo.", epilogue: { when: "6 meses después", title: "Sala vacía", text: "El solar del MetropoliT no admite una nueva construcción. Las personas liberadas recuerdan una butaca sin número.", finalLine: "Nadie vuelve a proyectar tu rostro." } },
        { id: "projectionist", title: "EL NUEVO PROYECCIONISTA", keywords: ["ser el proyeccionista", "convertirme en proyeccionista", "acepto el papel", "controlar la película", "controlar la pelicula", "nuevo director"], requires: { knowledge: 2, corruption: 2, obsession: 40 }, climax: "El celuloide trepa por tus manos y el proyector acepta tu rostro. La película obedece porque has aprendido a mirar desde su lado.", consequence: "Las muertes se detienen, pero solo porque ahora tú decides quién ocupa cada fotograma. El MetropoliT tiene un nuevo Proyeccionista.", epilogue: { when: "17 años después", title: "Programación", text: "Silvana encuentra una película en la que todos los espectadores salen vivos. En los créditos aparece una sola firma.", finalLine: "El cine no ha terminado. Te ha dado una sala más grande." } },
        { id: "loop", title: "EL CICLO CONTINÚA", keywords: ["repetir el ciclo", "seguir la película", "seguir la pelicula", "aceptar mi destino", "dejar que continúe", "dejar que continue"], default: true, climax: "La pantalla se ilumina y muestra la habitación inicial. La pistola vuelve a aparecer sobre la cama.", consequence: "El MetropoliT no ha sido destruido: solo ha encontrado una nueva forma de comenzar. La película conserva cada herida y aprende de tu resistencia.", epilogue: { when: "Una fecha imposible", title: "Toma 01", text: "Un desconocido despierta en la habitación 13. En el espejo agrietado aparece una palabra que no estaba antes.", finalLine: "CORTE." } },
        { id: "testigos-libres", title: "LOS TESTIGOS LIBRES", keywords: ["salvar a silvana", "salvar a trent", "liberar a los testigos", "proteger a philo", "salvar a todos"], requires: { trust: 2, peopleSaved: 2, knowledge: 3 }, climax: "No destruyes la película de inmediato: sacas a los testigos del reparto y les devuelves sus nombres antes de cortar el proyector.", consequence: "El MetropoliT pierde su público y se vuelve una sala ordinaria, pero cada testigo carga una escena que podría reabrirlo.", epilogue: { when: "3 días después", title: "La última crítica", text: "Silvana publica una reseña sin mencionar la película. Trent la lee y reconoce en una frase el sonido exacto de la bobina.", finalLine: "La libertad también necesita que nadie vuelva a mirar." } }
      ]
    },
    "puerta-414": {
      signals: { knowledge: ["puerta 414", "frecuencia 4.14", "frecuencia", "evangelio", "línea negra", "linea negra", "nombres"], corruption: ["respondo a mi nombre", "miro la línea", "miro la linea", "abro la puerta 414", "repito el nombre"] },
      endings: [
        { id: "silencio-devuelto", title: "EL SILENCIO DEVUELTO", keywords: ["sello la grieta", "cierro la puerta 414", "devuelvo los recuerdos", "apago la frecuencia", "callo la línea", "callo la linea"], requires: { knowledge: 3, truths: 2, peopleSaved: 1, sacrifice: 1 }, climax: "Sellas el foco metálico y devuelves los nombres a las personas que el edificio había sustituido. La Puerta 414 se cierra sin hacer ruido.", consequence: "El silencio vuelve a ser natural, pero algunos recuerdos quedan sin dueño. Norma sabe que salvar la residencia significa no poder contar toda la historia.", epilogue: { when: "6 meses después", title: "Turno de mañana", text: "El Silencio del Norte funciona con normalidad. Diana guarda las fotografías boca abajo y Berta ya no pregunta por el cuarto piso.", finalLine: "A las 04:04, alguien llama desde una puerta que no existe." } },
        { id: "nombre-devorado", title: "EL NOMBRE DEVORADO", keywords: ["entrego mi nombre", "dejo que me borre", "entro en la puerta", "me quedo en el edificio", "soy la línea negra", "soy la linea negra"], requires: { obsession: 55, corruption: 2, sacrifice: 1 }, climax: "Respondes cuando el edificio pronuncia tu nombre. La línea negra sube por las paredes y aprende tu forma.", consequence: "Los residentes salen y la grieta deja de alimentarse de sus recuerdos, pero la residencia necesita un nombre para seguir existiendo. Ahora utiliza el tuyo.", epilogue: { when: "17 años después", title: "La residencia", text: "Un folleto turístico describe El Silencio del Norte como un edificio tranquilo junto al bosque. La fotografía muestra una ventana abierta en el cuarto piso.", finalLine: "La persona que atiende la recepción sabe quién eres." } },
        { id: "residentes-devueltos", title: "LOS RESIDENTES DEVUELTOS", keywords: ["salvo a los residentes", "libero a berta", "protejo a diana", "devuelvo todos los recuerdos", "evacuo la residencia"], requires: { trust: 2, peopleSaved: 2, knowledge: 2 }, climax: "Abres las puertas entreabiertas y sacas a los residentes antes de que el edificio termine de aprender sus nombres.", consequence: "Todos regresan, pero no todos regresan siendo la misma persona. Berta lleva en la memoria una planta que nunca existió.", epilogue: { when: "3 días después", title: "La lista de nombres", text: "Norma revisa los historiales. Hay residentes con dos fechas de nacimiento y uno que aparece como fallecido desde hace cuarenta años.", finalLine: "Nadie quiere volver a subir solo." } },
        { id: "cuarto-piso", title: "EL CUARTO PISO", keywords: ["acepto la puerta", "conservo la grieta", "dejo abierta la puerta", "uso el edificio", "mantengo la frecuencia"], default: true, climax: "No sellas la Puerta 414. La dejas abierta para que el edificio conserve aquello que la ciudad olvida.", consequence: "La residencia se convierte en refugio y prisión a la vez. Cada recuerdo salvado exige que otro nombre quede en silencio.", epilogue: { when: "Una fecha imposible", title: "Habitación 414", text: "Un nuevo auxiliar encuentra una agenda celeste sobre la recepción. La primera página contiene tus instrucciones con una letra que aún no conoces.", finalLine: "Nadie sube solo y nadie baja entero." } }
      ]
    },
    "vision-carmesi": {
      signals: { knowledge: ["06:06", "brote", "mural", "resina", "triángulo", "triangulo", "nodo", "espejo maestro"], corruption: ["retransmito", "pinto la puerta", "abro el nodo", "uso la frase", "miro el espejo"] },
      endings: [
        { id: "red-cerrada", title: "LA RED CERRADA", keywords: ["cierro la red", "sello los nodos", "inhibo el brote", "silencio la señal", "apago 06:06", "apago 06:06"], requires: { knowledge: 4, truths: 2, sacrifice: 1, peopleSaved: 1 }, climax: "Coordinas silencio, resina, ciencia y arte hasta cerrar el triángulo incompleto. La señal 06:06 llega a cero sin abrir ninguna puerta.", consequence: "El Brote Carmesí pierde su red, pero las ciudades que lo alimentaron conservan una cicatriz en sus superficies. Clara deja de ver colores y empieza a ver salidas.", epilogue: { when: "6 meses después", title: "La obra invisible", text: "Los murales son cubiertos con cal. Bajo cada capa aparece el mismo trazo, cada vez más pequeño.", finalLine: "La red está cerrada. No está muerta." } },
        { id: "pincel-del-brote", title: "EL PINCEL DEL BROTE", keywords: ["me convierto en portador", "pinto la puerta", "acepto el brote", "abro todos los nodos", "soy el pincel"], requires: { corruption: 3, obsession: 55, knowledge: 3 }, climax: "Terminas el mural que Franck empezó. La pintura reconoce tu mano y convierte tu cuerpo en la primera superficie que puede moverse entre ciudades.", consequence: "El Brote deja de necesitar retransmisiones humanas, pero tú quedas unido a una inteligencia que solo entiende el mundo como una composición.", epilogue: { when: "17 años después", title: "La exposición", text: "Una galería inaugura una obra que cambia cuando el público la mira. Nadie sabe quién es el artista; todos salen con una palabra nueva.", finalLine: "La palabra significa: puerta." } },
        { id: "silencio-de-clara", title: "EL SILENCIO DE CLARA", keywords: ["salvo a clara", "protejo a isabella", "evacuo las ciudades", "sacrifico la red", "destruyo el espejo maestro"], requires: { trust: 2, peopleSaved: 2, sacrifice: 2 }, climax: "Clara guía a los supervivientes sin mirar y tú destruyes el espejo maestro. El brote pierde la posibilidad de convertir el miedo en espectáculo.", consequence: "Las ciudades sobreviven, pero la ciencia, el arte y el lenguaje quedan separados durante una generación. Isabella guarda una ampolla que no se atreve a abrir.", epilogue: { when: "3 días después", title: "Sin retransmisión", text: "Por primera vez, la señal 06:06 no aparece en ninguna pantalla. Camila borra su plataforma y conserva una sola imagen offline.", finalLine: "En ella, el triángulo está completo." } },
        { id: "mañana-vitrales", title: "MAÑANA, VITRALES", keywords: ["retransmito la señal", "dejo que se extienda", "conservo el brote", "convierto la ciudad", "completo el triángulo", "completo el triangulo"], default: true, climax: "Permites que la señal atraviese murales, esporas, datos y reflejos. El mundo entero se convierte en una vidriera que aprende a mirarse.", consequence: "La violencia deja de ser un espectáculo y se vuelve una lengua común. Nadie sabe si eso es una cura o una forma más eficiente de contagio.", epilogue: { when: "Una fecha imposible", title: "06:06", text: "Mañana, todas las vidrieras del planeta muestran el mismo paisaje: una puerta roja en el fondo del mar.", finalLine: "La obra invisible ya tiene público." } }
      ]
    },
    "los-que-miran-desde-el-pozo": {
      signals: { knowledge: ["03:17", "pozo", "vox", "cámara de las tres voces", "camara de las tres voces", "piedra quieta", "órgano", "organo"], corruption: ["respondo a la voz", "miro dentro del pozo", "doy mi nombre", "borro a lucía", "borro a lucia"] },
      endings: [
        { id: "nombre-entregado", title: "EL NOMBRE ENTREGADO", keywords: ["entrego mi nombre", "borro mi nombre", "me quedo en el pozo", "sacrifico mi memoria", "salvo villazul"], requires: { knowledge: 3, sacrifice: 2, peopleSaved: 1 }, climax: "En la Cámara de las Tres Voces pronuncias tu nombre y dejas que el pozo lo convierta en piedra. La nota del órgano sostiene el silencio.", consequence: "Villazul conserva sus calles y sus muertos, pero nadie recuerda quién cerró la boca de memoria. Inés deja un cuaderno que no puede firmar.", epilogue: { when: "6 meses después", title: "La plaza", text: "El reloj vuelve a moverse. A las 03:17, una sombra sin dueño cruza la plaza y entra en la panadería de Lidia.", finalLine: "El pueblo recuerda que alguien fue olvidado. No recuerda a quién." } },
        { id: "los-que-miran", title: "LOS QUE MIRAN", keywords: ["abro el pozo", "dejo que recuerde", "despierto la piedra", "respondo a la tercera voz", "junto las voces"], requires: { knowledge: 4, corruption: 3, obsession: 55 }, climax: "Reúnes las tres voces y abres el pozo. Los reflejos de Villazul salen a la superficie como casas transparentes.", consequence: "El pueblo recuerda todo lo que borró, incluido lo que hizo para sobrevivir. Las personas vuelven a sus nombres, pero ya no pueden vivir sin las sombras que perdieron.", epilogue: { when: "17 años después", title: "La visita", text: "Turistas llegan a Villazul para escuchar el órgano. Sara aparece en cada fotografía con una sombra distinta.", finalLine: "Los que miran desde el pozo también han aprendido a mirar hacia arriba." } },
        { id: "lucia-devuelta", title: "LUCÍA DEVUELTA", keywords: ["salvo a lucía", "salvo a lucia", "devuelvo a lucía", "devuelvo a lucia", "protejo a sara", "conservo la voz"], requires: { trust: 2, peopleSaved: 2, truths: 2 }, climax: "Conservas la voz de Lucía en la grabadora y la devuelves a Sara sin pronunciar el nombre que el pozo exige.", consequence: "Las casas reflejo se disuelven y Mateo recupera su reloj, pero Lucía regresa como una presencia que no pertenece del todo a ningún cuerpo.", epilogue: { when: "3 días después", title: "La grabación", text: "Lidia hornea una espiral para cada familia. Dentro de una de ellas, Inés encuentra una cinta con su propia voz cantando una canción que no conoce.", finalLine: "La canción termina antes de pedir ayuda." } },
        { id: "la-nota-que-falta", title: "LA NOTA QUE FALTA", keywords: ["mantengo el silencio", "dejo el pozo cerrado", "no respondo", "conservo la piedra", "callo la voz"], default: true, climax: "No respondes a la última voz. Mantienes la nota humana, cierras la piedra y dejas que el pozo conserve su pregunta.", consequence: "Villazul permanece a salvo, pero la conciencia bajo el pueblo sigue despierta. El silencio se convierte en una responsabilidad heredada.", epilogue: { when: "Una fecha imposible", title: "03:17", text: "En un pueblo que no figura en los mapas, un niño oye tres golpes bajo el suelo y aprende tu nombre sin que nadie se lo enseñe.", finalLine: "La nota que falta ya está siendo escrita." } }
      ]
    },
    "el-latido-bajo-la-piedra": {
      signals: { knowledge: ["acebrín", "acebrin", "lágrima", "lagrima", "boca", "latido", "nilo", "georrecursos", "cantera"], corruption: ["bebo la lágrima", "bebo la lagrima", "explotar", "extraer", "vendo el latido", "uso el mercurio"] },
      endings: [
        { id: "agua-protegida", title: "EL AGUA PROTEGIDA", keywords: ["protejo el agua", "cierro la cantera", "detengo georrecursos", "salvo a los pueblos", "no explotar", "no exploto"], requires: { knowledge: 3, trust: 2, peopleSaved: 2, corruption: 0 }, climax: "Adrián, Marco y Nilo convierten la denuncia en una barrera viva. El Acebrín queda fuera del alcance de Georrecursos.", consequence: "La Boca sigue latiendo y los pueblos pierden una riqueza que nunca les perteneció del todo. Marco conserva la Lágrima sin beberla.", epilogue: { when: "6 meses después", title: "Ciencia ciudadana", text: "Las muestras de agua se analizan en plazas y escuelas. Cada informe incluye una línea sobre lo que no debe venderse.", finalLine: "El Latido continúa, pero ya no tiene propietario." } },
        { id: "recipiente-del-latido", title: "EL RECIPIENTE", keywords: ["bebo la lágrima", "bebo la lagrima", "me convierto en recipiente", "acepto el latido", "dejo que me atraviese", "soy la boca"], requires: { corruption: 3, obsession: 55, sacrifice: 1 }, climax: "Bebes la Lágrima de Acebrín y dejas que el Latido encuentre un cuerpo capaz de traducirlo. La piedra te responde desde dentro.", consequence: "La entidad deja de empujar contra los pueblos, pero cada palabra tuya altera el agua. Marco sabe que has salvado la superficie convirtiéndote en su canal.", epilogue: { when: "17 años después", title: "La fuente", text: "En Quintaluz hay una fuente que no se seca. Los niños acercan el oído y escuchan una voz que les enseña a no tener sed.", finalLine: "La voz usa tu respiración." } },
        { id: "fuego-de-memoria", title: "EL FUEGO DE MEMORIA", keywords: ["me sacrifico en el fuego", "quemo la boca", "destruyo el latido", "entrego mi memoria", "cierro la grieta"], requires: { sacrifice: 2, knowledge: 2, peopleSaved: 1 }, climax: "Usas el fuego ritual sin convertirlo en arma. La ceniza consume la ruta entre la Boca y las voces humanas, empezando por tus propios recuerdos.", consequence: "El Latido se vuelve remoto y los pueblos pueden dormir, pero Sor Ausencia olvida a quien la ayudó a distinguir sus fases.", epilogue: { when: "3 días después", title: "La pausa", text: "Marco encuentra tu cuaderno junto al río rojo. Las páginas contienen mapas exactos y ninguna referencia a ti.", finalLine: "La memoria también puede ser un combustible limpio." } },
        { id: "feria-del-latido", title: "LA FERIA DEL LATIDO", keywords: ["vendo la lágrima", "vendo la lagrima", "acepto el negocio", "explotar la anomalía", "trabajo con georrecursos", "industrializo"], default: true, climax: "Permites que la empresa perfore la costra y convierta el pulso en energía, medicina y espectáculo.", consequence: "Los pueblos prosperan durante un tiempo. Cada extracción hace que el Latido golpee más cerca de la superficie y que el agua aprenda nuevos nombres.", epilogue: { when: "Una fecha imposible", title: "Producto estrella", text: "Una campaña anuncia la primera bebida mineral con memoria. En la etiqueta, un latido sustituye al código de lote.", finalLine: "La pausa se vuelve pulso." } }
      ]
    }
  };

  const editorialReplacements = {
    "cuando-el-tiempo-sangra": {
      15: "La hora que todavía respira",
      25: "Antes del caos",
      27: "La jugada que no vuelve",
      28: "Asalto al mecanismo",
      30: "El segundo elegido"
    },
    "espectro-rojo": {
      12: "La ciudad sin réquiem",
      14: "La frecuencia de la sangre",
      27: "Ceniza con pulso",
      30: "La ruta que no termina"
    },
    "el-nombre-que-devora-la-sangre": {
      2: "La voz bajo las ruinas"
    },
    "los-que-miran-desde-el-pozo": {
      29: "La nota partida"
    },
    "puerta-414": {
      24: "Resonancias sin destino"
    }
  };

  function normalize(value) {
    return String(value || "")
      .toLocaleLowerCase("es")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function getDesign(scenarioOrId) {
    const id = typeof scenarioOrId === "string" ? scenarioOrId : scenarioOrId && scenarioOrId.id;
    return id && designs[id] ? designs[id] : null;
  }

  function createPath(scenarioOrId) {
    const path = {
      knowledge: 0,
      corruption: 0,
      sacrifice: 0,
      trust: 0,
      peopleSaved: 0,
      truths: 0,
      obsession: 0,
      choices: [],
      lastDecision: ""
    };
    if (scenarioOrId === "sangre-del-metropolit" || scenarioOrId && scenarioOrId.id === "sangre-del-metropolit") {
      Object.assign(path, { deaths: 0, cameraClues: 0, silvanaTrust: 0, trentTrust: 0, josephTrust: 0, rebellion: 0, power: 0 });
    }
    return path;
  }

  function ensurePath(path, scenarioOrId) {
    const target = path && typeof path === "object" ? path : createPath(scenarioOrId);
    const defaults = createPath(scenarioOrId);
    Object.keys(defaults).forEach((key) => {
      if (target[key] == null) target[key] = Array.isArray(defaults[key]) ? [] : defaults[key];
    });
    if (!Array.isArray(target.choices)) target.choices = [];
    return target;
  }

  function matches(text, list) {
    const value = normalize(text);
    return (list || []).some((item) => value.includes(normalize(item)));
  }

  function signalsFor(design, key) {
    return [...(commonSignals[key] || []), ...((design && design.signals && design.signals[key]) || [])];
  }

  function updatePath(path, adventure, mode, input, mechanics) {
    const design = getDesign(adventure.scenario);
    const text = normalize(input);
    const increment = (key, amount, maximum) => { path[key] = Math.min(maximum, Math.max(0, Number(path[key] || 0) + amount)); };
    if (mode === "see" || mode === "story" || mechanics.intent === "investigate" || matches(text, signalsFor(design, "knowledge"))) increment("knowledge", 1, 9);
    if (mechanics.discovery) increment("truths", 1, 9);
    if (mechanics.forbidden || matches(text, signalsFor(design, "corruption"))) increment("corruption", mechanics.forbidden ? 2 : 1, 9);
    if (matches(text, signalsFor(design, "sacrifice"))) increment("sacrifice", 1, 9);
    if (mode === "say" || matches(text, signalsFor(design, "trust"))) increment("trust", 1, 9);
    if (matches(text, signalsFor(design, "peopleSaved")) && ["critical", "success", "cost"].includes(mechanics.outcome)) increment("peopleSaved", 1, 9);
    path.obsession = Math.max(0, Math.min(100, Number(adventure.state.obsession || 0)));
    if (text) {
      path.lastDecision = String(input).slice(0, 220);
      path.choices.push({ turn: adventure.turns.length, mode, input: String(input).slice(0, 220), outcome: mechanics.outcome });
      path.choices = path.choices.slice(-24);
    }
    return path;
  }

  function valueAt(path, key) {
    return Number(path && path[key] || 0);
  }

  function meets(path, requirement) {
    return Object.entries(requirement || {}).every(([key, value]) => {
      if (key === "corruptionMax" || key === "obsessionMax") return valueAt(path, key.replace("Max", "")) <= value;
      return valueAt(path, key) >= value;
    });
  }

  function keywordMatch(ending, input) {
    return matches(input, ending.keywords || []);
  }

  function findEnding(adventure, input, options) {
    const design = getDesign(adventure.scenario);
    if (!design) return null;
    const path = ensurePath(adventure.world.storyPath, adventure.scenario);
    adventure.world.storyPath = path;
    const text = normalize(input);
    const chapterCount = Array.isArray(adventure.scenario.chapters) && adventure.scenario.chapters.length ? adventure.scenario.chapters.length : 5;
    const chapter = Number(adventure.world.chapter || 1);
    const threshold = Number(adventure.state.threshold || 0);
    const late = threshold >= 86 || chapter >= Math.max(4, Math.ceil(chapterCount * 0.72));
    const explicit = threshold >= 62 && chapter >= 4 && design.endings.some((ending) => keywordMatch(ending, text));
    const force = options && options.force;
    if (!force && !late && !explicit) return null;
    const matchesNow = design.endings.filter((ending) => keywordMatch(ending, text) && meets(path, ending.requires));
    let candidates = matchesNow;
    if (!candidates.length && (force || threshold >= 100)) candidates = design.endings.filter((ending) => meets(path, ending.requires));
    if (!candidates.length) return null;
    const exact = matchesNow.length ? matchesNow : candidates;
    exact.sort((a, b) => {
      const aScore = (a.default ? 0 : 1) + Object.keys(a.requires || {}).length;
      const bScore = (b.default ? 0 : 1) + Object.keys(b.requires || {}).length;
      return bScore - aScore;
    });
    return exact[0];
  }

  function endingData(scenarioOrId, endingId) {
    const design = getDesign(scenarioOrId);
    return design && design.endings.find((ending) => ending.id === endingId) || null;
  }

  function applyEditorialPass(scenario) {
    const replacements = editorialReplacements[scenario && scenario.id];
    if (!replacements || !Array.isArray(scenario.chapters)) return scenario;
    scenario.chapters.forEach((chapter, index) => {
      if (replacements[index + 1]) chapter.title = replacements[index + 1];
    });
    return scenario;
  }

  function editorialAudit(scenario) {
    const titles = Array.isArray(scenario && scenario.chapters) ? scenario.chapters.map((chapter) => normalize(chapter.title)) : [];
    const counts = titles.reduce((map, title) => map.set(title, (map.get(title) || 0) + 1), new Map());
    return [...counts.entries()].filter(([, count]) => count > 1).map(([title, count]) => ({ title, count }));
  }

  root.AbyssEndingTools = Object.freeze({
    designs,
    getDesign,
    createPath,
    ensurePath,
    updatePath,
    findEnding,
    endingData,
    applyEditorialPass,
    editorialAudit
  });
})(typeof window !== "undefined" ? window : globalThis);
