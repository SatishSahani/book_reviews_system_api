from django.urls import path
from .views import RegisterView, AuthorListView, AuthorDetailView, BookListView, BookDetailView, ReviewListView, ReviewDetailView, book_reviews

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('authors/', AuthorListView.as_view(), name='author-list'),
    path('authors/<int:id>/', AuthorDetailView.as_view(), name='author-detail'),
    path('books/', BookListView.as_view(), name='book-list'),
    path('books/<int:id>/', BookDetailView.as_view(), name='book-detail'),
    path('books/<int:book_id>/reviews/', book_reviews, name='book-reviews'),
    path('reviews/', ReviewListView.as_view(), name='review-list'),
    path('reviews/<int:id>/', ReviewDetailView.as_view(), name='review-detail'),
]
