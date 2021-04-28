function FourInLine() {    //this=FourInLine
    this.app = document.getElementById('app');
    this.fields = app.getElementsByTagName('a');

    let matches = 0;
    this.checkWinner = function (id, value) {
        let checks = [
            [
                [-1, 0],
                [1, 0]
            ],
            [
                [0, 1]
            ]
        ];

        for (let check of checks) {
            for (let diffs of check) {
                countMatches.bind(this)(id, value, diffs[0], diffs[1]);
            }

            if (matches >= 3) {
                console.log('Winner is ' + value);
                return;
            }
            matches = 0;
        }

    };

    let countMatches = function (id, value, x_diff, y_diff) {
        for (let n = 1; n <= 3; n++) {
            id = id + x_diff + y_diff * 10;
            if(id >=0 && id <= 99 && this.fields[id].textContent == value) {
                matches++;
            }
            else {
                break;
            }
        }
    };
}

let four_in_line = new FourInLine();

~
let count = 0;

four_in_line.app.addEventListener('click', function (event) { //как добираемся до элемента,к кот.привязываем перехват событий
    let field = event.target;//конкретный элемент, куда кликнули
    let id = Number(field.getAttribute('data-id'));// находим id элемента
    if (field.tagName != 'A' || field.textContent != '') {//проверяем, является ли ссылкой и не пустой
        return;
    }

    if (id >= 90 || four_in_line.fields[id+10].textContent != '') {//four_in_line = объект. находим все ссылки, ищем элемент на 1 строку ниже
        if (count % 2 == 0) {
            field.textContent = 'x';
        }
        else {
            field.textContent = 'o';
        }

        four_in_line.checkWinner(id, field.textContent);//вызов валидации

        count++;
    }

}); //в конце функция checkWinner вызывается