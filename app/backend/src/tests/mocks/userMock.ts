export const users =  [{
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    // senha: secret_admin
},
{
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
    // senha: secret_user
},
// os logins abaixo são intencionalmente inválidos, pois serão usados nos testes
{
  username: 'User',
  role: 'user',
  email: '@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
    // senha: secret_user
},
{
  username: 'User',
  role: 'user',
  email: 'invalid.user@user.com',
  password: '$2a$10$HDkFwOMKOI6PTza0F7.YRu1Bqsqb9hx7XkuV7QeYB5dRL4z9DI1Mu',
  // senha: 12345
}]

export const token = {
  "token":
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY5MzI1Mzc1MywiZXhwIjoxNjkzMzQwMTUzfQ.WwPzsrbpspvOWbfet6B3HfWT3_Z_1a6mi-Sa32hRWu0"
}