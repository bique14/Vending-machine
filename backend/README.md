# Vending Service

## Table of contents

- [Admin](#admin)

  - [Get all products](#get-products)
  - [Get by product id](#get-product)
  - [Create new product](#create-new-product)
  - [Add 1 in stock](#add-1-in-stock)
  - [Full stock](#full-stock)

- [Client](#client)
  - [Search by location](#seach-by-location)
  - [Purchase](#purchase)

## Admin

#### Get products

url: `localhost:3001/admin`

```
  method: GET
  response: 200 OK
    [
      {
        "_id": "604a0a5735475523317ec774",
        "location": "siam",
        "id": "coca-cola-coke",
        "name": "Coke",
        "image": "https://backend.tops.co.th/media//catalog/product/8/8/8851959132012.jpg",
        "price": "15",
        "remaining": 98,
        "total": 100,
        "__v": 0
      },
      {
          "_id": "604a0d0c6a1791319e8d8c52",
          "location": "siam",
          "id": "sprite-siam",
          "name": "Sprite",
          "image": "https://backend.tops.co.th/media/catalog/product/8/8/8851959132364_e02-04-2019.jpg",
          "price": "15",
          "remaining": 98,
          "total": 100,
          "__v": 0
      },
      {
        "_id": "604a0d2e6a1791319e8d8c53",
        "location": "supan",
        "id": "fanta-supan",
        "name": "Fanta Orange",
        "image": "https://assets.lyreco.com/is/image/lyrecows/2018-10022253?locale=TH_th&id=lpFqo0&fmt=jpg&fit=constrain,1&wid=430&hei=430",
        "price": "15",
        "remaining": 100,
        "total": 100,
        "__v": 0
      }
    ]
```

#### Get product

url: `localhost:3001/vending?id=<product_id>`

###### example: localhost:3001/vending?id=604a0a5735475523317ec774

```
  method: GET
  response: 200 OK
    [
      {
          "_id": "604a0a5735475523317ec774",
          "location": "siam",
          "id": "coca-cola-coke",
          "name": "Coke",
          "image": "https://backend.tops.co.th/media//catalog/product/8/8/8851959132012.jpg",
          "price": "15",
          "remaining": 100,
          "total": 100,
          "__v": 0
      }
    ]

```

#### Create new product

url: `localhost:3001/admin/create`

```
  method: PUT
  payload:
    {
      "location": "siam",
      "id": "hong-thong-siam",
      "name": "Hong Thong",
      "image": "https://lh3.googleusercontent.com/proxy/A9XA2BuHKvOII45x8esQdbhnvSkdClRI4kAlTSv01Tg2elQ-mMwvNPTH4FnVmAWMVztXflHQXwtprJDfOe61oGaocBx-w-D-LHt8d0kucw",
      "price": "170",
      "remaining": 6,
      "total": 100
    }
  response: 200 OK
    {
      "_id": "604a15e952b70c3225c01421",
      "location": "siam",
      "id": "hong-thong-siam",
      "name": "Hong Thong",
      "image": "https://lh3.googleusercontent.com/proxy/A9XA2BuHKvOII45x8esQdbhnvSkdClRI4kAlTSv01Tg2elQ-mMwvNPTH4FnVmAWMVztXflHQXwtprJDfOe61oGaocBx-w-D-LHt8d0kucw",
      "price": "170",
      "remaining": 6,
      "total": 100,
      "__v": 0
    }
```

#### Add 1 in stock

url: `localhost:3001/admin/product/add`

```
  method: PUT
  payload:
    {
      "id": "604a0a5735475523317ec774"
    }
  response: 200 OK
```

#### Full stock

url: `localhost:3001/admin/product/restock`

```
  method: PUT
  payload:
    {
      "id": "604a0a5735475523317ec774"
    }
  response: 200 OK
```

---

## Client

#### Seach by location

url: `localhost:3001/vending/location?id=<location_id>`

###### example: localhost:3001/vending/location?id=siam

```
  method: GET
  response: 200 OK
    [
      {
        "_id": "604a0a5735475523317ec774",
        "location": "siam",
        "id": "coca-cola-coke",
        "name": "Coke",
        "image": "https://backend.tops.co.th/media//catalog/product/8/8/8851959132012.jpg",
        "price": "15",
        "remaining": 98,
        "total": 100,
        "__v": 0
      },
      {
          "_id": "604a0d0c6a1791319e8d8c52",
          "location": "siam",
          "id": "sprite-siam",
          "name": "Sprite",
          "image": "https://backend.tops.co.th/media/catalog/product/8/8/8851959132364_e02-04-2019.jpg",
          "price": "15",
          "remaining": 98,
          "total": 100,
          "__v": 0
      }
    ]
```

#### Purchase

url: `localhost:3001/vending/purchase`

```
  method: PUT
  payload:
    {
      "id": "604a0a5735475523317ec774",
      "quantity": 1
    }
  response: 200 OK
```
