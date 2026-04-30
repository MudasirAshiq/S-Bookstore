import pool from '../db/index.js';

/**
 * Auth Controller
 * Handles admin authentication and settings management.
 * All queries use parameterized statements to prevent SQL injection.
 */

/**
 * POST /api/auth/login
 * Validate admin credentials.
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { rows } = await pool.query(
      `SELECT id, email, dashboard_name FROM users WHERE email = $1 AND password = $2`,
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Authentication Failed',
        message: 'Invalid email or password.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        id: rows[0].id,
        email: rows[0].email,
        dashboard_name: rows[0].dashboard_name,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/auth/settings
 * Get admin dashboard settings.
 */
export const getSettings = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT dashboard_name FROM users WHERE email = $1`,
      ['admin@sapien.com']
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Admin account not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        dashboard_name: rows[0].dashboard_name,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/auth/settings
 * Update admin dashboard name and/or password.
 */
export const updateSettings = async (req, res, next) => {
  try {
    const { dashboard_name, new_password } = req.body;
    let updated = false;

    // Update dashboard name if provided
    if (dashboard_name && typeof dashboard_name === 'string' && dashboard_name.trim().length > 0) {
      await pool.query(
        `UPDATE users SET dashboard_name = $1 WHERE email = $2`,
        [dashboard_name.trim(), 'admin@sapien.com']
      );
      updated = true;
    }

    // Update password if provided
    if (new_password && typeof new_password === 'string' && new_password.length >= 4) {
      await pool.query(
        `UPDATE users SET password = $1 WHERE email = $2`,
        [new_password, 'admin@sapien.com']
      );
      updated = true;
    }

    if (!updated) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'No valid fields provided to update. Password must be at least 4 characters.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully.',
    });
  } catch (err) {
    next(err);
  }
};
