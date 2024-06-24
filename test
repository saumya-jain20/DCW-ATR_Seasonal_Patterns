// Function to handle suggestions for input fields
function handleSuggestions(inputElement) {
    // Suggestions data (replace with your own suggestions)
    var suggestions = ['G' ,'HO' ,'BRN' ,'CL' ,'UHO', 'BZ', 'RB', 'SR3', 'ZQ', 'GE', 'NG', 'ZC', 'WBS', 'MCL',
    'HH','VX', 'TF', 'ZS', 'ZL'];

    // Function to show suggestions
    function showSuggestions(inputElement) {
        // Clear any existing suggestions
        var suggestionsList = document.getElementById(inputElement.id + 'Suggestions');
        suggestionsList.innerHTML = '';

        // Get the current input value
        var inputValue = inputElement.value.toLowerCase();

        // Filter suggestions based on the input value
        var filteredSuggestions = suggestions.filter(function(suggestion) {
            return suggestion.toLowerCase().startsWith(inputValue);
        });

        // Show filtered suggestions
        filteredSuggestions.forEach(function(suggestion) {
            var suggestionItem = document.createElement('li');
            suggestionItem.textContent = suggestion;
            suggestionItem.classList.add('suggestion');
            suggestionsList.appendChild(suggestionItem);

            // Add click event listener to each suggestion item
            suggestionItem.addEventListener('click', function() {
                inputElement.value = suggestion; // Set input value to clicked suggestion
                suggestionsList.style.display = 'none'; // Hide suggestions
                console.log("Selected suggestion for", inputElement.id, ":", suggestion); // Log selected suggestion
                storeInputValues3(); // Call storeInputValues3 function to update console log
            });
        });

        // Show the suggestions list
        suggestionsList.style.display = 'block';
    }

    // Add event listener to show suggestions on input
    inputElement.addEventListener('input', function() {
        showSuggestions(inputElement);
        storeInputValues3(); // Call storeInputValues3 function to update console log
    });

    // Hide suggestions when clicking outside the input
    document.addEventListener('click', function(event) {
        if (event.target !== inputElement) {
            document.getElementById(inputElement.id + 'Suggestions').style.display = 'none';
        }
    });
}

// Get references to all the input elements (P1 to P8) and apply suggestions handling
var P1Input = document.getElementById('P1');
var P2Input = document.getElementById('P2');
var P3Input = document.getElementById('P3');
var P4Input = document.getElementById('P4');
var P5Input = document.getElementById('P5');
var P6Input = document.getElementById('P6');
var P7Input = document.getElementById('P7');
var P8Input = document.getElementById('P8');

handleSuggestions(P1Input);
handleSuggestions(P2Input);
handleSuggestions(P3Input);
handleSuggestions(P4Input);
handleSuggestions(P5Input);
handleSuggestions(P6Input);
handleSuggestions(P7Input);
handleSuggestions(P8Input);

// Function to log input value to console
function storeInputValues3() {
    // Get the values of each input
     P1Value = P1Input.value;
     P2Value = P2Input.value;
     P3Value = P3Input.value;
     P4Value = P4Input.value;
     P5Value = P5Input.value;
     P6Value = P6Input.value;
     P7Value = P7Input.value;
     P8Value = P8Input.value;

    
}