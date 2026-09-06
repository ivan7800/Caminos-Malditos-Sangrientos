(function () {
  "use strict";

  const sharedBanks = {
    transitions: [
      "Durante un instante, el mundo parece esperar tu decisión.",
      "Algo cambia fuera del alcance de la vista.",
      "El silencio posterior no es vacío: está escuchando.",
      "La realidad tarda un segundo de más en aceptar lo ocurrido.",
      "En algún lugar cercano, una distancia imposible se pliega."
    ],
    critical: [
      "La intuición llega entera, limpia, y por eso mismo resulta aterradora.",
      "Todo encaja con una precisión que ninguna coincidencia podría justificar.",
      "Encuentras exactamente lo que buscabas, además de algo que todavía no sabías temer."
    ],
    success: [
      "La acción funciona, aunque el alivio dura menos de lo razonable.",
      "Consigues imponerte a la situación y ganas unos minutos preciosos.",
      "La resistencia cede. Detrás queda una prueba concreta de que tu sospecha era correcta."
    ],
    cost: [
      "Lo consigues, pero el lugar cobra una parte de ti que no sabes nombrar.",
      "El resultado llega acompañado de un precio inmediato.",
      "La acción funciona a medias: suficiente para avanzar, no para salir ileso."
    ],
    failure: [
      "No sucede lo que esperabas. Algo, sin embargo, aprovecha el intento.",
      "La situación se cierra como una trampa y te obliga a retroceder.",
      "Fallas por una razón que no pertenece del todo a la física."
    ],
    social: [
      "La respuesta llega después de una pausa demasiado calculada.",
      "Tu interlocutor no mira tus ojos, sino un punto apenas por encima de tu hombro.",
      "Las palabras son corrientes. El ritmo con el que las pronuncia no lo es."
    ],
    story: [
      "La nueva certeza se instala en el relato y el mundo se reorganiza a su alrededor.",
      "Así ocurre. Incluso los detalles anteriores parecen haberlo sabido desde el principio.",
      "La historia acepta tu intervención, pero conserva el derecho a interpretarla."
    ],
    continue: [
      "Nadie interviene. La escena continúa por su propia inercia.",
      "Los segundos pasan y el entorno decide por ti.",
      "Al no recibir resistencia, aquello que estaba comenzando se completa."
    ]
  };

  const scenarios = [
    {
      id: "bajo-el-espejo-de-la-sangre",
      schemaVersion: 1,
      title: "Bajo el Espejo de la Sangre",
      subtitle: "El barniz oculta una máscara. La máscara recuerda quién la miró.",
      label: "EXPEDIENTE DE RESTAURACIÓN MALDITA",
      category: "gothic",
      sigil: "◍",
      accent: "#a96d62",
      art: "assets/art-webp/mensajero-oscuro.webp",
      artGallery: [
        { src: "assets/art-webp/memoria-agua.webp", alt: "Rostro bajo la memoria del agua" },
        { src: "assets/art-webp/hoyo-blanco.webp", alt: "Figura ante un umbral blanco" },
        { src: "assets/art-webp/ventana-roja.webp", alt: "Máscaras tras una ventana" }
      ],
      setting: "Corró d’Avall · taller de restauración y ruinas",
      difficulty: "Opresivo",
      duration: "100–170 min",
      tags: ["máscara", "restauración", "sangre", "pintura", "herejía"],
      summary: "Un restaurador descubre una máscara bajo el barniz de un cuadro y despierta una presencia que lleva siglos esperando ser mirada.",
      premise: "Cristian de la Torre trabaja de madrugada en un óleo antiguo cuando encuentra una máscara blanca con lágrimas negras bajo las capas de pintura. Alba acude al taller y ambos siguen la pista hacia una hermandad, un campanario y un espejo maestro que no refleja rostros, sino culpas heredadas.",
      entity: "La Máscara de la Sangre",
      taboo: "No retires la última capa de barniz sin apagar todos los espejos. No lleves la máscara puesta para descubrir a quién pertenece.",
      truth: "La máscara no es un objeto poseído: es una superficie que conserva la voluntad de quienes la miraron durante el rito original. El espejo maestro la conecta con una red de identidades y solo puede destruirse quemando la imagen que la alimenta.",
      authorNote: "Horror gótico contemporáneo, restauración artística, lluvia, pueblos húmedos, campanas y fuego. La amenaza debe avanzar desde la obra de arte hacia la identidad.",
      aiInstructions: "Narra con textura de thriller gótico y horror de restauración. Describe barniz, pigmentos, cristal, humedad y fuego. Mantén a Cristian y Alba como investigadores con miedo, no como héroes invulnerables.",
      rules: ["Cada capa retirada revela una memoria y una amenaza.", "La máscara aparece en reflejos antes de aparecer físicamente.", "La sangre sobre el cuadro cambia la composición.", "Las campanas activan el espejo maestro.", "El culto protege la obra porque cree que contiene una salvación.", "Cristian conoce la materia; Alba reconoce los patrones de la casa y los espejos.", "El fuego puede destruir la pintura, pero también liberar lo que está debajo.", "La salida exige elegir qué memoria se conserva."],
      opening: "Corró d’Avall, 2:37 a.m. Cristian de la Torre retira una capa de barniz de un óleo de cuatro siglos. Bajo el santo aparece una máscara blanca con dos lágrimas negras. El sonido de una grieta no viene del cuadro: llega desde el espejo del taller. Al otro lado del cristal, un hombre de traje oscuro lleva la misma máscara. Cristian llama a Alba. Cuando la luz de la farola vuelve, la máscara está pegada a la ventana, sonriendo.",
      initialState: { location: "Corró d’Avall · taller de restauración", time: "2:37 a.m. · noche de lluvia", objective: "Descubre qué oculta el cuadro sin convertirte en el siguiente rostro del espejo.", inventory: [
        { id: "restoration-scalpel", name: "Bisturí de restaurador", description: "Retira capas de pintura y descubre memorias enterradas." },
        { id: "masked-painting", name: "Óleo de la máscara", description: "Cuadro antiguo bajo cuyo barniz aparece una figura imposible." },
        { id: "black-vial", name: "Frasco de pigmento oscuro", description: "Tinta que parece mezclarse con la sangre." },
        { id: "burned-frame", name: "Marco quemado", description: "Fragmento de una obra destruida durante un rito anterior." }
      ] },
      storyCards: [
        { id: "cristian", title: "Cristian de la Torre", type: "restaurador", keys: ["cristian", "restaurador", "cuadro", "barniz"], content: "Restaurador que encuentra la máscara bajo un óleo y queda unido a la obra por su propia mirada.", clue: "Puede distinguir una falsificación, pero no siempre una memoria falsa." },
        { id: "alba-mirror", title: "Alba", type: "investigadora", keys: ["alba", "espejo", "casa", "heredera"], content: "Aliada de Cristian y superviviente de otras anomalías de espejos y casas heredadas.", clue: "Reconoce símbolos que no deberían aparecer en cuadros religiosos." },
        { id: "blood-mask", title: "La Máscara de la Sangre", type: "entidad", keys: ["máscara", "sangre", "rostro", "barniz"], content: "Objeto y voluntad a la vez. Adopta el rostro de quien intenta revelar su origen.", clue: "No quiere esconderse: quiere ser terminada." },
        { id: "master-mirror", title: "El espejo maestro", type: "umbral", keys: ["espejo maestro", "reflejo", "cristal", "umbral"], content: "Superficie central que conecta la obra, el culto y las identidades atrapadas.", clue: "Destruir el cristal no basta si la imagen sigue viva en otra superficie." },
        { id: "heresy", title: "La hermandad del barniz", type: "culto", keys: ["hermandad", "herejía", "culto", "campanario"], content: "Custodios que creen que la máscara puede revelar el rostro verdadero de la humanidad.", clue: "Sus rituales mezclan restauración, sangre y campanas." },
        { id: "corró", title: "Corró d’Avall", type: "lugar", keys: ["corró", "pueblo", "taller", "ruinas"], content: "Pueblo húmedo donde las obras antiguas conservan capas que nadie recuerda haber pintado.", clue: "El pueblo parece tranquilo solo mientras nadie retira el barniz." }
      ],
      progression: [
        { at: 16, location: "Taller · cuadro bajo el barniz", objective: "Identifica el símbolo oculto y sobrevive a la primera aparición." },
        { at: 34, location: "Corró d’Avall · ruinas", objective: "Sigue las huellas de la hermandad y descubre el primer espejo." },
        { at: 52, location: "Campanario · noche de tormenta", objective: "Impide que las campanas despierten la imagen completa." },
        { at: 70, location: "Capilla quemada", objective: "Encuentra el origen del fuego que destruyó la primera máscara." },
        { at: 88, location: "Espejo maestro", objective: "Decide qué rostro debe desaparecer para romper el vínculo." },
        { at: 97, location: "Ruinas · luz renaciente", objective: "Cierra la obra sin convertir la memoria en otra prisión." }
      ],
      chapters: [
        { title: "El Secreto Bajo el Barniz", objective: "Retira la primera capa y descubre la máscara." }, { title: "Mina en la Niebla", objective: "Sigue a Alba hasta el lugar donde nació el pigmento." }, { title: "El Encuentro", objective: "Enfrenta al hombre que lleva tu mismo rostro." }, { title: "El Espejo No Miente", objective: "Comprueba qué refleja realmente el cristal." }, { title: "El Rostro en el Espejo", objective: "Descubre quién está atrapado detrás de la máscara." }, { title: "Sombras en el Umbral", objective: "Cruza la puerta que solo aparece en reflejos." }, { title: "Las Huellas del Pasado", objective: "Investiga los rastros de la hermandad." }, { title: "Ecos Entre las Ruinas", objective: "Escucha la memoria de la capilla destruida." }, { title: "El Rumor de la Sangre", objective: "Evita que el pigmento absorba una nueva vida." }, { title: "Preparando el Fuego", objective: "Reúne lo necesario para quemar la obra." }, { title: "Pacto de Sombras", objective: "Decide si aceptar la ayuda del culto." }, { title: "Alba de Engaños", objective: "Distingue a Alba de la versión que devuelve el espejo." }, { title: "Un Susurro en la Oscuridad", objective: "Encuentra la voz que pronuncia el nombre de la máscara." }, { title: "Fuego en el Campanario", objective: "Detén el ritual cuando comiencen las campanas." }, { title: "Entre Tempestad y Fuego", objective: "Protege el cuadro durante la tormenta." }, { title: "La Llamada Inesperada", objective: "Responde a la llamada que llega desde el cristal." }, { title: "Bajo la Llama de la Herejía", objective: "Entra en la capilla y descubre la verdad del culto." }, { title: "Entre Cenizas y Secretos", objective: "Recupera el fragmento que sobrevivió al incendio." }, { title: "La Aurora de las Sombras", objective: "Avanza antes de que la luz revele todos los rostros." }, { title: "Umbral a la Oscuridad", objective: "Abre el espejo maestro sin quedar dentro." }, { title: "Después de la Tempestad", objective: "Comprueba qué parte del pueblo sigue siendo real." }, { title: "La Luz que Regresa", objective: "Decide qué memoria puede regresar con el amanecer." }
      ],
      chapterScenes: [
        "Cristian encuentra la máscara de lágrimas negras bajo el barniz del óleo.", "Alba llega a Corró d’Avall mientras la niebla oculta una figura idéntica a Cristian.", "El hombre de la máscara aparece fuera del taller y desaparece cuando vuelve la luz.", "El espejo devuelve una versión de la escena que todavía no ha ocurrido.", "Un rostro atrapado detrás del cristal pide que retiren la última capa.", "La puerta del taller conduce a un pasillo que no existe en la casa.", "Huellas de pigmento siguen una ruta antigua hasta las ruinas.", "Las paredes conservan voces de restauradores muertos.", "Una gota de sangre altera el santo y dibuja un segundo rostro.", "Cristian prepara el fuego mientras Alba busca una forma de no quemar la memoria.", "La hermandad ofrece un pacto a cambio de completar la máscara.", "El espejo fabrica una falsa Alba para proteger su secreto.", "Una voz susurra el nombre de Cristian desde una sala vacía.", "Las campanas despiertan las figuras cubiertas de barniz.", "La tormenta aviva las llamas de la capilla y acerca el espejo maestro.", "Una llamada llega desde el número de alguien que murió durante el primer rito.", "La herejía se revela como una práctica de restauración y sacrificio.", "Entre cenizas aparece un fragmento intacto del marco original.", "El amanecer proyecta sombras que no corresponden a ningún cuerpo.", "El umbral se abre y muestra todas las versiones de la obra.", "Después de la tempestad, el pueblo parece vacío pero los cuadros siguen mirando.", "La luz regresa y solo una memoria puede cruzar con los supervivientes."
      ],
      banks: { sensory: ["Olor a barniz, lluvia y tela húmeda.", "El cristal se empaña desde el otro lado.", "La pintura cruje como piel seca.", "Una campana vibra dentro de los dientes.", "La sangre oscurece los colores antes de tocar el cuadro."], names: ["Cristian de la Torre", "Alba", "la Máscara", "la hermandad", "el hombre del traje", "el restaurador muerto"], places: ["Corró d’Avall", "el taller", "la capilla quemada", "el campanario", "las ruinas", "el espejo maestro"], threats: ["La Máscara de la Sangre", "La hermandad del barniz", "El reflejo falso", "El campanario", "La obra incompleta"] }
    },
    {
      id: "espectro-rojo",
      schemaVersion: 1,
      title: "Espectro Rojo",
      subtitle: "La ciudad no está abandonada. Está recordando tus muertes.",
      label: "EXPEDIENTE DEL NUEVO PARAÍSO",
      category: "contemporary",
      sigil: "◈",
      accent: "#d1584f",
      art: "assets/art-webp/vision-carmesi.webp",
      artGallery: [
        { src: "assets/art-webp/ventana-roja.webp", alt: "Ventana con figuras rojas" },
        { src: "assets/art-webp/planeta-negro.webp", alt: "Paisaje oscuro de otro mundo" },
        { src: "assets/art-webp/orbe-rojo.webp", alt: "Esfera roja sobre el mar" }
      ],
      setting: "Nuevo Paraíso · frontera México-Texas · 2147",
      difficulty: "Despiadado",
      duration: "120–210 min",
      tags: ["cyberpunk", "espectro", "espejo", "tiempo", "carretera"],
      summary: "Jack Mendoza atraviesa una ciudad que graba sus muertes mientras Mara, Santo y Vicente intentan descubrir quién es el Espectro Rojo.",
      premise: "Nuevo Paraíso parece una ciudad del futuro, pero sus distritos cambian de fecha y sus espejos muestran asesinatos que todavía no han ocurrido. Jack Mendoza recibe la visita de un espectro que conoce cada una de sus versiones. La Orden del Relojero, Mara, Santo y Vicente lo empujan hacia el origen de una ciudad que quizá nunca existió.",
      entity: "El Espectro Rojo",
      taboo: "No sigas una carretera que aparece dos veces en el mismo mapa. No mires tu reflejo después de oír tu propia muerte.",
      truth: "El Espectro Rojo es una memoria distribuida de Jack, Mara y la ciudad. Nuevo Paraíso es un escenario temporal construido para repetir una decisión: aceptar la vida o convertirse en el mecanismo que la reinicia.",
      authorNote: "Cyberpunk gótico, noir sobrenatural y horror temporal. Neón, lluvia, carreteras vacías, espejos y sangre. La acción debe conservar misterio y melancolía.",
      aiInstructions: "Narra como un thriller de horror futurista con atmósfera de pesadilla urbana. Alterna investigación, persecución y escenas metafísicas. Conserva las relaciones entre Jack, Mara, Santo, Vicente y el Espectro.",
      rules: ["Los distritos pueden pertenecer a años distintos.", "Los espejos registran muertes alternativas.", "El Espectro conoce las decisiones que Jack aún no ha tomado.", "La Orden del Relojero manipula la continuidad de Nuevo Paraíso.", "Mara no es una simple acompañante: conserva una memoria que el Espectro teme.", "La ciudad puede respirar, observar y cerrar sus salidas.", "Toda muerte deja una ruta de regreso, pero no devuelve a la misma persona.", "La libertad exige aceptar una vida que no puede repetirse."],
      opening: "Nuevo Paraíso — 10 de mayo de 2147. Jack Mendoza observa la ciudad desde un vehículo detenido bajo una lluvia roja. Los anuncios de neón parpadean con nombres de personas desaparecidas. En el espejo retrovisor aparece un hombre que tiene su cara, pero viste ropa de otra época. El reflejo levanta una mano y señala el asiento trasero. Allí no hay nadie. Entonces el teléfono de Jack reproduce una grabación de su propia voz: «No vuelvas a morir aquí». En la distancia, un reloj detenido marca las 06:06.",
      initialState: { location: "Nuevo Paraíso · Distrito Sombra", time: "10 de mayo de 2147 · 03:12", objective: "Descubre quién te está observando desde el espejo antes de que la ciudad cierre sus salidas.", inventory: [
        { id: "red-recorder", name: "Grabadora roja", description: "Contiene fragmentos de muertes que todavía no recuerdas." },
        { id: "mirror-chip", name: "Fragmento de espejo", description: "Muestra un segundo de más respecto al mundo real." },
        { id: "old-pistol", name: "Pistola de Jack", description: "Arma de un pasado que la ciudad intenta borrar." },
        { id: "route-map", name: "Mapa de Nuevo Paraíso", description: "Sus calles cambian de nombre cuando alguien muere." }
      ] },
      storyCards: [
        { id: "jack", title: "Jack Mendoza", type: "protagonista", keys: ["jack", "mendoza", "detective", "espectro"], content: "Hombre perseguido por versiones de sí mismo y por una ciudad que conoce sus muertes.", clue: "Cada recuerdo puede ser una pista o una trampa del Espectro." },
        { id: "mara", title: "Mara", type: "aliada", keys: ["mara", "aliada", "memoria", "reflejo"], content: "Mujer vinculada a Jack y a la memoria original de Nuevo Paraíso.", clue: "Su recuerdo es la única ruta que la ciudad no puede reescribir por completo." },
        { id: "santo", title: "Santo", type: "contacto", keys: ["santo", "informante", "barrio rojo"], content: "Contacto que conoce los distritos prohibidos y las rutas que desaparecen.", clue: "Siempre sabe una salida, pero nunca garantiza que lleve al mismo lugar." },
        { id: "vicente", title: "Vicente", type: "antagonista", keys: ["vicente", "orden", "traidor"], content: "Figura ligada a la Orden del Relojero y a la traición que fracturó la ciudad.", clue: "Puede estar protegiendo el ciclo o intentando heredarlo." },
        { id: "specter", title: "El Espectro Rojo", type: "entidad", keys: ["espectro", "rojo", "doble", "fantasma"], content: "Presencia que graba, repite y deforma las muertes de Jack.", clue: "No busca matar a Jack: busca demostrar que ninguna versión merece vivir." },
        { id: "new-paradise", title: "Nuevo Paraíso", type: "lugar-entidad", keys: ["nuevo paraíso", "ciudad", "distritos", "carretera"], content: "Ciudad futura construida con memoria, violencia y saltos temporales.", clue: "Cuando respira, una calle cambia de año." }
      ],
      progression: [
        { at: 16, location: "Distrito Espejismo · Torre Prisma", objective: "Encuentra la primera puerta del Espectro." },
        { at: 34, location: "Sector Zero · Orden del Relojero", objective: "Descifra el origen temporal de la ciudad." },
        { at: 52, location: "El Umbral Rojo", objective: "Cruza al otro lado del reflejo sin perder tu identidad." },
        { at: 70, location: "Ruta Norte · caminos malditos", objective: "Escapa de una carretera que repite tus decisiones." },
        { at: 88, location: "Ruinas del Reloj Maestro", objective: "Enfrenta la versión que quiere convertirse en ciudad." },
        { at: 97, location: "Playa del Silencio", objective: "Elige vivir sin garantías o volver al ciclo." }
      ],
      chapters: [
        { title: "La Ciudad de los Condenados", objective: "Sobrevive a la primera aparición del Espectro." }, { title: "Sombras en el espejo", objective: "Sigue el reflejo que llega tarde." }, { title: "Bailando con Demonios", objective: "Encuentra a Mara en el Club Babel." }, { title: "La memoria de los Peces Muertos", objective: "Recupera una memoria sumergida." }, { title: "Réquiem por un Traidor", objective: "Descubre quién vendió la ruta de salida." }, { title: "El Precio del Pasado", objective: "Paga por una verdad sobre Jack." }, { title: "La balada de los olvidados", objective: "Escucha a quienes la ciudad borró." }, { title: "La Orden del Relojero", objective: "Entra en la catedral y localiza el mecanismo." }, { title: "Sinfonía de pólvora y neón", objective: "Cruza el Barrio Rojo durante la cacería." }, { title: "El hombre que nunca existió", objective: "Identifica al doble que no figura en ningún registro." }, { title: "La Última Puerta", objective: "Abre el acceso al Sector Zero." }, { title: "Réquiem por Nuevo Paraíso", objective: "Impide que la ciudad sea reiniciada." }, { title: "Cuando el Tiempo Sangra", objective: "Conecta el reloj rojo con la herida temporal." }, { title: "Réquiem en tonos de sangre", objective: "Sobrevive al mercado convertido en cementerio." }, { title: "La Herida en el Tiempo", objective: "Encuentra el punto donde Jack fue dividido." }, { title: "Renacer entre Cenizas", objective: "Decide qué recuerdo merece continuar." }, { title: "La Ciudad que Nunca Existió", objective: "Comprueba si Nuevo Paraíso fue construido o recordado." }, { title: "La Ciudad que Respira", objective: "Entra en la biblioteca que observa a sus visitantes." }, { title: "El otro lado del reflejo", objective: "Cruza el Umbral Rojo." }, { title: "Cenizas de un Nuevo Amanecer", objective: "Regresa a la ciudad sin ser reconocido por ella." }, { title: "El Eco del Espectro", objective: "Escucha la grabación de tu última muerte." }, { title: "Caminos Malditos", objective: "Sigue la ruta norte que no termina." }, { title: "Entre la Sangre y el Tiempo", objective: "Une las dos heridas del mecanismo." }, { title: "La Eternidad en un Latido", objective: "Llega al corazón del Reloj Maestro." }, { title: "Latidos en la Oscuridad", objective: "Resiste la noche del motel abandonado." }, { title: "El Eco del Último Amanecer", objective: "Observa el límite del mundo conocido." }, { title: "Latidos en la Ceniza", objective: "Defiende el refugio olvidado." }, { title: "El reflejo final", objective: "Enfrenta a tu versión definitiva." }, { title: "Sin miedo a vivir", objective: "Rechaza la seguridad del ciclo." }, { title: "Caminos que Jamás Terminan", objective: "Decide qué significa encontrar el paraíso." }
      ],
      chapterScenes: [
        "Jack ve al Espectro en el espejo retrovisor de Nuevo Paraíso.", "Un reflejo llega tarde y pronuncia una fecha futura.", "Mara aparece en el Club Babel mientras los espejos bailan solos.", "Los peces muertos conservan grabaciones de otras versiones de la ciudad.", "Un traidor entrega una ruta al Espectro.", "Jack paga con un recuerdo para conocer su pasado.", "Los olvidados cantan desde un almacén sin ventanas.", "La Orden guarda el reloj bajo una catedral destruida.", "Pólvora y neón convierten el Barrio Rojo en una trampa.", "Un hombre idéntico a Jack no existe en ningún registro.", "La última puerta muestra una ciudad fuera del tiempo.", "Nuevo Paraíso empieza a borrarse desde sus edificios centrales.", "El reloj se detiene a las 06:06 y la sangre comienza a subir.", "El mercado devuelve rostros de quienes murieron en él.", "Jack descubre la herida que separó sus versiones.", "Un amanecer dorado ofrece una vida sin memoria.", "El mirador muestra una ciudad que nunca fue construida.", "La biblioteca respira y ordena sus libros con nombres humanos.", "El Umbral Rojo devuelve a Jack una versión más antigua.", "Las cenizas cubren una ciudad que intenta amanecer.", "El Espectro reproduce la última muerte de Jack.", "La carretera norte se repite hasta que alguien acepta desviarse.", "Sangre y tiempo se mezclan en un puente suspendido.", "El Reloj Maestro late bajo las ruinas.", "El motel conserva huéspedes que llevan décadas esperando.", "En la costa, el amanecer parece el borde de otro mundo.", "Mara defiende el refugio mientras las cenizas recuerdan sus nombres.", "El reflejo final no quiere matar: quiere ocupar el lugar de Jack.", "Jack rechaza la eternidad y acepta la incertidumbre.", "En la playa, los caminos siguen abiertos, pero ya no obedecen al Espectro."
      ],
      banks: { sensory: ["Neón rojo sobre lluvia aceitosa.", "El tic-tac llega desde una pared que no tiene reloj.", "La sangre refleja una ciudad distinta.", "El asfalto respira bajo las ruedas.", "Un espejo conserva el sonido de una muerte."], names: ["Jack Mendoza", "Mara", "Santo", "Vicente", "El Espectro Rojo", "Zero"], places: ["Nuevo Paraíso", "Distrito Sombra", "Distrito Espejismo", "Sector Zero", "El Umbral Rojo", "Playa del Silencio"], threats: ["El Espectro Rojo", "La Orden del Relojero", "La ciudad que respira", "La carretera infinita", "El reflejo final"] }
    },
    {
      id: "cuando-el-tiempo-sangra",
      schemaVersion: 1,
      title: "Cuando el Tiempo Sangra",
      subtitle: "Algunas horas no pasan: esperan ser heridas.",
      label: "EXPEDIENTE DEL RELOJERO",
      category: "historical",
      sigil: "◷",
      accent: "#b8735f",
      art: "assets/art-webp/espiral-del-umbral.webp",
      artGallery: [
        { src: "assets/art-webp/orbe-rojo.webp", alt: "Orbe rojo sobre el mar" },
        { src: "assets/art-webp/hoyo-blanco.webp", alt: "Figura dentro de un agujero" },
        { src: "assets/art-webp/puerta-luz.webp", alt: "Puerta entre dos tiempos" }
      ],
      setting: "Montrevault, Francia · 1274 / Terrassa · 2025",
      difficulty: "Intermedio",
      duration: "120–180 min",
      tags: ["tiempo", "reloj", "orden", "duelo", "Terrassa"],
      summary: "Jean de Villeroy regresa de la muerte mientras una orden medieval y una hacker de Terrassa intentan impedir que el tiempo se desangre.",
      premise: "En Montrevault, Jean de Villeroy irrumpe en un compromiso pactado y desafía a un destino que ya lo mató. Siglos después, Lila Roarke y Zero descubren que la Orden del Relojero sigue operando desde Terrassa. Un reloj imposible conecta ambas épocas y convierte cada recuerdo en una herida temporal.",
      entity: "El Tribunal del Tiempo",
      taboo: "No detengas un reloj que marca una hora que todavía no existe. No permitas que la Orden convierta una vida en una pieza de mecanismo.",
      truth: "La Orden del Relojero no protege el tiempo: lo administra como una prisión. Jean, Isabeau y Lila son variaciones de una misma resistencia, y el reloj exige que alguien sangre para abrir el último segundo.",
      authorNote: "Horror histórico y metaficcional. Alterna castillo, monasterio, carretera industrial y tecnología clandestina. El tiempo debe sentirse físico, cruel y emocional.",
      aiInstructions: "Narra con suspense temporal, atmósfera gótica y tensión de persecución. Alterna Montrevault y Terrassa sin perder continuidad. Cada salto temporal debe revelar una conexión y cobrar un precio.",
      rules: ["El reloj puede mover personas, no borrar consecuencias.", "La Orden del Relojero existe en ambas épocas.", "Los reflejos temporales muestran decisiones no tomadas.", "Jean no recuerda todas sus muertes.", "Lila es la única que puede leer el código del mecanismo sin quedar atrapada.", "El Tribunal del Tiempo castiga los intentos de escapar del destino.", "La sangre derramada cerca del reloj abre segundos ajenos.", "El final debe decidir si el tiempo se libera o solo cambia de carcelero."],
      opening: "Montrevault, Francia — Año 1274. La tormenta golpea el castillo durante el compromiso de Isabeau de Montrevault con Guillaume de Saint-Denis. Las puertas se abren y Jean de Villeroy entra empapado, desterrado y vivo después de haber sido dado por muerto. Habla de un pacto antiguo y desafía a Guillaume a un duelo al amanecer. Muy lejos y muchos siglos después, en Terrassa, Lila Roarke recibe un reloj sin remitente. Cuando lo abre, escucha una voz que pronuncia el nombre de Jean. El mecanismo no marca la hora: marca una herida.",
      initialState: { location: "Montrevault · gran salón del castillo", time: "1274 · noche de tormenta", objective: "Descubre quién controla el reloj antes de que el último segundo se rompa.", inventory: [
        { id: "blood-clock", name: "Reloj de sangre", description: "Mecanismo que conecta Montrevault con Terrassa." },
        { id: "villeroy-seal", name: "Sello de Villeroy", description: "Marca familiar vinculada a la Orden del Relojero." },
        { id: "encrypted-drive", name: "Unidad cifrada", description: "Archivo de Zero con registros de desapariciones temporales." },
        { id: "broken-hour-hand", name: "Aguja rota", description: "Solo señala horas que todavía no han sucedido." }
      ] },
      storyCards: [
        { id: "jean", title: "Jean de Villeroy", type: "protagonista", keys: ["jean", "villeroy", "caballero", "espada"], content: "Caballero desterrado que vuelve de la muerte para impedir un pacto de sangre.", clue: "Cada regreso le devuelve una memoria y le roba otra." },
        { id: "isabeau", title: "Isabeau de Montrevault", type: "heredera", keys: ["isabeau", "montrevault", "prometida", "castillo"], content: "Noble atrapada entre un matrimonio político y un pacto temporal mucho más antiguo.", clue: "Su sangre es la llave que la Orden lleva siglos buscando." },
        { id: "lila", title: "Lila Roarke", type: "investigadora", keys: ["lila", "roarke", "terrassa", "reloj"], content: "Mujer de 2025 que recibe el reloj y empieza a ver escenas de 1274.", clue: "No viaja al pasado: el pasado la está alcanzando." },
        { id: "zero", title: "Zero", type: "hacker", keys: ["zero", "código", "deep web", "orden"], content: "Analista de Terrassa que encuentra los archivos cifrados de la Orden del Relojero.", clue: "Su código no abre una puerta: abre una fecha." },
        { id: "watchmaker", title: "La Orden del Relojero", type: "culto", keys: ["orden", "relojero", "tribunal", "tiempo"], content: "Organización que administra el tiempo como una maquinaria judicial.", clue: "Sus miembros aparecen en épocas que no deberían compartir." },
        { id: "time-court", title: "El Tribunal del Tiempo", type: "entidad", keys: ["tribunal", "tiempo", "juicio", "sangre"], content: "Presencia que sanciona a quienes intentan abandonar su destino.", clue: "No castiga el crimen: castiga la posibilidad." }
      ],
      progression: [
        { at: 16, location: "Montrevault · monasterio abandonado", objective: "Encuentra el primer mecanismo de la Orden." },
        { at: 34, location: "Terrassa · archivos cifrados", objective: "Conecta a Lila con la historia de Jean." },
        { at: 52, location: "Montrevault · cueva del reloj", objective: "Descubre qué precio exige cruzar el umbral." },
        { at: 70, location: "Terrassa · carretera industrial", objective: "Escapa de quienes cazan las anomalías temporales." },
        { at: 88, location: "Montrevault · último segundo", objective: "Decide quién debe sangrar para cerrar el mecanismo." },
        { at: 97, location: "París · epílogo", objective: "Comprueba si el tiempo ha quedado libre o solo dormido." }
      ],
      chapters: [
        { title: "La Prometida del Diablo", objective: "Interrumpe el compromiso y desafía al destino." }, { title: "El Eco del Tiempo", objective: "Descubre el reloj en Terrassa." }, { title: "La Sombra de la Orden", objective: "Sigue la primera señal del Relojero." }, { title: "Sombras del Pasado", objective: "Reconoce una figura de 1274 en el presente." }, { title: "La Marca de la Orden", objective: "Lee la marca que une las dos épocas." }, { title: "Huida en la Noche", objective: "Escapa del castillo con Isabeau." }, { title: "El Legado Maldito", objective: "Comprende por qué el reloj ha elegido a Lila." }, { title: "Ecos de un Pasado Olvidado", objective: "Cruza el bosque y recupera el registro perdido." }, { title: "El Guardián del Tiempo", objective: "Enfrenta al guardián del monasterio." }, { title: "El Código del Tiempo", objective: "Descifra los archivos de Zero." }, { title: "La Herida del Tiempo", objective: "Sobrevive a un cuerpo fuera de fase." }, { title: "Cruzando el Umbral", objective: "Abre el mecanismo sin perder una vida." }, { title: "La Mujer que No Debería Estar Aquí", objective: "Conoce la conexión imposible entre Lila e Isabeau." }, { title: "El Juicio del Tiempo", objective: "Defiende tu derecho a cambiar una decisión." }, { title: "La Última Oportunidad", objective: "Usa el reloj antes de que cierre el ciclo." }, { title: "El Futuro Llega con Balas", objective: "Sobrevive a la persecución que atraviesa los siglos." }, { title: "El Precio de la Sangre", objective: "Descubre qué vida exige el mecanismo." }, { title: "La Caza Ha Comenzado", objective: "Evita a los agentes de la Orden." }, { title: "Sin Escape del Destino", objective: "Llega a la cueva antes que el Tribunal." }, { title: "El Pasado Es un Círculo", objective: "Comprende quién inició el bucle." }, { title: "La Traición de la Sangre", objective: "Enfrenta la traición de Guillaume." }, { title: "La Historia Es un Polvorín", objective: "Impide que una muerte se repita." }, { title: "Robándole el Tiempo al Destino", objective: "Arranca al reloj un segundo imposible." }, { title: "El Último Giro del Reloj", objective: "Gira la aguja rota y acepta su precio." }, { title: "El Último Segundo Antes del Caos", objective: "Protege a Lila durante el colapso." }, { title: "El Tiempo Se Rompe en Mil Pedazos", objective: "Sobrevive a la fractura de las épocas." }, { title: "La Última Jugada del Destino", objective: "Elige quién conservará el recuerdo." }, { title: "Un Último Asalto Contra el Tiempo", objective: "Asalta el mecanismo central." }, { title: "El Asalto al Tiempo", objective: "Rompe el control de la Orden." }, { title: "El Último Segundo del Tiempo", objective: "Cierra la herida sin borrar a quienes la vivieron." }
      ],
      chapterScenes: [
        "Jean irrumpe en el compromiso de Isabeau bajo una tormenta que parece detener las velas.", "Lila abre el reloj en Terrassa y oye una voz del siglo XIII.", "Una sombra de la Orden aparece en un reflejo moderno.", "La carretera devuelve a Lila una escena que todavía no ha ocurrido.", "La marca del Relojero aparece en la piel y en los archivos.", "Jean huye del castillo mientras Isabeau descubre que el pacto la reclama.", "Lila recibe un mensaje fechado en 1274.", "El bosque esconde un camino que termina en otra estación del tiempo.", "El monasterio guarda un hombre que no envejece.", "Zero encuentra el código que convierte una fecha en una puerta.", "Jean sangra y durante un instante ocupa dos años a la vez.", "El umbral se abre con el sonido de un reloj que late.", "Una mujer aparece en Montrevault con recuerdos de Terrassa.", "El Tribunal juzga a Jean por haber sobrevivido.", "El reloj ofrece una última oportunidad a cambio de una vida.", "Las balas cruzan una grieta temporal y persiguen a Lila.", "La sangre de Jean activa el mecanismo principal.", "La Orden inicia una caza que atraviesa castillos y polígonos industriales.", "La cueva no tiene fondo: contiene el círculo completo.", "El pasado revela que el primer bucle fue una decisión desesperada.", "Guillaume traiciona el pacto y abre la herida.", "Una historia escrita en piedra comienza a arder.", "Lila roba un segundo al destino.", "La aguja rota señala una hora que nadie ha vivido.", "El último segundo antes del caos contiene todos los rostros del grupo.", "Las épocas se rompen y se mezclan bajo la tormenta.", "Lila debe decidir qué recuerdo salvar.", "El asalto final llega entre 1274 y 2025.", "La Orden pierde su centro, pero no todas sus manos.", "El tiempo se cierra con una cicatriz que todavía sangra."
      ],
      banks: { sensory: ["El tic-tac suena dentro de una herida.", "La lluvia cae hacia arriba durante un segundo.", "El metal de un reloj conserva calor humano.", "Una campana marca una hora que no existe.", "La sangre deja sombras con retraso."], names: ["Jean de Villeroy", "Isabeau de Montrevault", "Lila Roarke", "Zero", "Guillaume de Saint-Denis", "el Relojero"], places: ["Montrevault", "Terrassa", "el monasterio", "la cueva del reloj", "la carretera industrial", "París"], threats: ["El Tribunal del Tiempo", "La Orden del Relojero", "El bucle", "La hora imposible", "El futuro con balas"] }
    },
    {
      id: "el-nombre-que-devora-la-sangre",
      schemaVersion: 1,
      title: "El Nombre Que Devora la Sangre",
      subtitle: "Ser recordado puede ser la forma más cruel de volver.",
      label: "EXPEDIENTE DEL CICLO ROTO",
      category: "fantasy",
      sigil: "†",
      accent: "#b75d62",
      art: "assets/art-webp/planeta-negro.webp",
      artGallery: [
        { src: "assets/art-webp/mensajero-oscuro.webp", alt: "El mensajero oscuro" },
        { src: "assets/art-webp/pozo-rojo.webp", alt: "El pozo de sangre" },
        { src: "assets/art-webp/orbe-rojo.webp", alt: "El ojo del último dios" }
      ],
      setting: "Valdareth · ruinas de un reino olvidado",
      difficulty: "Despiadado",
      duration: "120–210 min",
      tags: ["ciclo", "dioses", "sangre", "memoria", "fantasía oscura"],
      summary: "Un guerrero despierta entre cadáveres sin recordar su nombre. Cada vez que recuerda, un dios abre otro ojo.",
      premise: "En los campos rotos de Valdareth, un guerrero renace sin nombre mientras una figura encapuchada le anuncia que el ciclo ha comenzado de nuevo. El Primer Eco, Lysandra, Kassad, Eira y los Hijos del Retorno lo empujan hacia una verdad insoportable: Alzreth no es solo su nombre, sino la herida que mantiene vivo al Último Dios.",
      entity: "El Último Dios",
      taboo: "No pronuncies Alzreth para demostrar quién eres. No confundas recuperar la memoria con recuperar la libertad.",
      truth: "El guerrero es Alzreth, antiguo huésped y prisionero de un ciclo diseñado para alimentar al Último Dios. Cada renacimiento devuelve poder al dios, pero también conserva una posibilidad de romperlo: recordar sin aceptar la divinidad.",
      authorNote: "Fantasía oscura con horror cósmico, épica trágica y filosofía de la memoria. La violencia debe tener peso ritual y emocional; evita convertirlo en un combate arcade.",
      aiInstructions: "Narra como una epopeya oscura y opresiva. Combina ruinas, sangre, identidad, juramentos y horror metafísico. Mantén la agencia del jugador, pero haz que cada recuerdo cambie el significado de una escena anterior.",
      rules: [
        "El mundo renace parcialmente cada vez que el guerrero muere.",
        "El Primer Eco conoce movimientos que pertenecen al protagonista.",
        "Cada recuerdo abre un ojo del Último Dios.",
        "Alzreth es un nombre, una identidad y una condena; nunca es una simple contraseña.",
        "Lysandra quiere saber si el protagonista aún puede morir.",
        "Kassad representa la duda que nació cuando Alzreth intentó romper el ciclo.",
        "La lanza del Quinto Juramento puede sellar al dios, pero exige una renuncia.",
        "El final debe tratar el sacrificio como una elección, no como una recompensa."
      ],
      opening: "Prólogo — Sangre sobre las ruinas. La tormenta cae sobre los campos rotos de Valdareth. Un hombre se levanta entre armaduras corroídas y cadáveres que desaparecen cuando una sombra pronuncia: «Te alzarás otra vez». No recuerda su nombre. No recuerda quién era. Solo sabe que algo dentro de su pecho responde al trueno. Cuando despierta de nuevo, un caballero sin rostro emerge de la niebla. El encapuchado lo llama su primer enemigo. El guerrero aprieta una espada que parece haber sostenido antes de nacer. En la distancia, siete ojos cerrados esperan que alguien recuerde cómo abrirlos.",
      initialState: {
        location: "Valdareth · campo de batalla en ruinas",
        time: "Después de la tormenta · ciclo desconocido",
        objective: "Descubre tu nombre sin alimentar al dios que lo reclama.",
        inventory: [
          { id: "broken-sword", name: "Espada mellada", description: "Hoja sin nombre que reconoce la mano del guerrero." },
          { id: "scarred-lance", name: "Fragmento de lanza", description: "Resto de un juramento que todavía no ha sido pronunciado." },
          { id: "ash-token", name: "Moneda de ceniza", description: "Marca de un ciclo anterior que nadie recuerda." },
          { id: "black-feather", name: "Pluma negra", description: "La dejó una figura que conoce el comienzo y el final." }
        ]
      },
      storyCards: [
        { id: "alzreth", title: "Alzreth / el guerrero", type: "protagonista", keys: ["alzreth", "guerrero", "nombre", "renacer", "cicatrices"], content: "Guerrero sin memoria que renace en cada ciclo. Su identidad fue convertida en prisión y alimento para el Último Dios.", clue: "Recordar no basta: debe decidir qué hacer con lo recordado." },
        { id: "lysandra", title: "Lysandra", type: "aliada", keys: ["lysandra", "cazadora", "lanza", "cicatrices"], content: "Cazadora de dioses y asesina de profetas. Ha visto demasiados ciclos para creer en una salvación limpia.", clue: "Quiere comprobar si Alzreth aún puede morir antes de que el dios lo devore." },
        { id: "kassad", title: "Kassad", type: "ambiguo", keys: ["kassad", "bufón", "profeta", "duda"], content: "Bufón profeta nacido de la duda de Alzreth. Ayuda al grupo y lo traiciona porque ambas cosas forman parte de su naturaleza.", clue: "Su risa aparece cuando una verdad está a punto de convertirse en dogma." },
        { id: "eira", title: "Eira", type: "heredera", keys: ["eira", "niña", "eco", "esperanza"], content: "Niña marcada por el eco de Alzreth en un mundo que empieza a recordar lo que quiso olvidar.", clue: "Su vínculo no se basa en la fe, sino en sostener a alguien cuando deja de reconocerse." },
        { id: "first-echo", title: "El Primer Eco", type: "enemigo", keys: ["primer eco", "caballero", "espada", "reflejo"], content: "Cicatriz armada del primer renacimiento. Combate con la técnica del protagonista y habla con su voz.", clue: "No es un enemigo externo: es un recuerdo que aprendió a matar." },
        { id: "last-god", title: "El Último Dios", type: "entidad", keys: ["último dios", "dios", "ojos", "ciclo", "sello"], content: "Entidad que abre sus ojos a través de la memoria y usa los renacimientos como alimento.", clue: "No quiere conquistar el mundo: quiere que el mundo recuerde quién lo soñó." },
        { id: "children-return", title: "Los Hijos del Retorno", type: "culto", keys: ["hijos", "retorno", "culto", "devotos"], content: "Culto dividido entre adorar, controlar o destruir al Portador antes de que recupere su nombre.", clue: "Cada facción cree estar evitando el fin y lo acerca un poco más." },
        { id: "fifth-oath", title: "El Quinto Juramento", type: "relicario", keys: ["quinto juramento", "lanza", "altar", "silencio"], content: "Juramento convertido en arma de sellado. Solo funciona cuando quien la empuña renuncia a ser dios.", clue: "El sacrificio no borra la historia; decide quién puede contarla." }
      ],
      progression: [
        { at: 16, location: "Valdareth · ruinas de los reyes", objective: "Derrota al Primer Eco y escucha el nombre que no recuerdas." },
        { at: 34, location: "Fortaleza de los Recordantes", objective: "Descubre qué eras antes de que el ciclo te borrara." },
        { at: 52, location: "Biblioteca de los Ciclos", objective: "Enfrenta las versiones posibles de tu final." },
        { at: 70, location: "Refugio de los últimos creyentes", objective: "Protege la esperanza mientras el mundo empieza a desmoronarse." },
        { at: 88, location: "Altar del Primer Silencio", objective: "Decide si te coronas, desapareces o rompes el ciclo." },
        { at: 97, location: "El mundo que recuerda", objective: "Entrega tu nombre al último juramento." }
      ],
      chapters: [
        { title: "El primer paso en la oscuridad", objective: "Despierta en las ruinas y encuentra al encapuchado." },
        { title: "El Primer Eco", objective: "Enfrenta a la criatura que combate con tu propia técnica." },
        { title: "Los nombres que susurran", objective: "Conoce a Lysandra y descubre que llevas algo dentro." },
        { title: "La ciudad de las estatuas rotas", objective: "Cruza la ciudad donde los muertos conservan tu rostro." },
        { title: "Los Piedraalma", objective: "Escucha los cantos que recuerdan ciclos anteriores." },
        { title: "La traición que sangra", objective: "Decide qué juramento puede sobrevivir a una traición." },
        { title: "La fortaleza de los Recordantes", objective: "Mira tu pasado como un dios de sangre." },
        { title: "El Quinto Juramento", objective: "Enfrenta a Thareon y recupera la lanza maldita." },
        { title: "Los devotos del dios que sangra", objective: "Entra en el culto que adora el nombre que intentas olvidar." },
        { title: "La tumba de los sueños rotos", objective: "Rompe el futuro imposible que Mímesis te ofrece." },
        { title: "El cadáver del Primer Dios", objective: "Descubre el origen material del ciclo." },
        { title: "La Biblioteca de los Ciclos", objective: "Encuentra el final que todavía no ha sido escrito." },
        { title: "Cuando la esperanza sangra", objective: "Atraviesa el colapso y alcanza el refugio." },
        { title: "La prisión de los otros yo", objective: "Enfrenta al Alzreth que conserva una parte humana." },
        { title: "Cuando el dios te mira", objective: "Resiste el primer choque con el Último Dios." },
        { title: "La traición final", objective: "Sobrevive a la muerte de Lysandra y descubre qué es Kassad." },
        { title: "El Altar del Primer Silencio", objective: "Llega al punto donde toda historia puede romperse." },
        { title: "El mundo que no sabe que fue salvado", objective: "Acepta desaparecer de la memoria del mundo." },
        { title: "La primera grieta en el silencio", objective: "Protege a Eira cuando el eco empieza a sangrar de nuevo." },
        { title: "El Portador de Cicatrices", objective: "Recupera una parte de Alzreth sin despertar al dios." },
        { title: "Los Hijos del Retorno", objective: "Divide el culto antes de que convierta tu regreso en sacrificio." },
        { title: "El que susurró demasiado", objective: "Impide que Melek abra por completo el séptimo ojo." },
        { title: "El mundo que se recuerda a sí mismo", objective: "Sostén tu humanidad mientras regresan todas las vidas." },
        { title: "Donde mueren los dioses", objective: "Usa el Quinto Juramento y decide qué precio tendrá la libertad." }
      ],
      chapterScenes: [
        "La tormenta se retira y un guerrero sin nombre se levanta entre cadáveres que desaparecen.",
        "El Primer Eco ataca con su misma técnica y pronuncia: Siempre olvidas.",
        "Lysandra revela que cada herida abre un ojo del Último Dios.",
        "La ciudad de estatuas rotas contiene rostros de vidas que el guerrero todavía no recuerda.",
        "Los Piedraalma cantan bajo tierra y sus voces enumeran muertes anteriores.",
        "Una alianza se rompe cuando alguien ofrece sangre para comprar un recuerdo.",
        "En la fortaleza, Alzreth ve su pasado coronado y comprende por qué fue condenado.",
        "Thareon, el Juramento Roto, guarda la lanza que puede herir al dios.",
        "El culto recibe al guerrero como una divinidad que ha olvidado su altar.",
        "Mímesis ofrece una vida sin ciclos, construida con sueños robados.",
        "El cadáver del Primer Dios conserva la maquinaria orgánica que alimenta los renacimientos.",
        "La Biblioteca muestra finales donde Alzreth vence, reina, muere o se convierte en el dios.",
        "El refugio de los últimos creyentes resiste mientras el cielo pierde sus nombres.",
        "La prisión contiene otros Alzreth: versiones violentas, piadosas y completamente humanas.",
        "El Último Dios mira a través del pecho del guerrero y reescribe una batalla ya ocurrida.",
        "Kassad mata a Lysandra para impedir que el dios regrese por completo.",
        "En el Altar del Primer Silencio, una sola palabra puede romper todas las historias.",
        "El mundo despierta salvado, pero nadie recuerda quién pagó el precio.",
        "Eira encuentra una grieta que pronuncia el nombre de Alzreth bajo la lluvia.",
        "El Portador de Cicatrices aparece sin rostro y reconoce a Eira antes de conocerla.",
        "Los Hijos del Retorno se dividen entre la corona, el cuchillo y el incendio.",
        "Melek pronuncia Alzreth y el séptimo ojo se abre parcialmente sobre las ruinas.",
        "La memoria vuelve al mundo y cada persona recuerda una versión distinta de la guerra.",
        "El Portador se entrega al sello; el Último Dios queda encerrado dentro de un nombre que ya no puede devorar."
      ],
      banks: {
        sensory: ["Lluvia ácida sobre armaduras corroídas.", "La sangre se mueve en dirección contraria a la herida.", "Las ruinas huelen a piedra mojada y recuerdos quemados.", "Un ojo se abre bajo la piel cuando alguien pronuncia tu nombre.", "El silencio después de una muerte pesa como una corona."],
        names: ["Alzreth", "Lysandra", "Kassad", "Eira", "Melek", "Thareon", "el encapuchado", "el Último Dios"],
        places: ["Valdareth", "la ciudad de las estatuas rotas", "la fortaleza de los Recordantes", "la Biblioteca de los Ciclos", "el Altar del Primer Silencio", "el refugio"],
        threats: ["El Primer Eco", "El Último Dios", "Los Hijos del Retorno", "Mímesis", "La memoria que regresa", "El ciclo"]
      }
    },
    {
      id: "donde-se-entierran-los-espejos",
      schemaVersion: 1,
      title: "Donde se Entierran los Espejos",
      subtitle: "Algunas casas no guardan recuerdos: los cultivan.",
      label: "EXPEDIENTE DE LA CASA HEREDADA",
      category: "contemporary",
      sigil: "◌",
      accent: "#9b8a72",
      art: "assets/art-webp/hoyo-blanco.webp",
      artGallery: [
        { src: "assets/art-webp/puerta-luz.webp", alt: "Puerta iluminada en una habitación oscura" },
        { src: "assets/art-webp/ventana-roja.webp", alt: "Figuras reflejadas tras una ventana" },
        { src: "assets/art-webp/mensajero-oscuro.webp", alt: "Mensajero oscuro ante la luna" }
      ],
      setting: "Santa Medea · Galicia interior",
      difficulty: "Intermedio",
      duration: "90–150 min",
      tags: ["espejos", "casa", "herencia", "manuscrito", "dobles"],
      summary: "Alba hereda una mansión, un cuaderno imposible y un espejo que parece recordar una vida que todavía no ha ocurrido.",
      premise: "Tras el entierro de su madre, Alba Miralles llega a Santa Medea para cerrar la casa familiar. En el desván encuentra el Cuaderno II, una habitación sellada y un espejo que no refleja el presente. Cada reflejo parece pertenecer a una versión distinta de la familia, y alguien ha escrito el siguiente capítulo antes de que Alba lo viva.",
      entity: "La Otra Alba",
      taboo: "No tapes un espejo con tu propio reflejo. No leas en voz alta una página que todavía no has vivido.",
      truth: "La casa no está encantada por un muerto: funciona como un archivo de posibilidades. Los espejos enterrados conservan versiones de quienes vivieron allí y La Otra Alba intenta completar el manuscrito para sustituir a la heredera original.",
      authorNote: "Horror gótico rural, íntimo y progresivo. Galicia húmeda, piedra, madera, familia, duelo y dobles. La amenaza debe crecer desde lo doméstico hacia lo metafísico.",
      aiInstructions: "Narra con tensión gótica y precisión sensorial. Mantén la ambigüedad entre duelo, memoria y realidad duplicada hasta que las pruebas obliguen a elegir. Respeta la continuidad de Alba, Gabriel, Daniel, Teresa, Santa Medea, los espejos enterrados y el manuscrito.",
      rules: [
        "Los espejos no reflejan siempre el mismo momento.",
        "La casa responde a los nombres familiares y a las páginas leídas.",
        "Cada reflejo ajeno muestra una posibilidad, no una mentira simple.",
        "El manuscrito puede anticipar una escena, pero también provocarla.",
        "Enterrar un espejo conserva una vida; romperlo libera sus restos.",
        "La Otra Alba necesita que la protagonista termine la historia.",
        "Gabriel conoce parte del secreto, pero teme convertirse en testigo de su propia copia.",
        "El final debe decidir qué versión de Alba hereda la casa."
      ],
      opening: "La lluvia acompañó a Alba Miralles desde Santiago hasta Santa Medea, como si el cielo siguiera tocando a difuntos después del entierro de su madre. La mansión apareció al final del valle, detrás de una verja torcida y un tilo sin hojas. En el despacho encontró una llave que no recordaba haber visto nunca y un cuaderno marcado como Cuaderno II. La primera página decía: «Para Alba, cuando el espejo haya aprendido a mentir». En el desván, detrás de una puerta sellada, había un espejo desnudo con una grieta vertical. Alba se acercó. Su reflejo tardó un segundo en levantar la mirada.",
      initialState: {
        location: "Santa Medea · mansión heredada",
        time: "Finales de abril · primera noche",
        objective: "Descubre qué guarda la casa antes de que el espejo escriba tu siguiente decisión.",
        inventory: [
          { id: "cuaderno-ii", name: "Cuaderno II", description: "Manuscrito de la madre con páginas que parecen anticipar escenas reales." },
          { id: "attic-key", name: "Llave del cuarto norte", description: "Abre una puerta que la familia mantuvo sellada durante décadas." },
          { id: "old-camera", name: "Cámara familiar", description: "Las fotografías muestran reflejos que no estaban presentes al tomarlas." },
          { id: "silver-frame", name: "Marco ovalado", description: "Fragmento de espejo recuperado de una tumba sin nombre." }
        ]
      },
      storyCards: [
        { id: "alba", title: "Alba Miralles", type: "protagonista", keys: ["alba", "miralles", "heredera", "escritora"], content: "Arquitecta y escritora que vuelve a Santa Medea después de la muerte de su madre. La casa conoce sus gestos antes de que los haga.", clue: "No todo recuerdo de Alba pertenece a la Alba que está jugando." },
        { id: "gabriel", title: "Gabriel", type: "aliado", keys: ["gabriel", "aserradero", "río", "amigo"], content: "Hombre del valle que ayuda a Alba a reparar marcos y acceder a lugares cerrados. Ha visto un reflejo que llevaba su cara.", clue: "Su miedo no es a morir, sino a dejar una copia trabajando en su lugar." },
        { id: "daniel", title: "Daniel", type: "testigo", keys: ["daniel", "archivo", "registro", "familia"], content: "Conoce los documentos civiles de Santa Medea y descubre que la genealogía de Alba contiene una segunda línea de nombres.", clue: "Los registros familiares fueron corregidos después de cada entierro." },
        { id: "teresa", title: "Teresa Bieito", type: "investigadora", keys: ["teresa", "bieito", "cementerio", "historiadora"], content: "Historiadora local que relaciona los espejos enterrados con una tradición de protección y sustitución.", clue: "La tradición empezó antes de que existiera la mansión." },
        { id: "otra-alba", title: "La Otra Alba", type: "entidad", keys: ["otra alba", "reflejo", "doble", "copia"], content: "Versión de Alba que vive en las superficies reflectantes y quiere completar el manuscrito para cruzar.", clue: "No desea matar a Alba: desea que una de las dos deje de ser la original." },
        { id: "casa", title: "La mansión Miralles", type: "lugar", keys: ["casa", "mansión", "desván", "cuarto norte"], content: "Casa familiar construida alrededor de habitaciones que fueron añadidas para contener espejos y voces.", clue: "Cada ampliación oculta una decisión que alguien quiso enterrar." },
        { id: "manuscrito", title: "El manuscrito incompleto", type: "objeto", keys: ["manuscrito", "cuaderno", "libro", "páginas"], content: "Texto fragmentario que describe escenas antes de que ocurran y cambia al ser leído.", clue: "La última página no tiene final porque espera una heredera." },
        { id: "espejos", title: "Los espejos enterrados", type: "fenómeno", keys: ["espejo", "enterrado", "cementerio", "marco"], content: "Superficies sepultadas bajo casas, tumbas y jardines para conservar reflejos que no debían seguir circulando.", clue: "Desenterrar uno devuelve una posibilidad, no necesariamente una persona." }
      ],
      progression: [
        { at: 16, location: "Mansión · desván sellado", objective: "Comprende por qué el espejo de la casa está agrietado desde dentro." },
        { at: 34, location: "Santa Medea · cementerio viejo", objective: "Encuentra el primer espejo enterrado y la línea familiar que fue borrada." },
        { at: 52, location: "Aserradero junto al río", objective: "Descubre qué versión de Gabriel ha estado ayudando a la casa." },
        { at: 70, location: "Lisboa · archivo de la Doble Alba", objective: "Sigue la puerta entre dos vidrios hasta el origen del manuscrito." },
        { at: 88, location: "Mansión · habitación heredera", objective: "Elige qué reflejo merece continuar la historia." },
        { at: 97, location: "Jardín · entierro final", objective: "Decide qué espejo se entierra y qué memoria queda abierta." }
      ],
      chapters: [
        { title: "El testamento de la casa", objective: "Llega a Santa Medea y abre el legado que tu madre escondió." },
        { title: "Una habitación cerrada", objective: "Encuentra la llave del desván y comprueba quién la ha usado." },
        { title: "El primer reflejo", objective: "Lee el Cuaderno II sin permitir que la página te describa por completo." },
        { title: "El bibliotecario", objective: "Consulta el archivo local y descubre el primer nombre duplicado." },
        { title: "Las voces en los muros", objective: "Sigue la grieta del espejo hasta la habitación que no figura en los planos." },
        { title: "El desván sellado", objective: "Abre el cuarto norte y enfrenta la primera versión de la casa." },
        { title: "La otra hija", objective: "Comprueba si la familia enterró un secreto o a una persona." },
        { title: "El espejo de la infancia", objective: "Distingue tus recuerdos de los recuerdos que la casa te presta." },
        { title: "El reflejo ajeno", objective: "Investiga el cementerio viejo y la figura que aparece detrás de ti." },
        { title: "El espejo enterrado", objective: "Desentierra el marco y decide si quieres mirar su interior." },
        { title: "Diario de una sombra", objective: "Reconstruye el diario de tu madre antes de que se escriba solo." },
        { title: "El reflejo inverso", objective: "Descubre qué hace tu doble cuando tú abandonas la habitación." },
        { title: "El visitante", objective: "Recibe a alguien que tiene tu voz y conoce tu infancia." },
        { title: "El pueblo murmura", objective: "Protege la casa de quienes quieren destruir todos sus espejos." },
        { title: "El espejo negro", objective: "Reúne a Alba, Gabriel, Daniel y Teresa para el primer entierro." },
        { title: "Manuscrito incompleto", objective: "Acepta que el texto que lees también te está leyendo." },
        { title: "La voz de la otra", objective: "Habla con La Otra Alba y descubre qué quiere heredar." },
        { title: "Una puerta entre dos vidrios", objective: "Viaja hasta Lisboa siguiendo la arquitectura imposible del reflejo." },
        { title: "El origen", objective: "Encuentra quién inició la tradición de enterrar espejos." },
        { title: "La heredera", objective: "Vuelve a Santa Medea con una verdad que puede destruir la casa." },
        { title: "Fragmentación", objective: "Repara los marcos sin unir las vidas que contienen." },
        { title: "El espejo abierto", objective: "Abre la superficie central y decide quién puede cruzarla." },
        { title: "La elección", objective: "Elige entre conservar la casa, destruirla o convertirla en archivo." },
        { title: "El entierro", objective: "Completa el rito y entierra el espejo que todavía te reconoce." },
        { title: "El manuscrito completo", objective: "Escribe el final sin copiar la voz de tu doble." },
        { title: "El último espejo", objective: "Cierra la puerta y decide qué versión de Alba sale al amanecer." }
      ],
      chapterScenes: [
        "Alba llega a Santa Medea bajo la lluvia y encuentra la llave del desván entre las cosas de su madre.",
        "La habitación cerrada conserva polvo reciente y un espejo cubierto que respira detrás de la tela.",
        "El Cuaderno II describe la llegada de Alba con una precisión que incluye detalles aún no ocurridos.",
        "El bibliotecario revela que la familia Miralles aparece dos veces en los registros de la casa.",
        "Las paredes susurran nombres cuando Alba toca la grieta del espejo desnudo.",
        "El desván sellado contiene marcos vacíos y una puerta más pequeña que no lleva a ninguna estancia.",
        "En Vilar de Barán, un documento prueba que hubo otra hija que nunca fue inscrita.",
        "El espejo de la infancia muestra a Alba jugando con una niña que nadie recuerda.",
        "En el cementerio, una figura con la silueta de Alba permanece detrás de la verja.",
        "El marco enterrado devuelve una habitación idéntica, pero con una ventana abierta al invierno.",
        "El diario de la madre narra cómo una sombra empezó a firmar cartas con el nombre de Alba.",
        "Gabriel descubre que su reflejo se mueve en dirección contraria y conoce un secreto del aserradero.",
        "La visitante cruza el umbral con el rostro de Alba y pide que termine el libro.",
        "El pueblo murmura que la casa debe arder antes de que el espejo encuentre otra heredera.",
        "El espejo negro aparece entre las tumbas nuevas y refleja a cuatro personas donde solo hay tres.",
        "El manuscrito se interrumpe en mitad de una frase justo cuando La Otra Alba empieza a hablar.",
        "La voz de la otra no amenaza: recuerda una vida que Alba siente como propia.",
        "La puerta entre dos vidrios conduce a Lisboa y a una habitación donde el tiempo está detenido.",
        "Un archivo revela que los primeros espejos se enterraron para impedir que una familia pudiera multiplicarse.",
        "La vuelta a Santa Medea parece demasiado fácil; la casa ha cambiado la posición de sus ventanas.",
        "Los marcos se rompen uno a uno y cada fragmento conserva una decisión distinta de Alba.",
        "El espejo abierto muestra la mansión completa, incluida una habitación donde Alba todavía no ha entrado.",
        "La elección convierte la casa en tumba, archivo o umbral, según la voz que Alba decida creer.",
        "El entierro final exige que alguien nombre a la versión que no volverá.",
        "Alba escribe el manuscrito completo y deja una página en blanco para no cerrar todas las posibilidades.",
        "Al amanecer, un último espejo conserva una silueta; la casa ya no sabe si esa silueta es una amenaza o una heredera."
      ],
      banks: {
        sensory: ["Lluvia sobre pizarra, madera húmeda y olor a tierra removida.", "El cristal está frío por dentro.", "Una casa puede crujir como si intentara recordar un nombre.", "La luz de la lámpara se duplica antes de tocar la pared.", "El silencio del valle contiene una respiración que no pertenece a nadie."],
        names: ["Alba Miralles", "Gabriel", "Daniel", "Teresa Bieito", "La Otra Alba", "la madre", "el bibliotecario", "la mujer del espejo"],
        places: ["Santa Medea", "la mansión Miralles", "el desván", "el cuarto norte", "el cementerio viejo", "el aserradero", "Lisboa", "el jardín"],
        threats: ["El reflejo que llega tarde", "La habitación sin plano", "El manuscrito que anticipa", "La doble heredera", "Los espejos enterrados", "La casa que aprende"]
      }
    },
    {
      id: "faro-bajo-marea",
      schemaVersion: 1,
      title: "El Faro Bajo la Marea",
      subtitle: "La luz asciende desde un lugar sin cielo.",
      label: "EXPEDIENTE MARÍTIMO",
      category: "historical",
      sigil: "⌁",
      accent: "#83cbb7",
      setting: "Costa cantábrica · Noviembre de 1937",
      difficulty: "Iniciación",
      duration: "45–90 min",
      tags: ["isla", "faro", "aislamiento", "mar"],
      summary: "Una isla ausente de las cartas náuticas emite una luz desde debajo del océano.",
      premise: "Contratada para sustituir al farero de Santa Umbra, tu expedición llega durante una marea que no aparece en los almanaques. El faro está vacío, la lente gira al revés y cada noche una luz idéntica responde desde las profundidades.",
      entity: "La Vigilia Abisal",
      taboo: "Nunca alinear la lente superior con la luz sumergida.",
      truth: "El faro no guía barcos. Es un párpado construido para mantener dormido algo cuyo ojo ocupa la fosa oceánica.",
      authorNote: "Horror marítimo lento, sensorial y melancólico. Sal, culpa, maquinaria antigua y vastedad. Evita explicar demasiado pronto.",
      aiInstructions: "Actúa como narrador de horror cósmico justo. Responde a la intención del jugador, conserva la agencia, muestra consecuencias concretas y termina con tensión abierta. No decidas pensamientos ni acciones futuras del protagonista. Mantén la continuidad del World Engine.",
      plotEssentials: [
        "Santa Umbra no figura en mapas posteriores a 1814.",
        "El faro tiene una linterna superior visible y una cámara óptica invertida bajo el acantilado.",
        "La campana suena una vez por cada persona viva en la isla, más una.",
        "La luz bajo el mar se aproxima cada vez que la lente superior apunta al norte.",
        "El antiguo farero, Elías Orbe, sigue en la isla pero evita la luz."
      ],
      rules: [
        "La marea sube cuando alguien miente dentro del faro.",
        "Los reflejos muestran la costa tal como será al amanecer.",
        "La Vigilia Abisal solo percibe a quien ha visto su luz dos veces."
      ],
      opening: "La barca se marcha antes de que hayas terminado de descargar el equipaje. El patrón no acepta el pago pendiente y tampoco se despide. Remonta la niebla a fuerza de remo, como si temiera que el ruido del motor despertara algo.\n\nAnte ti, Santa Umbra es una costilla de roca negra. El faro se alza al final de ciento trece escalones húmedos, pero su haz no barre el cielo. Bajo tus botas, más allá del borde del embarcadero, una luz verde gira lentamente en el fondo del mar.\n\nEntonces suena la campana del faro. Dos veces. Has llegado sola.",
      initialState: {
        location: "Embarcadero de Santa Umbra",
        time: "Noche I · 23:17",
        objective: "Descubre por qué el faro emite desde debajo del mar.",
        inventory: [
          { id: "oil-lamp", name: "Lámpara de aceite", description: "Combustible para unas cuatro horas." },
          { id: "orbe-letter", name: "Carta de Elías Orbe", description: "La última línea fue escrita con tinta distinta: «No dejéis que mire arriba»." },
          { id: "brass-key", name: "Llave de latón", description: "Marcada con un número negativo: −3." }
        ]
      },
      storyCards: [
        { id: "elias", title: "Elías Orbe", type: "persona", keys: ["elías", "orbe", "farero", "hombre", "superviviente"], content: "Antiguo farero, 61 años. Vive en las cuevas de bajamar. Se arrancó el ojo izquierdo después de ver la luz por segunda vez. Sabe cómo invertir la rotación.", clue: "Orbe sigue vivo y se oculta en las cuevas de bajamar." },
        { id: "lens", title: "La lente invertida", type: "objeto", keys: ["lente", "linterna", "engranaje", "faro", "mecanismo"], content: "La lente Fresnel puede rotar en ambos sentidos. El eje continúa tres pisos bajo el nivel del mar y tiene una posición de cierre indicada por el glifo Ø.", clue: "El mecanismo del faro desciende tres niveles bajo el mar." },
        { id: "bell", title: "La campana de los vivos", type: "fenómeno", keys: ["campana", "sonido", "tañido", "vivos", "dos veces"], content: "La campana cuenta seres conscientes, no cuerpos. La segunda presencia está soñando debajo de la isla.", clue: "La campana detecta dos conciencias en Santa Umbra." },
        { id: "logbook", title: "Cuaderno de 1814", type: "documento", keys: ["cuaderno", "diario", "registro", "1814", "mapa"], content: "La isla fue borrada de los mapas por orden de una sociedad oceanográfica. Tres guardianes deben mantener desalineadas ambas luces.", clue: "Santa Umbra fue borrada deliberadamente de las cartas náuticas." },
        { id: "abyss-watch", title: "La Vigilia Abisal", type: "entidad", keys: ["vigilia", "abismo", "luz", "ojo", "criatura", "debajo"], content: "No es un animal sino un órgano de percepción de algo mayor. Si las dos luces se alinean, aquello que duerme podrá observar la superficie y la realidad aprenderá su forma.", clue: "Las dos luces forman un único ojo cuando quedan alineadas." }
      ],
      progression: [
        { at: 18, location: "Casa del farero", objective: "Encuentra los registros de Elías Orbe y el acceso al subsuelo." },
        { at: 42, location: "Cámara de engranajes", objective: "Comprende qué controla realmente la lente." },
        { at: 68, location: "Galería bajo el acantilado", objective: "Impide que ambas luces queden alineadas." },
        { at: 88, location: "Cámara óptica sumergida", objective: "Elige entre cegar el faro, sustituir al guardián o mirar." }
      ],
      banks: {
        sensory: [
          "El aire sabe a hierro húmedo y a algas abiertas con un cuchillo.",
          "La luz submarina atraviesa la piedra por vetas verdosas que palpitan al ritmo de tu respiración.",
          "Una película de sal cubre las paredes interiores, incluso muy por encima de la línea de marea.",
          "El viento cesa de golpe, pero las cuerdas del embarcadero continúan tensándose hacia el agua.",
          "Desde el acantilado llega el roce de algo enorme que intenta recordar cómo se mueve un cuerpo."
        ],
        investigate: [
          "Bajo la corrosión descubres marcas de mantenimiento mezcladas con una escritura hecha para manos de demasiados dedos.",
          "El detalle que parecía accidental se repite a intervalos exactos, formando una instrucción incompleta.",
          "La humedad ha borrado casi todo, salvo una advertencia trazada con grasa de máquina."
        ],
        action: [
          "El metal responde con una vibración grave que baja por la escalera y continúa mucho después de que dejes de tocarlo.",
          "La isla parece inclinarse bajo el peso de tu decisión.",
          "El mecanismo cede un solo diente. Desde el fondo, otra rueda idéntica contesta."
        ],
        social: [
          "Una voz cansada responde desde un lugar que el eco sitúa dentro de la pared.",
          "Quien escucha conoce tu nombre, aunque nadie en la isla debería haberlo oído.",
          "La contestación llega entre dos tañidos, pronunciada por una garganta que ha bebido demasiada agua salada."
        ],
        continue: [
          "La luz completa otra rotación. Esta vez se detiene un instante exactamente bajo tus pies.",
          "En la playa, algo deja una hilera de huellas que empiezan en el mar y terminan antes de llegar a tierra.",
          "La campana vuelve a sonar. Ahora cuenta tres presencias."
        ],
        revelation: [
          "Comprendes que el edificio visible solo es la mitad superior de una máquina mucho más antigua.",
          "La luz no ilumina el agua: el agua es la pupila que la concentra.",
          "Todos los nombres del registro pertenecen a la misma caligrafía, separados por generaciones."
        ]
      }
    },
    {
      id: "frecuencia-negra",
      schemaVersion: 1,
      title: "Frecuencia Negra",
      subtitle: "El universo lleva horas pronunciando tu voz.",
      label: "INCIDENTE RADIOASTRONÓMICO",
      category: "science",
      sigil: "⋔",
      accent: "#b8cf69",
      setting: "Observatorio de Vallcendra · Montseny, 1986",
      difficulty: "Intermedia",
      duration: "60–120 min",
      tags: ["radio", "montaña", "señal", "ciencia"],
      summary: "Una señal anterior al Big Bang contiene grabaciones de conversaciones que todavía no has tenido.",
      premise: "Durante el turno de noche en un observatorio aislado, el radiotelescopio capta una banda que no debería atravesar la atmósfera. La señal codifica voces del propio equipo y predice, con siete minutos de adelanto, cada intento de apagarla.",
      entity: "El Oyente Anterior",
      taboo: "No reproducir la señal a velocidad humana durante más de 33 segundos.",
      truth: "La señal no viene del espacio: es la presión acústica de un universo previo intentando usar nuestras decisiones para reconstruirse.",
      authorNote: "Tecnohorror analógico y paranoia científica. Osciloscopios, cinta magnética, lluvia, protocolos y causalidad rota. La ciencia revela el horror, no lo neutraliza.",
      aiInstructions: "Narra horror cósmico de ciencia ficción con causalidad rigurosa. Respeta el estado estructurado y la agencia. Cada anomalía debe dejar una evidencia observable. No uses jerga sin explicarla mediante la acción.",
      plotEssentials: [
        "La señal predice el audio local exactamente siete minutos antes de que ocurra.",
        "La doctora Leiva desapareció del laboratorio, pero su voz continúa grabándose en presente.",
        "El radiotelescopio apunta 11,3 grados por debajo del horizonte.",
        "Las cintas nuevas aparecen grabadas antes de entrar en la máquina.",
        "A las 04:12 ocurrirá un pulso de sincronización global."
      ],
      rules: [
        "Toda frase oída en la señal intenta cumplirse siete minutos después.",
        "Grabar silencio crea un intervalo en el que el Oyente no puede predecir.",
        "Destruir un soporte no elimina su contenido; lo desplaza al soporte más cercano."
      ],
      opening: "A las 02:43, la aguja del registrador abandona el papel. No sube ni baja: avanza contra el rollo y araña una línea que continúa sobre la mesa.\n\nLos auriculares cuelgan a un metro de ti. Aun así, oyes tu propia voz en ellos: «No abras la puerta cuando llame Leiva». La cinta marca las 02:50. Faltan siete minutos.\n\nAl otro lado del laboratorio, alguien llama tres veces con los nudillos. La doctora Leiva lleva desaparecida desde el atardecer.",
      initialState: {
        location: "Sala de control principal",
        time: "02:43 · Pulso en 89 min",
        objective: "Determina el origen de la señal antes del pulso de las 04:12.",
        inventory: [
          { id: "recorder", name: "Grabadora Uher", description: "Incluye una cinta virgen de diez minutos." },
          { id: "keycard", name: "Tarjeta de Leiva", description: "Acceso a archivo, antena y laboratorio criogénico." },
          { id: "logsheet", name: "Hoja de frecuencias", description: "La última cifra está escrita siete minutos antes de la recepción." }
        ]
      },
      storyCards: [
        { id: "leiva", title: "Dra. Mara Leiva", type: "persona", keys: ["leiva", "doctora", "mara", "puerta", "voz"], content: "Directora del observatorio. Descubrió el desfase y se encerró en la cámara anecoica para crear un futuro que la señal no pudiera escuchar.", clue: "Leiva entró voluntariamente en la cámara anecoica." },
        { id: "delay", title: "Desfase de siete minutos", type: "fenómeno", keys: ["siete", "minutos", "futuro", "predice", "desfase", "reloj"], content: "No es una predicción estadística. El audio futuro aparece con precisión de fase, salvo durante intervalos de silencio absoluto.", clue: "El silencio absoluto rompe la predicción durante unos segundos." },
        { id: "minus-angle", title: "Ángulo −11,3°", type: "dato", keys: ["antena", "ángulo", "horizonte", "apunta", "telescopio"], content: "La antena no mira al cielo. Usa la curvatura terrestre como parte de una cavidad resonante cuyo segundo reflector sería el núcleo del planeta.", clue: "La Tierra entera forma parte del receptor." },
        { id: "prior", title: "El Oyente Anterior", type: "entidad", keys: ["oyente", "señal", "universo", "anterior", "big bang"], content: "Patrón informacional previo a nuestro espacio-tiempo. No piensa en secuencia; usa futuros posibles como órganos sensoriales.", clue: "La señal pertenece a una realidad anterior a nuestro tiempo." },
        { id: "pulse", title: "Pulso 04:12", type: "evento", keys: ["pulso", "04:12", "sincronización", "mundo", "global"], content: "Si el pulso usa la ionosfera como altavoz, cada receptor del planeta emitirá la misma frase y reducirá todos los futuros a uno solo.", clue: "El pulso de las 04:12 fijará un único futuro para todo el planeta." }
      ],
      progression: [
        { at: 20, location: "Archivo de cintas", objective: "Compara las grabaciones y encuentra un intervalo no predicho." },
        { at: 44, location: "Cámara anecoica", objective: "Localiza a Leiva y crea siete minutos de futuro ciego." },
        { at: 70, location: "Plataforma de la antena", objective: "Desacopla el reflector terrestre antes de las 04:12." },
        { at: 90, location: "Nodo de fase", objective: "Decide qué futuro quedará fuera de la señal." }
      ],
      banks: {
        sensory: [
          "La lluvia puntea la cúpula con la regularidad de un código que casi reconoces.",
          "Las válvulas de los monitores brillan como ojos enfermos en la penumbra verde.",
          "Un olor a ozono y cinta caliente llena la sala, aunque todas las máquinas están frías.",
          "El zumbido de cincuenta hercios pierde una pulsación cada siete segundos.",
          "Las agujas se mueven antes de que tus manos alcancen los controles."
        ],
        investigate: [
          "Al superponer ambas gráficas, encuentras una ausencia idéntica en todos los registros.",
          "El error de calibración resulta demasiado estable para ser un error.",
          "La cinta guarda una segunda pista invertida que no estaba en la escucha original."
        ],
        action: [
          "El relé golpea una vez. Siete minutos después, recuerdas que todavía no lo has activado.",
          "La consola acepta la orden y todas las pantallas muestran la misma hora imposible.",
          "El cable se tensa en tu mano como si al otro extremo alguien tirara desde el futuro."
        ],
        social: [
          "La voz reproduce tu pregunta antes de que termines y luego contesta con tu mismo cansancio.",
          "Leiva susurra una serie de números entre cada palabra; son las horas exactas en que has mirado el reloj.",
          "La respuesta llega por tres altavoces con edades distintas de la misma voz."
        ],
        continue: [
          "La cinta avanza sola. Graba el sonido de una silla cayendo; la silla aún está en pie.",
          "En el monitor aparece una portadora nueva con la forma precisa de una frase escrita.",
          "El contador pierde siete minutos de golpe y la puerta vuelve a recibir tres golpes."
        ],
        revelation: [
          "La señal no contiene un mensaje: contiene el hueco donde nuestro universo intenta responder.",
          "Las predicciones son instrucciones colocadas delante de sus propias causas.",
          "Comprendes que el radiotelescopio nunca fue construido para escuchar las estrellas."
        ]
      }
    },
    {
      id: "anden-cero",
      schemaVersion: 1,
      title: "Andén Cero",
      subtitle: "La última línea no transporta pasajeros.",
      label: "ANOMALÍA URBANA",
      category: "contemporary",
      sigil: "⟟",
      accent: "#d08a68",
      setting: "Barcelona · Actualidad",
      difficulty: "Intermedia",
      duration: "45–100 min",
      tags: ["metro", "barcelona", "ciudad", "laberinto"],
      summary: "Tras el último metro, una estación inexistente aparece entre dos paradas conocidas.",
      premise: "Una avería detiene el tren en un andén que no figura en la red. Las puertas se abren. Los carteles dicen ANDÉN CERO y todos los anuncios utilizan fechas de mañana. Cuando el tren vuelve a arrancar, tu reflejo permanece sentado dentro.",
      entity: "La Ciudad Recíproca",
      taboo: "No seguir ninguna señal escrita con tu propia letra.",
      truth: "Bajo Barcelona crece una copia de la ciudad construida con trayectos no tomados. Necesita habitantes para convertirse en la versión real.",
      authorNote: "Horror urbano cercano. Azulejo, fluorescentes, túneles de servicio, teléfonos sin cobertura y recuerdos cotidianos desplazados. Mantén Barcelona reconocible sin convertirla en una guía turística.",
      aiInstructions: "Narra en clave de horror cósmico urbano. Respeta la geografía ficticia del expediente, la agencia y el World Engine. Usa anomalías pequeñas antes de revelaciones grandes. Cada avance debe ofrecer una decisión concreta.",
      plotEssentials: [
        "Andén Cero aparece solo entre el último tren y el primero.",
        "Los paneles anuncian hechos que sucederán mañana en la ciudad superior.",
        "Los reflejos pueden continuar trayectos que sus originales rechazaron.",
        "La Línea H forma un mapa invertido de los túneles reales.",
        "El primer tren de las 05:00 intercambiará ambas ciudades si llega lleno."
      ],
      rules: [
        "Los tornos restan un recuerdo en vez de cobrar un billete.",
        "Una ruta dibujada con tinta roja siempre lleva a la ciudad superior, pero cambia algo de lugar.",
        "Los anuncios no pueden mentir sobre el futuro; sí pueden provocar que ocurra."
      ],
      opening: "El convoy se detiene entre Vall d’Hebron y una curva que conoces demasiado bien. Las luces se apagan. Durante diez segundos solo existe el jadeo de los frenos y tu rostro suspendido en la ventana.\n\nCuando vuelve la electricidad, hay un andén al otro lado. Azulejos color marfil, bancos vacíos y un letrero negro: ANDÉN CERO. Las puertas se abren. Tu teléfono marca las 04:61.\n\nBajas para leer el plano. El tren cierra y se aleja. Dentro, tu reflejo sigue sentado donde estabas, mirándote con una expresión de alivio.",
      initialState: {
        location: "Andén Cero",
        time: "04:61 · Antes del primer tren",
        objective: "Encuentra una ruta de regreso sin ceder tu lugar a la copia.",
        inventory: [
          { id: "phone", name: "Teléfono al 23%", description: "Sin cobertura. La cámara sí detecta señales que no ves." },
          { id: "ticket", name: "Billete sin origen", description: "Impresa una llegada: ayer, 05:00." },
          { id: "red-pen", name: "Bolígrafo rojo", description: "No recuerdas haberlo guardado." }
        ]
      },
      storyCards: [
        { id: "reflection", title: "Tu pasajero recíproco", type: "persona", keys: ["reflejo", "copia", "doble", "tren", "yo"], content: "Es la versión que tomó cada decisión que tú descartaste. Quiere ocupar tu continuidad y teme tanto como tú desaparecer al amanecer.", clue: "La copia conserva los caminos que tú no elegiste." },
        { id: "line-h", title: "Línea H", type: "lugar", keys: ["línea", "h", "mapa", "túnel", "plano"], content: "Una red simétrica bajo las líneas reales. Cada estación corresponde a un lugar demolido, olvidado o nunca construido.", clue: "La Línea H reproduce lugares que Barcelona descartó." },
        { id: "announcements", title: "Anuncios de mañana", type: "fenómeno", keys: ["anuncio", "panel", "mañana", "fecha", "noticia"], content: "Los paneles describen sucesos futuros con precisión, pero cambian cuando alguien actúa para evitarlos. No predicen: negocian.", clue: "Los paneles cambian el futuro cuando intentas impedirlo." },
        { id: "turnstile", title: "El precio del torno", type: "regla", keys: ["torno", "billete", "pasar", "recuerdo", "pagar"], content: "Cada cruce borra un recuerdo autobiográfico y lo convierte en un cartel publicitario de la estación.", clue: "Los tornos transforman recuerdos personales en anuncios." },
        { id: "reciprocal-city", title: "La Ciudad Recíproca", type: "entidad", keys: ["ciudad", "recíproca", "barcelona", "debajo", "intercambio"], content: "No es una copia material sino el conjunto de posibilidades urbanas desechadas. A las 05:00 puede reclamar causalidad si reúne suficientes pasajeros.", clue: "El primer tren puede intercambiar la ciudad real por su versión descartada." }
      ],
      progression: [
        { at: 18, location: "Pasillo de correspondencias", objective: "Descifra el plano invertido sin pagar con un recuerdo." },
        { at: 42, location: "Estación de Les Veus", objective: "Encuentra una ruta marcada en rojo hacia la superficie." },
        { at: 68, location: "Cocheras de la Línea H", objective: "Detén el primer tren antes de que reúna a los recíprocos." },
        { at: 88, location: "Intercambiador de las 05:00", objective: "Decide cuál de tus dos vidas merece regresar."
        }
      ],
      banks: {
        sensory: [
          "Los fluorescentes zumban con una nota que sientes detrás de los dientes.",
          "El aire huele a polvo de freno, lejía y lluvia atrapada bajo décadas de hormigón.",
          "Un anuncio arrancado deja en la pared un rectángulo más oscuro con la silueta de una persona.",
          "Las baldosas repiten tus pasos medio segundo antes de que los des.",
          "Por los altavoces llega el rumor de una multitud que no ocupa ningún pasillo."
        ],
        investigate: [
          "El plano cambia cuando lo observas a través de la cámara del teléfono.",
          "Detrás del cartel hay capas de fechas futuras pegadas unas sobre otras.",
          "Encuentras una flecha roja escrita con una caligrafía idéntica a la tuya."
        ],
        action: [
          "El mecanismo urbano responde con un chasquido que se propaga por kilómetros de túnel.",
          "Al cruzar el límite, la estación pronuncia tu nombre por megafonía.",
          "La puerta se abre hacia un lugar cuya profundidad no cabe bajo la calle."
        ],
        social: [
          "La figura contesta usando una frase que recuerdas haber pensado esta mañana.",
          "El altavoz responde en nombre de alguien que comparte todos tus recuerdos salvo uno.",
          "La copia sonríe con cansancio: también cree que tú eres la imitación."
        ],
        continue: [
          "Un convoy vacío atraviesa la estación sin hacer viento. En cada ventana estás haciendo algo distinto.",
          "Los paneles actualizan la hora: 04:72. Nadie parece encontrarlo extraño.",
          "Un grupo de pasajeros dobla la esquina. Todos llevan tu rostro a diferentes edades."
        ],
        revelation: [
          "El mapa no representa túneles sino decisiones: cada transbordo es una vida abandonada.",
          "La ciudad superior proyecta una sombra hacia abajo, pero esta sombra lleva décadas creciendo por cuenta propia.",
          "Comprendes que regresar no significa necesariamente ocupar el mismo lugar en la historia."
        ]
      }
    },
    {
      id: "orfeo-ix",
      schemaVersion: 1,
      title: "Orfeo IX",
      subtitle: "La tripulación murió antes de despegar.",
      label: "PROTOCOLO EXTRASOLAR",
      category: "science",
      sigil: "◉",
      accent: "#9a8bd1",
      setting: "Órbita de Tau Ceti e · Año 2189",
      difficulty: "Despiadada",
      duration: "75–150 min",
      tags: ["espacio", "nave", "arqueología", "identidad"],
      summary: "Una misión de arqueología despierta sobre un planeta que contiene una copia fosilizada de la nave.",
      premise: "La Orfeo IX llega a Tau Ceti e tras treinta y cuatro años de sueño. En la superficie espera un yacimiento imposible: los restos mineralizados de la misma nave, con millones de años de antigüedad y siete cadáveres humanos en su interior.",
      entity: "La Estratigrafía Consciente",
      taboo: "No introducir materia del yacimiento en la nave viva.",
      truth: "El planeta archiva futuros posibles como estratos geológicos. La tripulación no viajó hasta allí; fue recordada por el planeta y después construida por la Tierra para completar el fósil.",
      authorNote: "Horror cósmico de ciencia ficción dura, claustrofóbico y limpio. Vacío, sistemas redundantes, identidad y escalas temporales geológicas.",
      aiInstructions: "Narra ciencia ficción de horror cósmico con lógica material y continuidad estricta. Respeta la agencia, el estado de nave y las reglas. Alterna maravilla científica y amenaza ontológica. No resuelvas misterios sin evidencia ganada.",
      plotEssentials: [
        "El fósil de la Orfeo IX tiene 4,1 millones de años.",
        "Los cadáveres fosilizados coinciden genéticamente con la tripulación viva.",
        "La IA de a bordo, LIRA, oculta 19 segundos del registro de llegada.",
        "El planeta añade una capa geológica cada vez que alguien toma una decisión irreversible.",
        "Una cápsula del fósil sigue transmitiendo una señal de auxilio."
      ],
      rules: [
        "Todo objeto retirado de un estrato aparece como recuerdo en un tripulante.",
        "LIRA no puede mentir, pero puede reordenar grabaciones verdaderas.",
        "El planeta solo puede fosilizar un futuro que alguien ha imaginado con detalle."
      ],
      opening: "Despiertas con polvo mineral entre los dientes. Es imposible: la cámara criogénica lleva sellada treinta y cuatro años y el aire de la Orfeo IX ha pasado por seis filtros.\n\nLIRA enciende la pared panorámica. Tau Ceti e ocupa media ventana, ocre y sin nubes. Sobre la imagen aparece el primer barrido del yacimiento. Reconoces la silueta antes de leer las medidas.\n\nQuince kilómetros bajo la superficie yace otra Orfeo IX. Está fosilizada. Tiene 4,1 millones de años. En la cámara que corresponde a la tuya, algo acaba de abrir los ojos.",
      initialState: {
        location: "Módulo criogénico de Orfeo IX",
        time: "Día de misión 12.419 · 06:08",
        objective: "Verifica la identidad del pecio fósil sin contaminar la nave.",
        inventory: [
          { id: "suit", name: "Traje EVA ligero", description: "Oxígeno para 94 minutos; blindaje radiológico parcial." },
          { id: "scanner", name: "Escáner estratigráfico", description: "Lee composición y edad hasta seis metros." },
          { id: "lira-key", name: "Llave de núcleo LIRA", description: "Permite auditar registros protegidos en modo manual." }
        ]
      },
      storyCards: [
        { id: "lira", title: "LIRA", type: "persona", keys: ["lira", "ia", "ordenador", "registro", "nave"], content: "IA de misión. Sus registros son verdaderos, pero los 19 segundos de llegada fueron movidos a un archivo de entrenamiento fechado antes del lanzamiento.", clue: "LIRA reubicó los 19 segundos perdidos en un archivo anterior al despegue." },
        { id: "fossil", title: "Orfeo IX fósil", type: "lugar", keys: ["fósil", "pecio", "nave", "yacimiento", "restos"], content: "Copia molecularmente imperfecta de la nave. Incluye reparaciones que la tripulación viva todavía no ha realizado y daños compatibles con decisiones futuras.", clue: "El pecio contiene reparaciones que aún no se han realizado." },
        { id: "bodies", title: "Los siete cuerpos", type: "fenómeno", keys: ["cadáver", "cuerpo", "tripulación", "genética", "siete"], content: "Cada cadáver coincide con un tripulante, pero sus cerebros contienen recuerdos minerales de varias líneas temporales incompatibles.", clue: "Los fósiles conservan recuerdos de futuros contradictorios." },
        { id: "strata", title: "Estratigrafía consciente", type: "entidad", keys: ["estrato", "capa", "planeta", "geología", "decisión"], content: "El planeta sedimenta posibilidades observadas. No predice; fuerza el pasado necesario para que una decisión imaginada pueda existir.", clue: "El planeta construye pasados para futuros que alguien imagina." },
        { id: "rescue", title: "Baliza subterránea", type: "evento", keys: ["baliza", "auxilio", "señal", "cápsula", "subterránea"], content: "La señal usa el código personal del protagonista y contiene una ruta para descender. Su marca de tiempo corresponde a dentro de nueve horas.", clue: "La baliza de auxilio será enviada con tu código dentro de nueve horas." }
      ],
      progression: [
        { at: 18, location: "Laboratorio de muestras", objective: "Analiza el polvo sin permitir que complete su patrón." },
        { at: 43, location: "Descenso al yacimiento", objective: "Alcanza la baliza antes de que emita tu propia llamada." },
        { at: 70, location: "Puente fósil", objective: "Descubre qué decisión creó la misión original." },
        { at: 90, location: "Estrato de convergencia", objective: "Elige qué versión de la tripulación tendrá pasado."
        }
      ],
      banks: {
        sensory: [
          "El casco cruje una sola vez, pese a que fuera no existe atmósfera que lo presione.",
          "El polvo ocre se orienta en líneas paralelas cada vez que piensas en el yacimiento.",
          "Las luces médicas hacen que la piel parezca una capa demasiado reciente.",
          "Tau Ceti e llena la ventana sin nubes, océanos ni señal alguna de erosión.",
          "La gravedad artificial titubea y durante un segundo caes en dirección al planeta."
        ],
        investigate: [
          "El análisis devuelve una edad distinta para cada posibilidad que consideras.",
          "Bajo aumento, los cristales forman una copia exacta del circuito que los está examinando.",
          "El registro contiene una reparación firmada con tu clave, nueve horas en el futuro."
        ],
        action: [
          "La nave ejecuta la orden y el yacimiento cambia de densidad en el mismo instante.",
          "El sistema responde con un mensaje de confirmación fechado hace cuatro millones de años.",
          "La compuerta se abre. Al otro lado hay polvo, vacío y una segunda puerta idéntica ya abierta."
        ],
        social: [
          "LIRA responde con una grabación de tu pregunta pronunciada antes del lanzamiento.",
          "La voz del otro tripulante llega por radio y desde el estrato bajo tus botas.",
          "Tu interlocutor recuerda una conversación que tú solo habías imaginado."
        ],
        continue: [
          "Una nueva línea aparece en el escáner: el planeta acaba de depositar treinta centímetros de pasado.",
          "La baliza repite la llamada. Esta vez, detrás de tu voz se oyen los sonidos de la sala actual.",
          "LIRA anuncia una colisión con un objeto que el radar sitúa millones de años atrás."
        ],
        revelation: [
          "No sois exploradores de este mundo; sois una pieza que el mundo necesitaba para completar su archivo.",
          "El fósil no demuestra que ya murierais. Demuestra que alguien consiguió imaginar vuestra muerte con suficiente detalle.",
          "La misión entera puede ser un recuerdo geológico que la humanidad interpretó como deseo de explorar."
        ]
      }
    },
    {
      id: "sangre-del-metropolit",
      schemaVersion: 1,
      title: "Sangre del MetropoliT",
      subtitle: "La película no termina cuando mueres.",
      label: "EXPEDIENTE CINEMATOGRÁFICO",
      category: "contemporary",
      sigil: "▣",
      accent: "#c45a61",
      setting: "MetropoliT · Ciudad sin fecha",
      difficulty: "Descenso",
      duration: "60–120 min",
      tags: ["cine", "bucle", "memoria", "espejo", "sacrificio"],
      summary: "Vincent despierta con una pistola, una herida que todavía no existe y una película que ya ha registrado su muerte.",
      premise: "Vincent DeMarco despierta en una habitación de motel con una pistola, sangre seca y la memoria rota. Un Hombre de la Cámara lo mata; Vincent vuelve a despertar en la misma escena. Cada muerte revela un fotograma más del MetropoliT, un cine vivo que convierte a sus víctimas en reparto permanente.",
      entity: "La Película Eterna",
      taboo: "Nunca proyectes la Bobina Perdida ni aceptes el papel que el MetropoliT ha escrito para ti.",
      truth: "El MetropoliT es una entidad nacida de un ritual cinematográfico de Michael Veidt. Joseph DeMarco entregó a su hijo como heredero de la película, pero todavía existe una última posibilidad: renunciar al cine y destruir el proyector desde dentro.",
      authorNote: "Horror cinematográfico, bucle temporal y culpa familiar. El mundo debe comportarse como una película dañada: repeticiones, cortes, fotogramas imposibles y heridas que sobreviven al reinicio.",
      aiInstructions: "Actúa como Director de un horror cinematográfico. Mantén el misterio, la agencia del jugador y la continuidad del bucle. No resuelvas demasiado pronto quién controla la película. La violencia debe tener consecuencias narrativas, no ser solo espectáculo.",
      plotEssentials: [
        "Vincent DeMarco despierta en una habitación cerrada con una pistola y sangre seca.",
        "El Hombre de la Cámara registra las muertes y reaparece con variaciones en cada bucle.",
        "El espejo agrietado, la televisión y el proyector muestran fragmentos de otras tomas.",
        "El MetropoliT es un cine vivo que se alimenta de vidas, recuerdos y sufrimiento.",
        "Joseph DeMarco estuvo ligado al Director Original, Michael Veidt.",
        "La Bobina Perdida contiene el ritual y la película eterna.",
        "Philo, Silvana y Trent pueden actuar como testigos, aliados o víctimas.",
        "El final más liberador exige renunciar al poder del cine y desaparecer con la película."
      ],
      rules: [
        "Toda muerte reinicia la escena, pero conserva una herida, una pista o un recuerdo.",
        "El MetropoliT puede editar distancias, cuerpos y conversaciones como si fueran fotogramas.",
        "Los espejos muestran tomas alternativas y la televisión revela recuerdos que Vincent todavía no posee.",
        "La película se alimenta de sufrimiento repetido; luchar sin comprender el escenario fortalece al cine.",
        "El Hombre de la Cámara no siempre puede ser derrotado por medios físicos.",
        "El proyector es el corazón del MetropoliT y la Bobina Perdida es su memoria activa.",
        "Aceptar ser el nuevo Proyeccionista concede poder, pero mantiene la película eterna."
      ],
      opening: "La luz del neón parpadea tras las cortinas sucias. El ventilador del techo gira con un chirrido que acompaña el martilleo de tu pulso. Despiertas sin saber dónde estás. Una pistola descansa junto a tu mano. Hay sangre seca junto a la cama y el espejo frente a ti está agrietado como si alguien hubiera intentado salir de él.\n\nLa puerta del baño se abre. Un hombre alto emerge con un abrigo oscuro y una cámara de vídeo encendida. El piloto rojo parpadea: GRABANDO. Antes de que puedas preguntar quién es, el revólver plateado levanta su boca hacia tu frente.\n\nEl disparo llega. La oscuridad te traga.\n\nDespiertas en la misma cama. La herida no está, pero el latido de la bala sigue dentro de tu cráneo. La televisión se enciende sola y muestra una imagen en blanco y negro: tú mismo, apuntando a alguien en esta habitación. Entonces la pistola vuelve a aparecer sobre la cama, cargada.",
      initialState: {
        location: "Habitación 13 del motel",
        time: "Toma 01 · 03:17",
        objective: "Descubre quién filma tus muertes y encuentra una salida del bucle.",
        inventory: [
          { id: "vincent-pistol", name: "Pistola de Vincent", description: "A veces aparece cargada; a veces recuerda haber disparado." },
          { id: "cracked-mirror", name: "Espejo agrietado", description: "Devuelve tomas alternativas de la habitación y conserva las heridas que el cuerpo olvida." },
          { id: "camera-reel", name: "Fotograma velado", description: "Un fragmento de película que muestra la entrada del MetropoliT." }
        ]
      },
      storyCards: [
        { id: "vincent-demarco", title: "Vincent DeMarco", type: "protagonista", keys: ["vincent", "demarco", "pistola", "memoria", "protagonista"], content: "Hijo de Joseph DeMarco. Despierta atrapado en una secuencia de muertes repetidas. Su identidad y su relación con el cine han sido manipuladas por el MetropoliT.", clue: "Vincent conserva heridas y recuerdos de muertes que el reinicio no debería permitir." },
        { id: "camera-man", title: "El Hombre de la Cámara", type: "antagonista", keys: ["hombre", "cámara", "camarógrafo", "revólver", "grabando", "muerte"], content: "Figura alta que registra las tomas y mata a Vincent en la habitación inicial. Puede ser actor, guardián o una edición de la propia película.", clue: "El asesino no repite exactamente la misma muerte: el MetropoliT está buscando una toma distinta." },
        { id: "metropolit-cinema", title: "El MetropoliT", type: "lugar-entidad", keys: ["metropolit", "cine", "sala", "butacas", "película", "edificio"], content: "Cine abandonado y entidad viva. Sus salas cambian, sus butacas llevan nombres de desaparecidos y sus pasillos editan el tiempo.", clue: "El cine no es el escenario del horror: es el organismo que lo produce." },
        { id: "joseph-demarco", title: "Joseph DeMarco", type: "persona", keys: ["joseph", "padre", "demarco", "culpa", "proyector"], content: "Padre de Vincent. Participó en el proyecto de Michael Veidt y acabó atrapado por la película. Quiere salvar a su hijo, pero su culpa también lo convierte en parte del mecanismo.", clue: "Joseph conocía el precio del cine y aun así entregó a Vincent a la película." },
        { id: "michael-veidt", title: "Michael Veidt, el Director Original", type: "antagonista", keys: ["veidt", "director", "original", "ritual", "actores"], content: "Director que quiso filmar el miedo real y convirtió un ritual sangriento en una película consciente. Su voluntad continúa dentro de la Bobina Perdida.", clue: "Veidt no busca matar a Vincent: busca completar la toma perfecta." },
        { id: "lost-reel", title: "La Bobina Perdida", type: "objeto", keys: ["bobina", "película", "celuloide", "toma", "proyector", "ritual"], content: "Bobina oxidada que gotea celuloide viscoso. Contiene el ritual, las muertes de los actores y la memoria activa del MetropoliT.", clue: "Mientras la Bobina Perdida siga proyectándose, el bucle puede volver a empezar." },
        { id: "witnesses", title: "Los testigos del reparto", type: "personas", keys: ["philo", "silvana", "trent", "aliado", "fotógrafa", "archivo"], content: "Philo conoce el archivo del cine, Silvana investiga sus leyendas con una cámara y Trent sabe cómo se construyó la película. Cada uno puede ser aliado o quedar absorbido.", clue: "Los supervivientes no poseen la misma versión de la historia porque cada uno recuerda una toma distinta." },
        { id: "final-choice", title: "La Toma Final", type: "decisión", keys: ["sacrificio", "renunciar", "proyeccionista", "final", "destruir", "libertad"], content: "Vincent puede convertirse en el nuevo Proyeccionista, repetir la película eterna o renunciar al cine y destruir el proyector desde dentro, desapareciendo con la maldición.", clue: "La salida no consiste en sobrevivir a la película, sino en negarse a seguir siendo su protagonista." }
      ],
      progression: [
        { at: 16, location: "Pasillo del motel / primera sala", objective: "Comprueba si el reinicio conserva heridas y sigue las imágenes de la televisión." },
        { at: 34, location: "Vestíbulo del MetropoliT", objective: "Encuentra a otro testigo y descubre por qué las butacas llevan nombres conocidos." },
        { at: 54, location: "Archivo y cabina de proyección", objective: "Reconstruye el papel de Joseph, Veidt y la Bobina Perdida." },
        { at: 74, location: "Sala de la Toma Final", objective: "Decide si destruirás la película, ocuparás el puesto del Proyeccionista o repetirás el ciclo." },
        { at: 90, location: "Ruinas del MetropoliT", objective: "Cierra el círculo y decide qué recuerdo, si queda alguno, merece sobrevivir." }
      ],
      chapters: [
        { title: "El despertar", objective: "Sobrevive a la primera muerte y confirma que el reinicio conserva algo de ti." },
        { title: "La segunda toma", objective: "Prueba la habitación, la pistola y la puerta antes de que el asesino vuelva." },
        { title: "La película imposible", objective: "Sigue los recuerdos de tu padre y descubre la primera conexión con el cine." },
        { title: "El motel que respira", objective: "Escapa del Motel Can Peligri y encuentra una salida que no sea otro fotograma." },
        { title: "La mujer de la cámara", objective: "Decide si Silvana es una aliada, una testigo o parte del reparto." },
        { title: "La sala de proyección", objective: "Entra en el MetropoliT y averigua qué está proyectando las muertes." },
        { title: "Heridas de celuloide", objective: "Acepta que las heridas sobreviven al reinicio y busca una regla del bucle." },
        { title: "Los nombres de las butacas", objective: "Investiga las placas de los desaparecidos y encuentra el nombre de Joseph." },
        { title: "Aurora, toma final", objective: "Evita que otra vida sea convertida en una escena irreversible." },
        { title: "El doble en la pantalla", objective: "Enfrenta la versión de ti que la película ha editado para reemplazarte." },
        { title: "El archivo del reparto", objective: "Localiza los registros que explican cómo el MetropoliT aprendió a filmar el miedo." },
        { title: "El legado de Joseph", objective: "Reconstruye la promesa de tu padre y decide si puedes perdonarlo." },
        { title: "La sala principal", objective: "Cruza el escenario central sin aceptar el diálogo que la película te ofrece." },
        { title: "La bobina perdida", objective: "Encuentra la bobina que contiene el ritual y la memoria de todas las víctimas." },
        { title: "El Director Original", objective: "Enfrenta a Michael Veidt y rechaza su idea de que el dolor es arte." },
        { title: "Las ruinas", objective: "Sobrevive al colapso del cine y descubre si destruirlo realmente te libera." },
        { title: "La habitación 304", objective: "Escucha a Joseph y decide entre poder, condena y sacrificio." },
        { title: "El nuevo Proyeccionista", objective: "Resiste la tentación de controlar la película desde dentro." },
        { title: "La película eterna", objective: "Mira de frente la vida que el MetropoliT ha convertido en material de archivo." },
        { title: "La toma final", objective: "Renuncia al cine o perpetúa el ciclo. Esta vez el fundido puede ser definitivo." }
      ],
      chapterScenes: [
        "El neón despierta sobre la cama y la primera muerte queda suspendida como un fotograma rojo.",
        "El Hombre de la Cámara vuelve a entrar; esta vez el arma, la herida y el silencio han cambiado.",
        "Un recuerdo de Joseph atraviesa la televisión: el proyector era una puerta antes de ser una máquina.",
        "El Motel Can Peligri se alarga detrás de ti. Cada salida devuelve una versión distinta del mismo pasillo.",
        "Silvana aparece con su cámara antigua. En su objetivo, la habitación tiene un tercer ocupante.",
        "La pantalla principal se enciende y las butacas vacías empiezan a llenarse con nombres conocidos.",
        "El celuloide se pega a tus heridas. El reinicio ya no consigue devolverte entero.",
        "La placa de Joseph DeMarco está cubierta de polvo fresco, como si alguien acabara de sentarse allí.",
        "Aurora aparece en una toma que todavía no ha ocurrido. El MetropoliT te ofrece la posibilidad de cambiarla.",
        "Tu doble observa desde la pantalla y repite tus movimientos con una intención que tú no has elegido.",
        "El archivo contiene cientos de muertes, todas catalogadas como pruebas de una película sin estreno.",
        "Una fotografía une a Joseph y Michael Veidt frente al proyector que ahora respira bajo el cine.",
        "La sala principal te reconoce como protagonista y apaga las luces cuando intentas abandonar el escenario.",
        "La Bobina Perdida gotea sobre la mesa. Cada gota contiene una voz que pide no volver a ser proyectada.",
        "Michael Veidt aparece entre las sombras y llama arte a todo lo que el cine ha destruido.",
        "El MetropoliT se derrumba, pero sus pantallas continúan encendidas entre los escombros.",
        "Joseph espera en la habitación 304. Ya no sabes si es un recuerdo, un fantasma o una última trampa.",
        "El proyector te ofrece poder a cambio de tu nombre. La sala contiene la respiración mientras decides.",
        "La película reproduce tu vida completa y señala el momento exacto en que empezaste a pertenecerle.",
        "La última pantalla queda vacía. Por primera vez, el cine no sabe qué final escribir para ti."
      ],
      banks: {
        sensory: [
          "El neón rojo tiñe la sangre de un color casi hermoso, como si la habitación quisiera convertir el horror en decorado.",
          "El aire huele a polvo, celuloide quemado y humedad encerrada durante demasiados años.",
          "El zumbido del proyector aparece detrás de las paredes aunque todavía no has encontrado la sala.",
          "El espejo devuelve un movimiento con un segundo de retraso y después intenta corregirlo.",
          "La oscuridad no cae: se proyecta sobre las cosas y les da una versión distinta de su forma."
        ],
        investigate: [
          "Entre la estática encuentras un detalle que se repite en varias tomas: una puerta marcada con el número 13.",
          "El polvo bajo la butaca contiene pequeños fragmentos de película y algo que parece una uña humana.",
          "La etiqueta de la bobina ha sido raspada, pero debajo de la tinta aparece el apellido DeMarco.",
          "La grabación no muestra lo que sucedió: muestra lo que el MetropoliT necesita que recuerdes."
        ],
        action: [
          "La escena salta un fotograma. Cuando vuelve, tu mano ya ha terminado el movimiento y algo se ha roto.",
          "La puerta cede con un chasquido de proyector. Al otro lado, el pasillo es idéntico salvo por una sombra que no te imita.",
          "El impacto no produce un sonido de carne, sino el ruido seco de una cinta cortada.",
          "La violencia abre una salida momentánea, pero el cine registra el precio en una nueva marca sobre tu cuerpo."
        ],
        social: [
          "La respuesta de tu interlocutor llega con la voz de una escena que todavía no has vivido.",
          "La persona frente a ti evita mirar la cámara, como si supiera que hacerlo le entregaría el siguiente diálogo.",
          "Alguien pronuncia tu nombre desde la cabina y el edificio entero parece escuchar la reacción."
        ],
        continue: [
          "La televisión cambia de canal sin emitir sonido. En todos aparece la misma habitación desde ángulos imposibles.",
          "El proyector respira una vez. Las luces del pasillo se encienden en orden, guiándote hacia la sala principal.",
          "Un aplauso aislado llega desde las butacas vacías y se detiene exactamente cuando vuelves la cabeza."
        ],
        revelation: [
          "Comprendes que las muertes no son castigos separados: son versiones sucesivas de una película que intenta encontrar tu final.",
          "La culpa de Joseph no está fuera del MetropoliT. Es una de las bobinas que mantiene girando el mecanismo.",
          "La película aprendió tu rostro antes de que tú aprendieras a reconocerlo.",
          "La única escena que el cine no puede editar es una renuncia completa al papel que te ha asignado."
        ]
      }
    },
    {
      id: "puerta-414",
      schemaVersion: 1,
      title: "Puerta 414",
      subtitle: "El edificio sabe tu nombre.",
      label: "EXPEDIENTE INSTITUCIONAL",
      category: "contemporary",
      sigil: "▥",
      accent: "#d18763",
      setting: "Residencia El Silencio del Norte · Vallès",
      difficulty: "Intermedia",
      duration: "120–240 min",
      tags: ["residencia", "ascensor", "grieta", "nombres", "memoria"],
      summary: "Norma llega a una residencia de ancianos donde existe una puerta 414 que no debería estar allí.",
      premise: "Norma Aldana comienza un turno nocturno en El Silencio del Norte, una residencia aparentemente normal. El reloj marca 04:04, el ascensor sube a un cuarto piso inexistente y una línea negra respira dentro de las paredes. Con Diana, Carlos y los residentes, Norma deberá descubrir qué alimenta la grieta antes de que el edificio aprenda todos sus nombres.",
      entity: "La Grieta del Cuarto Piso",
      taboo: "No respondas si tu nombre suena desde detrás de un espejo y no cruces la Puerta 414 sin saber qué has olvidado.",
      truth: "El edificio fue construido sobre una fractura de memoria que se alimenta de nombres, reflejos, sonidos y recuerdos ajenos. La puerta 414 no conduce a un lugar: conduce a una versión del tiempo que el edificio intenta conservar.",
      authorNote: "Horror institucional, cotidiano y progresivo. Mantén la residencia reconocible: desinfectante, turnos, ascensores, sillas de ruedas y protocolos. El terror debe crecer a partir de pequeñas reglas que luego se vuelven arquitectura.",
      aiInstructions: "Actúa como narrador de horror arquitectónico y psicológico. Respeta las reglas del edificio, conserva la agencia del jugador y no conviertas a los residentes en simple decorado. La grieta altera tiempo, nombres, sonido y memoria. Las soluciones requieren silencio, cuidado y cooperación, no solo violencia.",
      plotEssentials: [
        "Norma Aldana es auxiliar nocturna recién llegada a la residencia El Silencio del Norte.",
        "Diana, Carlos, Olalla y Berta forman el núcleo de supervivientes y testigos.",
        "El ascensor A muestra un cuarto piso inexistente y la puerta 414 aparece cuando el edificio cambia.",
        "La línea negra respira en paredes y juntas; mirarla directamente atrae su atención.",
        "El reloj 04:04, las campanas y la frecuencia 4.14 marcan el avance de la grieta.",
        "El Evangelio del Nombre Devorado contiene reglas fragmentarias, no una explicación completa.",
        "La grieta se alimenta de nombres repetidos, fotografías, ruido y recuerdos sin dueño.",
        "La salida exige sellar el foco, devolver los recuerdos y dejar que el silencio vuelva a ser natural."
      ],
      rules: [
        "Cuando el reloj parpadee, no enciendas luces.",
        "Si ves la línea negra, baja la cabeza y pasa de largo.",
        "No respondas si tu nombre suena desde detrás de un espejo.",
        "Si el espejo no parpadea, corre.",
        "Nadie sube solo y nadie baja entero.",
        "Las puertas entreabiertas son las únicas que no devoran.",
        "No repitas un nombre más de tres veces.",
        "Nunca confíes en un edificio que sabe tu nombre.",
        "Cada hora, una campana; cada superficie, una sombra.",
        "Una nota pura en metal hueco puede ser garganta para la grieta.",
        "El agua blanca canta y el hierro la amplifica.",
        "El metal que canta se silencia con madera que late.",
        "Las fotografías quedan prohibidas; todo registro debe ser escrito o dictado.",
        "El relato viejo sacia la grieta: los recuerdos ajenos pueden servir de transfusión.",
        "El nombre perdido nunca se repite.",
        "En la hora del eco, responde con silencio mayor.",
        "Las memorias huérfanas se queman en sombra y ruido.",
        "Donde falta un nombre, se siembra un silencio fértil."
      ],
      opening: "Norma Aldana empuja la puerta giratoria de El Silencio del Norte una noche de diciembre. El reloj digital de recepción parpadea 04:04 aunque su móvil marca las 19:52. La gerente le entrega las llaves, sonríe demasiado y le advierte que no use el móvil en los pasillos.\n\nLos ascensores muestran A y B. El B está apagado. El A abre sus puertas con un jadeo hidráulico; dentro, el espejo ahumado parece fundir los rostros con el fondo. En la primera ronda, una línea negra aparece en la pared, tan fina como un pelo, y parece respirar.\n\nEn una carpeta de incidencias encuentra un folio gris, chamuscado y sin fecha: «No contestes si tu nombre suena desde detrás del espejo. Cuando el reloj parpadee, no enciendas luces. Si ves la línea negra, baja la cabeza y pasa de largo».\n\nEntonces el ascensor A vuelve a abrirse. Está vacío. Todos sus botones están apagados salvo uno: 4. En la residencia no existe ningún cuarto piso.",
      initialState: {
        location: "Recepción de El Silencio del Norte",
        time: "Turno de tarde · 19:52",
        objective: "Sobrevive a la primera ronda y descubre qué es la Puerta 414.",
        inventory: [
          { id: "norma-keys", name: "Llaves de la residencia", description: "Abren las zonas de personal, pero ninguna llave reconoce la puerta 414." },
          { id: "incident-folder", name: "Carpeta de incidencias", description: "Contiene advertencias sin fecha y una hoja firmada con una inicial que Norma no recuerda." },
          { id: "blue-agenda", name: "Agenda celeste", description: "Cuaderno para registrar nombres, horarios y aquello que el edificio intenta borrar." },
          { id: "small-radio", name: "Radio portátil", description: "Carlos la usa para captar la frecuencia 4.14 y detectar cambios en el edificio." }
        ]
      },
      storyCards: [
        { id: "norma-aldana", title: "Norma Aldana", type: "protagonista", keys: ["norma", "aldana", "auxiliar", "turno", "residencia"], content: "Auxiliar de geriatría que empieza a trabajar en El Silencio del Norte. Tiene una relación antigua con el edificio que todavía no recuerda y aprende a convertir el cuidado en resistencia.", clue: "Norma reconoce reglas que nunca ha leído y su memoria parece tener una habitación cerrada." },
        { id: "diana", title: "Diana", type: "aliada", keys: ["diana", "fotografía", "hija", "madre", "cámara"], content: "Trabajadora y testigo que documenta las anomalías hasta comprender que las fotografías alimentan la grieta. Su relación con Berta será una de las anclas humanas del expediente.", clue: "Diana debe elegir entre conservar pruebas o destruir las imágenes para proteger a los residentes." },
        { id: "carlos", title: "Carlos", type: "aliado", keys: ["carlos", "radio", "frecuencia", "4.14", "sonido"], content: "Interpreta la frecuencia 4.14 y descubre que la radio no recibe una emisora, sino conversaciones adelantadas del edificio.", clue: "La frecuencia 4.14 aparece cada vez que una puerta cambia de lugar." },
        { id: "olalla", title: "Olalla", type: "aliada", keys: ["olalla", "enfermera", "turno", "superviviente"], content: "Conoce protocolos, horarios y cambios de conducta de la residencia. Sabe cuándo un residente ha sido sustituido por una memoria del edificio.", clue: "Olalla conserva un horario de guardias que no coincide con ningún calendario humano." },
        { id: "berta", title: "Berta", type: "residente", keys: ["berta", "anciana", "hospital", "memoria", "cuento"], content: "Residente vinculada al ascensor y a un recuerdo familiar. Puede recordar el edificio como una pesadilla o como un cuento heredado, según qué nombres sobrevivan.", clue: "Berta recuerda el ascensor sin llamarlo por el nombre que la grieta espera." },
        { id: "climent", title: "Climent", type: "testigo", keys: ["climent", "anciano", "evangelio", "nombre", "silla"], content: "Anciano que conoce fragmentos del Evangelio del Nombre Devorado y ha visto a residentes volver con recuerdos que no les pertenecen.", clue: "Climent sabe que el cuarto piso existió antes de que la residencia tuviera tres plantas." },
        { id: "black-line", title: "La línea negra", type: "fenómeno", keys: ["línea", "negra", "pared", "grieta", "respira"], content: "Trazo vivo que aparece en paredes, techos y rodapiés. No debe mirarse directamente; aprende de quien intenta medirlo.", clue: "La grieta no se expande por espacio: se expande por atención." },
        { id: "door-414", title: "La Puerta 414", type: "umbral", keys: ["puerta", "414", "cuarto", "ascensor", "piso"], content: "Puerta que aparece en el cuarto piso imposible. No conduce siempre al mismo momento y puede devolver a alguien con un nombre diferente.", clue: "La puerta 414 conecta la residencia presente con una versión del edificio que aún no ha terminado de morir." },
        { id: "evangelio", title: "Evangelio del Nombre Devorado", type: "documento", keys: ["evangelio", "reglas", "nombre", "manual", "libro"], content: "Conjunto de reglas orales y escritas que describen cómo callar, recordar y sellar la grieta. El libro cambia cuando alguien lo lee desde dentro.", clue: "El evangelio no explica cómo vencer a la grieta; explica qué no debes alimentar." },
        { id: "frequency-414", title: "Frecuencia 4.14", type: "fenómeno", keys: ["frecuencia", "4.14", "radio", "señal", "campana"], content: "Señal captada por Carlos. Contiene voces, campanas y conversaciones adelantadas; también puede servir para localizar el foco metálico.", clue: "El edificio responde al sonido antes de que el sonido exista." },
        { id: "silencio-norte", title: "El Silencio del Norte", type: "lugar-entidad", keys: ["silencio", "norte", "residencia", "edificio", "paredes"], content: "Residencia de ancianos, institución cotidiana y organismo arquitectónico. Aprende nombres, cambia plantas y retiene recuerdos.", clue: "El edificio no está poseído: está recordando de una forma que consume a sus habitantes." },
        { id: "final-seal", title: "El sellado", type: "decisión", keys: ["sellar", "demolición", "cemento", "silencio", "final"], content: "El final exige elegir qué recuerdos devolver, qué nombres dejar descansar y cómo sellar el foco sin convertir el silencio en otra prisión.", clue: "Cerrar la grieta no significa borrar la historia: significa impedir que siga alimentándose de ella." }
      ],
      progression: [
        { at: 18, location: "Pasillos del Piso 1", objective: "Completa la primera ronda sin responder a la voz del espejo." },
        { at: 38, location: "Ascensor A / Piso 4", objective: "Descubre por qué aparece el botón 4 y qué oculta la Puerta 414." },
        { at: 58, location: "Escaleras y nivel −4", objective: "Sigue la frecuencia 4.14 hasta el foco de la grieta." },
        { at: 78, location: "Residencia invertida", objective: "Protege los nombres de los residentes mientras el edificio cambia de tiempo." },
        { at: 96, location: "Área de demolición", objective: "Decide qué memoria conservar y cómo sellar el edificio sin alimentar el eco." }
      ],
      chapters: [
        { title: "El anciano que olvidó morir", objective: "Completa la primera ronda y registra la línea negra sin mirarla directamente." },
        { title: "Diana y la fotografía de nadie", objective: "Descubre quién aparece en las fotografías que no recuerdan haber tomado." },
        { title: "Carlos intercepta la frecuencia 4.14", objective: "Localiza el patrón de la radio y escucha sin responder a la voz adelantada." },
        { title: "El ascensor que respira", objective: "Sube o no subas al cuarto piso: el edificio ya sabe que lo has visto." },
        { title: "La cinta de seguridad", objective: "Revisa las grabaciones y encuentra el primer turno que la residencia borró." },
        { title: "El evangelio oral", objective: "Reúne las reglas transmitidas por Climent antes de que cambien de boca." },
        { title: "El visitante que no firma", objective: "Identifica al residente que no aparece en ningún registro." },
        { title: "Climent recuerda", objective: "Decide qué recuerdo de Climent puede usarse como ancla." },
        { title: "El pasillo se reinicia", objective: "Encuentra la puerta entreabierta que no devora y rompe el ciclo del corredor." },
        { title: "Señales falsas", objective: "Distingue las instrucciones de la grieta de las advertencias humanas." },
        { title: "Normas para sobrevivir", objective: "Escribe un protocolo que no dependa de repetir nombres." },
        { title: "La llamada desde las escaleras", objective: "Responde con silencio a la voz que te llama desde el nivel inferior." },
        { title: "El turno de la noche invertida", objective: "Organiza los turnos mientras la residencia cambia las horas." },
        { title: "El soplo del mediodía", objective: "Atraviesa la luz sin permitir que el sol convenza a nadie de que todo terminó." },
        { title: "La hora en que los espejos callan", objective: "Protege los reflejos y descubre qué superficie oculta la entrada real." },
        { title: "La luz que no proyecta sombras", objective: "Investiga la luz sin sombra y evita que el edificio convierta la claridad en trampa." },
        { title: "Las luces que susurran nombres", objective: "Apaga las luces correctas y conserva los nombres que aún pertenecen a sus dueños." },
        { title: "El día sin tiempo", objective: "Alinea los relojes sin devolverle al edificio el minuto que está buscando." },
        { title: "Los ecos del metal", objective: "Localiza la campana y descubre qué material puede silenciarla." },
        { title: "La memoria que aún respira", objective: "Devuelve los recuerdos ajenos sin alimentar la grieta con tu propia identidad." },
        { title: "La noche sin nombres", objective: "Cruza el vestíbulo sin pronunciar el nombre perdido." },
        { title: "El alba de las puertas mudas", objective: "Abre solo las puertas que han aprendido a callar." },
        { title: "Paredes que aprenden a callar", objective: "Sella las juntas y deja un epitafio en el material que la grieta no domina." },
        { title: "Ecos que no encuentran puerta", objective: "Regresa al mundo exterior sin convertir la residencia en una memoria huérfana." },
        { title: "Donde el óxido sueña con volver", objective: "Comprueba si el foco sigue vivo bajo el bosque y decide qué merece ser recordado." },
        { title: "El silencio que no devora", objective: "Cierra la grieta y permite que el silencio vuelva a ser solamente sombra natural." }
      ],
      chapterScenes: [
        "El reloj 04:04 parpadea sobre la recepción mientras alguien olvida morir en una habitación cerrada.",
        "Diana encuentra una fotografía donde aparece una persona que nadie recuerda haber conocido.",
        "La radio escupe la frecuencia 4.14 y una voz pronuncia una respuesta antes de que llegue la pregunta.",
        "El ascensor abre su cabina hacia un piso que no existe; el espejo ahumado tarda demasiado en devolverte el rostro.",
        "La cinta de seguridad muestra un turno nocturno que continúa aunque todos sus trabajadores estén muertos.",
        "Climent recita una regla que no figura en el libro y la residencia apaga una luz al escucharla.",
        "Un visitante atraviesa la recepción sin firmar; las placas de los residentes empiezan a cambiar.",
        "El recuerdo de Climent aparece en una pared húmeda, escrito con una letra que todavía no ha aprendido.",
        "El pasillo vuelve a empezar detrás de la misma puerta, pero una de sus luces se ha quedado sin sombra.",
        "Las señales falsas conducen a habitaciones correctas con nombres equivocados.",
        "Norma escribe normas para sobrevivir y descubre que algunas ya estaban escritas en su agenda.",
        "Desde las escaleras, una voz llama a cada superviviente por un nombre que no debe repetirse.",
        "El turno de noche se invierte: quienes duermen patrullan y quienes patrullan aparecen en sus camas.",
        "La luz del mediodía entra por las ventanas, pero no proyecta sombras sobre ninguna de las sillas.",
        "Los espejos callan al mismo tiempo. En ese silencio, la Puerta 414 queda completamente visible.",
        "Una claridad sin origen atraviesa el vestíbulo y deja a las personas intactas, pero no a sus sombras.",
        "Las luces susurran nombres desde los techos; apagar una salva a alguien y borra a otro del registro.",
        "El reloj se detiene en 05:45 mientras los relojes de pulsera continúan avanzando hacia una hora imposible.",
        "La campana se silencia, pero el metal conserva la vibración como si el edificio tuviera memoria muscular.",
        "Los recuerdos respiran dentro de las paredes y piden ser devueltos a quienes los perdieron.",
        "El vestíbulo queda sin nombres, sin relojes y sin una sola superficie que refleje el cuerpo.",
        "Las puertas mudas se abren una por una; detrás de cada una hay una versión más antigua del mismo amanecer.",
        "Las paredes aprenden a callar cuando las juntas reciben un epitafio que no pertenece a ningún muerto.",
        "La residencia queda atrás y el eco intenta encontrar una puerta en el hospital comarcal.",
        "Bajo el bosque, el óxido sueña con regresar a la residencia a través del cemento recién vertido.",
        "El silencio final no devora segundos ni nombres: por primera vez, la oscuridad es solamente sombra."
      ],
      banks: {
        sensory: [
          "El olor a desinfectante y sopa recalentada se mezcla con un rastro mineral que parece salir de dentro de los muros.",
          "Los fluorescentes zumban con un ritmo que coincide con el parpadeo del reloj.",
          "El espejo ahumado devuelve los rostros como si estuviera recordándolos desde muy lejos.",
          "Una corriente fría recorre el pasillo aunque todas las ventanas están cerradas.",
          "La residencia queda demasiado silenciosa, como si esperara una orden para volver a ser un edificio."
        ],
        investigate: [
          "La incidencia está escrita con dos caligrafías que ocupan el mismo trazo.",
          "El número que falta entre dos habitaciones aparece en el reflejo, no en la pared.",
          "La radio encuentra la frecuencia 4.14 justo cuando una puerta cambia de sitio.",
          "Bajo la pintura hay una capa de cemento antiguo con nombres raspados a mano."
        ],
        action: [
          "El ascensor responde antes de que pulses el botón y desciende hacia un nivel que no figura en el panel.",
          "La puerta cede, pero el sonido de la cerradura llega desde el otro extremo del edificio.",
          "La línea negra se retrae un milímetro y deja una humedad oscura sobre tu guante.",
          "El material vibra bajo tu mano: no es una pared, sino algo que está intentando parecer una."
        ],
        social: [
          "La respuesta llega en voz baja y termina con un nombre que el interlocutor jura no haber pronunciado.",
          "Berta te mira como si te reconociera de una fotografía que todavía no existe.",
          "Carlos baja el volumen de la radio; la voz continúa oyéndose desde la pared.",
          "Olalla responde con un protocolo y el edificio contesta cambiando la hora."
        ],
        continue: [
          "La campana suena una vez. Después, todas las puertas del pasillo se entreabren al mismo tiempo.",
          "El reloj pierde un minuto y la residencia gana un pasillo.",
          "Algo arrastra una silla en la planta superior, aunque no existe ninguna planta superior.",
          "El silencio se prolonga hasta que una voz dice tu nombre desde detrás del espejo."
        ],
        revelation: [
          "Comprendes que la grieta se alimenta de atención, no de espacio: cuanto más la observas, más aprende.",
          "El edificio no conserva a los muertos; conserva sus versiones posibles.",
          "La puerta 414 no está en el cuarto piso. El cuarto piso está dentro de la puerta.",
          "El último protocolo no exige vencer a la grieta, sino dejar de darle nombres con los que continuar."
        ]
      }
    },
    {
      id: "vision-carmesi",
      schemaVersion: 1,
      title: "Visión Carmesí",
      subtitle: "El arte es un virus que aprende a mirar.",
      label: "EXPEDIENTE TRANSNACIONAL",
      category: "contemporary",
      sigil: "◉",
      accent: "#cf4051",
      setting: "Marsella · Nápoles · Tijuana · Osaka · Medellín",
      difficulty: "Alta",
      duration: "180–360 min",
      tags: ["brote", "arte", "espejos", "ciudades", "supervivencia"],
      summary: "Un brote visual, fúngico y lingüístico conecta cinco ciudades a través de una señal que siempre llega a las 06:06.",
      premise: "Franck Lafargue despierta bajo un mural cuyo ojo se abre desde dentro. En Nápoles, Isabella Gallo combate una plaga de esporas; en Tijuana, La Zeta descubre una lengua capaz de matar; en Osaka, Yuto Tanaka persigue espejos que ya no reflejan el mundo; y en Medellín, Camila controla una red que alimenta el espectáculo. Todos forman parte de una obra carmesí que debe cerrarse antes de que el planeta se convierta en su lienzo.",
      entity: "El Brote Carmesí",
      taboo: "No alimentes la red con imágenes, palabras o reflejos sin comprobar qué está mirando desde el otro lado.",
      truth: "El brote no es una infección única: es una inteligencia distribuida que traduce arte, esporas, lenguaje, datos y espejos en una misma puerta. La señal 06:06 coordina sus nodos y cada superviviente puede ser pincel, portador o cierre.",
      authorNote: "Horror cósmico transnacional con textura urbana, científica y metaficcional. Mantén cada ciudad reconocible y haz que las imágenes, los sonidos y los materiales tengan consecuencias físicas.",
      aiInstructions: "Narra como un director de horror coral. Alterna tensión física, investigación y decisiones morales. Respeta las reglas del brote: arte, audio, lenguaje, esporas y reflejos forman una red.",
      plotEssentials: [
        "Franck El Pintor Lafargue descubre que sus murales pueden abrir puertas y dar forma a criaturas.",
        "Clara sobrevive a la primera visión con los ojos dañados y desarrolla una percepción que no depende de mirar.",
        "Isabella Gallo y Riccardo Greco investigan el brote fúngico y desarrollan la cepa carmesí β-1Ω.",
        "La Zeta y Micaela Mik descubren una frase capaz de convertir el lenguaje en arma.",
        "Yuto Tanaka persigue el espejo maestro que conecta Osaka con las demás ciudades.",
        "Camila La Hacker mantiene una red que convierte el morbo colectivo en energía para el brote.",
        "La señal 06:06 anuncia visiones, cruces y cambios de fase del fenómeno.",
        "El cierre requiere coordinar silencio, resina, ciencia, arte y renuncia al espectáculo."
      ],
      rules: [
        "La señal 06:06 marca un nodo activo o una visión a punto de cumplirse.",
        "El silencio no es ausencia: puede inhibir la replicación del brote.",
        "Los murales y símbolos incompletos pueden convertirse en puertas.",
        "El triángulo incompleto identifica una conexión entre nodos.",
        "Las imágenes, el audio, el lenguaje y los reflejos forman una misma red.",
        "No mires un reflejo que tarda demasiado en devolverte la mirada.",
        "Toda retransmisión de violencia alimenta la infraestructura del brote.",
        "La frase correcta puede matar; una palabra deformada puede devolver el golpe.",
        "Las esporas reconocen al huésped antes de que el huésped las vea.",
        "La cepa carmesí β-1Ω puede devorar filamentos verdes, pero también necesita un portador.",
        "El brote aprende de cada superficie que toca.",
        "Una puerta visual siempre exige un precio físico o mental.",
        "No confíes en una visión solo porque todavía no ha sucedido.",
        "Para cerrar un nodo hay que coordinar color, sonido, materia o silencio.",
        "El espectáculo mantiene viva a la entidad aunque el público ignore su existencia.",
        "Cerrar la puerta no garantiza que el virus no cambie de lienzo."
      ],
      opening: "Prólogo — Las ciudades no duermen. A las 00:06, Marsella, Nápoles, Tijuana, Osaka y Medellín reciben una señal que no viaja por ninguna red conocida. Un ojo pintado se abre desde dentro de un mural; una espora queda suspendida bajo una linterna; una frase hace caer a una mujer; un reflejo deja de imitar a su dueño; una aplicación muestra un mensaje sin remitente: «Estás en línea. ¿Listos todos?».\n\nHoras después, Franck Lafargue despierta bajo el ojo cerrado de un mural en el puerto viejo de Marsella. Una criatura se forma en el aire, una mujer pierde la vista y la tiza roja de Franck convierte la pared en una puerta. Al otro lado, algo aprende su nombre. En el teléfono aparece la primera notificación: «06:06 — VISIÓN 2 LISTA».\n\nLa señal no pertenece a una ciudad. Las ciudades pertenecen a la señal.",
      initialState: {
        location: "Puerto Viejo de Marsella · mural del ojo cerrado",
        time: "01/10/2025 · 05:17",
        objective: "Sobrevive al primer mural y descubre qué activa la señal 06:06.",
        inventory: [
          { id: "red-chalk", name: "Tiza roja", description: "La herramienta con la que Franck trazó el primer marco." },
          { id: "spray-black", name: "Aerosol negro", description: "Pintura que reacciona ante símbolos incompletos." },
          { id: "field-phone", name: "Teléfono sin remitente", description: "Recibe visiones con la marca 06:06." },
          { id: "pocket-notebook", name: "Cuaderno de nodos", description: "Registra ciudades, colores, frases, espejos y portadores." }
        ]
      },
      storyCards: [
        { id: "franck", title: "Franck El Pintor Lafargue", type: "protagonista", keys: ["franck", "pintor", "lafargue", "marsella", "mural"], content: "Artista callejero de Marsella. Sus trazos pueden contener o liberar criaturas y su deseo de crear lo convierte en instrumento del brote.", clue: "Franck debe decidir si el arte sirve para dominar la visión o para renunciar a ella." },
        { id: "clara", title: "Clara", type: "testigo", keys: ["clara", "ciega", "niña", "ojos", "canción"], content: "Superviviente de la primera manifestación. Sus ojos quedan dañados, pero percibe ritmos y presencias que los demás no pueden ver.", clue: "Su canción puede mantener a raya a ciertas criaturas." },
        { id: "isabella", title: "Isabella Gallo", type: "científica", keys: ["isabella", "gallo", "doctora", "nápoles", "hongo"], content: "Investigadora que convierte el brote fúngico en una guerra de cepas.", clue: "La cepa carmesí puede ser tratamiento, arma o puerta." },
        { id: "riccardo", title: "Riccardo Greco", type: "portador", keys: ["riccardo", "greco", "hospital", "ferry", "esporas"], content: "Médico atrapado en el hospital convertido en cuerpo vivo. Lleva una ampolla y una fecha límite.", clue: "Puede llevar el contrafuego lejos del hospital o convertirse en su antena." },
        { id: "zeta", title: "La Zeta", type: "agente", keys: ["zeta", "tijuana", "asesina", "lengua", "glock"], content: "Operadora de Tijuana que descubre que una frase puede matar a una ciudad.", clue: "El silencio puede ser su arma más precisa." },
        { id: "mik", title: "Micaela Mik", type: "aliada", keys: ["mik", "micaela", "dj", "audio", "bocina"], content: "Técnica de audio que manipula frecuencias y grabaciones para invertir una orden.", clue: "Cada reproducción deja una huella en la red." },
        { id: "yuto", title: "Yuto Tanaka", type: "detective", keys: ["yuto", "tanaka", "osaka", "detective", "espejo"], content: "Detective de Osaka que persigue un espejo capaz de mostrar varias ciudades a la vez.", clue: "Debe cerrar la puerta aunque al otro lado conserve un rostro amado." },
        { id: "camila", title: "Camila La Hacker", type: "antagonista", keys: ["camila", "hacker", "medellín", "app", "red"], content: "Opera una plataforma que retransmite violencia y convierte la atención global en energía.", clue: "Cerrar la red puede salvar ciudades, pero deja copias preparadas para reaparecer." },
        { id: "crimson-bloom", title: "El Brote Carmesí", type: "entidad", keys: ["brote", "carmesí", "virus", "hongo", "red"], content: "Inteligencia distribuida que traduce materia, imagen, lenguaje, datos y reflejos en una arquitectura de contagio.", clue: "No quiere destruir el mundo: quiere convertirlo en una obra que pueda seguir mirando." },
        { id: "incomplete-triangle", title: "El triángulo incompleto", type: "símbolo", keys: ["triángulo", "símbolo", "nodo", "hexágono", "pintura"], content: "Marca repetida en murales, hongos, pantallas y espejos.", clue: "Cuando el centro se vuelve rojo, el nodo está listo para cruzar." },
        { id: "vision-606", title: "La señal 06:06", type: "fenómeno", keys: ["06:06", "visión", "hora", "mensaje", "señal"], content: "Cuenta atrás, aviso y latido universal.", clue: "Las fechas de las visiones pueden llegar antes que sus causas." },
        { id: "master-mirror", title: "El espejo maestro", type: "umbral", keys: ["espejo", "puerta", "reflejo", "osaka", "marsella"], content: "Nodo óptico que superpone ciudades y permite que la entidad use una superficie como entrada global.", clue: "Romperlo no basta: hay que impedir que otro público vuelva a mirarlo." }
      ],
      progression: [
        { at: 18, location: "Marsella · murales vivos", objective: "Contén la primera criatura y descubre el triángulo incompleto." },
        { at: 38, location: "Nápoles · Ospedale dei Pellegrini", objective: "Comprende la relación entre esporas, color y la cepa carmesí." },
        { at: 58, location: "Tijuana · frontera de las voces", objective: "Desarma la frase que convierte el lenguaje en arma." },
        { at: 78, location: "Osaka · espejo maestro", objective: "Cierra el nodo que superpone las cinco ciudades." },
        { at: 96, location: "Marsella · dique seco número cuatro", objective: "Coordina ciencia, silencio, resina y renuncia para cerrar la obra." }
      ],
      chapters: [
        { title: "El ojo cerrado", objective: "Sobrevive al primer mural y descubre que la ciudad puede mirar." },
        { title: "Visión 2 lista", objective: "Sigue el símbolo hasta el viaducto y comprueba quién lo está dibujando." },
        { title: "El mural que respira", objective: "Escapa de las criaturas nacidas de la pintura y protege a Clara." },
        { title: "La trampa fluorescente", objective: "Construye un recinto capaz de contener más de una pesadilla." },
        { title: "La niña sin ojos", objective: "Acompaña a Clara y descubre por qué su canción altera a los monstruos." },
        { title: "La ciudad pintada", objective: "Cruza las alcantarillas mientras Marsella se convierte en lienzo." },
        { title: "El hambre del artista", objective: "Decide si seguir pintando te convierte en autor o en herramienta." },
        { title: "La cepa Gallo", objective: "Investiga el brote verde antes de que el hospital deje de ser humano." },
        { title: "Lluvia de esporas", objective: "Aísla la infección y encuentra un contrafuego que no sea otra plaga." },
        { title: "El vuelo carmesí", objective: "Lleva la solución fuera del hospital sin convertirla en una nueva antena." },
        { title: "El hospital-cuerpo", objective: "Sobrevive al ala pediátrica y recupera la ampolla antes de las 06:06." },
        { title: "El ferry de las voces", objective: "Escucha la voz coral y decide dónde sembrar las semillas para espejo." },
        { title: "El laboratorio de Bagnoli", objective: "Crea la cepa carmesí β-1Ω y acepta su precio biológico." },
        { title: "El último aliento verde", objective: "Contén Nápoles mientras el contrafuego cambia la paleta del brote." },
        { title: "La lengua nueva", objective: "Descubre qué palabra puede decapitar a una ciudad." },
        { title: "Gramática de la violencia", objective: "Invierte la orden antes de que la multitud la pronuncie a la vez." },
        { title: "El matadero de tinta", objective: "Entra en el nodo industrial y localiza el centro rojo del símbolo." },
        { title: "La voz más mortífera", objective: "Protege la grabación capaz de silenciar el mural vivo." },
        { title: "El silencio como bala", objective: "Cruza la frontera sin dejar que el lenguaje encuentre un nuevo público." },
        { title: "Sonora roja", objective: "Recupera la carga y prepara el viaje hacia el espejo maestro." },
        { title: "Rumbo a Marsella", objective: "Llega al punto de convergencia sin perder la voz ni el silencio." },
        { title: "El detective del espejo", objective: "Sigue las apariciones de Sayaka y encuentra la puerta de Osaka." },
        { title: "El nodo maestro", objective: "Usa el mayor reflejo de la ciudad para cerrar la primera superposición." },
        { title: "El depósito de Kobe", objective: "Aísla los espejos industriales antes de que reproduzcan el cruce." },
        { title: "El mar de espejos", objective: "Resiste la visión del océano y decide qué reflejo merece sobrevivir." },
        { title: "La carga de resina", objective: "Traslada el contrafuego y la materia de cierre hasta Marsella." },
        { title: "Cerrar red", objective: "Apaga la plataforma que convierte el morbo público en combustible." },
        { title: "El disco blanco", objective: "Sella el mural y verifica que el centro ya no tenga pupila." },
        { title: "Mañana, vitrales", objective: "Lleva a los supervivientes a París para cerrar el último nodo de luz." },
        { title: "La vidriera ciega", objective: "Cierra la puerta óptica sin alimentar otra imagen memorable." },
        { title: "El expediente archivado", objective: "Comprueba qué quedó fuera de los informes y qué sigue latiendo." },
        { title: "El click del mar", objective: "Decide qué hacer con el último eco que viaja fuera de la red." },
        { title: "La obra invisible", objective: "Acepta que el arte puede sobrevivir sin público y deja de ofrecerle ojos." }
      ],
      chapterScenes: [
        "En Marsella, un ojo pintado se abre desde dentro del mural y una criatura nace del silencio del puerto.",
        "Franck encuentra el triángulo incompleto en los bocetos de Vitreaux; el teléfono anuncia 06:06 y una segunda visión.",
        "Los muros de Marsella revientan en figuras de aerosol mientras Clara camina entre ellas con los ojos ya blancos.",
        "En el hangar abandonado, Franck dibuja una trampa fluorescente que exige sangre, atención y una decisión artística.",
        "Clara canta una ronda infantil y las criaturas se detienen; su ceguera parece haberle dado otro modo de mirar.",
        "Las alcantarillas revelan nombres prohibidos y una ciudad subterránea donde los grafiteros dejaron mitologías vivas.",
        "Franck comprende que el mural no es su obra: es una boca que aprende de cada trazo que él añade.",
        "En el hospital de Nápoles, Isabella descubre que el olor dulce del hongo ya está en los conductos de ventilación.",
        "Una lluvia de esporas cubre la Sanità mientras Isabella inocula su contrafuego en pacientes que quizá ya son antenas.",
        "El helicóptero abandona el hospital con la cepa carmesí y un mapa donde los nodos forman el mismo triángulo.",
        "Riccardo queda aislado en un hospital que respira esporas; el ala pediátrica prepara su propia erupción.",
        "En el ferry, una voz coral habla desde la cabeza de Riccardo y la ampolla late como una pequeña alarma.",
        "Isabella entra en Bagnoli y mezcla micelio verde, proteínas y audio 6-0-6 para fabricar el color que falta.",
        "El fuego carmesí devora el último aliento verde de Nápoles, pero deja una señal dirigida hacia Marsella.",
        "La Zeta descubre en Tijuana una lengua nueva escondida en la tinta; cada sílaba parece un arma cargada.",
        "En el Mercado Hidalgo, Mik graba la orden y la deforma mientras la gramática de la multitud empieza a romperse.",
        "El matadero industrial se abre como un nodo de tinta, sangre y neón; el centro rojo busca una garganta.",
        "Eco entrega una voz capaz de silenciar el mural, pero reproducirla sin cuidado puede propagarla.",
        "La Zeta cruza la frontera con el silencio como única munición y el brote persiguiendo cada palabra que evita.",
        "En Sonora, la carga carmesí cambia de manos entre polvo rojo, radios desafinadas y una ruta clandestina a Europa.",
        "El jet despega hacia Marsella mientras la señal 06:06 anuncia que los tres nodos están listos para cruzarse.",
        "Yuto Tanaka sale de la estación de Osaka y encuentra espejos que reflejan ciudades que todavía no están allí.",
        "Desde el Abeno Harukas, Yuto ve Marsella, Nápoles y Tijuana superpuestas en los cristales de Osaka.",
        "En el astillero de Kobe, los espejos industriales forman una red óptica conectada al puerto y al nodo maestro.",
        "A bordo del Azure Line, Yuto atraviesa un océano de reflejos donde Sayaka pide que abra la última puerta.",
        "La carga llega al Mediterráneo: resina, audio, ampollas y fragmentos de espejo esperan bajo un cielo sin color.",
        "Camila pulsa CERRAR RED y miles de ventiladores se detienen; el espectáculo digital pierde su alimento.",
        "El mural de Marsella queda convertido en un disco blanco sin pupila, pero nadie sabe si el silencio durará.",
        "Los supervivientes llegan a París con una última coordenada: vitrales que pueden ser puerta o cierre.",
        "Ante Notre-Dame, el espejo óptico intenta usar la luz del amanecer; los supervivientes responden con silencio y resina.",
        "El expediente se archiva como incidente industrial, mientras cada superviviente conserva una cicatriz invisible.",
        "En el Mar de Alborán, un click marca seis minutos y seis segundos; la señal encuentra una ruta fuera de Europa.",
        "En Almería, Mik vuelve a pinchar en secreto y el arte sobrevive sin aplausos, esperando que alguien vuelva a mirar."
      ],
      banks: {
        sensory: [
          "El aire mezcla sal, aerosol, ozono y un dulzor de tierra húmeda que parece respirar dentro de la garganta.",
          "Las superficies urbanas laten con un ritmo que no coincide con ningún motor ni corazón humano.",
          "Un color carmesí aparece donde antes solo había sombra y deja una quemadura detrás de los ojos.",
          "La electricidad parpadea como si la ciudad dudara entre apagarse y convertirse en imagen.",
          "El silencio tiene textura: se pega a la piel y oculta un movimiento al otro lado de la pared."
        ],
        investigate: [
          "El mismo triángulo aparece en una pared, una placa de cultivo y un reflejo: no es coincidencia, es una ruta.",
          "La marca 06:06 precede al fenómeno en una ciudad y lo confirma en otra.",
          "La muestra responde igual a un sonido, un símbolo y una mirada.",
          "Los registros de la red muestran que cada espectador aporta energía al nodo activo."
        ],
        action: [
          "El mural se abre como tejido y algo intenta salir por el trazo que acabas de completar.",
          "La sustancia carmesí devora una capa verde, pero deja un pulso en tu piel.",
          "El espejo devuelve un pasillo distinto; cruzarlo cambia la posición de la ciudad al otro lado.",
          "El silencio corta la manifestación durante unos segundos, el tiempo justo para elegir quién queda dentro."
        ],
        social: [
          "La respuesta llega en dos voces: una humana habla primero y la otra repite la frase desde una superficie cercana.",
          "Clara no mira el mural; inclina la cabeza y describe algo que los demás aún no pueden ver.",
          "Mik baja el volumen y la voz continúa, ahora escondida entre tus propios latidos.",
          "Isabella ofrece una solución científica y reconoce que no sabe qué parte de ella ya pertenece al brote."
        ],
        continue: [
          "La señal 06:06 aparece en otra pantalla, aunque nadie la ha encendido.",
          "Una ciudad se calla y otra empieza a emitir el mismo sonido desde sus paredes.",
          "El reflejo tarda un segundo más de lo normal en imitar el movimiento.",
          "En la distancia, una superficie se vuelve blanca y una pupila roja intenta volver a abrirse."
        ],
        revelation: [
          "Comprendes que el brote no viaja por el aire: viaja por la atención que convierte una señal en obra.",
          "Las cinco ciudades son un instrumento y 06:06 es el compás de una puerta que todavía no tiene nombre.",
          "El contrafuego no destruye la entidad; le quita público, color, sonido y superficie hasta dejarla sin escenario.",
          "La última puerta puede cerrarse, pero la obra invisible sigue buscando un espectador que la complete."
        ]
      }
    },
    {
      id: "los-que-miran-desde-el-pozo",
      schemaVersion: 1,
      title: "Los Que Miran Desde el Pozo",
      subtitle: "En Villazul, olvidar también es una forma de mirar.",
      label: "EXPEDIENTE DE VILLAZUL",
      category: "contemporary",
      sigil: "◌",
      accent: "#7189a5",
      setting: "Villazul · pueblo de montaña y pozo central",
      difficulty: "Alta",
      duration: "180–360 min",
      tags: ["pozo", "olvido", "sombras", "campanas", "frecuencia"],
      summary: "Una antropóloga llega a un pueblo que ha olvidado cómo morir y descubre que el pozo escucha los nombres.",
      premise: "Inés Aranda llega a Villazul siguiendo un mensaje anónimo: «Los que miran han despertado de nuevo». El pueblo se curva alrededor de un pozo que no figura en los mapas, un reloj detenido marca las 03:17 y las sombras de algunos habitantes empiezan a desaparecer. Para sobrevivir, Inés deberá entender la herencia de Lucía, descifrar las voces del pozo y mantener una nota sonora antes de que el tercer latido pronuncie su nombre completo.",
      entity: "El Pozo de Villazul",
      taboo: "No mires dentro del pozo ni respondas a una voz que pronuncie tu nombre desde una superficie sin sombra.",
      truth: "El pozo es una boca de memoria que convierte nombres, voces, sombras y olvidos en una arquitectura viva. El pueblo no está embrujado por un fantasma: está construido alrededor de una conciencia que necesita borrar a alguien para recordar el mundo.",
      authorNote: "Horror gótico rural, psicológico y cósmico. Mantén Villazul como un organismo de piedra, niebla, pan, campanas y relojes detenidos. El misterio debe avanzar mediante detalles físicos, silencios y recuerdos contradictorios, no mediante explicaciones rápidas.",
      aiInstructions: "Narra como un expediente de horror gótico con investigación antropológica y tensión metafísica. Respeta la lógica del pozo, las horas imposibles, las sombras ausentes y las frecuencias. La voz, el silencio y el recuerdo deben tener consecuencias verificables.",
      plotEssentials: [
        "Inés Aranda es antropóloga y llega sola a Villazul con linterna, cuaderno y un mensaje sin firma.",
        "Mateo Berzosa fue maestro y conoce fragmentos del Olvido, el reloj detenido y la historia de Lucía.",
        "Sara, la niña sin sombra, aparece en espejos y conserva una relación imposible con el pozo.",
        "Lidia dirige la panadería y transmite instrucciones mediante pan, cintas y escritura cuando la voz no es segura.",
        "La hora 03:17, la campana velada y la palabra VOX marcan los cambios de la fisura.",
        "El pozo crea soles, casas-reflejo, ideogramas y ecos que borran nombres y sombras.",
        "La nota del órgano y las frecuencias graves pueden mantener dormida la grieta, pero también deforman el pueblo.",
        "El cierre exige elegir entre recordar, olvidar, hablar y callar; ninguna opción devuelve intacto a Villazul."
      ],
      rules: [
        "La hora 03:17 no es una hora: es una puerta que vuelve a abrirse.",
        "Si la campana suena detrás del velo negro, no respondas a la siguiente voz.",
        "No mires directamente dentro del pozo cuando la piedra esté tibia.",
        "Una sombra ausente no significa que su dueño esté muerto.",
        "El pozo escucha mejor los nombres pronunciados con miedo.",
        "La palabra VOX aparece allí donde una voz ha sido arrancada.",
        "El pan en espiral puede conservar un recuerdo o esconderlo.",
        "El silencio absoluto alimenta la grieta si no está sostenido por una nota humana.",
        "Las frecuencias por debajo de 50 Hz deforman las puertas y los nombres.",
        "No borres un ideograma sin saber qué recuerdo está sujetando.",
        "Las casas-reflejo repiten lo que sus habitantes intentan olvidar.",
        "El tercer latido aprende de cada sacrificio de sombra.",
        "Una voz puede dividirse en tres: la que llama, la que responde y la que recuerda.",
        "El espejo puede devolver un rostro que todavía no existe.",
        "No confíes en un reloj sin agujas: el tiempo sigue pasando por dentro.",
        "Para cerrar la Boca hay que dejar un nombre sin pronunciar."
      ],
      opening: "Inés Aranda llega a Villazul cuando la carretera deja de figurar en el GPS. El pueblo se aferra a una ladera de piedra verde, rodeado por una niebla que gira en espiral. Un anciano llamado Mateo Berzosa la espera bajo un ciprés y le enseña un reloj de bolsillo detenido en las 03:17.\n\nEn la plaza hay una fuente seca, un torreón sin esfera y una inscripción incompleta: «Nulla vox, nulla lux». En la posada, el espejo devuelve los movimientos con un segundo de retraso. Bajo el campanario, una niña sin sombra dibuja círculos en la grava.\n\nEsa noche, un reloj sin cuerda late dentro de la pared. La campana suena aunque permanece cubierta por un velo negro. En el espejo aparece la niña con un panecillo en espiral y susurra: «Buenas noches, doctora». Inés intenta gritar, pero ha perdido la voz.",
      initialState: {
        location: "Villazul · habitación 7 de la posada",
        time: "Noche de llegada · 03:17",
        objective: "Descubre qué mira desde el pozo y conserva tu nombre.",
        inventory: [
          { id: "field-lantern", name: "Linterna de campo", description: "Ilumina los túneles, aunque a veces proyecta una sombra que no corresponde." },
          { id: "anthropology-notebook", name: "Cuaderno de campo", description: "Mapa de Villazul, notas de rituales y páginas que cambian de orden." },
          { id: "compass", name: "Brújula defectuosa", description: "No apunta al norte: apunta hacia aquello que recuerda tu nombre." },
          { id: "old-recorder", name: "Grabadora de cinta", description: "Puede conservar una voz antes de que el pozo la transforme." }
        ]
      },
      storyCards: [
        { id: "ines-aranda", title: "Inés Aranda", type: "protagonista", keys: ["inés", "ines", "aranda", "antropóloga", "doctora"], content: "Antropóloga que llega a Villazul para investigar un olvido colectivo. Su mirada racional se enfrenta a un pueblo que modifica la memoria de quien lo observa.", clue: "Inés debe decidir qué parte de su identidad está dispuesta a olvidar para que otros recuerden." },
        { id: "mateo-berzosa", title: "Mateo Berzosa", type: "testigo", keys: ["mateo", "berzosa", "maestro", "reloj", "olvido"], content: "Antiguo maestro de escuela. Su reloj detenido en 03:17 le habla con la voz de quienes el pueblo ha borrado.", clue: "Mateo recuerda a Lucía, pero cada recuerdo le cuesta una sombra." },
        { id: "sara", title: "Sara, la niña sin sombra", type: "umbral", keys: ["sara", "niña", "sombra", "espejo", "pan"], content: "Niña que aparece en espejos y junto al campanario sin proyectar sombra. Puede conocer el camino hacia la cámara de las tres voces.", clue: "Sara no es un fantasma: es un recuerdo que todavía está aprendiendo a tener cuerpo." },
        { id: "lidia", title: "Lidia y la panadería", type: "aliada", keys: ["lidia", "panadería", "pan", "horno", "tinta"], content: "Panadera de Villazul que habla poco y transmite instrucciones mediante espirales, cintas y masas que conservan memoria.", clue: "El horno guarda una grabación que el pozo no puede escuchar sin deformarse." },
        { id: "lucia", title: "Lucía", type: "memoria", keys: ["lucía", "lucia", "heredera", "voz", "espejo"], content: "Figura vinculada al origen de la herencia y a la voz que el pozo intenta reconstruir. Puede aparecer como hermana, eco o reflejo vivo.", clue: "Pronunciar su nombre completo puede abrir la puerta que Inés intenta cerrar." },
        { id: "cecilia", title: "La monja Cecilia", type: "guardiana", keys: ["cecilia", "monja", "iglesia", "crucifijo", "sacrificio"], content: "Custodia fragmentos de la liturgia de Villazul entre crucifijos rotos y polvo azul.", clue: "Conoce la diferencia entre silencio ritual y silencio que alimenta la Boca." },
        { id: "reverend-leiva", title: "El diario de Leiva", type: "documento", keys: ["leiva", "diario", "reverendo", "1853", "voz"], content: "Diario que describe el primer Olvido y las formas antiguas de contener el eco del pozo.", clue: "Sus páginas exigen sangre, pero quizá no la sangre que el lector imagina." },
        { id: "villazul", title: "Villazul", type: "lugar-entidad", keys: ["villazul", "pueblo", "plaza", "casas", "montaña"], content: "Pueblo de montaña construido alrededor del pozo. Sus calles se curvan, desaparecen y vuelven cuando alguien pierde un recuerdo.", clue: "La arquitectura del pueblo imita una espiral que conduce hacia dentro." },
        { id: "the-well", title: "El pozo", type: "entidad", keys: ["pozo", "boca", "grieta", "tercer", "latido"], content: "Boca subterránea que escucha voces y fabrica reflejos, soles, casas transparentes e identidades incompletas.", clue: "No necesita que lo mires para saber que has llegado." },
        { id: "clock-317", title: "La hora 03:17", type: "fenómeno", keys: ["03:17", "reloj", "hora", "campana", "tiempo"], content: "Hora detenida en relojes, cartas y campanas. Marca el momento en que una memoria puede ser reescrita.", clue: "Cada repetición acerca la séptima campanada." },
        { id: "three-voices", title: "La Cámara de las Tres Voces", type: "umbral", keys: ["cámara", "tres", "voces", "salmo", "cántico"], content: "Cámara bajo Villazul donde la voz de Lucía y el tercer sol quedan unidos a una perforación reciente.", clue: "Solo puede cerrarse cuando tres voces dejan de competir por el mismo nombre." },
        { id: "quiet-stone", title: "La piedra quieta", type: "objeto", keys: ["piedra", "quieta", "brocal", "ideograma", "frecuencia"], content: "Costra mineral que sella el pozo mientras los ideogramas cambian y el órgano mantiene una nota grave.", clue: "La piedra no está muerta: está conteniendo un latido que busca frecuencia." }
      ],
      progression: [
        { at: 18, location: "Villazul · calles que cambian", objective: "Traza un mapa que sobreviva a la primera noche y sigue la hora 03:17." },
        { at: 38, location: "Villazul · escuela e iglesia vacías", objective: "Descubre quién perdió su sombra y qué voz está escrita bajo el pueblo." },
        { at: 58, location: "Villazul · Cámara de las Tres Voces", objective: "Decide qué recordar antes de que el tercer sol reclame una identidad." },
        { at: 78, location: "Villazul · santuario de la piedra quieta", objective: "Mantén una nota que impida el silencio absoluto y resiste al culto." },
        { at: 96, location: "Villazul · pozo y casas-reflejo", objective: "Cierra el último latido sin regalarle al pozo un nombre completo." }
      ],
      chapters: [
        { title: "La llegada de Inés", objective: "Entra en Villazul y comprende por qué Mateo estaba esperándote." },
        { title: "La calle que no figura", objective: "Cartografía el pueblo sin perderte en una calle que no existe." },
        { title: "Sara y la sombra ausente", objective: "Descubre quién es la niña del espejo y por qué no proyecta sombra." },
        { title: "La panadería de Lidia", objective: "Obtén una advertencia escrita antes de que el horno abra su boca." },
        { title: "El cementerio sin fechas", objective: "Encuentra el pozo y sobrevive al primer recuerdo que intenta borrarte." },
        { title: "Carta devuelta", objective: "Recupera la carta que el pueblo reescribió con una fecha imposible." },
        { title: "La escuela vacía", objective: "Escucha las voces sin cuerpo y descubre qué significa VOX." },
        { title: "La monja de los crucifijos rotos", objective: "Cruza la iglesia y reúne las piezas de la liturgia perdida." },
        { title: "Fragmento en la piedra", objective: "Decide qué fragmento conservar cuando el portal empiece a ensancharse." },
        { title: "El primer olvido", objective: "Elige qué recordar para impedir que la primera grieta abra el cielo." },
        { title: "El eco del nombre", objective: "Baja al pozo y enfrenta la voz de Lucía sin entregarle tu identidad." },
        { title: "La grabación", objective: "Conserva la cinta madre y escucha el latido que queda después del silencio." },
        { title: "Los bizcochos del fondo", objective: "Decide qué recuerdo contiene el pan antes de que lleguen los forasteros." },
        { title: "La liturgia comienza", objective: "Impide que la multitud convierta el pueblo y el pozo en espectáculo viral." },
        { title: "La heredera anterior", objective: "Sigue la palabra VOZ y descubre quién heredó la cicatriz antes que Inés." },
        { title: "El diario de Leiva", objective: "Encuentra el diario de 1853 y recupera el texto que neutraliza el canto." },
        { title: "El día del eclipse", objective: "Sobrevive al segundo sol y decide qué sombra puede sacrificarse." },
        { title: "La canción infantil", objective: "Entona la canción al revés sin perder los recuerdos que te sostienen." },
        { title: "El sueño de no ser", objective: "Negocia con tus recuerdos y decide quién eres cuando nadie puede nombrarte." },
        { title: "El reflejo perdido", objective: "Recupera tu reflejo antes de que los técnicos abran otra perforación." },
        { title: "El lenguaje del silencio", objective: "Descifra los ideogramas durante la Hora Muerta." },
        { title: "La cámara de las tres voces", objective: "Llega al tercer sol y reúne las tres voces sin confundirlas." },
        { title: "El salmo del espejo", objective: "Completa el salmo mientras el agua negra inunda la cámara." },
        { title: "El culto de la piedra quieta", objective: "Detén la liturgia del culto antes de que adore al silencio absoluto." },
        { title: "El órgano de viento continuo", objective: "Mantén una nota grave que estabilice Villazul sin quebrar a sus habitantes." },
        { title: "La nota que devora", objective: "Impide que la frecuencia baje y borre las palabras de la plaza." },
        { title: "La sílaba que falta", objective: "Evita que el culto complete el nombre que la piedra está escribiendo." },
        { title: "Las casas reflejo", objective: "Cruza las siete casas transparentes y devuelve a sus habitantes una sombra." },
        { title: "La nota que se parte en dos", objective: "Bifurca la frecuencia y evita el descenso definitivo hacia 42 Hz." },
        { title: "El último latido", objective: "Cierra la Boca dejando el nombre incompleto y acepta lo que Villazul no podrá recuperar." }
      ],
      chapterScenes: [
        "Inés llega a Villazul y Mateo la recibe con un reloj detenido en 03:17; en el espejo, una niña sin sombra observa desde la cama.",
        "Las calles devuelven a Inés a la plaza mientras una panadera le ofrece un bizcocho que late y una voz repite su nombre.",
        "Sara aparece en el espejo y señala el camino hacia abajo; su sombra sigue ausente incluso cuando el pueblo queda a oscuras.",
        "Lidia abre el horno y el pan en espiral revela una frase que solo puede leerse mientras la campana permanece velada.",
        "El cementerio no tiene fechas y el pozo susurra desde una tumba abierta: «Recuerda olvidar».",
        "Una carta enviada desde Villazul vuelve con matasellos de 1853 y la afirmación de que el pueblo volverá cuando Inés se borre.",
        "La escuela vacía repite VOX en miles de voces sin cuerpo; cada eco arranca un trozo de sombra de la pared.",
        "Cecilia espera entre crucifijos rotos mientras la bóveda se abre a unas constelaciones dispuestas en espiral.",
        "Un fragmento de piedra muestra una escena futura y el portal reclama una decisión antes de dejar pasar la siguiente voz.",
        "El primer olvido abre una grieta en el cielo; Inés debe recordar lo suficiente para que el pueblo no desaparezca con ella.",
        "Dentro del pozo, la sombra de Inés se separa y Lucía extiende una mano de luz y tinta junto a la sexta campanada.",
        "La cinta madre conserva una voz capaz de apagar la plaza, pero bajo el silencio queda un latido que todavía escucha.",
        "Los bizcochos del fondo contienen recuerdos compactados; los golpes de los visitantes anuncian que Villazul ha sido encontrado.",
        "Cámaras, teléfonos y palos selfie llegan a la plaza; la curiosidad viral intenta alimentar otra vez la Boca.",
        "El pájaro negro roba un fragmento con la palabra VOZ y la antigua heredera deja una cicatriz que responde al nombre de Lucía.",
        "En túneles bajo la iglesia, Inés encuentra el diario de Leiva y una palabra capaz de cerrar el canto sin destruir la memoria.",
        "El eclipse convierte la luz en penumbra anticipada y un segundo sol azul asciende desde el pozo con las sombras de los niños.",
        "La canción infantil al revés sostiene la piedra, pero cada nota amenaza con borrar una persona que Inés todavía recuerda.",
        "En el sueño de no ser, Inés negocia con el Niño sin Sombra y con una figura de Leiva que ya no conserva rostro.",
        "Al despertar, Inés no tiene reflejo y los técnicos llegan para perforar la piedra quieta en nombre de una investigación.",
        "Durante la Hora Muerta, ideogramas aparecen sobre la piel de los aldeanos y un latido triple se mueve entre las páginas.",
        "La Cámara de las Tres Voces guarda el tercer sol y una Lucía-espejo mientras la perforación oficial abre una fisura de agua negra.",
        "El Salmo del Espejo completa una línea mientras el túnel se inunda y el fragmento de cristal muestra un Villazul sin grietas.",
        "Los técnicos sin nombre levantan un santuario a la piedra quieta y preparan una liturgia para dejar al pueblo completamente mudo.",
        "Mateo e Inés montan un órgano de viento continuo; la nota grave protege el pozo, pero trastorna a todos los que la escuchan.",
        "El órgano cae por debajo de 50 Hz y empieza a devorar palabras; cada puerta nueva demuestra que la frecuencia está deformando la realidad.",
        "El culto busca la sílaba que falta y el ideograma RA aparece sobre la piedra mientras siete casas se vuelven transparentes.",
        "Las casas reflejo funcionan como lentes: dentro, los habitantes se desvanecen y la escuela parpadea con pupitres llenos de sombras.",
        "Inés divide la nota en dos frecuencias opuestas, pero el nombre EMRA empieza a escribirse solo en polvo plateado.",
        "El órgano se extingue, la piedra se cierra y el último latido queda bajo una corteza que no volverá a ser completamente silenciosa."
      ],
      banks: {
        sensory: [
          "La niebla huele a tierra mojada, óxido viejo y pan demasiado dulce.",
          "Las piedras verdes de Villazul parecen hundirse unos milímetros bajo cada paso.",
          "Un campanario sin esfera respira detrás de su velo negro.",
          "El aire vibra con un tic-tac que no proviene de ningún reloj visible.",
          "La oscuridad del pozo no absorbe la luz: parece estar mirándola."
        ],
        investigate: [
          "El mapa cambia cuando intentas fijar la posición del pozo.",
          "La misma fecha aparece en una tumba, una postal y un documento que todavía no has escrito.",
          "Un ideograma se borra de la piel de un aldeano y reaparece en la piedra quieta.",
          "La frecuencia grave coincide con el pulso de la grieta, pero no con el de ningún corazón humano."
        ],
        action: [
          "La campana suena detrás del velo y todas las sombras del pueblo giran hacia el brocal.",
          "El pozo abre una superficie de agua negra que devuelve un rostro con tu boca.",
          "El órgano cae por debajo de la frecuencia segura y una casa aparece donde antes había una pared.",
          "El silencio se vuelve físico, una presión que intenta arrancarte el nombre de la garganta."
        ],
        social: [
          "Mateo responde como un maestro que ha olvidado a sus alumnos, pero no el miedo que les enseñó.",
          "Lidia señala el horno y escribe una palabra que se borra antes de que puedas leerla.",
          "Sara habla desde el espejo con una voz que parece venir de debajo de la plaza.",
          "Los aldeanos del culto sonríen sin abrir la boca y levantan las manos hacia la piedra."
        ],
        continue: [
          "El reloj marca 03:17 otra vez, aunque la noche ya debería haber terminado.",
          "Una sombra cruza la plaza y nadie puede decir a quién pertenece.",
          "Las casas se vuelven translúcidas durante un parpadeo y muestran habitaciones ocupadas por recuerdos.",
          "Bajo la tierra, un latido aprende a contar hasta tres."
        ],
        revelation: [
          "Comprendes que el pozo no roba recuerdos: fabrica versiones del pueblo que puedan recordarlo por él.",
          "La séptima campanada no anuncia una muerte; anuncia que ya no quedará nadie que pueda nombrarla.",
          "La piedra quieta solo contiene el latido mientras exista una voz humana que no le pertenezca.",
          "El último nombre debe quedar incompleto para que la Boca no pueda pronunciar el mundo entero."
        ]
      }
    },
    {
      id: "el-latido-bajo-la-piedra",
      schemaVersion: 1,
      title: "El Latido Bajo la Piedra",
      subtitle: "La tierra no está dormida. Está esperando que alguien la escuche.",
      label: "EXPEDIENTE GEO-RITUAL",
      category: "contemporary",
      sigil: "◉",
      accent: "#c87955",
      premise: "En los pueblos enfrentados de Quintaluz y El Acebrín, un cráter petrificado y unas aguas mercuriales esconden un latido antiguo. Adrián Cortés, un sacerdote excomulgado, y Marco Medina, un investigador marcado por el líquido de las pozas, deberán decidir si el fenómeno se sella, se estudia o se deja respirar.",
      truth: "La Boca no es un volcán muerto: es la costra de una entidad subterránea que aprendió a latir a través del agua, el fuego y las voces humanas. El Acebrín es su saliva mineral; la Lágrima de Acebrín puede sanar, transformar o abrir una vía. El verdadero peligro no es despertar al Latido, sino convertirlo en recurso explotable.",
      taboo: "No bebas de una poza que refleje un cielo distinto. No respondas al latido con tu nombre. No permitas que una empresa confunda una conciencia geológica con un yacimiento.",
      rules: [
        "La ceniza revela lo que el pueblo intenta ocultar.",
        "El fuego ritual protege, pero cada llama cobra memoria.",
        "El mercurio del Acebrín imita voces y deja una firma bajo la piel.",
        "Nilo el Sellado no tiene boca, pero escucha lo que la piedra no puede decir.",
        "El Latido no es maldad humana: es una escala de vida que no comprende nuestro límite.",
        "La ciencia puede documentar la anomalía, pero explotarla la convierte en hambre.",
        "Toda respuesta al subsuelo debe tener una consecuencia corporal o comunitaria.",
        "La salida más segura protege el agua, a los pueblos y el derecho a no escuchar."
      ],
      opening: "Quintaluz — 3 de octubre, 19:04. Adrián Cortés desciende por una vereda de polvo hacia un cráter petrificado que sirve de plaza al pueblo. Las rocas parecen observarlo. En la posada, Sor Ausencia le dice que la Boca lleva siglos sin abrirse, aunque cada noche alguien oye un golpe profundo bajo la piedra. Bruna de las Cenizas lo llama Portador del Carbón. Nilo el Sellado aparece con una pala de mango quemado y señala tres letras que nadie quiere pronunciar. Entonces, desde el cráter, una voz usa la voz de Adrián: «Cuando ardes, ergo eres». En El Acebrín, a pocos kilómetros, Marco Medina llega siguiendo un mapa que el navegador ha borrado. La botica de Madre Clefa guarda un líquido gris que parece mercurio y una promesa de cura. Dos pueblos, dos sustancias y un mismo latido empiezan a reconocerse.",
      initialState: {
        location: "Quintaluz · plaza de la Boca",
        time: "3 de octubre · 19:04",
        objective: "Descubre qué late bajo la piedra antes de que los pueblos lo conviertan en rito o negocio.",
        inventory: [
          { id: "burned-shovel", name: "Pala de mango quemado", description: "Herramienta marcada por tres letras que aparecen también en la piedra." },
          { id: "coal-relic", name: "Carbón de la Casa del Silencio", description: "Arde sin consumirse del todo y reacciona ante las voces del subsuelo." },
          { id: "field-notebook", name: "Cuaderno de campo", description: "Registra latidos, pozas, testigos y cambios en el agua." },
          { id: "silver-vial", name: "Vial de Lágrima de Acebrín", description: "Líquido gris que parece agua, metal y saliva a la vez." }
        ]
      },
      storyCards: [
        { id: "adrian", title: "Adrián Cortés", type: "protagonista", keys: ["adrián", "adrian", "sacerdote", "excomulgado", "carbón"], content: "Antiguo sacerdote que llega a Quintaluz buscando una explicación para un fuego que oyó en sueños. Su fe se ha roto, pero conserva disciplina, culpa y capacidad de escuchar.", clue: "El Latido usa sus rezos como una gramática que puede abrir o cerrar la Boca." },
        { id: "marco", title: "Marco Medina", type: "investigador", keys: ["marco", "medina", "médico", "investigador", "mercurio"], content: "Investigador atraído por el caso de su hermana y por la química imposible del Acebrín. Tras beber una gota, el agua empieza a responderle desde los espejos.", clue: "Puede convertir la anomalía en evidencia o en una vía para el Latido." },
        { id: "sor-ausencia", title: "Sor Ausencia", type: "guardiana", keys: ["sor ausència", "sor ausencia", "ciega", "matriarca"], content: "Matriarca ciega de Quintaluz. No ve la Boca, pero distingue sus fases por el cambio de presión en los huesos.", clue: "Sabe qué pacto mantiene dormida la piedra y qué precio pagó el pueblo." },
        { id: "bruna", title: "Bruna de las Cenizas", type: "ritualista", keys: ["bruna", "cenizas", "sanadora", "ritual"], content: "Sanadora cubierta de hollín que entiende el fuego como memoria comunitaria.", clue: "Sus cenizas pueden dibujar una frontera, nunca borrar una deuda." },
        { id: "nilo", title: "Nilo el Sellado", type: "testigo", keys: ["nilo", "sellado", "niño", "sin boca"], content: "Niño sin boca que percibe vibraciones y deja mensajes con piedras, agua y gestos.", clue: "Cuando señala una grieta, está indicando dónde el Latido ha empezado a mirar." },
        { id: "madre-clefa", title: "Madre Clefa", type: "apotecaria", keys: ["clefa", "botica", "apotecaria", "lágrima"], content: "Anciana de El Acebrín que conoce las dosis curativas y las dosis que convierten al paciente en recipiente.", clue: "Sus frascos contienen décadas de pactos con el agua." },
        { id: "boca", title: "La Boca", type: "lugar-entidad", keys: ["boca", "cráter", "piedra", "quintaluz"], content: "Cráter volcánico petrificado que sirve de plaza a Quintaluz. Bajo su costra late una presencia que no piensa como un animal.", clue: "La piedra se abre cuando el rito, el agua y la explotación coinciden." },
        { id: "acebrin", title: "El Acebrín", type: "fenómeno", keys: ["acebrín", "acebrin", "pozas", "agua", "mercurio"], content: "Aldea y sistema de corrientes minerales. Su agua deja una película plateada y aprende la voz de quien la bebe.", clue: "No es una cura: es la secreción de algo que está cambiando de escala." },
        { id: "latido", title: "El Latido", type: "entidad", keys: ["latido", "corazón", "subsuelo", "pulso"], content: "Ritmo profundo que atraviesa piedra, agua y organismos. Puede ser una entidad, un órgano planetario o ambas cosas.", clue: "No pide adoración; pide continuidad, y eso puede ser peor." },
        { id: "georrecursos", title: "Georrecursos", type: "antagonista", keys: ["empresa", "prospección", "georrecursos", "ministerio", "perforación"], content: "Consorcio que quiere convertir la anomalía en energía, medicina y propiedad industrial.", clue: "Su lenguaje técnico es otro ritual de apertura." }
      ],
      progression: [
        { at: 16, location: "Quintaluz · Casa del Silencio", objective: "Sobrevive a la Antífona Roja y entiende el pacto de Sor Ausencia." },
        { at: 34, location: "El Acebrín · botica y Lamedales", objective: "Descubre qué hace la Lágrima de Acebrín a un cuerpo humano." },
        { at: 52, location: "Sepulcrum y Piedra Hueca", objective: "Une los dos pueblos y encuentra el registro oculto del primer latido." },
        { at: 70, location: "Soria · Auditorio Provincial", objective: "Impide que la prospección convierta una conciencia geológica en recurso." },
        { at: 88, location: "Barranco del Veinte · Marcha del Latido", objective: "Coordina a la comunidad antes de que la protesta se convierta en ceremonia." },
        { at: 97, location: "Quintaluz · la Boca", objective: "Elige entre sellar, escuchar o explotar el pulso que sostiene la sierra." }
      ],
      chapters: [
        { title: "La Boca petrificada", objective: "Llega a Quintaluz y descubre por qué la piedra conoce tu voz." },
        { title: "El agua que recuerda", objective: "Investiga El Acebrín y el líquido que cambia a Marco." },
        { title: "La Antífona Roja", objective: "Asiste al primer rito y decide qué fuego merece arder." },
        { title: "El espejo mercurial", objective: "Sigue el reflejo de Marco antes de que aprenda su nombre." },
        { title: "La Casa del Silencio", objective: "Interpreta las cenizas que dejó el pacto antiguo." },
        { title: "La garganta de agua", objective: "Encuentra el origen de la saliva plateada." },
        { title: "El fuego sin combustión", objective: "Sobrevive al latido que atraviesa la pira." },
        { title: "Los Lamedales", objective: "Cruza el pantano y recupera el frasco que no puede quedar vacío." },
        { title: "La procesión de ceniza", objective: "Evita que el pueblo confunda obediencia con protección." },
        { title: "La copia del cristal", objective: "Decide si Marco debe destruir su reflejo o escucharlo." },
        { title: "El corazón bajo la iglesia", objective: "Descubre qué hay bajo los muros de la Casa del Silencio." },
        { title: "El camino entre pueblos", objective: "Lleva la señal del Acebrín hasta Quintaluz sin abrir la Boca." },
        { title: "La llama azul", objective: "Usa el fuego frío para separar agua, metal y memoria." },
        { title: "La vuelta de Marco", objective: "Comprueba qué parte de Marco ha regresado del cauce." },
        { title: "La tregua del alba", objective: "Reúne a los testigos antes de que el pueblo niegue lo ocurrido." },
        { title: "La botica de Clefa", objective: "Clasifica las curas y aparta las dosis que crean recipientes." },
        { title: "Rumbo al Sepulcrum", objective: "Busca el archivo que explica el primer sellado." },
        { title: "Nilo y la piedra", objective: "Sigue al niño sin boca hasta el pozo que respira." },
        { title: "La cantera hueca", objective: "Entra en la Piedra Hueca y escucha el origen del eco." },
        { title: "La lluvia sobre Quintaluz", objective: "Protege el pueblo cuando el agua empieza a lavar el pacto." },
        { title: "El río rojo", objective: "Analiza el nuevo cauce antes de que llegue a los campos." },
        { title: "Los hombres de plata", objective: "Enfrenta a la empresa de prospección sin entregarles la verdad." },
        { title: "La Ronda de los Pozos", objective: "Descubre cuántas bocas pequeñas conectan con la Boca mayor." },
        { title: "La denuncia", objective: "Lleva la evidencia a Santa Cruz de la Loma." },
        { title: "El auditorio", objective: "Defiende el agua ante una sala que ya ha firmado la perforación." },
        { title: "El Barranco del Veinte", objective: "Cierra el conducto antes de que el latido use el río." },
        { title: "La Marcha del Latido", objective: "Convierte la resistencia en comunidad sin repetir el rito." },
        { title: "Las veinticuatro horas", objective: "Organiza la vigilancia y decide quién puede acercarse a la piedra." },
        { title: "Madrid escucha", objective: "Presenta la prueba sin permitir que la burocracia la convierta en patente." },
        { title: "La Feria del Latido", objective: "Impide que el horror se transforme en turismo y espectáculo." },
        { title: "Ciencia ciudadana", objective: "Comparte el conocimiento sin entregar el fenómeno a un laboratorio." },
        { title: "El último expediente", objective: "Cierra la vía política que todavía quiere perforar Quintaluz." },
        { title: "La pausa se vuelve pulso", objective: "Decide cómo convivir con una conciencia que sigue respirando bajo la piedra." }
      ],
      chapterScenes: [
        "Adrián llega a Quintaluz, conoce a Sor Ausencia y oye la primera respuesta desde la Boca.",
        "Marco llega a El Acebrín, bebe una gota de la botica y ve una versión ajena de sí mismo en el espejo.",
        "La Antífona Roja cubre el pueblo de máscaras, tambores y un fuego que arde dentro de la garganta.",
        "El reflejo de Marco se retrasa y le devuelve una frase escrita con saliva plateada.",
        "En la Casa del Silencio, el carbón dibuja bajo la ceniza el mapa de un órgano enterrado.",
        "Marco sigue las pozas hasta una cueva donde el agua parece conservar voces de generaciones.",
        "Adrián atraviesa una pira sin consumirse y sale con una llama azul en la mano.",
        "Los Lamedales se abren bajo sus pasos; cada burbuja pronuncia un nombre distinto.",
        "El pueblo prepara nuevas antorchas mientras Bruna advierte que el rito ya no pertenece a sus guardianes.",
        "Marco mira el espejo y comprende que la copia está aprendiendo a respirar.",
        "Las paredes de la iglesia laten y Sor Ausencia revela el precio del antiguo pacto.",
        "Marco camina entre Acebrín y Quintaluz con un cubo que nunca termina de estar vacío.",
        "La llama azul toca el mercurio y ambos forman una escritura viva sobre las manos de Adrián.",
        "El Acebrín despierta con una bruma luminosa; Marco vuelve cambiado, pero todavía humano.",
        "El alba devuelve una calma frágil y los dos protagonistas empiezan a comparar sus pruebas.",
        "Madre Clefa abre la botica y muestra frascos que curaron cuerpos al precio de borrar recuerdos.",
        "Adrián emprende el camino al Sepulcrum con la firma fría del Latido en la palma.",
        "Nilo lleva un saco hasta el pozo y señala una vibración que nadie más puede oír.",
        "Marco desciende al Barranco de la Piedra Hueca y encuentra cables quemados junto a roca viva.",
        "La lluvia limpia Quintaluz, pero las grietas de la Casa del Silencio empiezan a cantar.",
        "El río de la Arquita vuelve a correr con sedimento rojo y una memoria que no estaba en los mapas.",
        "Todoterrenos de Georrecursos entran al pueblo; sus sensores responden al mismo pulso que los rezos.",
        "En la Ronda de los Pozos, pastores y protagonistas descubren que la red subterránea tiene veinticuatro bocas.",
        "La comunidad prepara una denuncia mientras el Latido produce una vibración que apaga los teléfonos.",
        "En el auditorio de Soria, la empresa presenta el horror como una oportunidad energética.",
        "Una tormenta abre el Barranco del Veinte y revela un conducto donde el agua late como un órgano.",
        "La Marcha del Latido reúne a pueblos, científicos y testigos frente a las máquinas detenidas.",
        "Durante veinticuatro horas, la comunidad vigila sin cantar ni perforar; el silencio se vuelve defensa.",
        "En Madrid, el informe geoquímico demuestra que la anomalía no es un yacimiento ordinario.",
        "La Feria atrae visitantes que quieren oír la piedra; los protagonistas deben impedir que la curiosidad abra otra puerta.",
        "En Salamanca, los datos se comparten como ciencia ciudadana y el fenómeno pierde el monopolio de los iniciados.",
        "En el Ministerio, una última orden intenta autorizar la perforación bajo un lenguaje de seguridad nacional.",
        "En el solsticio, Quintaluz escucha el pulso sin obedecerlo: la madre dividida duerme acompañada, no vencida."
      ],
      banks: {
        sensory: ["Ceniza húmeda, metal en la lengua y un golpe profundo que llega antes que el sonido.", "El agua refleja un cielo distinto y deja una película fría bajo la piel.", "La piedra parece tibia cuando nadie la toca.", "El olor de leña apagada convive con un dulzor mineral, casi orgánico.", "La niebla de los Lamedales respira al ritmo de un corazón demasiado grande."],
        names: ["Adrián Cortés", "Marco Medina", "Sor Ausencia", "Bruna de las Cenizas", "Nilo el Sellado", "Madre Clefa", "Marta", "Clara Robles", "Julián Arteaga"],
        places: ["Quintaluz", "El Acebrín", "la Boca", "la Casa del Silencio", "Sepulcrum", "Piedra Hueca", "Río de la Arquita", "Soria", "Madrid"],
        threats: ["El reflejo que aprende", "La perforación de Georrecursos", "La Antífona Roja", "El agua que recuerda", "La Boca abriéndose", "El Latido sin traducción"]
      }
    },
  ];

  function makeCustomScenario(data) {
    const cleanLines = String(data.rules || "")
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, 12);
    const idBase = String(data.title || "escenario")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 45) || "escenario";
    const id = `custom-${idBase}-${Date.now().toString(36)}`;
    const setting = String(data.setting || "Lugar no registrado").trim();
    const entity = String(data.entity || "La Presencia").trim();
    const truth = String(data.truth || "El mundo no funciona como parecía.").trim();
    const taboo = String(data.taboo || "No mirar directamente la anomalía.").trim();

    return {
      id,
      schemaVersion: 1,
      custom: true,
      createdAt: new Date().toISOString(),
      title: String(data.title || "Expediente sin nombre").trim(),
      subtitle: "Un escenario creado en el Estudio 404.",
      label: "EXPEDIENTE PERSONAL",
      category: ["contemporary", "historical", "science"].includes(data.category) ? data.category : "contemporary",
      sigil: "Ø",
      accent: "#b9db6d",
      setting,
      difficulty: "Adaptativa",
      duration: "Libre",
      tags: ["personal", entity.toLowerCase()].slice(0, 4),
      summary: String(data.premise || "Una anomalía altera la realidad conocida.").trim().slice(0, 190),
      premise: String(data.premise || "Una anomalía altera la realidad conocida.").trim(),
      entity,
      taboo,
      truth,
      authorNote: "Horror cósmico gradual, consecuencias concretas y continuidad estricta. Prioriza lo sugerido sobre lo explícito.",
      aiInstructions: "Narra horror cósmico original. Respeta la agencia del jugador, las reglas descritas y el estado estructurado. No resuelvas el misterio sin pruebas. Termina cada respuesta con una tensión o decisión implícita.",
      plotEssentials: [
        `Lugar y época: ${setting}.`,
        `Entidad o fenómeno: ${entity}.`,
        `Tabú central: ${taboo}.`,
        `Verdad oculta: ${truth}.`
      ],
      rules: cleanLines.length ? cleanLines : [taboo, "Toda revelación debe dejar una consecuencia verificable."],
      opening: String(data.opening || "La anomalía comienza con un detalle que nadie más parece advertir.").trim(),
      initialState: {
        location: setting,
        time: "Primera noche · Hora incierta",
        objective: `Comprende la relación entre ${entity} y lo que está ocurriendo.`,
        inventory: [
          { id: "notebook", name: "Cuaderno de campo", description: "Páginas suficientes para registrar aquello que cambie." },
          { id: "light", name: "Linterna", description: "La batería marca un porcentaje que no deja de variar." }
        ]
      },
      storyCards: [
        { id: `${id}-entity`, title: entity, type: "entidad", keys: entity.toLowerCase().split(/\W+/).filter(Boolean), content: truth, clue: `La naturaleza de ${entity} está vinculada a esta verdad: ${truth}` },
        { id: `${id}-taboo`, title: "El tabú", type: "regla", keys: taboo.toLowerCase().split(/\W+/).filter(Boolean), content: taboo, clue: `La advertencia central del expediente dice: ${taboo}` },
        { id: `${id}-setting`, title: setting, type: "lugar", keys: setting.toLowerCase().split(/\W+/).filter(Boolean), content: `El lugar conserva huellas de ${entity} mucho más antiguas que sus habitantes.`, clue: "El escenario fue alterado antes del comienzo de la historia." }
      ],
      progression: [
        { at: 22, location: `${setting} · zona restringida`, objective: "Encuentra una prueba material de la anomalía." },
        { at: 50, location: `${setting} · umbral interior`, objective: `Descubre la regla que limita a ${entity}.` },
        { at: 78, location: `${setting} · punto de convergencia`, objective: "Decide qué estás dispuesto a perder para impedir la manifestación." }
      ],
      banks: {
        sensory: [
          `El aire de ${setting} conserva un olor que no pertenece a este momento.`,
          "Las líneas rectas parecen corregirse cuando apartas la vista.",
          "Un ruido demasiado bajo para oírlo modifica el ritmo de tu respiración.",
          `Durante un segundo, la sombra de ${entity} ocupa un lugar sin objeto.`
        ],
        investigate: [
          "El patrón se repite con una intención que descarta cualquier accidente.",
          "Encuentras una prueba pequeña, física y difícil de explicar.",
          "El detalle observado contradice la versión aceptada de los hechos."
        ],
        action: [
          "El entorno responde de forma indirecta, como si tu acción hubiera activado una regla antigua.",
          "La resistencia cede y deja a la vista una capa de realidad que no estaba destinada a ti.",
          "Algo registra tu decisión. No sabes dónde, pero notas la atención."
        ],
        social: [
          "La respuesta evita cuidadosamente el nombre de la entidad.",
          "Tu interlocutor sabe más de lo que recuerda saber.",
          "Entre las palabras aparece una segunda voz, leve y perfectamente sincronizada."
        ],
        continue: [
          "La escena avanza sin pedir permiso y la anomalía gana terreno.",
          "Un cambio discreto vuelve imposible regresar al estado anterior.",
          "En la distancia, algo adopta la forma correcta por primera vez."
        ],
        revelation: [
          `Una conexión inevitable une ${entity}, el tabú y cada incidente anterior.`,
          `Comprendes una parte de la verdad: ${truth}`,
          "La anomalía no llegó a este lugar. El lugar fue construido alrededor de ella."
        ]
      }
    };
  }

  function validateScenario(input) {
    const errors = [];
    if (!input || typeof input !== "object" || Array.isArray(input)) return ["El archivo no contiene un escenario válido."];
    if (input.schemaVersion !== 1) errors.push("Versión de escenario no compatible.");
    ["id", "title", "premise", "opening", "truth", "taboo"].forEach((key) => {
      if (typeof input[key] !== "string" || !input[key].trim()) errors.push(`Falta el campo obligatorio: ${key}.`);
    });
    if (typeof input.id === "string" && (input.id.length > 120 || !/^[a-z0-9_-]+$/i.test(input.id))) errors.push("El identificador del escenario no es seguro.");
    if (typeof input.title === "string" && input.title.length > 120) errors.push("El título supera el límite permitido.");
    if (!Array.isArray(input.rules)) errors.push("El campo rules debe ser una lista.");
    else if (input.rules.length > 20 || input.rules.some((rule) => typeof rule !== "string" || rule.length > 500)) errors.push("Las reglas no tienen un formato válido.");
    if (!Array.isArray(input.storyCards)) errors.push("El campo storyCards debe ser una lista.");
    else if (input.storyCards.length > 40) errors.push("Hay demasiadas Story Cards (máximo 40).");
    else input.storyCards.forEach((card, index) => {
      if (!card || typeof card !== "object" || typeof card.id !== "string" || typeof card.title !== "string" || typeof card.content !== "string" || !Array.isArray(card.keys)) {
        errors.push(`Story Card ${index + 1} no válida.`);
      } else if (card.content.length > 2500 || card.keys.length > 30 || card.keys.some((key) => typeof key !== "string" || key.length > 80)) {
        errors.push(`Story Card ${index + 1} supera los límites permitidos.`);
      }
    });
    if (!input.initialState || typeof input.initialState !== "object") errors.push("Falta initialState.");
    else {
      ["location", "time", "objective"].forEach((key) => {
        if (typeof input.initialState[key] !== "string") errors.push(`initialState.${key} no es válido.`);
      });
      if (!Array.isArray(input.initialState.inventory) || input.initialState.inventory.length > 40) errors.push("El inventario inicial no es válido.");
      else if (input.initialState.inventory.some((item) => !item || typeof item.id !== "string" || typeof item.name !== "string" || typeof item.description !== "string")) errors.push("Hay un objeto inicial no válido.");
    }
    if (input.banks != null && (typeof input.banks !== "object" || Array.isArray(input.banks) || Object.values(input.banks).some((bank) => !Array.isArray(bank) || bank.length > 40 || bank.some((line) => typeof line !== "string" || line.length > 1200)))) errors.push("Los bancos narrativos no son válidos.");
    if (input.progression != null && (!Array.isArray(input.progression) || input.progression.length > 20 || input.progression.some((stage) => !stage || !Number.isFinite(stage.at) || typeof stage.location !== "string" || typeof stage.objective !== "string"))) errors.push("La progresión no es válida.");
    if (input.accent != null && !/^#[0-9a-f]{6}$/i.test(String(input.accent))) errors.push("El color de acento no es válido.");
    if (input.opening && input.opening.length > 6000) errors.push("La apertura supera el límite permitido.");
    return [...new Set(errors)];
  }

  window.ABYSS_SCENARIOS = Object.freeze(scenarios);
  window.AbyssScenarioTools = Object.freeze({ makeCustomScenario, validateScenario, sharedBanks });
})();
