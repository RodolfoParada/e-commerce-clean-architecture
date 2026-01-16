// Task 4: Infrastructure Layer (8 minutos)
// Implementaciones concretas de interfaces externas.

// 📁 infrastructure/controllers/UserController.js
class UserController {
  constructor(userApplicationService) {
    this.userService = userApplicationService;
  }

  async createUser(req, res) {
    try {
      const userData = req.body;
      const user = await this.userService.createUser(userData);

      res.status(201).json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async getUserProfile(req, res) {
    try {
      const { userId } = req.params;
      const profile = await this.userService.getUserProfile(userId);

      res.json({
        success: true,
        data: profile
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  }
}

// 📁 infrastructure/middleware/AuthMiddleware.js
class AuthMiddleware {
  constructor(authService) {
    this.authService = authService;
  }

  authenticate(req, res, next) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return res.status(401).json({ error: 'Token requerido' });
      }

      const user = this.authService.verifyToken(token);
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Token inválido' });
    }
  }
}

// 📁 infrastructure/database/MongoUserRepository.js
class MongoUserRepository extends UserRepository {
  constructor(mongoClient) {
    super();
    this.collection = mongoClient.db('app').collection('users');
  }

  async findById(id) {
    const user = await this.collection.findOne({ _id: id });
    return user ? this.mapToDomain(user) : null;
  }

  async save(user) {
    const userDoc = this.mapToPersistence(user);
    await this.collection.insertOne(userDoc);
    return user;
  }

  mapToDomain(doc) {
    return new User(doc._id, doc.name, doc.email);
  }

  mapToPersistence(user) {
    return {
      _id: user.id,
      name: user.name,
      email: user.email
    };
  }
}