export function isEmpty(obj) {
    if (!obj) {
        return true;
    }
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }

    return JSON.stringify(obj) === JSON.stringify({});
}

export function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

export function rankMarks(initialOrder = [],key="rank") {
    const groupedData = {};

                initialOrder.forEach(item => {
                    const subject = item.subject;
                    if (!groupedData[subject]) {
                        groupedData[subject] = [];
                    }
                    groupedData[subject].push(item);
                });

                Object.keys(groupedData).forEach(subject => {
                    const subjectData = groupedData[subject];

                    subjectData.sort((a, b) => b.marks - a.marks || a.initialOrder - b.initialOrder);

                    subjectData.forEach((item, index) => {
                        item[key] = index + 1;
                    });
                });
                return Object.values(groupedData).flat();
}

export function filterDataByKey(array,subject,key="subject"){
    let filteredData = []
    if(subject === "All") {
        filteredData = array
    }else {
        filteredData = array.filter((item) => item[key] === subject)
    }
    return filteredData
}

export  const optionsGraph = {
    chart: {
        height: 350,
        // type: 'area'
    },
    dataLabels: {
        enabled: false
    },
    colors:['#00b957','#008ffb','#ad00b9'],
    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.7,
            opacityTo: 0.4,
        }
    },
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
        type: 'date',
    },
    tooltip: {
        backgroundColor: '#ff0000',
        x: {
            format: 'dd/MM/yy'
        },
    },
};

export const monthArray = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"]
