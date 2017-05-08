import extend from 'lodash/extend'

import config from '../config/index'
import mailer from '../lib/mailer'
import Customer from '../models/customer'
import User from '../models/user'
import mongoose from 'mongoose'

export default {
  /**
   * Create a customer
   */
  async create(req, res) {
    let customer = new Customer(req.body)
    customer._id = req.user.id

    // Update user's hasApplied property to restrict them from applying again
    await User.findOneAndUpdate({_id: customer._id}, {$set: {hasApplied: true }})

    try {
      const savedCustomer = await customer.save()
      res.json(savedCustomer)
    } catch (error) {
      // Check if it is a unique key error(11000)
      if (error.code === 11000) {
        const response = {
          message: 'Unique field already exists', 
        } 
        return res.status(400).json({error: response})
      } else {
        return res.status(500).json(error)
      }
    }

    await mailer.send(config.mailer.to, 'A new client has applied.', 'create-customer-email')
  },

  /**
   * Show the current customer
   */
  read(req, res) {
    res.json(req.customer)
  },

  /**
   * Update a customer
   */
  async update(req, res) {
    const customer = extend(req.customer, req.body)

    const oldCustomer = await Customer.findById(customer._id)
    const newCustomer = await customer.save()

    if (newCustomer.status !== oldCustomer.status) {
      await mailer.sendStatus(newCustomer)
    } else {
      await mailer.sendUpdate(newCustomer)
    }

    if (newCustomer.status === 'Accepted') {
      await User.findByIdAndUpdate(customer._id, {$set: {roles: ['customer']}})
    }

    res.json(newCustomer)
  },

  /**
   * List customers
   */
  async list(req, res) {
    const customers = await Customer.find()
      .sort('-dateReceived')
      .populate('user', 'displayName')
      .populate('assignedTo', 'firstName lastName')
    res.json(customers)
  },

  /**
   * Delete customer
   */
  async delete(req, res) {
    const id = req.customer._id

    await User.findByIdAndRemove(id)
    await Customer.findByIdAndRemove(id)

    res.json(req.customer)
  },

  /**
   * Assign customers to a driver
   */
  async assign(req, res) {
    const {customerIds, driverId} = req.body

    const customers = await Promise.all(
      customerIds.map(async id =>
        await Customer.findByIdAndUpdate(id, {$set: {assignedTo: driverId}}, {new: true}))
    )

    res.json(customers)
  },

  /**
   * Customer middleware
   */
  async customerById(req, res, next, id) {
    const customer = await Customer.findById(id)

    if (!customer) return res.status(404).json({
      message: 'Not found'
    })

    req.customer = customer
    next()
  },

  /**
   * Customer authorization middleware
   */
  hasAuthorization(req, res, next) {
    if (req.customer._id !== +req.user.id) {
      return res.status(403).json({
        message: 'User is not authorized'
      })
    }

    next()
  }
}
