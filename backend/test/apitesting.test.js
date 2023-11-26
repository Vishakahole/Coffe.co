const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../server');
const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
const fs = require('fs');


chai.use(chaiHttp);
const expect = chai.expect;
describe('Restaurant Manager API', () => {
  describe('GET https://localhost:5000/api/restaurant-manager/details/:managerId', () => {
    it('should return details of the restaurant managed by the given managerId', (done) => {
        const mockRestaurant = {
          Res_name: 'Mock Restaurant',
          manager: new mongoose.Types.ObjectId(),
          EmenuCard: [
            {
              name: 'Dish 1',
              pic: 'dish1.jpg',
              price: 10,
            },
           
          ],
          location: 'Mock Location',
        };
     
        // Mock the Restaurant.findOne method
        sinon.stub(Restaurant, 'findOne').resolves(mockRestaurant);
     
        chai.request(app)
          .get(`https://localhost:5000/api/restaurant-manager/details/${mockRestaurant.manager}`)
          .end((err, res) => {
            // Restore the stub after the test
            sinon.restore();
     
            // Convert ObjectId to string for comparison
            mockRestaurant.manager = mockRestaurant.manager.toString();
     
            expect(res).to.have.status(200);
            expect(res.body).to.deep.equal(mockRestaurant);
     
            done();
          });
      });
     
    it('should return 404 if the restaurant is not found', (done) => {
      // Mock the Restaurant.findOne method to return null
      sinon.stub(Restaurant, 'findOne').resolves(null);


      chai.request(app)
        .get('https://localhost:5000/api/restaurant-manager/details/nonexistentManagerId')
        .end((err, res) => {
          // Restore the stub after the test
          sinon.restore();


          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message').equal('Restaurant not found');


          done();
        });
    });


    it('should handle internal server errors', (done) => {
      // Mock the Restaurant.findOne method to throw an error
      sinon.stub(Restaurant, 'findOne').throws(new Error('Internal server error'));


      chai.request(app)
        .get('https://localhost:5000/api/restaurant-manager/details/errorManagerId')
        .end((err, res) => {
          // Restore the stub after the test
          sinon.restore();


          expect(res).to.have.status(500);
          expect(res.body).to.have.property('message').equal('Internal server error');


          done();
        });
    });
  });
});
describe('Restaurant Manager API', function () {
  this.timeout(1000000);
  describe('POST /api/restaurant-manager/add-menu-item', () => {
  it('should add a menu item to the restaurant', async () => {
  // Mock managerId, name, price, and a file for pic
  const managerId = new
  mongoose.Types.ObjectId('654a49bd6cb3ab7e00860748');
  const name = 'Test Dish';
  const price = 15;
  // Read the file as a Buffer
  const fileBuffer =
  fs.readFileSync('C:\Coffe_@\frontend\src\logo.svg');
  // Log values for debugging
  // console.log('managerId:', managerId.toString());
  // console.log('name:', name.toString());
  // console.log('price:', price.toString());
  // console.log('fileBuffer:', fileBuffer);
  // Send a request to the route
  const response = await chai
  .request(app)
  .post('/api/restaurant-manager/add-menu-item')
  .field('managerId', managerId.toString())
  .field('name', name.toString())
  .field('price', price.toString())
  .attach('pic', fileBuffer, 'test-pic.jpg');
  // Log the response for debugging
  // console.log('Response:', response.body);
  // Assert the response
  expect(response).to.have.status(200);
  expect(response.body).to.have.property('message').to.equal('Menu item added successfully');
  const updatedRestaurant = await Restaurant.findOne({ manager:
  managerId });
  expect(updatedRestaurant).to.not.be.null;
  expect(updatedRestaurant.EmenuCard).to.be.an('array').that.is.not.empty;
  });
  it('should return 404 if Restaurant is not found', async () => {
  const fileBuffer =
  fs.readFileSync('C:\\Users\\RIYA\\Desktop\\React\\FoodOrderSys\\Frontend\\src\\logo.svg');
  const managerId = new
  mongoose.Types.ObjectId('654a49bd6cb3ab7e00860789');
  const response = await chai
  .request(app)
  .post('/api/restaurant-manager/add-menu-item')
  .field('managerId', managerId.toString())
  .field('name', 'Test Dish')
  .field('price', '50')
  .attach('pic', fileBuffer, 'test-pic.jpg');
  expect(response).to.have.status(404);
  expect(response.body).to.have.property('message').to.equal('Restaurant not found');
  });
  });
  });
  