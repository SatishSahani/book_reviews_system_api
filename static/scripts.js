document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display books
    async function fetchBooks() {
        const response = await fetch('/api/books/');
        const books = await response.json();
        const booksList = document.getElementById('books-list');
        booksList.innerHTML = '';

        books.forEach(book => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${book.title}</strong> by ${book.author.name} (Published on ${book.published_date}, ISBN: ${book.ISBN})
                <button onclick="editBook(${book.id})">Edit</button>
                <button onclick="deleteBook(${book.id})">Delete</button>
            `;
            booksList.appendChild(listItem);
        });
    }

    // Fetch and display reviews
    async function fetchReviews() {
        const response = await fetch('/api/reviews/');
        const reviews = await response.json();
        const reviewsList = document.getElementById('reviews-list');
        reviewsList.innerHTML = '';

        reviews.forEach(review => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>Review by ${review.user.username}</strong> for ${review.book.title}:
                ${review.comment} (Rating: ${review.rating})
                <button onclick="editReview(${review.id})">Edit</button>
                <button onclick="deleteReview(${review.id})">Delete</button>
            `;
            reviewsList.appendChild(listItem);
        });
    }

    // Edit book
    async function editBook(id) {
        const newTitle = prompt('Enter new title:');
        if (newTitle) {
            const response = await fetch(`/api/books/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ title: newTitle })
            });
            if (response.ok) {
                fetchBooks();
            } else {
                alert('Failed to update book.');
            }
        }
    }

    // Delete book
    async function deleteBook(id) {
        const response = await fetch(`/api/books/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.ok) {
            fetchBooks();
        } else {
            alert('Failed to delete book.');
        }
    }

    // Edit review
    async function editReview(id) {
        const newComment = prompt('Enter new comment:');
        if (newComment) {
            const response = await fetch(`/api/reviews/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ comment: newComment })
            });
            if (response.ok) {
                fetchReviews();
            } else {
                alert('Failed to update review.');
            }
        }
    }

    // Delete review
    async function deleteReview(id) {
        const response = await fetch(`/api/reviews/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.ok) {
            fetchReviews();
        } else {
            alert('Failed to delete review.');
        }
    }

    // Load books and reviews on page load
    fetchBooks();
    fetchReviews();
});
