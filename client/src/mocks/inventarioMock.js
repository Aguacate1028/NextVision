export const inventarioMock = {
  categorias: [
    { id_categoria: 1, nombre: 'Armazones', descripcion: 'Monturas para lentes oftálmicos' },
    { id_categoria: 2, nombre: 'Lentes de Sol', descripcion: 'Protección UV y estilo' },
    { id_categoria: 3, nombre: 'Accesorios', descripcion: 'Estuches, kits y microfibras' }
  ],
  productos: [
    { 
      id_producto: 101, 
      nombre: 'Ray-Ban Aviator Classic', 
      descripcion: 'Gafas de sol con montura metálica dorada', 
      precio: 3500.00, 
      stock: 12, 
      id_categoria: 2,
      categoria_nombre: 'Lentes de Sol',
      imagen_url: null 
    },
    { 
      id_producto: 102, 
      nombre: 'Oakley Holbrook', 
      descripcion: 'Diseño icónico con cristales Prizm', 
      precio: 2800.00, 
      stock: 5, 
      id_categoria: 2,
      categoria_nombre: 'Lentes de Sol',
      imagen_url: null 
    },
    { 
      id_producto: 103, 
      nombre: 'Estuche Premium NextVision', 
      descripcion: 'Protección rígida con forro aterciopelado', 
      precio: 450.00, 
      stock: 50, 
      id_categoria: 3,
      categoria_nombre: 'Accesorios',
      imagen_url: null 
    }
  ]
};