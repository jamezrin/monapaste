import { useState, createContext, useContext, useEffect } from 'react';

export type PasteDraft = {
  title: string;
  content: string;
  visibility: string;
  language: string;
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
  setPasteDraft: (valueOrSetter: PasteDraftValueOrSetter) => void;
  resetPasteDraft: () => void;
};

const PasteDraftContext = createContext<PasteDraftContextType>(null);

const defaultStorageKey = 'monapaste_pasteDraft_storageKey';

const defaultInitialValue: PasteDraft = {
  title: 'Unnamed Paste',
  visibility: 'PUBLIC',
  language: '',
  content: '',
};

export const usePasteDraft = (): PasteDraftContextType =>
  useContext(PasteDraftContext);

export const PasteDraftContextProvider = ({
  localStorageKey = defaultStorageKey,
  initialValue = defaultInitialValue,
  children,
}: React.PropsWithChildren<Props>) => {
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

  const [statePasteDraft, setStatePasteDraft] = useState<PasteDraft>(
    initialValue,
  );

  useEffect(() => setStatePasteDraft(loadPasteDraftState()), []);

  const updatePasteDraft = (valueOrSetter: PasteDraft) => {
    const value =
      valueOrSetter instanceof Function
        ? valueOrSetter(statePasteDraft)
        : valueOrSetter;

    savePasteDraftState(value);
    setStatePasteDraft(value);
  };

  const resetPasteDraft = () => updatePasteDraft(initialValue);

  const providerValue: PasteDraftContextType = {
    pasteDraft: statePasteDraft,
    setPasteDraft: updatePasteDraft,
    resetPasteDraft: resetPasteDraft,
  };

  return (
    <PasteDraftContext.Provider value={providerValue}>
      {children}
    </PasteDraftContext.Provider>
  );
};

export default PasteDraftContext;
