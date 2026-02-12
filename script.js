// ================================
// GLOBAL VARIABLES
// ================================

var tests = [];


// ================================
// DOCTOR SIDE FUNCTIONS
// ================================

// Show / Hide prescription box
function checkActionType() {

    var type = document.getElementById("actionType").value;

    if (type == "Prescription") {
        document.getElementById("prescriptionBox").style.display = "block";
        if(document.getElementById("testSection"))
            document.getElementById("testSection").style.display = "none";
    } else {
        document.getElementById("prescriptionBox").style.display = "none";
        if(document.getElementById("testSection"))
            document.getElementById("testSection").style.display = "block";
    }
}


// Add diagnostic test
function addTest() {

    var testName = document.getElementById("testName").value;

    if (testName == "") {
        alert("Enter test name");
        return;
    }

    tests.push(testName);
    document.getElementById("testName").value = "";

    showTests();
}


// Show added tests
function showTests() {

    var output = "";

    for (var i = 0; i < tests.length; i++) {
        output += tests[i] + "<br>";
    }

    document.getElementById("testList").innerHTML = output;
}


// Create request (Doctor submits)
function createRequest() {

    var patient = document.getElementById("patient").value;
    var type = document.getElementById("actionType").value;
    var note = "";

    if (type == "Prescription") {
        note = document.getElementById("note").value;
    }

    fetch('/data')
        .then(res => res.json())
        .then(list => {

            list.push({
                patient: patient,
                actionType: type,
                tests: tests,
                note: note,
                status: "Pending",
                reportFile: ""
            });

            fetch('/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(list)
            });

            alert("Request Sent Successfully!");

            // Reset form
            tests = [];
            if(document.getElementById("testList"))
                document.getElementById("testList").innerHTML = "";

        });
}


// ================================
// DEPARTMENT SIDE FUNCTIONS
// ================================

// Load department requests
function loadRequests() {

    fetch('/data')
        .then(res => res.json())
        .then(list => {

            var output = "";

            for (var i = 0; i < list.length; i++) {

                output += "<div style='border:1px solid black;padding:10px;margin:10px'>";

                output += "<b>Patient:</b> " + list[i].patient + "<br>";
                output += "<b>Action:</b> " + list[i].actionType + "<br>";

                // Show prescription note
                if (list[i].actionType == "Prescription") {
                    output += "<b>Prescription:</b> " + list[i].note + "<br>";
                }

                // Show diagnostic tests
                if (list[i].tests && list[i].tests.length > 0) {
                    output += "<b>Tests:</b><br>";
                    for (var j = 0; j < list[i].tests.length; j++) {
                        output += "- " + list[i].tests[j] + "<br>";
                    }
                }

                output += "<b>Status:</b> " + list[i].status + "<br>";

                // If pending, allow upload
                if (list[i].status == "Pending") {

                    output += "<input type='file' id='file" + i + "'><br><br>";
                    output += "<button onclick='completeTask(" + i + ")'>Complete & Upload Report</button>";
                }

                // Show uploaded file
                if (list[i].reportFile != "") {
                    output += "<br><b>Report:</b> " + list[i].reportFile;
                }

                output += "</div>";
            }

            document.getElementById("requests").innerHTML = output;
        });
}


// Complete task & save report file name
function completeTask(index) {

    fetch('/data')
        .then(res => res.json())
        .then(list => {

            var fileInput = document.getElementById("file" + index);
            var fileName = "";

            if (fileInput.files.length > 0) {
                fileName = fileInput.files[0].name;
            }

            list[index].status = "Completed";
            list[index].reportFile = fileName;

            fetch('/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(list)
            });

            alert("Task Completed!");

            loadRequests();
        });
}


// ================================
// TIMELINE FUNCTION
// ================================

function loadTimeline() {

    fetch('/data')
        .then(res => res.json())
        .then(list => {

            var output = "";

            for (var i = 0; i < list.length; i++) {

                output += "<div style='border-bottom:1px solid gray;padding:8px'>";

                output += "<b>Patient:</b> " + list[i].patient + "<br>";
                output += "<b>Action:</b> " + list[i].actionType + "<br>";

                if (list[i].actionType == "Prescription") {
                    output += "<b>Prescription:</b> " + list[i].note + "<br>";
                }

                if (list[i].tests && list[i].tests.length > 0) {
                    output += "<b>Tests:</b><br>";
                    for (var j = 0; j < list[i].tests.length; j++) {
                        output += "- " + list[i].tests[j] + "<br>";
                    }
                }

                output += "<b>Status:</b> " + list[i].status + "<br>";

                if (list[i].reportFile != "") {
                    output += "<b>Report File:</b> " + list[i].reportFile + "<br>";
                }

                output += "</div>";
            }

            document.getElementById("timeline").innerHTML = output;
        });
}
