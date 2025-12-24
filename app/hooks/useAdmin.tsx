// hooks/useAdminPosts.ts
import { useState } from "react";

export type ContainerMode = "view" | "edit" | "delete";

export default function useAdminPosts() {
  const [mode, setMode] = useState<ContainerMode>('view')
    const [selected, setSelected] = useState<string[]>([])
    const [modalOpen, setModal] = useState<boolean>(false)
    
  
    const changeMode = (newMode: ContainerMode) => {
      setSelected([])
      setMode(prev => {
        if (prev === newMode) return 'view';
        return newMode
      })
    };
  
    function handleSelect(id: string) {
  
      if (mode === "delete") {
        // multi-select toggle
        setSelected(prev =>
          prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
      }
  
      if (mode === "edit") {
        // single select
        setSelected(prev =>
          prev.includes(id) ? [] : [id]
        );
      }
    }
  
    

  return { mode, selected, setSelected, modalOpen, changeMode, handleSelect, setModal };
}
