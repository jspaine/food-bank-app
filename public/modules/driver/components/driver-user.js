import angular from 'angular'

export default angular.module('driver')
  .component('driverUser', {
    controller: 'DriverUserController',
    template: `
      <!-- Content header (Page header) -->
      <section class="content-header">
        <h1>Route Assignment</h1>
      </section>
      <!-- Main content -->
      <section class="content">
        <div class="row">
          <div class="col-md-6">
            <!-- Box -->
            <div class="box box-success">
              <!-- Box header -->
              <div class="box-header">
                <h3 class="box-title">Packages</h3>
              </div><!-- /.box-header -->
              <!-- Box body -->
              <div class="box-body table-responsive no-padding">
                <!-- Table -->
                <table class="table table-striped table-bordered" st-table="$ctrl.customersCopy" st-safe-src="$ctrl.customers" print-section>
                  <!-- Table columns -->
                  <thead>
                    <tr>
                      <th>
                        <input type="checkbox" data-ng-model="$ctrl.allChecked" data-ng-click="$ctrl.selectAll()">
                        Delivered ?
                      </th>
                      <th st-sort="_id">Client ID</th>
                      <th>Full Address</th>
                      <th>Delivery Instructions</th>
                    </tr>
                  </thead><!-- /.table-columns
                  <!-- Table body -->
                  <tbody>
                    <tr data-ng-repeat="customer in $ctrl.customers">
                      <td class="text-center text-success">
                        <input type="checkbox" data-ng-model="customer.isChecked">
                      </td>
                      <td><span data-ng-bind="customer._id"></span></td>
                      <td><span data-ng-bind="customer.fullAddress"></span></td>
                      <td><span data-ng-bind="customer.deliveryInstructions"></span></td>
                    </tr>
                    <tr data-ng-if="!$ctrl.customers.length">
                      <td class="text-center" colspan="4">All packages have been delivered!</td>
                    </tr>
                  </tbody><!-- /.table-body -->
                </table><!-- /.table -->
              </div><!-- /.box-body -->
              <!-- Box footer -->
              <div class="box-footer">
                <div class="row">
                  <div class="col-sm-6 col-md-5 col-lg-4">
                    <button class="btn btn-success btn-flat btn-block" data-ng-click="$ctrl.deliver()" data-ng-disabled="$ctrl.isDisabled()">
                      Mark delivered
                    </button>
                  </div>
                  <div class="col-sm-6 col-md-4 col-lg-3 col-md-offset-3 col-lg-offset-5">
                    <button class="btn btn-default btn-flat btn-block" print-btn print-landscape><i class="fa fa-print"></i> Print</button>
                  </div>
                </div>
              </div><!-- /.box-footer -->
              <div class="overlay" ng-show="$ctrl.isLoading">
                <i class="fa fa-refresh fa-spin"></i>
              </div>
            </div><!-- /.box -->
          </div><!-- /.col -->
          <div class="col-md-6">
            <!-- Box -->
            <div class="box box-primary">
              <!-- Box header -->
              <div class="box-header">
                <h3 class="box-title">Google Maps</h3>
              </div><!-- /.box-header -->
              <!-- Box body -->
              <div class="box-body no-padding">
                <!-- Google map -->
                <div class="googleMap"></div>
                <!-- /.Google map -->
              </div><!-- /.box-body -->
              <div class="overlay" ng-show="$ctrl.isLoading">
                <i class="fa fa-refresh fa-spin"></i>
              </div>
            </div><!-- /.box -->
          </div><!-- /.col -->
        </div><!-- /.row -->
        <div class="row">
          <div class="col-sm-12">
            <!-- Box -->
            <div class="box">
              <!-- Box header -->
              <div class="box-header">
                <h3 class="box-title">General notes</h3>
              </div><!-- /.box-header -->
              <!-- Box body -->
              <div class="box-body">
                <span data-ng-bind="$ctrl.driver.generalNotes"></span>
                <form name="deliveryForm">
                  <div class="form-group">
                    <textarea class="form-control"
                              data-ng-model="$ctrl.driver.newNotes"
                              placeholder="General remarks about this week's delivery..."
                              required></textarea>
                  </div>
                </form>
              </div><!-- /.box-body -->
              <div class="box-footer">
                <div class="row">
                  <div class="col-sm-6 col-md-4 col-lg-2">
                    <button type="submit" class="btn btn-success btn-flat btn-block" data-ng-click="$ctrl.updateNotes()" data-ng-disabled="deliveryForm.$invalid">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
              <div class="overlay" ng-show="$ctrl.isLoading">
                <i class="fa fa-refresh fa-spin"></i>
              </div>
            </div><!-- /.box -->
          </div><!-- /.col -->
        </div><!-- /.row -->
      </section><!-- /.content -->
    `
  })
  .name
