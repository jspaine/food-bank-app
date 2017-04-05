import angular from 'angular'

export default angular.module('food')
  .component('foodList', {
    controller: 'FoodController',
    template: `
      <!-- Content header (Page header) -->
      <section class="content-header">
        <h1>Food Inventory</h1>
      </section>
      <!-- Main content -->
      <section class="content" data-ng-init="$ctrl.find()">
        <div class="row">
          <div class=" col-xs-12 col-md-3 col-lg-2">
            <div class="box">
              <!-- Box header -->
              <div class="box-header">
                <h3 class="box-title">Categories</h3>
              </div><!-- /.box-header -->
              <!-- Box body -->
              <div class="box-body table-responsive no-padding">
                <!-- Table -->
                <table class="table table-striped table-bordered">
                  <!-- Table columns -->
                  <thead>
                    <tr><th>Name</th></tr>
                  </thead><!-- /.table-columns -->
                  <!-- Table body -->
                  <tbody>
                    <tr data-ng-repeat="food in $ctrl.foods">
                      <td data-ng-hide="food.showEdit">
                        <span data-ng-bind="food.category"></span>
                        <div class="tools">
                          <i class="fa fa-edit text-blue" data-ng-click="food.showEdit = true"></i>
                          <i class="fa fa-trash-o text-red" data-ng-click="$ctrl.remove(food)"></i>
                        </div>
                      </td>
                      <td data-ng-show="food.showEdit">
                        <form class="input-group" name="categoryForm" data-ng-submit="$ctrl.update(food)">
                          <input type="text"
                                class="form-control"
                                data-ng-model="food.category"
                                required>
                          <span class="input-group-btn">
                            <button class="btn btn-success btn-flat" type="submit" data-ng-disabled="categoryForm.$invalid">
                              <i class="fa fa-check"></i>
                            </button>
                          </span>
                        </form>
                      </td>
                    </tr>
                    <tr data-ng-if="$ctrl.foods.$resolved && !$ctrl.foods.length">
                      <td class="text-center">No food categories yet.</td>
                    </tr>
                  </tbody><!-- /.table-body -->
                </table><!-- /.table -->
              </div><!-- /.box-body -->
              <!-- Box footer -->
              <div class="box-footer">
                <form name="categoryForm" data-ng-submit="$ctrl.create()">
                  <div class="input-group">
                    <input type="text"
                          class="form-control"
                          data-ng-model="$ctrl.food.category"
                          placeholder="Add category"
                          required>
                    <span class="input-group-btn">
                      <button class="btn btn-success btn-flat" type="submit" data-ng-disabled="categoryForm.$invalid">
                        <i class="fa fa-plus"></i>
                      </button>
                    </span>
                  </div>
                </form>
                <div data-ng-show="$ctrl.error" class="text-center text-danger">
                  <strong data-ng-bind="$ctrl.error"></strong>
                </div>
              </div><!-- /.box-footer -->
              <div class="overlay" ng-show="$ctrl.isLoading">
                <i class="fa fa-refresh fa-spin"></i>
              </div>
            </div><!-- /.box -->
          </div><!-- /.col -->
          <div class="col-xs-12 col-md-9 col-lg-10">
            <div class="box" st-table="$ctrl.itemsCopy" st-safe-src="$ctrl.items">
              <!-- Box header -->
              <div class="box-header">
                <h3 class="box-title">Items</h3>
                <div class="box-tools">
                  <div class="form-group has-feedback">
                    <input class="form-control" type="search" st-search="name" placeholder="Search">
                    <span class="glyphicon glyphicon-search form-control-feedback"></span>
                  </div>
                </div>
              </div><!-- /.box-header -->
              <!-- Box body -->
              <div class="box-body table-responsive no-padding top-buffer">
                <form name="itemForm" data-ng-submit="$ctrl.createItem()">
                  <!-- Table -->
                  <table class="table table-bordered table-striped" datatable='ng' dt-options="$ctrl.dtOptions">
                    <!-- Table columns -->
                    <thead>
                      <tr>
                        <th st-sort="name">Food Item</th>
                        <th st-sort="category">Food Category</th>
                        <th st-sort="quantity">Quantity</th>
                        <th>Actions</th>
                      </tr>
                    </thead><!-- /.table-columns -->
                    <!-- Table body -->
                    <tbody>
                      <tr>
                        <td>
                          <input class="form-control"
                                type="text"
                                data-ng-model="$ctrl.item.name"
                                placeholder="Food Item"
                                required>
                        </td>
                        <td>
                          <select class="form-control"
                                  ng-options="food._id as food.category for food in $ctrl.foods"
                                  data-ng-model="$ctrl.item.categoryId"
                                  required>
                            <option value="">Select category</option>
                          </select>
                        </td>
                        <td>
                          <input class="form-control"
                                type="number" min="0"
                                data-ng-model="$ctrl.item.quantity"
                                placeholder="Quantity">
                        </td>
                        <td>
                          <button class="btn btn-success btn-flat" type="submit" data-ng-disabled="itemForm.$invalid">
                            <i class="fa fa-plus"></i> Add Item
                          </button>
                        </td>
                      </tr>
                      <tr data-ng-repeat="item in $ctrl.itemsCopy">
                        <td data-ng-hide="item.showEdit"><span data-ng-bind="item.name"></span></td>
                        <td data-ng-hide="item.showEdit"><span data-ng-bind="item.categoryName"></span></td>
                        <td data-ng-hide="item.showEdit"><span data-ng-bind="item.quantity"></span></td>
                        <td data-ng-show="item.showEdit">
                          <input class="form-control"
                                type="text"
                                data-ng-model="item.name">
                        </td>
                        <td data-ng-show="item.showEdit">
                          <select class="form-control"
                                  ng-options="food._id as food.category for food in $ctrl.foods"
                                  data-ng-model="item.categoryId">
                          </select>
                        </td>
                        <td data-ng-show="item.showEdit">
                          <input class="form-control"
                                type="number"
                                min="0"
                                data-ng-model="item.quantity">
                        </td>
                        <td>
                          <a data-ng-hide="item.showEdit" data-ng-click="item.showEdit = true" class="btn btn-primary btn-flat btn-xs"><i class="fa fa-pencil"></i> Edit</a>
                          <a data-ng-show="item.showEdit" data-ng-click="$ctrl.updateItem(item)" class="btn btn-success btn-flat btn-xs"><i class="fa fa-download"></i> Save</a>
                          <a data-ng-show="item.showEdit" data-ng-click="$ctrl.removeItem(item)" class="btn btn-danger btn-flat btn-xs"><i class="fa fa-trash"></i> Delete</a>
                          <a data-ng-show="item.showEdit" data-ng-click="$ctrl.find(); item.showEdit = false" class="btn btn-primary btn-flat btn-xs"><i class="fa fa-times"></i> Cancel</a>
                        </td>
                      </tr>
                      <tr data-ng-if="!$ctrl.items.length">
                        <td class="text-center" colspan="4">No food items yet.</td>
                      </tr>
                    </tbody><!-- /.table-body -->
                  </table><!-- /.table -->
                </form>
              </div><!-- /.box-body -->
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
