/**
 * @author Huitre<gohin.j@gmail.com>
 */
var KeyConfiguration = {
    'attack' : {
        'a': 'lp',
        's': 'hp',
        'z': 'lk',
        'x': 'hk'
    },
    'directions' : {
        // cardinalite pour les directions
        'up': 'n',
        'down': 's',
        'left': 'o',
        'right': 'e',
        'upleft': 'no',
        'leftup': 'no',
        'rightup': 'ne',
        'upright': 'ne',
        'leftdown': 'so',
        'downleft': 'so',
        'downright': 'se',
        'rightdown': 'se'
    }
}

var InputManager = new Class({
    Extends: Manager,

    // buffer des touches
    keyList: [],
    // buffer des actions (coup de poings, coup de pieds...)
    actionList: [],
    rate: 100,
    // temps de latence entre 2 touches
    // avant de savoir si l'on a fini un combo
    comboTimeOut: 200,

    nextTicks: 0,
    lastTicks: 0,

    comboDisplayer : null,

    initialize: function (options) {
        this.parent(options);
        $(window).removeEvents('keydown');
        $(window).removeEvents('keyup');
        this.comboDisplayer = new ComboDisplayer();
    },

    /*
     * Methode d'initialisation appelee avant le debut du combat
     * charge de mettre en place la capture des inputs
     */
    prepare: function (players) {
        var that = this;
        this.nextTicks = this.lastTicks = this.getTicks() + this.rate;
        $(window).addEvents({
            'keydown': function (e) {
                if (e.key != 'f12' && e.key != 'f5')
                    e.preventDefault();
                that.push(e.key);
            },
            'keyup' : function (e) {
                that.pop();
            }
        })
    },

    push: function (key) {
        this.inCombo = true;
        this.keyList.push(key);
    },

    pop: function () {
    },

    /*
     * Verifie si l'on est entrain d'effectuer un combo
     * en verifiant le temps d'appui entre chaque touche
     * @return boolean
     */
    isInCombo: function () {
        if (!this.inCombo && (this.getTicks() - this.lastTicks > this.comboTimeOut))
            return true;
        return false;
    },

    /*
     * Methode appelee toutes les 30 i/s qui est chargee
     * de vider le buffer si besoin et de transformer la liste de touches en actions
     */
    update: function () {
        if (this.getTicks() > this.nextTicks) {
            this.translate();
            this.clean();
            this.execute();
            this.nextTicks = this.getTicks() + this.rate;
        }            
    },

    /*
     * Methode de suppression du buffer
     */
    clean: function () {
        this.keyList = [];
        /*if (this.actionList.length > 20)
            this.actionList = this.actionList.slice(0,1);*/
    },

    /*
     * Sert a transformer les touches enfoncees en actions
     * pour les combos et les actions des personnages
     */
    translate: function () {
        // parcours en sens inverse pour trouver la
        // 1ere touche appuyee
        var tmp = [],
            key = this.keyList,
            attack = KeyConfiguration['attack'],
            dir = KeyConfiguration['directions'];
        for (var i = key.length - 1; i > -1; --i) {
            if (attack[key[i]]) {
                tmp.push(attack[key[i]]);
            } else if (dir[key[i]]) {
                // on veut pouvoir dire que ['up', 'right']
                // equivaut a 'upright'
                var dirTmp = [], sdirTmp;
                while(dir[key[i]]) {
                    dirTmp.push(key[i]);
                    i--;
                }
                sdirTmp = dirTmp.join('');
                if (dir[sdirTmp])
                    tmp.push(dir[sdirTmp]);
                else
                    for (var j = dirTmp.length - 1; j > -1; j--)
                        tmp.push(dir[dirTmp[j]]);

            }
            this.actionList.push(tmp);
            this.comboDisplayer.setContent(this.actionList);
        }
        this.comboDisplayer.display();
    },

    execute: function () {
        // TODO : prevoir 2 joueurs
        /*this.game.getPlayerManager().getPlayers().each(function (player, playerNumber) {
            player.execute(this.actionList[playerNumber]);
        }.bind(this));*/
        this.actionList = this.game.getPlayerManager().getPlayer1().execute(this.actionList);
    }
});