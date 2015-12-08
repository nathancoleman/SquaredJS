SquaredJS
=========

A grid-based game of forming squares to get points. Play it [here](https://squaredjs.herokuapp.com/)!

### To Play ###
1. Select a size for your grid (grid dimensions will be n<sup>2</sup>).
2. Select a difficulty and color.
3. Your move! Click on any dot you wish!
4. Subsequent moves next to any previously selected dot, either by yourself or the opponent, will connect the two dots.
5. Completing a square will give you one point.
6. Go!

### How It Works ###
_SPOILERS: Play the game first!_
- The [dots are drawn](https://github.com/nathancoleman/SquaredJS/blob/master/play.php#L36) on screen using a simple PHP loop and the grid size chosen by the player
- When a [move is made](https://github.com/nathancoleman/SquaredJS/blob/master/js/squared.js#L280), a series of events is triggered:
    - A sound clip is played
    - A CSS class is added to the dot to change the color
    - All adjacent dots are checked to see if any connecting lines should be drawn
    - Score increase for the move, if any, is calculated and added to the current total
    - An opponent move is triggered one second later
- Since the [connecting lines](https://github.com/nathancoleman/SquaredJS/blob/master/js/squared.js#L239) can only be vertical or horizontal, they are created using divs with the edges pressed together to make a solid line
- The [varying levels of difficulty](https://github.com/nathancoleman/SquaredJS/blob/master/js/squared.js#L315) are achieved by adjusting the probabilities that the oppenent will either:
    - Choose a move at random
    - Choose a move adjacent to your last move
    - Choose a move that will lead to the highest score (there could be multiple options w/ the same scoring potential)
