# Trick or Jingle
***Halloween VS Navidad!***

![Trick or Jingle](/Documents/Readme-resources/Logos/Trick_or_Jingle_logo.png)

## Identidad del juego

*Trick or Jingle* se trata de un juego gratuito estilo plataformas y acción
que dará fin a la rivalidad Halloween contra Navidad en una ***ÉPICA*** batalla.

![Trick or Jingle isotype](/Documents/Readme-resources/Logos/Trick_or_Jingle_isotipo.png)

## Lanzamiento
**Plataformas**: Navegador ([Chrome](https://www.google.es/chrome/)).
**Audiencia**: 16+.

## Pilares del diseño
Rápido, repleto de acción y divertido

## Resumen de género / Historia / Mecánicas

Se trata de un juego competitivo 2D en scroll lateral basado en ser 
el último jugador en pie dentro de un escenario de plataformas. 
Los jugadores aparecerán a la vez y podrán moverse por el escenario 
recogiendo diferentes armas para ser el ganador. Un solo golpe basta para matar a un jugador.

La temática principal gira en torno a la eterna lucha que aparece siempre
alrededor de octubre cada año entre los amantes de Halloween y los de la Navidad sobre qué festividad es mejor. 
De esta manera se enfrentarían dos jugadores (ampliable), el primero elegiría su personaje entre los disponibles
con temática de Halloween y el segundo de los de Navidad

Los tipos de armas son 3, de usos ilimitados y diferenciados por su tipo de usabilidad.
Al pasar por encima de un arma, el jugador la cogerá automáticamente. Las armas son:
1.	Pistola: arma a distancia de una sola bala por disparo en línea recta y rango ilimitado.
2.	Escopeta: arma a corta distancia con amplio cono de daño en área.
3.	Granada: objeto lanzable que explota e inflige amplio daño en área allá donde se activa.

## Reglas

- Partidas de 5 minutos.
- Los jugadores tienen 3 vidas.
- Solo puede equiparse un arma a la vez.
- La partida finaliza una vez se termine el tiempo o uno de los jugadores quede sin vidas
- Gana el jugador con más vida o que quede vivo.

## Controles

Jugador 1:
- Movimiento: AD (izquierda, derecha), W (saltar)
- Disparo de arma: barra espaciadora
- Rotar arma: QE (rotar hacia izquierda o derecha)

Jugador 2:
- Movimiento: flechas de dirección (izquierda, derecha), flecha hacia arriba (saltar)
- Disparo de arma: tecla 0 de teclado numérico
- Rotar arma: teclas 7 y 9 de teclado numérico

Los siguientes controles son los planeados para la versión final en red:

Teclado para movimiento/acción y ratón para apuntar.
- Movimiento: AD (izquierda, derecha), barra espaciadora (saltar).
- Apuntado de arma: posición del ratón en la pantalla (raycast desde el personaje hasta el puntero, 360º).
- Disparo: click izquierdo del ratón.

## Comunicación

Debido a que se trata de un juego en red, debe existir cierta comunicación entre los jugadores para el correcto desarrollo del gameplay. Ambos jugadores deben tener en todo momento la siguiente información en sus máquinas:

- Posición propia y del jugador rival.
- Estado propio, del entorno y del rival (vidas, posición de plataformas u objetos, tiempo, etc.)
- Eventos desencadenados (disparo del rival, explosión en el entorno).- 

De esta forma se pueden tener en cuenta todas las interacciones y calcularlas correctamente según posiciones y estados del juego.

## Referencias artísticas

![Brawlhalla Cover](/Documents/Readme-resources/brawlhalla_cover.jpg)
![Brawlhalla Fight](/Documents/Readme-resources/brawlhalla_fight.jpg)
![Brawlhalla Character](/Documents/Readme-resources/brawlhalla_oc.png)
![Spelunky Cover](/Documents/Readme-resources/spelunky_cover.jpg)
![Spelunky Level](/Documents/Readme-resources/spelunky_level.png)
![Spelunky Character](/Documents/Readme-resources/spelunky_oc.png)
![Super Animal Royale](/Documents/Readme-resources/super_animal_royale.jpg)
![Hell Yeah](/Documents/Readme-resources/hell_yeah.jpg)

## Escenarios / Niveles

Se incluye un escenario temático y dinámico que representa las dos festividades.
Este escenario va cambiando según el jugador que vaya ganando, siendo uno representativo de Halloween 
y otro de Navidad. Cada uno estará compuesto de un fondo y de diversas plataformas distribuidas por el nivel
para poder moverse libremente por él.

Ambos escenarios (incluidos en uno) estarán totalmente cerrados de manera que resulte imposible caer al vacío o salir del mapa.

![Halloween Level](/Documents/Readme-resources/Scenery/Sketches/Halloween_boceto.jpg)
![Christmas Level](/Documents/Readme-resources/Scenery/Sketches/Navidad_boceto.jpg)

## Personajes

Todos los personajes tienen las mismas habilidades, ya que el gameplay se caracteriza
por su rapidez y por las armas utilizadas que aparecen de manera aleatoria, 
pero el jugador debe tener las mismas oportunidades con cualquier personaje escogido. 
No obstante, uno de los mayores atractivos del videojuego es su peculiar temática, 
por lo que sí que es importante que la estética de los personajes sea atractiva y llame la atención de los jugadores. 

Por esto, para la creación de los personajes, se juega mucho con la posible viralización
utilizando el humor conocido en Internet como memes.

- **Personajes navideños**:
    - **María Karei**: Mariah Carey es una cantante conocida mundialmente por su gran éxito navideño “*All I Want for Christmas is You*”. Desde que la canción salió en el año 1994 se puede observar cómo sus ventas crecen de manera exponencial al acercarse Navidad desde finales de septiembre y decrecen de manera drástica pasada la Navidad. Este es un meme muy conocido en Internet y por ello se ha decidido incluirla en el juego.![Maria Karei](/Documents/Readme-resources/Concept/N_Maria_Karei.png)

    - **Papá Noel**: /Documents/Readme-resources/Scenery/Sketches/Papá Noel es una de las figuras más conocidas de la Navidad, pero para encajar más con el humor de la temática del juego se ha decidido que este fuera un poco inusual, representando a un Papá Noel con problemas de alcohol.![Papa Noel](/Documents/Readme-resources/Concept/N_Papa_Noel.png)

    - **Pavo**: El pavo es una de las comidas navideñas más famosas. En el videojuego se ha querido representar con guantes de boxeo para mostrar que está listo para la pelea. Hace un par de años se viralizó en España un tweet sobre una fuente de pavo de Navidad destrozada tras caerse al suelo y el comentario “nos acabamos de quedar sin cena”. Por ello, al matar a este personaje sonaría “nos acabamos de quedar sin cena”.![Pavo](/Documents/Readme-resources/Concept/N_Pavo.png)
    
- **Personajes de Halloween**
    -  **Edward Cullon**: Edward Cullen es el protagonista principal de las sagas adolescentes sobre vampiros “Crepúsculo”. Hace un tiempo se viralizó una imagen del actor en chándal por lo que se ha decidido incluir al personaje con esta estética en el juego.![Edward Cullon](/Documents/Readme-resources/Concept/H_Edward_Cullon.png)

    -  **Vanessa**: En España se viralizó un audio de Whatsapp que se difundió por todas las plataformas en el que una tal “Vanessa” intentaba felicitar Halloween a un grupo de WhatsApp sin suerte para pronunciar el nombre de la festividad. Desde entonces las referencias a este audio y su mítico “Feliz Jabulín grupo soy Vanessa” son tradición y por ello lo hemos incluido en el videojuego. Como Vanessa es solo una voz, se ha decidido representarla como una persona calabaza, ya que estas también son muy conocidas por Halloween.![Vanessa](/Documents/Readme-resources/Concept/H_Vanessa.png)

    -  **Fantasma**: Uno de los disfraces más populares en Halloween es el de usar una manta con dos agujeros para representar un fantasma.![Fantasma](/Documents/Readme-resources/Concept/H_Fantasma.png)

## Música / Sonido

Se utilizarán bibliotecas de sonido en su mayor parte. Habrá música dentro del escenario, así como efectos sonoros acorde a ciertos acontecimientos.

- Diferentes efectos sonoros:
- Aparecer en el nivel
- Disparar (dependiente de cada arma)
- Matar
- Morir
- Saltar

## Navegación de pantallas
Trick or Jingle cuenta con varias escenas de juego diseñadas individualmente. A continuación, se presenta su correspondiente diagrama de flujo para establecer la relación que guardan entre ellas:
![Gamescreens diagram](/Documents/Readme-resources/Diagrams/D_Nav_Escenas.png)

Seguidamente se presentan capturas de pantalla de las escenas junto a una breve descripción que ayuda a entender su sentido y funcionalidad:

![Title screen](/Documents/Readme-resources/Diagrams/Pantalla1.PNG)
Pantalla de bienvenida del juego mostrando la ilustración inicial. Puede hacerse click encima de ella para empezar a navegar por la aplicación.

![Login screen](/Documents/Readme-resources/Diagrams/Pantalla2.PNG)
En esta pantalla el jugador podrá iniciar sesión con su usuario ya creado, o bien crear uno en caso de que no existiera. Iniciar sesión sirve para almacenar el número de partidas ganadas en total.

![Team selection screen](/Documents/Readme-resources/Diagrams/Pantalla3.PNG)
Tendrá que haber dos jugadores para poder empezar a jugar. El primer jugador que se conecte estará en esta pantalla hasta que se conecte un contrincante, en cuyo caso empezará una cuenta atrás hasta pasar a la pantalla de juego.

![Game screen](/Documents/Readme-resources/Diagrams/Pantalla4.PNG)
Escena de juego principal. Aquí los jugadores podrán competir para ver quién es el mejor. Puede pausarse el juego pulsando en el botón de la esquina superior izquierda.

![Pause screen](/Documents/Readme-resources/Diagrams/Pantalla5.PNG)
A través de esta pantalla podrán consultarse los controles, autoría y volver al juego.

![Endgame screen halloween](/Documents/Readme-resources/Diagrams/Pantalla6_1.PNG)
![Endgame screen christmas](/Documents/Readme-resources/Diagrams/Pantalla6_2.PNG)
![Endgame screen draw](/Documents/Readme-resources/Diagrams/Pantalla6_3.PNG)
Pantallas de fin de juego que muestran el ganador de la partida. Podrá ser el equipo de Halloween, el de Navidad o incluso llegar a empate.

## Implementación con API REST
Se ha implementado una API REST utilizada para labores de red tales como inicio de sesión a través de la comunicación con el servidor o uso de chat de juego. Estos datos de usuario y de registro de chats se guardan de forma permanente dentro del servidor.

A continuación se presenta el sencillo pero eficaz diagrama de clases utilizado para este propósito:
![API REST Class Diagram](/Documents/Readme-resources/Diagrams/D_API_REST_fondo.jpg)

## Implementación con websockets

Se ha implementado comunicación por websockets para hacer que el juego sea multijugador online. Para ello, se ha creado una conexión entre los clientes y el servidor. Los clientes mandan el estado actual del jugador que corresponda al servidor, y el servidor actúa a modo de difusor enviando dicho estado al resto de jugadores para que vean estos cambios reflejados. Dicho estado está compuesto por: 

* Vidas.
* Posición.
* Velocidad.
* Tener arma (bool).
* Está disparando (bool).
* Ángulo del arma.
* Tipo de arma.

Se ha decidido pasar el ángulo y tipo de arma en lugar de la posición de la bala en cada momento porque se considera que es óptimo mandar los datos necesarios para calcular la posición de la bala en cada máquina en lugar de estar pasando en todo momento la posición, que resultaría muy costoso.

Además, para poder hacer uso de websockets se ha implementado una nueva clase en la parte de servidor llamada WebSocketEchoHandler que permite difundir los mensajes entre los clientes.

## Instrucciones de ejecución

Para ejecutar *Trick or Jingle* basta con tener el archivo **TrickOrJingle.jar** en su computador y ejecutarlo. Podrá hacer doble click sobre el archivo o, en caso de que no funcionara con debería, puede abrir la consola de comandos en la ubicación del archivo y ejecutar la siguiente instrucción:

*java -jar TrickOrJingle.jar*

Tenga en cuenta que para ejecutar este archivo, así como para utilizar la instrucción indicada, es necesario tener [Java](https://www.java.com) instalado en su computador, siendo preferible la última versión disponible. También se recomienda instalar el *Java Software Development Kit* o [Java SDK](https://www.oracle.com/java/technologies/sdk-downloads.html) instalado para evitar cualquier tipo de problema.

Una vez se ejecute el archivo TrickOrJingle.jar con éxito, podrá ejecutar su navegador de confianza y acceder al juego escribiendo la ip de la máquina en la que se está ejecutando el servidor, seguida por /8080, en la barra de direcciones (por ejemplo: 123.45.2.1/8080 . Esta NO es la IP que debe poner). ¡A partir de ahí, a jugar!

# Autoría

Proyecto creado enteramente por ***Gamer Ferret***.
![Gamer Ferret](/Documents/Readme-resources/Logos/Gamer_Ferret_logo_letras.png)

Integrantes del equipo:

| Nombre | Apellidos |  Correo | Github |
| ------ | ------ | ------ | ------ |
| Sergio | Sánchez Martínez | s.sanchezmart.2019@alumnos.urjc.es | https://github.com/Coexito
| Aurora | García Raigón | a.garciarai.2019@alumnos.urjc.es | https://github.com/bdevainy
| Cecilia | Garrido Cano | c.garrido.2019@alumnos.urjc.es | https://github.com/ceciliagarridocano
| Iván | García Martínez | i.garciam.2019@alumnos.urjc.es | https://github.com/Igarmart
| Raúl | Vives Guilló | r.vives.2019@alumnos.urjc.es | https://github.com/Ailentejitas
