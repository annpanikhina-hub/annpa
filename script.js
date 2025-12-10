//  Код, который запускается после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    // Находим все чекбоксы книг
    const bookCheckboxes = document.querySelectorAll('input[type="checkbox"][name="books[]"]');

    // Для каждого чекбокса
    bookCheckboxes.forEach(checkbox => {
        // Когда меняем галочку
        checkbox.addEventListener('change', function() {
            // ID книги
            const bookId = this.id;
            // Поле для ввода количества этой книги
            const qtyInput = document.querySelector(`input[data-for="${bookId}"]`);
            
            // Если книгу выбрали - поле количества активно, если нет - заблокировано
            qtyInput.disabled = !this.checked;
            
            if (this.checked) {
                // Если выбрали - ставим 1 штуку по умолчанию
                qtyInput.value = 1;
                qtyInput.min = 1;
            } else {
                // Если сняли галочку - обнуляем
                qtyInput.value = 0;
            }
            
            // Пересчитываем сумму и проверяем кнопку
            updateTotal();
            updateSubmitButton();
        });
    });
    
    // Для всех полей количества
    document.querySelectorAll('input[type="number"][data-for]').forEach(input => {
        // Когда меняем цифру
        input.addEventListener('input', function() {
            // Снова считаем сумму
            updateTotal();
            updateSubmitButton();
        });
    });
    
    // Форма заказа
    const orderForm = document.querySelector('form[action="https://google.com"]');
    if (orderForm) {
        // Когда форму отправляют
        orderForm.addEventListener('submit', function(e) {
            // Для каждой выбранной книги
            document.querySelectorAll('input[type="checkbox"][name="books[]"]:checked').forEach(checkbox => {
                const bookId = checkbox.id;
                const qtyInput = document.querySelector(`input[data-for="${bookId}"]`);
                const quantity = parseInt(qtyInput.value) || 1;
                
                // Создаем скрытое поле с количеством
                const quantityField = document.createElement('input');
                quantityField.type = 'hidden';
                quantityField.name = `quantity_${bookId}`;
                quantityField.value = quantity;
                this.appendChild(quantityField);
            });
        });
    }
    
    // Проверяем кнопку при загрузке
    updateSubmitButton();
});

// Считаем общую сумму
function updateTotal() {
    let total = 0;
    
    // Для каждой выбранной книги
    document.querySelectorAll('input[type="checkbox"][name="books[]"]:checked').forEach(checkbox => {
        const bookId = checkbox.id;
        // Поле количества
        const qtyInput = document.querySelector(`input[data-for="${bookId}"]`);
        const quantity = parseInt(qtyInput.value) || 0;
        // Цена из data-price
        const price = parseInt(checkbox.getAttribute('data-price'));
        
        // Добавляем к общей сумме
        total += price * quantity;
    });
    
    // Показываем сумму на странице
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = `Итого: ${total} ₽`;
    }
}

// Включаем/выключаем кнопку "Оформить заказ"
function updateSubmitButton() {
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        // Проверяем, есть ли выбранные книги
        const hasSelectedBooks = document.querySelectorAll('input[type="checkbox"][name="books[]"]:checked').length > 0;
        // Если нет выбранных - кнопка неактивна
        submitBtn.disabled = !hasSelectedBooks;
    }
}
