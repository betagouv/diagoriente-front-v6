import React, { createContext } from 'react';

export default createContext<{ open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }>({
  open: false,
  setOpen: () => {},
});
