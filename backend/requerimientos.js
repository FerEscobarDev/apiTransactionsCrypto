 /* 
    Entidades
    User -> La entidad usuario tendrá las siguientes propiedades:

    user = {
        id: 1,
        name: 'Pedro',
        email: 'pedro@mail.com',
        password: 'sDFSiodsf*#$%^Vh5sfdg7*-43+'
    }

    Transaction -> La entidad transaction hace referencia a cada transacción de crypto

    transaction = {
        id: 1,
        crypto: 'BTC',
        amount: 0.00156,
        priceUSD: 28900.00,
        date: 2023-04-26 14:00:00,
    }


    Backend
    Tendrá los siguentes endpoints de Auth:
    Registro de usuario:
        ruta -> /register - Tipo -> POST
            Se debe enviar en la solicitud las mismas propiedades que la entidad excepto el id
            * En caso de ser exitoso se retorna un status 201 y el user con todas las propiedades 
                y el token de autenticación para el inicio de sesión y un ok = true
            * En caso de fallar se retorna un status 500 un ok = false y el mensaje de error

    Login de usuario:
        ruta -> /login - Tipo -> POST
            Se debe enviar en la solicitud sólo email y contraseña    
            * En caso de ser exitoso se retorna un status 201 y el user con todas las propiedades 
                y el token de autenticación para el inicio de sesión y un ok = true
            * En caso de fallar se retorna un status 500 un ok = false y el mensaje de error

    
    Tendrá los siguentes endpoints de Transactions:
    Obtener listado de transacciones:
        ruta -> /transactions - Tipo -> GET
            * retorna una lista con todas las transacciones que pertenecen al usuario autenticado
                y un ok = true

    Obtener una transacción
        ruta -> /transaction/{id} - Tipo -> GET
            * retorna la transacción siempre que pertenezca al usuario autenticado y un ok = true

    Guardar una transacción:
        ruta -> /transaction/store - Tipo -> POST
            Se debe enviar en la solicitud todas las propiedades de la entidad excepto el id
            * En caso de ser exitoso retorna un status 201, la transacción registrada y un ok = true
            * En caso de fallar retorna un status 500 y el mensaje de error

    Editar una transacción    
        ruta -> /transaction/edit/{id} - Tipo -> POST
            Se debe enviar en la solicitud todas las propiedades de la entidad incluyendo el id en la query (URL)
            * En caso de ser exitoso retorna un status 200, la transacción registrada y un ok = true
            * En caso de fallar retorna un status 500, 401 o 404 según el caso y el mensaje de error

    Eliminar una transacción
        ruta -> /transaction/delete/{id} - Tipo -> POST
            Se debe enviar el id en la query (URL)
            * En caso de ser exitoso retorna un status 200 y un ok = true
            * En caso de fallar retorna un status 500, 401 o 404 según el caso y el mensaje de error


    Frontend
    Páginas de Auth:
        Registro => página con formulario de registro, debe redirigir cómo usuario autenticado a la página de listado de transacciones
        Login => página con formulario de inicio de sesión, debe redirigir como usuario autenticado a la página de listado de transacciones

    Páginas de Transactions:
        Listado de transacciones => página con una tabla que liste las transacciones del usuario autenticado y muestre el rendimiento obtenido
                                    comparando el precio que reposa en la BD con el precio actual de la crypto, los datos del precio actual
                                    deben ser tomados de API externa

        Pagina de transacción => página con formulario que mostrará los detalles de la transacción desde donde se podrá editar o eliminar la transacción

 */