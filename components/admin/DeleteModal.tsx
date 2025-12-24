'use client';
import { Modal } from "@/components/UI/modal"

interface DeleteModal {
    modalOpen: boolean,
    setModal: (state: boolean) => void,
    handleDeletion: () => void
}

export default function ComponentName ({ modalOpen, setModal, handleDeletion }: DeleteModal ) {
  return (
    <Modal isOpen={modalOpen} onClose={() => setModal(false)} title="Confirm Delete" >
        <div className="flex-col flex space-y-6">
        <h3 className="">Are you sure you want to delete the selected items, this change cannot be undone.</h3>
        <span className="flex space-x-2 self-end">
            <button
              onClick={() => setModal(false)}
              type="button" 
              className="capitalize ring-2 ring-transparent active:bg-whitesmoke w-24  active:text-deep normal-space hover:ring-whitesmoke/30 rounded-full"
            >
            cancel
            </button>
            <button
              onClick={handleDeletion} 
              type="button" 
              className="capitalize text-error-dark normal-space hover:bg-error-dark w-24 hover:text-darker rounded-full"
            >
            delete
            </button>
        </span>
        </div>
    </Modal>
  );
}