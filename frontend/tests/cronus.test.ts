import {test, describe, expect, vi, beforeEach} from "vitest"
import Cronus from "$lib/domain/cronus"

beforeEach(() => {
   vi.useFakeTimers() // No Vitest
})

describe('testing cronus', () => {

  test('deve parar o timer', () => {
    const cronus = new Cronus();
    cronus.start(10, 's');
    vi.advanceTimersByTime(11000); // Avança 11 segundos artificialmente
    expect(cronus.isRun()).toBe(false);
  });

})