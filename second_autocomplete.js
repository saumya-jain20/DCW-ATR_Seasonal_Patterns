function createAutocomplete1(inputElement, suggestions) {
    // Create a div to hold the suggestions
    const suggestionContainer1 = document.createElement('div');
    suggestionContainer1.classList.add('autocomplete-suggestions1');
    suggestionContainer1.setAttribute('data-input', inputElement.id);
    
    // Append the suggestion container after the input element
    inputElement.parentNode.appendChild(suggestionContainer1);
  
    // Event listener for input changes
    inputElement.addEventListener('input', function() {
      const inputValue = this.value.toLowerCase();
      const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(inputValue)
      );
      showSuggestions1(filteredSuggestions, suggestionContainer1);
    });
  
    // Event listener to hide suggestions when clicking outside
    document.addEventListener('click', function(event) {
      if (!suggestionContainer1.contains(event.target) && event.target !== inputElement) {
        suggestionContainer1.innerHTML = '';
      }
    });
  }
  
  // Function to display suggestions
  function showSuggestions1(suggestions, container) {
    container.innerHTML = '';
    suggestions.forEach(suggestion => {
      const suggestionElement = document.createElement('div');
      suggestionElement.classList.add('suggestion');
      suggestionElement.textContent = suggestion;
      suggestionElement.addEventListener('click', function() {
        const inputId = container.getAttribute('data-input');
        const inputElement = document.getElementById(inputId);
        inputElement.value = suggestion;
        container.innerHTML = '';

        // Trigger input event on the input element
        const event = new Event('input', {
          bubbles: true,
          cancelable: true,
        });
        inputElement.dispatchEvent(event);
      });
      container.appendChild(suggestionElement);
    });
  }

  
  // Call createAutocomplete1 for ITM input
  var P1V = document.getElementById('P1');
  var P2V = document.getElementById('P2');
  var P3V = document.getElementById('P3');
  var P4V = document.getElementById('P4');
  var P5V = document.getElementById('P5');
  var P6V = document.getElementById('P6');
  var P7V = document.getElementById('P7');
  var P8V = document.getElementById('P8');

  const product_suggestion = ['G' ,'HO' ,'BRN' ,'CL' ,'UHO', 'BZ', 'RB', 'SR3', 'ZQ', 'GE', 'NG', 'ZC', 'WBS', 'MCL',
  'HH','VX', 'TF', 'ZS', 'ZL']; 
  createAutocomplete1(P1V, product_suggestion);
  createAutocomplete1(P2V, product_suggestion);
  createAutocomplete1(P3V, product_suggestion);
  createAutocomplete1(P4V, product_suggestion);
  createAutocomplete1(P5V, product_suggestion);
  createAutocomplete1(P6V, product_suggestion);
  createAutocomplete1(P7V, product_suggestion);
  createAutocomplete1(P8V, product_suggestion);

  