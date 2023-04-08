function apiCall() {
    // ||API CALL||
    const url = 'https://api.census.gov/data/2021/acs/acs5?get=NAME,group(B01001)&for=us:1&key=bcd95612e491646866e4108b6153d5be5b5b3c30';
    async function getTable () { //create async function
        const result = await fetch(url) //make api request
            .then(res => {
                return res.json(); //convert result to JSON
            })
            // .then (data => { //work with returned JSON data
            //     data[0].forEach(arr => {
            //         const markup = `<li>${arr}</li>`;
            //         document.querySelector('ul').insertAdjacentHTML('beforeend', markup);
            //     })
            // })
            .catch(error => alert(error));
        return result;
    }
    // || DATA TABLE ||
    const csvData = './fiveYearData/variables.json';
    async function getData() {
        const result = await fetch(csvData)
            .then(res => {
                return res.json();
            })
            .catch(error => {
                alert(error);
            })
        return result;
    }

    async function formattingData () {
        let apiData = await getTable()
        let rawData = await getData()
        const testArray = [];
        console.log(apiData)
        console.log(rawData);
        apiData[0].forEach((dataVal, index) => {
            if(rawData.variables[dataVal]) testArray.push([rawData.variables[dataVal]["label"], apiData[1][index]]);
        });
        console.log(testArray);
        let markup;
        testArray.forEach(tableVal => {
            if(tableVal[0] !== 'Geography') {
                markup = `<th scope="row">${tableVal[0]}</th>
                          <td scope="row">${tableVal[1]}</td>`;
                document.querySelector('tbody').insertAdjacentHTML('beforeend', markup);
            }
        });
    }

    formattingData();
}