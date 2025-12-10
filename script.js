document.addEventListener('DOMContentLoaded', function() {
    const bookCheckboxes = document.querySelectorAll('input[type="checkbox"][name="books[]"]');
    
    bookCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const bookId = this.id;
            const qtyInput = document.querySelector(`input[data-for="${bookId}"]`);
            
            qtyInput.disabled = !this.checked;
            
            if (this.checked) {
                qtyInput.value = 1;
                qtyInput.min = 1;
            } else {
                qtyInput.value = 0;
            }
            
            updateTotal();
            updateSubmitButton();
        });
    });
    
    document.querySelectorAll('input[type="number"][data-for]').forEach(input => {
        input.addEventListener('input', function() {
            updateTotal();
            updateSubmitButton();
        });
    });
    
    const orderForm = document.querySelector('form[action="https://google.com"]');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            document.querySelectorAll('input[type="checkbox"][name="books[]"]:checked').forEach(checkbox => {
                const bookId = checkbox.id;
                const qtyInput = document.querySelector(`input[data-for="${bookId}"]`);
                const quantity = parseInt(qtyInput.value) || 1;
                
                const quantityField = document.createElement('input');
                quantityField.type = 'hidden';
                quantityField.name = `quantity_${bookId}`;
                quantityField.value = quantity;
                this.appendChild(quantityField);
            });
        });
    }
    
    updateSubmitButton();
});

function updateTotal() {
    let total = 0;
    
    document.querySelectorAll('input[type="checkbox"][name="books[]"]:checked').forEach(checkbox => {
        const bookId = checkbox.id;
        const qtyInput = document.querySelector(`input[data-for="${bookId}"]`);
        const quantity = parseInt(qtyInput.value) || 0;
        const price = parseInt(checkbox.getAttribute('data-price'));
        
        total += price * quantity;


            if (quantity >5) {
      const discount = total * 0.05;
      total -= discount;
      console.log(discount)
    }

    });
    
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = `Итого: ${total} ₽`;
    }
    if (quantity >5) {
      const discount = total * 0.05;
      total -= discount;
      console.log(discount)
    }
}



function updateSubmitButton() {
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        const hasSelectedBooks = document.querySelectorAll('input[type="checkbox"][name="books[]"]:checked').length > 0;
        submitBtn.disabled = !hasSelectedBooks;
    }
}
