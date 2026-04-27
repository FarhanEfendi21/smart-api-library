import { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { Plus, Search, BookOpen, Loader2, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';

const Books = () => {
  const { data: books = [], mutate: mutateBooks, isLoading: loading } = useSWR('http://localhost:3000/api/books', fetcher);
  const { data: authors = [] } = useSWR('http://localhost:3000/api/authors', fetcher);
  const { data: categories = [] } = useSWR('http://localhost:3000/api/categories', fetcher);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    author_id: '',
    category_id: '',
    total_copies: 1
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('http://localhost:3000/api/books', formData);
      setIsModalOpen(false);
      setFormData({ isbn: '', title: '', author_id: '', category_id: '', total_copies: 1 });
      mutateBooks(); // Refresh cache instantly
    } catch (err) {
      alert("Error adding book: " + (err.response?.data?.error || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = (book) => {
    setItemToDelete(book);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:3000/api/books/${itemToDelete.id}`);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
      mutateBooks(); // Refresh cache
    } catch (err) {
      alert("Error deleting book: " + (err.response?.data?.error || err.message));
    } finally {
      setDeleting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Books Collection</h2>
          <p className="text-primary/60 mt-1">Manage library books and inventory.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-accent hover:bg-accent/90 text-white px-5 py-2.5 rounded-xl font-medium shadow-md shadow-accent/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Book
        </button>
      </header>

      <div className="glass rounded-2xl border border-white/50 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-primary/5 bg-white/40 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" />
            <input 
              type="text" 
              placeholder="Search books..." 
              className="w-full bg-white/60 border border-primary/10 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-primary/50 text-sm">Loading books...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary/5 text-primary/60 text-xs uppercase tracking-wider font-semibold">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Availability</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {books.map(book => (
                  <tr key={book.id} className="hover:bg-primary/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary/40">
                           <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-primary group-hover:text-accent transition-colors">{book.title}</p>
                          <p className="text-xs text-primary/50 mt-0.5">ISBN: {book.isbn}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-primary/80">
                      {book.author_name || <span className="text-primary/40 italic">Unknown</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/5 text-primary/70 border border-primary/10">
                        {book.category_name || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-primary/10 rounded-full h-1.5 max-w-[60px]">
                          <div 
                            className="bg-accent h-1.5 rounded-full" 
                            style={{ width: `${(book.available_copies / book.total_copies) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-primary/70">
                          {book.available_copies} / {book.total_copies}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                         onClick={() => confirmDelete(book)}
                         className="p-2 text-primary/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                         title="Delete Book"
                      >
                         <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {books.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-primary/50 text-sm">
                      No books found in the collection.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Book">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">ISBN</label>
            <input required type="text" name="isbn" value={formData.isbn} onChange={handleInputChange} className="w-full bg-white/60 border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="e.g. 978-3-16-148410-0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Title</label>
            <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-white/60 border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="Enter book title" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Author</label>
              <select required name="author_id" value={formData.author_id} onChange={handleInputChange} className="w-full bg-white/60 border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50">
                <option value="">Select Author</option>
                {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Category</label>
              <select required name="category_id" value={formData.category_id} onChange={handleInputChange} className="w-full bg-white/60 border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50">
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Total Copies</label>
            <input required type="number" min="1" name="total_copies" value={formData.total_copies} onChange={handleInputChange} className="w-full bg-white/60 border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
          </div>
          <button type="submit" disabled={submitting} className="mt-4 w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-xl font-medium shadow-md transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Book'}
          </button>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
        <div className="flex flex-col gap-4">
          <p className="text-primary/80 text-sm">
            Are you sure you want to delete the book <span className="font-bold text-primary">'{itemToDelete?.title}'</span>? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end mt-4">
            <button 
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-5 py-2.5 bg-primary/5 hover:bg-primary/10 text-primary font-medium rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleDelete}
              disabled={deleting}
              className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl shadow-md shadow-red-500/20 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              Delete Book
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default Books;
