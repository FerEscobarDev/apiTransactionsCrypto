# Establecer la imagen base
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias
RUN npm install
RUN npm install --only=dev


# Copiar el resto del código fuente de la aplicación
COPY . .

# Exponer el puerto 8000
EXPOSE 8000

# Ejecutar la aplicación
CMD ["npm", "run", "dev"]

