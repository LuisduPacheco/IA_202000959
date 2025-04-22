async function fit_predict() {
    const { DecisionTreeClassifier, LabelEncoder, accuracyScore } = await import('https://luisespino.github.io/mlearnjs/mlearn.mjs');
//Los tres atributos seleccionados de la tabla
    const pat = ['Some', 'Full', 'Some', 'Full', 'Full', 'Some', 'None', 'Some', 'Full', 'Full', 'None', 'Full'];

    const hun = ['Yes', 'Yes', 'No', 'Yes', 'Yes', 'No', 'No', 'No', 'Yes', 'Yes', 'No', 'Yes'];

    const type = ['French', 'Thai', 'Burger', 'Thai', 'French', 'Italian', 'Burger', 'Thai', 'Burger', 'Italian', 'Thai', 'Burger'];

    const label = ['Yes', 'No', 'Yes', 'Yes', 'No', 'Yes', 'No', 'Yes', 'Yes', 'No', 'No', 'Yes'];


    const table = pat.map((_, i) => [pat[i], hun[i], type[i], label[i]]);

    showTable(table);

    const myLabelEncoder = await LabelEncoder();
    const encoder = new myLabelEncoder();

    const encOut = encoder.fitTransform(pat);
    const encTem = encoder.fitTransform(hun);
    const encHum = encoder.fitTransform(type);
    const encLab = encoder.fitTransform(label);

    const features = encOut.map((_, i) => [encOut[i], encTem[i], encHum[i]]);

    const myDecisionTree = await DecisionTreeClassifier();
    const model = new myDecisionTree();


    model.fit(features, encLab);

    const encYPredict = model.predict(features)
    const yPredict = encoder.inverseTransform(encYPredict);

    const myAccuracyScore = await accuracyScore();
    const accuracy = myAccuracyScore(encLab, encYPredict);

    const log = document.getElementById('log');
    log.innerHTML = '<br><br>LabelEncoder:<br>'+JSON.stringify(features, null, 2);
    log.innerHTML += '<br><br>Predict:<br>'+ JSON.stringify(yPredict, null, 2);
    log.innerHTML += '<br><br>AccuracyScore: '+accuracy;
    log.innerHTML += '<br><br><strong>Descriptive tree:</strong><br>'+model.printTree(model.tree);
    log.innerHTML += '<br><br><strong>Gain track:</strong><br>'+model.gain;
}

function showTable(table) {
    let container = document.getElementById('table-container');

    // Crear el elemento de la tabla
    let tableElement = document.createElement('table');

    // Crear la cabecera de la tabla
    let header = tableElement.createTHead();
    let headerRow = header.insertRow();
    let headers = ['Pat', 'Hun', 'Type', 'WillWait'];
    headers.forEach(headerText => {
        let cell = headerRow.insertCell();
        cell.textContent = headerText;
    });

    // Crear el cuerpo de la tabla
    let body = tableElement.createTBody();
    table.forEach(rowData => {
        let row = body.insertRow();
        rowData.forEach(cellData => {
            let cell = row.insertCell();
            cell.textContent = cellData;
        });
    });

    // Insertar la tabla en el contenedor
    container.appendChild(tableElement);
}

fit_predict();