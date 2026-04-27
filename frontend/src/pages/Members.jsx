import { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { Plus, Search, UserCircle, Loader2 } from 'lucide-react';
import Modal from '../components/Modal';

const Members = () => {
  const { data: members = [], mutate: mutateMembers, isLoading: loading } = useSWR('http://localhost:3000/api/members', fetcher);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    member_type: 'Regular'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('http://localhost:3000/api/members', formData);
      setIsModalOpen(false);
      setFormData({ full_name: '', email: '', member_type: 'Regular' });
      mutateMembers(); // Refresh cache instantly
    } catch (err) {
      alert("Error adding member: " + (err.response?.data?.error || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Members</h2>
          <p className="text-primary/60 mt-1">Manage library memberships.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-accent hover:bg-accent/90 text-white px-5 py-2.5 rounded-xl font-medium shadow-md shadow-accent/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </header>

      <div className="glass rounded-2xl border border-white/50 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-primary/5 bg-white/40 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" />
            <input 
              type="text" 
              placeholder="Search members..." 
              className="w-full bg-white/60 border border-primary/10 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-primary/50 text-sm">Loading members...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary/5 text-primary/60 text-xs uppercase tracking-wider font-semibold">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Joined At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {members.map(member => (
                  <tr key={member.id} className="hover:bg-primary/[0.02] transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 overflow-hidden">
                           <UserCircle className="w-full h-full text-primary/30" />
                        </div>
                        <div>
                          <p className="font-medium text-primary group-hover:text-accent transition-colors">{member.full_name}</p>
                          <p className="text-xs text-primary/50 mt-0.5">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${member.member_type === 'VIP' ? 'bg-indigo-100 text-indigo-700' : 'bg-primary/10 text-primary'}`}>
                        {member.member_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-primary/70">
                      {new Date(member.joined_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {members.length === 0 && (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center text-primary/50 text-sm">
                      No members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Member">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Full Name</label>
            <input required type="text" name="full_name" value={formData.full_name} onChange={handleInputChange} className="w-full bg-white/60 border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="e.g. John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Email</label>
            <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-white/60 border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="e.g. john@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Member Type</label>
            <select required name="member_type" value={formData.member_type} onChange={handleInputChange} className="w-full bg-white/60 border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50">
              <option value="Regular">Regular</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
          <button type="submit" disabled={submitting} className="mt-4 w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-xl font-medium shadow-md transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Member'}
          </button>
        </form>
      </Modal>

    </div>
  );
};

export default Members;
