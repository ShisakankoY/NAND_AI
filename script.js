//入力
const A = [
    0,
    0,
    1,
    1
];

const B = [
    0,
    1,
    0,
    1
];

//出力
const C = [
    1,
    1,
    1,
    0
];

//ステップ関数
function step(x) {
    if (x > 0) {
        return 1;
    } else {
        return 0;
    }
}

//保存用配列
let outputArray = [];

//重み・バイアス
let w1 = Math.random() * 0.5 - 0.25;
let w2 = Math.random() * 0.5 - 0.25;
let bias = Math.random() * 0.5 - 0.25;

//出力層
function output() {
    for (let i = 0; i < A.length; i++) {
        let y = step(w1 * A[i] + w2 * B[i] + bias);
        outputArray.push(y);
    }
}

//誤差
let errors = [];

function error() {
    for (let i = 0; i < outputArray.length; i++) {
        let z = C[i] - outputArray[i];
        errors.push(z);
    }
}

//学習率
let lr = 0.5;

//重み・バイアスの修正
function update() {
    for (let i = 0; i < errors.length; i++) {
        w1 = w1 + lr * errors[i] * A[i];
        w2 = w2 + lr * errors[i] * B[i];
        bias = bias + lr * errors[i];
    }
}

const text = document.getElementById('text');
let count = 0;

//学習
function epoch() {
    count++;
    outputArray = [];
    errors = [];

    output();
    error();
    update();

    if (count % 5 === 0) {
        text.innerHTML = "Epoch: " + count + "<br>"
        + "outputArray: " + outputArray.join(', ') + "<br>"
        + "errors: " + errors.join(', ');
    }

    if (count < 1000) {
        requestAnimationFrame(epoch);
    }
}
epoch();
