import { useState, createContext, useEffect, useContext } from 'react';

export type PasteDraft = {
  title: string;
  content?: string;
  visibility?: string;
  language?: string;
};

export type Props = {
  localStorageKey?: string;
  initialValue?: PasteDraft;
};

type PasteDraftValueOrSetter =
  | PasteDraft
  | ((oldValue: PasteDraft) => PasteDraft);

type PasteDraftContextType = {
  pasteDraft: PasteDraft;
  updatePasteDraft: (valueOrSetter: PasteDraftValueOrSetter) => void;
  resetPasteDraft: () => void;
};

const PasteDraftContext = createContext<PasteDraftContextType>(null);

const defaultStorageKey = 'monapaste_pasteDraft_storageKey';

const defaultInitialValue: PasteDraft = {
  title: 'Unnamed Paste',
  visibility: null,
  language: null,
  content: null,
};

export const PasteDraftContextProvider = ({
  localStorageKey = defaultStorageKey,
  initialValue = defaultInitialValue,
  children,
}: React.PropsWithChildren<Props>) => {
  const [pasteDraft, setStatePasteDraft] = useState<PasteDraft>(initialValue);

  useEffect(() => setStatePasteDraft(loadPasteDraftState()), []);

  const loadPasteDraftState = () => {
    try {
      const item = window.localStorage.getItem(localStorageKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error('could not load draft state', err);
      return initialValue;
    }
  };

  const savePasteDraftState = (value: PasteDraft): boolean => {
    try {
      const item = JSON.stringify(value);
      window.localStorage.setItem(localStorageKey, item);
      return true;
    } catch (err) {
      console.error('could not save draft state', err);
    }
    return false;
  };

  const updatePasteDraft = (valueOrSetter: PasteDraft) => {
    const value =
      valueOrSetter instanceof Function
        ? valueOrSetter(pasteDraft)
        : valueOrSetter;
    setStatePasteDraft(value);
    savePasteDraftState(value);
  };

  const resetPasteDraft = () => {
    updatePasteDraft(initialValue);
  };

  return (
    <PasteDraftContext.Provider
      value={{
        pasteDraft,
        updatePasteDraft,
        resetPasteDraft,
      }}>
      {children}
    </PasteDraftContext.Provider>
  );
};

export const usePasteDraft = () => {
  const context = useContext(PasteDraftContext);

  if (!context) {
    throw new Error(
      'usePasteDraft must be used inside a component wrapped by PasteDraftContextProvider',
    );
  }

  return context;
};
