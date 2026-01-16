// Task 3: Application Layer (6 minutos)
// Orquestación de casos de uso y manejo de transacciones.

// 📁 application/services/UserApplicationService.js
class UserApplicationService {
  constructor(
    createUserUseCase,
    getUserUseCase,
    updateUserUseCase,
    deleteUserUseCase
  ) {
    this.createUserUseCase = createUserUseCase;
    this.getUserUseCase = getUserUseCase;
    this.updateUserUseCase = updateUserUseCase;
    this.deleteUserUseCase = deleteUserUseCase;
  }

  async createUser(userData) {
    try {
      // Validación a nivel de aplicación
      this.validateUserData(userData);

      // Ejecutar caso de uso
      const user = await this.createUserUseCase.execute(userData);

      // Log de auditoría
      console.log(`Usuario creado: ${user.id}`);

      return user;
    } catch (error) {
      console.error('Error creando usuario:', error);
      throw error;
    }
  }

  async getUserProfile(userId) {
    const user = await this.getUserUseCase.execute(userId);
    // Remover datos sensibles antes de devolver
    const { password, ...profile } = user;
    return profile;
  }

  validateUserData(data) {
    if (!data.name || data.name.length < 2) {
      throw new Error('Nombre debe tener al menos 2 caracteres');
    }
    if (!data.email) {
      throw new Error('Email es requerido');
    }
  }
}