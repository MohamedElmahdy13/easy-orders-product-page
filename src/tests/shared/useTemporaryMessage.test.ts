import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTemporaryMessage } from '@/shared/hooks/useTemporaryMessage';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useTemporaryMessage', () => {
  it('shows the message and removes it after 2 seconds', () => {
    const { result } = renderHook(() => useTemporaryMessage());
    expect(result.current[0]).toBe('');

    act(() => result.current[1]('Link copied'));
    expect(result.current[0]).toBe('Link copied');

    act(() => vi.advanceTimersByTime(1999));
    expect(result.current[0]).toBe('Link copied');

    act(() => vi.advanceTimersByTime(1));
    expect(result.current[0]).toBe('');
  });

  it('starts the timer again when a new message is shown', () => {
    const { result } = renderHook(() => useTemporaryMessage());

    act(() => result.current[1]('First'));
    act(() => vi.advanceTimersByTime(1500));
    act(() => result.current[1]('Second'));

    // 1500ms after the first message would have ended it, but the timer was restarted
    act(() => vi.advanceTimersByTime(1500));
    expect(result.current[0]).toBe('Second');

    act(() => vi.advanceTimersByTime(500));
    expect(result.current[0]).toBe('');
  });

  it('uses the duration it is given', () => {
    const { result } = renderHook(() => useTemporaryMessage(500));

    act(() => result.current[1]('Quick'));
    act(() => vi.advanceTimersByTime(500));

    expect(result.current[0]).toBe('');
  });

  it('stops the timer when the component is removed', () => {
    const { result, unmount } = renderHook(() => useTemporaryMessage());

    act(() => result.current[1]('Bye'));
    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });
});
