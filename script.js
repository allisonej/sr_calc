function calculate() {
    var speed = parseFloat(document.getElementById("speedInput").value);
    var timeNeeded = calculateTime(speed);

    // 결과를 표에 반영
    var table = document.getElementById("calculationTable");
    var tbody = table.getElementsByTagName('tbody')[0];

    // 새로운 행 추가
    var newRow = tbody.insertRow();
    newRow.insertCell().textContent = speed;
    newRow.insertCell().textContent = timeNeeded.toFixed(2);

    // 턴 수 계산
    var turns = calculateTurns(timeNeeded);
    for (var i = 0; i < 10; i++) {
        newRow.insertCell().textContent = turns[i].toFixed(0);
    }

    // 입력창 비우기
    document.getElementById("speedInput").value = "";
}

function calculateTime(speed) {
    // 필요한 시간 계산식: 10000 / 속도
    return 10000 / speed;
}

function calculateTurns(timeNeeded) {
    var turns = [];
    var previousTurns = 0; // 이전 라운드의 턴 수

    // 1라운드에서의 턴 수 계산
    var firstRoundTurns = Math.floor(150 / timeNeeded);
    turns.push(firstRoundTurns);
    previousTurns += firstRoundTurns;

    // 2라운드 이후 n번째 라운드에서의 턴 수 계산
    for (var i = 2; i <= 10; i++) {
        var currentTurns = Math.floor((150 + (i - 1) * 100) / timeNeeded) - previousTurns;
        turns.push(currentTurns);
        previousTurns += currentTurns;
    }

    return turns;
}

// 초기 샘플 속도에 대한 계산 및 설명 추가
var sampleSpeeds = [120, 134, 160, 172, 178, 200];
var sampleDescriptions = [
    "2라운드에 2턴을 받는 최소 속도",
    "1라운드에 2턴을 받는 최소 속도",
    "1~2라운드에 2턴을 받는 최소 속도",
    "1~2라운드에 2턴을 받는 최소 속도",
    "1~3라운드에 2턴을 받는 최소 속도",
    "1~4라운드에 2턴을 받는 최소 속도",
    "1라운드에 3턴, 이후 계속 2턴을 받는 최소 속도"
];

for (var i = 0; i < sampleSpeeds.length; i++) {
    calculateSample(sampleSpeeds[i], sampleDescriptions[i]);
}

function calculateSample(speed, description) {
    var timeNeeded = calculateTime(speed);

    // 결과를 표에 반영
    var table = document.getElementById("calculationTable");
    var tbody = table.getElementsByTagName('tbody')[0];

    // 새로운 행 추가
    var newRow = tbody.insertRow();
    newRow.insertCell().textContent = speed;
    newRow.insertCell().textContent = timeNeeded.toFixed(2);

    // 턴 수 계산
    var turns = calculateTurns(timeNeeded);
    for (var i = 0; i < 10; i++) {
        newRow.insertCell().textContent = turns[i].toFixed(0);
    }

    // 설명 추가
    var descriptionCell = newRow.insertCell();
    descriptionCell.textContent = description;
    descriptionCell.colSpan = 10;
}
