import {sortBy} from 'lodash'
// have to import separately or user model will be imported and blow up
import Customer from '../../models/customer'
import Volunteer from '../../models/volunteer'
import {Questionnaire} from '../../models/questionnaire'
import {createUserSession, createTestUser} from '../helpers'

describe('Customer Api', function() {
  before(async function() {
    await initDb()
    // can't import user before init db because of autoincrement plugin
    const User = require('../../models/user').default
    await Customer.find().remove()
    await User.find().remove()

    await Questionnaire.find().remove()
    const qCustomers = new Questionnaire({name: "Customers", identifier: "qCustomers"})
    await qCustomers.save(err => {if (err) throw err})
    const qVolunteers = new Questionnaire({name: "Volunteers", identifier: "qVolunteers"})
    await qVolunteers.save(err => {if (err) throw err})  
  })

  afterEach(async function() {
    const User = require('../../models/user').default
    await Customer.find().remove()
    await Volunteer.find().remove()
    await User.find().remove()
  })

  after(async function() {
    await Questionnaire.find().remove()
    await resetDb()
  })

  describe('User routes', function() {
    it('creates customers', async function() {
      const newCustomer = createTestUser('user', 'customer')
      const {user, app} = await createUserSession(newCustomer)
      const request = supertest.agent(app)

      return request.post('/api/customer')
        .send(user)
        .expect(res => {
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('status', 'Pending')
        })
        .expect(200)
    })


    it('doesn\'t create duplicate customers', async function() {
      const newCustomer = createTestUser('user', 'customer')
      const {user, app} = await createUserSession(newCustomer)
      const request = supertest.agent(app)

      await request.post('/api/customer')
        .send(user)

      return request.post('/api/customer')
        .send(user)
        .expect(res => {
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          expect(res.body.error).to.have.property('message', 'Unique field already exists')
        })
        .expect(400)
    })

    it('shows a customer', async function() {
      const newCustomer = createTestUser('user', 'customer')
      const {user, app} = await createUserSession(newCustomer)
      const request = supertest.agent(app)

      await request.post('/api/customer')
        .send(user)

      return request.get(`/api/customer/${user._id}`)
        .expect(res => {
          expect(res.body).to.be.an.object
          expect(res.body).to.have.property('_id', user._id)
          expect(res.body).to.have.property('email', 'user@test.com')
        })
        .expect(200)
    })

    it('doesn\'t show non-existing customer', async function() {
      const newCustomer = createTestUser('user', 'customer')
      const {user, app} = await createUserSession(newCustomer)
      const request = supertest.agent(app)

      return request.get(`/api/customer/${user._id}`)
        .expect(res => {
          expect(res.body).to.be.an.object
          expect(res.body).to.have.property('message', 'Not found')
        })
        .expect(404)
    })

    it('doesn\'t show other customers', async function() {
      const firstCustomer = createTestUser('user1', 'customer')
      const secondCustomer = createTestUser('user2', 'customer')

      const first = await createUserSession(firstCustomer)
      const second = await createUserSession(secondCustomer)

      const firstReq = supertest.agent(first.app)
      const secondReq = supertest.agent(second.app)

      await secondReq.post('/api/customer')
        .send(second.user)

      return firstReq.get(`/api/customer/${second.user._id}`)
        .expect(res => {
          expect(res.body).to.be.an.object
          expect(res.body).to.have.property('message', 'User is not authorized')
        })
        .expect(403)
    })

    it('updates customers', async function() {
      const newCustomer = createTestUser('user', 'customer')
      const {user, app} = await createUserSession(newCustomer)
      const request = supertest.agent(app)

      const savedCustomer = (await request.post('/api/customer')
        .send(user)).body

      const updatedCustomer = {
        ...savedCustomer,
        firstName: 'updated'
      }

      return request.put(`/api/customer/${user._id}`)
        .send(updatedCustomer)
        .expect(res => {
          expect(res.body).to.be.an.object
          expect(res.body).to.have.property('firstName', 'updated')
        })
        .expect(200)
    })
  })

  describe('Admin routes', function() {
    it('lists customers', async function() {
      const newAdmin = createTestUser('admin', 'admin', {roles: ['admin']})
      const newCustomer1 = createTestUser('customer1', 'customer')
      const newCustomer2 = createTestUser('customer2', 'customer')

      const admin = await createUserSession(newAdmin)
      const customer1 = await createUserSession(newCustomer1)
      const customer2 = await createUserSession(newCustomer2)

      const adminReq = supertest.agent(admin.app)
      const customerReq1 = supertest.agent(customer1.app)
      const customerReq2 = supertest.agent(customer2.app)

      await customerReq1.post('/api/customer')
        .send(customer1.user)      
      await customerReq2.post('/api/customer')
        .send(customer2.user)      

      return adminReq.get(`/api/admin/customers`)
        .expect(res => {
          expect(res.body).to.be.an.array
          expect(res.body).to.have.lengthOf(2)
          const sortedResults = sortBy(res.body, 'username')
          expect(sortedResults[0].username).to.equal('customer1')
          expect(sortedResults[1].username).to.equal('customer2')
        })
        .expect(200)
    })

    it('rejects non-admins', async function() {
      const newCustomer = createTestUser('user', 'customer')
      const customer = await createUserSession(newCustomer)

      const customerReq = supertest.agent(customer.app)

      return customerReq.get(`/api/admin/customers`)
        .expect(res => {
          expect(res.body).to.be.an.object
          expect(res.body).to.have.property('message', 'User is not authorized')
        })
        .expect(403)
    })

    it('deletes customers', async function() {
      const newAdmin = createTestUser('admin', 'admin', {roles: ['admin']})
      const newCustomer = createTestUser('user', 'customer')
      const admin = await createUserSession(newAdmin)
      const customer = await createUserSession(newCustomer)

      const adminReq = supertest.agent(admin.app)
      const customerReq = supertest.agent(customer.app)

      await customerReq.post('/api/customer')
        .send(newCustomer)

      return adminReq.delete(`/api/admin/customers/${customer.user._id}`)
        .expect(res => {
          expect(res.body).to.be.an.object
          expect(res.body).to.have.property('firstName', 'user')
        })
        .expect(200)
    })

    it('assigns customers', async function() {
      const newAdmin = createTestUser('admin', 'admin', {roles: ['admin']})
      const newCustomer = createTestUser('customer1', 'customer')
      const newVolunteer = createTestUser('driver1', 'volunteer', {roles: ['volunteer', 'driver']})

      const admin = await createUserSession(newAdmin)
      const customer = await createUserSession(newCustomer)
      const volunteer = await createUserSession(newVolunteer)

      const adminReq = supertest.agent(admin.app)
      const customerReq = supertest.agent(customer.app)
      const volunteerReq = supertest.agent(volunteer.app)

      const savedCustomer = (await customerReq.post('/api/customer')
        .send(newCustomer)).body

      const savedVolunteer = (await volunteerReq.post('/api/volunteer')
        .send(newVolunteer)).body

      return adminReq.post('/api/admin/customers/assign')
        .send({
          customerIds: [savedCustomer._id],
          driverId: savedVolunteer._id
        })
        .expect(res => {
          expect(res.body).to.be.an.array
          expect(res.body).to.have.length(1)
          expect(res.body[0]).to.have.property('assignedTo', savedVolunteer._id)
        })
        .expect(200)
    })
  })
})
