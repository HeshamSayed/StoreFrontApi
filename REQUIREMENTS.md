## API Endpoints


#### Users
- Index `/users` [GET] [token required]
- Create `/users/create` [POST] 
- Read `/users/:id` [GET] [token required]
- Update `/users/:id` [PUT] [token required]
- Delete `/users/:id` [DELETE] [token required]
- Auth `/users/auth` [POST]

#### Products
- Index `/products` [GET]
- Create `/products/create` [POST] [token required]
- Read `/products/:id` [GET]
- Update `/products/:id` [PUT] [token required]
- Delete `/products/:id` [DELETE] [token required]


#### Orders
- Index `/orders` [GET] [token required]
- Create `/orders/create` [POST] [token required]
- Read `/orders/:id` [GET] [token required]
- Update `/orders/:id` [PUT] [token required]
- Delete `/orders/:id` [DELETE] [token required]