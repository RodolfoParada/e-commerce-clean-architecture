// Task 2: Interfaces y Puertos (8 minutos)
// Contratos que definen comunicación entre capas.

// 📁 domain/ports/UserRepository.js - PUERTO (Interface)
class UserRepository {
  async findById(id) {
    throw new Error('Implement in adapter');
  }

  async save(user) {
    throw new Error('Implement in adapter');
  }

  async findByEmail(email) {
    throw new Error('Implement in adapter');
  }

  async delete(id) {
    throw new Error('Implement in adapter');
  }
}

// 📁 domain/ports/IdGenerator.js
class IdGenerator {
  generate() {
    throw new Error('Implement in adapter');
  }
}

// 📁 infrastructure/adapters/InMemoryUserRepository.js - ADAPTADOR
class InMemoryUserRepository extends UserRepository {
  constructor() {
    super();
    this.users = new Map();
  }

  async findById(id) {
    return this.users.get(id) || null;
  }

  async save(user) {
    this.users.set(user.id, user);
    return user;
  }

  async findByEmail(email) {
    for (const user of this.users.values()) {
      if (user.email === email) return user;
    }
    return null;
  }

  async delete(id) {
    return this.users.delete(id);
  }
}

// 📁 infrastructure/adapters/UUIDGenerator.js
class UUIDGenerator extends IdGenerator {
  generate() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}