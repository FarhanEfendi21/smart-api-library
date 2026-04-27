import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Dialog */}
      <div className="glass w-full max-w-lg rounded-2xl shadow-xl relative z-10 m-4 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h3 className="text-xl font-bold text-primary">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-primary/5 text-primary/50 hover:text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
