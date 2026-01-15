const { verifyToken } = require('../utils/jwtUtils');

const authMiddleware = async (req, res, next) => {
    try {
        // الحصول على الـtoken من الـheader
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No authentication token provided'
            });
        }
        
        // التحقق من الـtoken
        const decoded = verifyToken(token);
        
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }
        
        // إضافة بيانات المستخدم إلى الـrequest
        req.userId = decoded.id;
        next();
        
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Authentication error'
        });
    }
};

module.exports = authMiddleware;
