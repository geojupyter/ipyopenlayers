// src/__tests__/dom-api.test.js
test('should have PointerEvent', () => {
    expect(typeof PointerEvent).toBe('function');
  });

  test('should have MouseEvent', () => {
    expect(typeof MouseEvent).toBe('function');
  });
