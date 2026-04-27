import { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { Plus, Search, CheckCircle2, CircleDashed, Loader2, RefreshCw } from 'lucide-react';
import Modal from '../components/Modal';

const Loans = () => {
  // refreshInterval: 1000 means it polls every 1 second, simulating realtime synchronization!
  const { data: loans = [], mutate: mutateLoans, isLoading: loading } = useSWR('http://localhost:3000/api/loans', fetcher, { refreshInterval: 1000 });
  const { data: booksData = [] } = useSWR('http://localhost:3000/api/books', fetcher);
  const { data: members = [] } = useSWR('http://localhost:3000/api/members', fetcher);
  const { mutate: mutateDashboard } = useSWR('http://localhost:3000/api/books', fetcher); // Reference to update dashboard count

  const books = booksData.filter(b => b.available_copies > 0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [returningId, setReturningId] = useState(null);
  
  const [formData, setFormData] = useState({
    book_id: '',
    member_id: '',
    due_date: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('http://localhost:3000/api/loans', formData);
      setIsModalOpen(false);
      setFormData({ book_id: '', member_id: '', due_date: '' });
      mutateLoans(); // Refresh loans cache instantly
      mutateDashboard(); // Also refresh books so capacity is updated globally
    } catch (err) {
      alert("Error adding loan: " + (err.response?.data?.error || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleReturn = async (loanId) => {
    setReturningId(loanId);
    try {
      await axios.put(`http://localhost:3000/api/loans/${loanId}/return`);
      mutateLoans(); // Refresh instantly
      mutateDashboard(); // Refresh books cache instantly
    } catch (err) {
      alert("Error returning book: " + (err.response?.data?.error || err.message));
    } finally {
      setReturningId(null);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'RETURNED') return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700"><CheckCircle2 className="w-3 h-3" /> Returned</span>;
    if (status === 'OVERDUE') return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700"><CircleDashed className="w-3 h-3 text-red-600" /> Overdue</span>;
    return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700"><CircleDashed className="w-3 h-3 text-amber-600" /> Borrowed</span>;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Active Loans</h2>
          <p className="text-primary/60 mt-1">Track book borrowing and returns.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-accent hover:bg-accent/90 text-white px-5 py-2.5 rounded-xl font-medium shadow-md shadow-accent/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          New Loan
        </button>
      </header>

      <div className="glass rounded-2xl border border-white/50 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-primary/5 bg-white/40 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" />
            <input 
              type="text" 
              placeholder="Search loans..." 
              className="w-full bg-white/60 border border-primary/10 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-primary/50 text-sm">Loading loans...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary/5 text-primary/60 text-xs uppercase tracking-wider font-semibold">
                  <th className="px-6 py-4">Book</th>
                  <th className="px-6 py-4">Borrower</th>
                  <th className="px-6 py-4">Dates</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {loans.map(loan => (
                  <tr key={loan.id} className="hover:bg-primary/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-medium text-primary">{loan.member_name}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-primary/80">
                      {loan.book_title}
                    </td>
                    <td className="px-6 py-4 text-sm text-primary/70">
                      {new Date(loan.loan_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-primary/70">
                      {new Date(loan.due_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(loan.status)}
                    </td>
                    <td className="px-6 py-4">
                      {loan.status === 'BORROWED' && (
                        <button 
                          onClick={() => handleReturn(loan.id)}
                          disabled={returningId === loan.id}
                          className="text-xs bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg transition-colors font-medium disabled:opacity-50 flex items-center gap-1"
                        >
                          {returningId === loan.id ? <Loader2 className="w-3 h-3 animate-spin"/> : <RefreshCw className="w-3 h-3"/>}
                          Return
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {loans.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-primary/50 text-sm">
                      No active loans found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Loan">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Select Book</label>
            <select required name="book_id" value={formData.book_id} onChange={handleInputChange} className="w-full bg-white/60 border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50">
              <option value="">Choose a book...</option>
              {books.map(b => <option key={b.id} value={b.id}>{b.title} ({b.available_copies} available)</option>)}
            </select>
            {books.length === 0 && <p className="text-xs text-orange-500 mt-1">No books are currently available.</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Select Member</label>
            <select required name="member_id" value={formData.member_id} onChange={handleInputChange} className="w-full bg-white/60 border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50">
              <option value="">Choose a member...</option>
              {members.map(m => <option key={m.id} value={m.id}>{m.full_name} ({m.email})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Due Date</label>
            <input required type="date" name="due_date" value={formData.due_date} onChange={handleInputChange} className="w-full bg-white/60 border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
          </div>
          <button type="submit" disabled={submitting || books.length === 0} className="mt-4 w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-xl font-medium shadow-md transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Loan'}
          </button>
        </form>
      </Modal>

    </div>
  );
};

export default Loans;
