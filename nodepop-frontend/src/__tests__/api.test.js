import api from '../services/api';

describe('api service', () => {
  it('should have default baseURL', () => {
    expect(api.defaults.baseURL).toBeDefined();
  });
});
