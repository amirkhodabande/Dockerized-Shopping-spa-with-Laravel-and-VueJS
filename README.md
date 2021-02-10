# Single page shopping app

### A simple application to learn how to build ecommerce app with Laravel, VueJs, Jwt auth, LaravelCashier and Stripe.

- Laravel

- JWT auth: tymon/jwt-auth

- Laravel Cashier

- Stripe

- VueJs

- VueRouter

- VueX

- ValidateJs

- V-toaster

- Docker

## If you dont know docker you can use the normal version of this project.

	
1. Clone the project


2. Run
   : `docker-compose build && docker-compose up -d`


3. install composer dependencies via this command
   : `docker-compose run --rm composer install`


<p>*Change sql connection in your .env file*</p>
<p>*DB_CONNECTION=mysql*</p>
<p>*DB_HOST=mysql*</p>
<p>*DB_PORT=3306*</p>
<p>*DB_DATABASE=homestead*</p>
<p>*DB_USERNAME=homestead*</p>
<p>*DB_PASSWORD=secret*</p>


4. Connect to the database and run database migration
   : `docker-compose run --rm artisan migrate`


5. Run database Seeder to make some fake users and messages
   : `docker-compose run --rm artisan db:seed`


## Done, now the app is ready on 'localhost:81'.


**Be Happy:)**


![alt](https://github.com/amirkhodabande/Dockerized-Shopping-spa-with-Laravel-and-VueJS/blob/master/src/public/gitPre/createProduct.gif)
![alt](https://github.com/amirkhodabande/Dockerized-Shopping-spa-with-Laravel-and-VueJS/blob/master/src/public/gitPre/addToCart.png)
![alt](https://github.com/amirkhodabande/Dockerized-Shopping-spa-with-Laravel-and-VueJS/blob/master/src/public/gitPre/pay.png)
![alt](https://github.com/amirkhodabande/Dockerized-Shopping-spa-with-Laravel-and-VueJS/blob/master/src/public/gitPre/summary.png)
