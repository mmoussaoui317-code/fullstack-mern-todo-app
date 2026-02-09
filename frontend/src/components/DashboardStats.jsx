import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const DashboardStats = ({ todos }) => {
    // بيانات للإحصائيات
    const completionData = [
        { name: 'مكتمل', value: todos.filter(t => t.completed).length, color: '#10b981' },
        { name: 'غير مكتمل', value: todos.filter(t => !t.completed).length, color: '#ef4444' }
    ];

    const priorityData = [
        { priority: 'عاجل', count: todos.filter(t => t.priority === 'urgent').length },
        { priority: 'عالي', count: todos.filter(t => t.priority === 'high').length },
        { priority: 'متوسط', count: todos.filter(t => t.priority === 'medium').length },
        { priority: 'منخفض', count: todos.filter(t => t.priority === 'low').length }
    ];

    return (
        <div className="stats-grid">
            <div className="stat-card">
                <h3>حالة المهام</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={completionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {completionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="stat-card">
                <h3>الأولويات</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={priorityData}>
                        <XAxis dataKey="priority" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardStats;