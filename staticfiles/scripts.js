document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-author-form');
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => (data[key] = value));

            const response = await fetch('/api/authors/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`  // Assuming token is stored in local storage
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Author added successfully!');
                form.reset();
            } else {
                alert('Failed to add author.');
            }
        });
    }
});
