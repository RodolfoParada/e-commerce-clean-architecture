// Task 1: Principios de Clean Architecture (8 minutos)
// Separación de responsabilidades en capas concéntricas.

// 📁 domain/entities/User.js - ENTIDADES (Centro)
class User {
  constructor(id, name, email) {
    this.validateEmail(email);
    this.id = id;
    this.name = name;
    this.email = email;
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email inválido');
    }
  }

  updateProfile(newData) {
    if (newData.name) this.name = newData.name;
    if (newData.email) {
      this.validateEmail(newData.email);
      this.email = newData.email;
    }
  }
}

// 📁 domain/usecases/CreateUser.js - CASOS DE USO
class CreateUser {
  constructor(userRepository, idGenerator) {
    this.userRepository = userRepository;
    this.idGenerator = idGenerator;
  }

  async execute(userData) {
    const user = new User(
      this.idGenerator.generate(),
      userData.name,
      userData.email
    );

    await this.userRepository.save(user);
    return user;
  }
}

// 📁 domain/usecases/GetUser.js
class GetUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  }
}
