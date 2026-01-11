export const finanzasMock = {
  metrics: {
    total: 12540.50,
    count: 33,
  },
  chartData: [
    { name: 'Ene', total: 4000 },
    { name: 'Feb', total: 3000 },
    { name: 'Mar', total: 2000 },
    { name: 'Abr', total: 2780 },
    { name: 'May', total: 1890 },
    { name: 'Jun', total: 2390 },
  ],
  methodData: [
    { name: 'Armazones', value: 15, color: '#2563eb' },
    { name: 'Mantenimiento', value: 10, color: '#10b981' },
    { name: 'Lentes de Sol', value: 8, color: '#f59e0b' },
  ],
  recentPayments: [
    { 
      id: 1, 
      cliente: { nombres: 'Dylan Isaac' }, 
      concepto: 'Venta de Armazones', 
      fecha: '2026-01-06T10:00:00Z', 
      monto: 2500,
      detalles: [
        { producto: 'Ray-Ban Aviator', cantidad: 1, precio_ind: 1800, total: 1800 },
        { producto: 'Cristales Antireflejantes', cantidad: 1, precio_ind: 700, total: 700 }
      ]
    },
    { 
      id: 2, 
      cliente: { nombres: 'Checo Pérez' }, 
      concepto: 'Consulta y Accesorios', 
      fecha: '2026-01-08T12:30:00Z', 
      monto: 850,
      detalles: [
        { producto: 'Estuche Rígido', cantidad: 2, precio_ind: 200, total: 400 },
        { producto: 'Kit Limpieza', cantidad: 3, precio_ind: 150, total: 450 }
      ]
    }
  ]
};