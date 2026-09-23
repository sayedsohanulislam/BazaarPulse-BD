const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { getDbStatus } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'bazaarpulse_super_secret_jwt_2026';

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id || user._id, role: user.role, name: user.name, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role = 'citizen', phone } = req.body;
    const { useMemoryFallback } = getDbStatus();

    if (useMemoryFallback) {
      const mockUser = { id: `u_${Date.now()}`, name, email, role, phone };
      const token = generateToken(mockUser);
      return res.json({ success: true, token, user: mockUser });
    }

    let existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone
    });

    const token = generateToken(user);
    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { useMemoryFallback } = getDbStatus();

    if (useMemoryFallback) {
      const mockUser = { id: 'u_demo_1', name: 'Demo Citizen', email, role: 'citizen' };
      const token = generateToken(mockUser);
      return res.json({ success: true, token, user: mockUser });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.demoLogin = async (req, res) => {
  try {
    const { role = 'citizen' } = req.params;
    const demoProfiles = {
      citizen: { id: 'u_citizen_1', name: 'Kabir Hossain (Consumer)', email: 'kabir@bazaarpulse.bd', role: 'citizen' },
      trader: { id: 'u_trader_1', name: 'Haji Shamsul (Karwan Bazar Aratdar)', email: 'shamsul@karwanbazar.bd', role: 'trader' },
      magistrate: { id: 'u_magistrate_1', name: 'Abdul Jabbar (DNCRP Executive Magistrate)', email: 'jabbar@dncrp.gov.bd', role: 'magistrate' },
      admin: { id: 'u_admin_1', name: 'BazaarPulse System Administrator', email: 'admin@bazaarpulse.bd', role: 'admin' }
    };

    const user = demoProfiles[role] || demoProfiles.citizen;
    const token = generateToken(user);
    res.json({ success: true, token, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};
