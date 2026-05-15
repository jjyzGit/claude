import {useEffect} from 'react';

export function useScrollToTopOnError(error: unknown) {
  useEffect(() => {
    if (!error) return;
    document.querySelector('[data-slot="modal-body"]')?.scrollTo({top: 0, behavior: 'smooth'});
  }, [error]);
}
