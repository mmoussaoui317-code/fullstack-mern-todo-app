
// build chart simple without library
const SimpleChart = ({ data }) => {
    // mock data
    const chartData = data || [
        { label: 'Done', value: 40, color: '#10b981' },
        { label: 'In Progress', value: 30, color: '#f59e0b' },
        { label: 'Delayed', value: 20, color: '#ef4444' },
        { label: 'New', value: 10, color: '#3b82f6' }
    ];

    // Calculate the total value
    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>
                📊  (Builded Dynamic)
            </h3>
            
            {/* Design a simple column chart */}
            <div style={{ marginBottom: '30px' }}>
                <h4>Column chart:</h4>
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'flex-end', 
                    height: '200px',
                    gap: '10px',
                    padding: '20px 0'
                }}>
                    {chartData.map((item, index) => {
                        const height = (item.value / total) * 150; // calculate the height
                        return (
                            <div key={index} style={{ textAlign: 'center' }}>
                                <div
                                    style={{
                                        width: '40px',
                                        height: `${height}px`,
                                        backgroundColor: item.color,
                                        borderRadius: '4px 4px 0 0',
                                        margin: '0 auto'
                                    }}
                                />
                                <div style={{ marginTop: '5px' }}>
                                    <strong>{item.value}</strong>
                                    <div style={{ fontSize: '12px' }}>{item.label}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Design a simple rounded chart */}
            <div>
                <h4>Rounded chart:</h4>
                <div style={{ position: 'relative', width: '200px', height: '200px', margin: '20px auto' }}>
                    {/* design a circle by conic-gradient */}
                    <div
                        style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            background: `conic-gradient(${chartData
                                .map((item, index, arr) => {
                                    const prevPercent = arr
                                        .slice(0, index)
                                        .reduce((sum, i) => sum + (i.value / total) * 100, 0);
                                    const percent = (item.value / total) * 100;
                                    return `${item.color} ${prevPercent}% ${prevPercent + percent}%`;
                                })
                                .join(', ')})`
                        }}
                    />
                    
                    {/* text in the center */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        backgroundColor: 'white',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}>
                        <strong>Total</strong>
                        <span>{total}</span>
                    </div>
                </div>

                {/* display the data */}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
                    {chartData.map((item, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <div style={{ width: '15px', height: '15px', backgroundColor: item.color }} />
                            <span>{item.label}: {item.value} ({(item.value/total*100).toFixed(1)}%)</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default SimpleChart;