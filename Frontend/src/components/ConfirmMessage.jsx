import React from 'react';

function ConfirmMessage({ isOpen, title, message, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 bg-opacity-50 transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Popup Content */}
      <div className="bg-white rounded-xl shadow-xl transform transition-all max-w-md w-full mx-4 z-10">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-xl px-6 py-4">
          <h3 className="text-lg font-medium text-white">{title}</h3>
        </div>
        
        <div className="px-6 py-4">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-700">{message}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-3 rounded-b-xl flex justify-end gap-2">
          <button
            type="button"
            className="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            onClick={onClose}
          >
            Close
          </button>
          {onConfirm && (
            <button
              type="button"
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              onClick={onConfirm}
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfirmMessage;