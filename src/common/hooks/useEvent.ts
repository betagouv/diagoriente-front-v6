import { useState, MouseEvent, FocusEvent } from 'react';

export function useHover(
  initialValue: boolean,
): [boolean, (e?: MouseEvent<HTMLElement>) => void, (e?: MouseEvent<HTMLElement>) => void] {
  const [value, valueChange] = useState(initialValue);
  function onHoverIn(e?: MouseEvent<HTMLElement>) {
    if (e) {
      e.preventDefault();
    }
    valueChange(true);
  }
  function onHoverOut(e?: MouseEvent<HTMLElement>) {
    if (e) {
      e.preventDefault();
    }
    valueChange(false);
  }
  return [value, onHoverIn, onHoverOut];
}

export function useFocus(
  initialValue: boolean,
): [boolean, (e: FocusEvent<HTMLElement>) => void, (e: FocusEvent<HTMLElement>) => void] {
  const [value, valueChange] = useState(initialValue);
  function onFocus() {
    valueChange(true);
  }
  function onBlur() {
    valueChange(false);
  }
  return [value, onFocus, onBlur];
}
