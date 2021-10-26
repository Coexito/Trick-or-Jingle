# Trick or Jingle
***Halloween VS Navidad!***

![Trick or Jingle](/Resources/Art/Logos/Trick_or_Jingle_logo.png)

## Identidad del juego

*Trick or Jingle* se trata de un juego gratuito estilo plataformas y acción
que dará fin a la rivalidad Halloween contra Navidad en una ***ÉPICA*** batalla.

![Trick or Jingle isotype]((/Resources/Art/Logos/Trick_or_Jingle_isotipo.png)

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

Los tipos de armas son 3, de usos ilimitados y diferenciados por su tipo de usabilidad:
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

Teclado para movimiento/acción y ratón para apuntar.
- Movimiento: AD (izquierda, derecha), barra espaciadora (saltar).
- Tecla de acción: E (coger/soltar objetos).
- Apuntado de arma: posición del ratón en la pantalla (raycast desde el personaje hasta el puntero, 360º).
- Disparo: click izquierdo del ratón.

## Comunicación

Debido a que se trata de un juego en red, debe existir cierta comunicación entre los jugadores para el correcto desarrollo del gameplay. Ambos jugadores deben tener en todo momento la siguiente información en sus máquinas:

- Posición propia y del jugador rival.
- Estado propio, del entorno y del rival (vidas, posición de plataformas u objetos, tiempo, etc.)
- Eventos desencadenados (disparo del rival, explosión en el entorno).- 

De esta forma se pueden tener en cuenta todas las interacciones y calcularlas correctamente según posiciones y estados del juego.

## Referencias artísticas

![Brawlhalla Cover](/Resources/Artistic_References/brawlhalla_cover.jpg)
![Brawlhalla Fight](/Resources/Artistic_References/brawlhalla_fight.jpg)
![Brawlhalla Character](/Resources/Artistic_References/brawlhalla_oc.png)
![Spelunky Cover](/Resources/Artistic_References/spelunky_cover.jpg)
![Spelunky Level](/Resources/Artistic_References/spelunky_level.png)
![Spelunky Character](/Resources/Artistic_References/spelunky_oc.png)
![Super Animal Royale](/Resources/Artistic_References/super_animal_royale.jpg)
![Hell Yeah](/Resources/Artistic_References/hell_yeah.jpg)

## Escenarios / Niveles

Se incluirán 2 escenarios temáticos de cada festivo, uno representativo de Halloween y otro de Navidad, 
cada uno estará compuesto de un fondo y de diversas plataformas distribuidas por el nivel
para poder moverse libremente por él.

Ambos escenarios estarán totalmente cerrados de manera que resulte imposible caer al vacío o salir del mapa.

![Halloween Level](/Resources/Art/Scenery/Halloween_boceto.jpg)
![Christmas Level](/Resources/Art/Scenery/Navidad_boceto.jpg)

## Personajes

Todos los personajes tienen las mismas habilidades, ya que el gameplay se caracteriza
por su rapidez y por las armas utilizadas que aparecen de manera aleatoria, 
pero el jugador debe tener las mismas oportunidades con cualquier personaje escogido. 
No obstante, uno de los mayores atractivos del videojuego es su peculiar temática, 
por lo que sí que es importante que la estética de los personajes sea atractiva y llame la atención de los jugadores. 

Por esto, para la creación de los personajes, se juega mucho con la posible viralización
utilizando el humor conocido en Internet como memes.

- **Personajes navideños**:
    - **María Karei**: Mariah Carey es una cantante conocida mundialmente por su gran éxito navideño “*All I Want for Christmas is You*”. Desde que la canción salió en el año 1994 se puede observar cómo sus ventas crecen de manera exponencial al acercarse Navidad desde finales de septiembre y decrecen de manera drástica pasada la Navidad. Este es un meme muy conocido en Internet y por ello se ha decidido incluirla en el juego.![Maria Karei](/Resources/Art/Concept/N_Maria_Karei.png)

    - **Papá Noel**: Papá Noel es una de las figuras más conocidas de la Navidad, pero para encajar más con el humor de la temática del juego se ha decidido que este fuera un poco inusual, representando a un Papá Noel con problemas de alcohol.![Papa Noel](/Resources/Art/Concept/N_Papa_Noel.png)

    - **Pavo**: El pavo es una de las comidas navideñas más famosas. En el videojuego se ha querido representar con guantes de boxeo para mostrar que está listo para la pelea. Hace un par de años se viralizó en España un tweet sobre una fuente de pavo de Navidad destrozada tras caerse al suelo y el comentario “nos acabamos de quedar sin cena”. Por ello, al matar a este personaje sonaría “nos acabamos de quedar sin cena”.![Pavo](/Resources/Art/Concept/N_Pavo.png)
    
- **Personajes de Halloween**
    -  **Edward Cullon**: Edward Cullen es el protagonista principal de las sagas adolescentes sobre vampiros “Crepúsculo”. Hace un tiempo se viralizó una imagen del actor en chándal por lo que se ha decidido incluir al personaje con esta estética en el juego.![Edward Cullon](/Resources/Art/Concept/H_Edward_Cullon.png)

    -  **Vanessa**: En España se viralizó un audio de Whatsapp que se difundió por todas las plataformas en el que una tal “Vanessa” intentaba felicitar Halloween a un grupo de WhatsApp sin suerte para pronunciar el nombre de la festividad. Desde entonces las referencias a este audio y su mítico “Feliz Jabulín grupo soy Vanessa” son tradición y por ello lo hemos incluido en el videojuego. Como Vanessa es solo una voz, se ha decidido representarla como una persona calabaza, ya que estas también son muy conocidas por Halloween.![Vanessa](/Resources/Art/Concept/H_Vanessa.png)

    -  **Fantasma**: Uno de los disfraces más populares en Halloween es el de usar una manta con dos agujeros para representar un fantasma.![Fantasma](/Resources/Art/Concept/H_Fantasma.png)

## Música / Sonido

Se utilizarán bibliotecas de sonido en su mayor parte. Habrá música dentro del escenario, así como efectos sonoros acorde a ciertos acontecimientos.

- Diferentes efectos sonoros:
- Aparecer en el nivel
- Disparar (dependiente de cada arma)
- Matar
- Morir
- Saltar

### Autoría

Proyecto creado enteramente por ***Gamer Ferret***.
![Gamer Ferret](/Resources/Gamer_Ferret/Gamer_Ferret_logo_letras.png)

Integrantes del equipo:

| Nombre | Apellidos |  Correo | Github |
| ------ | ------ | ------ | ------ |
| Sergio | Sánchez Martínez | s.sanchezmart.2019@alumnos.urjc.es | https://github.com/Coexito
| Aurora | García Raigón | a.garciarai.2019@alumnos.urjc.es | https://github.com/bdevainy
| Cecilia | Garrido Cano | c.garrido.2019@alumnos.urjc.es | https://github.com/airiru
| Iván | García Martínez | i.garciam.2019@alumnos.urjc.es | https://github.com/Igarmart
| Raúl | Vives Guilló | r.vives.2019@alumnos.urjc.es | https://github.com/Ailentejitas